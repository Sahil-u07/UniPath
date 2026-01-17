// Shared Gemini API utility that works with HTTP API (avoids SDK model/version issues)

// Helper to list available Gemini models
async function listAvailableModels(apiKey) {
  const versions = ["v1beta", "v1"];
  for (const version of versions) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        const models = data.models || [];
        const modelNames = models
          .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
          .map((m) => {
            // Extract model name from full path like "models/gemini-1.5-flash"
            const parts = m.name.split("/");
            return parts[parts.length - 1];
          });
        if (modelNames.length > 0) {
          return { version, models: modelNames };
        }
      }
    } catch (error) {
      // Try next version
    }
  }
  return null;
}

// Main function to generate content with Gemini API
export async function generateWithGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  // First, try to list available models
  const availableModels = await listAvailableModels(apiKey);
  
  // Build list of models to try - prefer available models if we found them
  let modelConfigs = [];
  
  if (availableModels && availableModels.models.length > 0) {
    // Use models from the API response
    for (const modelName of availableModels.models) {
      modelConfigs.push({ version: availableModels.version, model: modelName });
    }
  } else {
    // Fallback to common model names if listing failed
    modelConfigs = [
      { version: "v1beta", model: "gemini-1.5-flash" },
      { version: "v1beta", model: "gemini-1.5-pro" },
      { version: "v1", model: "gemini-1.5-flash" },
      { version: "v1", model: "gemini-1.5-pro" },
      { version: "v1beta", model: "gemini-pro" },
      { version: "v1", model: "gemini-pro" },
    ];
  }

  let lastError = null;

  for (const config of modelConfigs) {
    try {
      const url = `https://generativelanguage.googleapis.com/${config.version}/models/${config.model}:generateContent?key=${apiKey}`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        lastError = new Error(
          `Model ${config.model} (${config.version}) failed: ${errorData.error?.message || res.statusText}`
        );
        continue; // Try next model
      }

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || "")
          .join("")
          .trim() || "";

      if (!text) {
        lastError = new Error(`Model ${config.model} returned empty content`);
        continue;
      }

      return text;
    } catch (error) {
      lastError = error;
      continue;
    }
  }

  // If all models failed, throw the last error
  throw new Error(
    `Gemini API request failed. Please check your API key and model availability. ${lastError?.message || ""}`
  );
}
