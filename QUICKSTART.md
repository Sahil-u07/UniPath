# 🚀 UniPath - Quick Start Guide

## ✅ Current Status

Your UniPath application is now running at **http://localhost:3001**

However, you need to set up your credentials to make it fully functional.

## 🔑 Required Setup Steps

### Step 1: Set Up Clerk Authentication (REQUIRED)

Clerk is running in **keyless mode**. You can:

**Option A: Claim Your Keys (Recommended)**
1. Click this link: https://dashboard.clerk.com/apps/claim?token=1be6wxfkuj8r4g7usp89oxqlp6i0h4m0h7usdts6&return_url=http%3A%2F%2Flocalhost%3A3001%2F
2. This will automatically set up Clerk for your app
3. Copy the keys and update `.env.local`

**Option B: Create a New Clerk App**
1. Go to https://dashboard.clerk.com
2. Click "Add application"
3. Name it "UniPath"
4. Choose your social login options
5. Copy the API keys
6. Update in `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Step 2: Set Up Database (REQUIRED)

Choose one of these free options:

**Option A: Neon (Easiest - Recommended)**
1. Go to https://neon.tech
2. Sign up (free)
3. Create a new project named "UniPath"
4. Copy the connection string
5. Update in `.env.local`:
   ```env
   DATABASE_URL="postgresql://user:pass@host/database?sslmode=require"
   ```

**Option B: Supabase**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > Database
4. Copy "Connection string" (Session mode)
5. Replace `[YOUR-PASSWORD]` with your database password
6. Update in `.env.local`

**Option C: Railway**
1. Go to https://railway.app
2. Create new project > PostgreSQL
3. Copy the `DATABASE_URL` from variables
4. Update in `.env.local`

After setting up database, run:
```bash
cd "c:\Users\Sahil\Downloads\UniPath-main\UniPath-main"
npx prisma db push
```

### Step 3: Set Up Google Gemini API (REQUIRED for AI features)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
5. Update in `.env.local`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```

### Step 4: Restart the Server

After updating `.env.local`:
```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## 📝 Quick Setup Checklist

- [ ] Update Clerk keys in `.env.local`
- [ ] Update DATABASE_URL in `.env.local`
- [ ] Update GEMINI_API_KEY in `.env.local`
- [ ] Run `npx prisma db push`
- [ ] Restart server with `npm run dev`
- [ ] Visit http://localhost:3001

## 🎯 What Works Now

✅ Homepage is accessible
✅ Logo and branding updated to UniPath
✅ Development server running
✅ Hot reload enabled

## ⚠️ What Needs Setup

❌ User authentication (needs Clerk keys)
❌ Database operations (needs DATABASE_URL)
❌ AI features (needs GEMINI_API_KEY)

## 🔧 Current Configuration

- Port: **3001** (3000 was in use)
- Environment: **Development**
- Config file: `.env.local` (created)
- Database: PostgreSQL (not connected yet)

## 📂 File Locations

- Environment variables: `UniPath-main\.env.local`
- Database schema: `UniPath-main\prisma\schema.prisma`
- Main config: `UniPath-main\next.config.mjs`

## 🐛 Troubleshooting

### "Environment variable not found: DATABASE_URL"
→ You haven't set up the database yet. Follow Step 2 above.

### Authentication not working
→ You need to set up Clerk. Follow Step 1 above.

### AI features not working
→ You need to add GEMINI_API_KEY. Follow Step 3 above.

### Port already in use
→ The app automatically uses port 3001. This is fine.

## 🎨 What's Already Done

✅ All "EdgeCareer" → "UniPath" rebranding complete
✅ New modern logo created (SVG)
✅ Docker configuration updated
✅ Dependencies installed
✅ Prisma client generated
✅ Development server running

## 🚀 Next Steps

1. **Set up Clerk** (5 minutes) - Use the claim link or create new app
2. **Set up Database** (5 minutes) - Use Neon (easiest)
3. **Get Gemini API Key** (2 minutes) - Free from Google
4. **Push database schema** - Run `npx prisma db push`
5. **Restart server** - Stop and run `npm run dev` again
6. **Test the app** - Visit http://localhost:3001 and sign up!

## 💡 Tips

- Use the claim link for Clerk (fastest way)
- Neon is the easiest database option (no credit card needed)
- Keep `.env.local` secure (never commit to git)
- The app will hot-reload when you make changes

---

**Need help?** Check [SETUP.md](SETUP.md) for detailed instructions.

**Ready to code!** 🎉
