# 🎯 Get Your Free Database in 2 Minutes

## Quick Setup with Neon (Recommended)

1. **Go to**: https://neon.tech
2. **Sign up** with Google/GitHub (instant, no credit card)
3. **Create a project**:
   - Name: `UniPath`
   - Region: Choose closest to you
4. **Copy the connection string**:
   - Click "Connection string"
   - Copy the full string (looks like: `postgresql://user:pass@...`)
5. **Update your `.env.local`**:
   - Replace the `DATABASE_URL` value
   - Save the file

## Alternative: Supabase

1. Go to: https://supabase.com
2. Create new project
3. Settings > Database > Connection String
4. Copy and paste into `.env.local`

## After Getting Database URL:

Run these commands:
```bash
npx prisma generate
npx prisma db push
npm run dev
```

Your app will be fully functional! 🚀
