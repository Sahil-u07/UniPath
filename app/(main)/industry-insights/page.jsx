import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "../dashboard/_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-6xl font-bold gradient-title mb-2">
          Industry Insights
        </h1>
        <p className="text-muted-foreground">
          Stay updated with salary insights and latest job trends for your industry
        </p>
      </div>
      <DashboardView insights={insights} />
    </div>
  );
}
