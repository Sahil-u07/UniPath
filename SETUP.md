# UniPath Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Then update `.env.local` with your actual credentials:

#### Required Services:

**A. Database (PostgreSQL)**
- Option 1: Use [Neon](https://neon.tech) (Free PostgreSQL)
- Option 2: Use [Supabase](https://supabase.com) (Free PostgreSQL)
- Option 3: Local PostgreSQL
  ```bash
  # Install PostgreSQL locally
  # Create a database named 'unipath'
  # Update DATABASE_URL in .env.local
  ```

**B. Clerk Authentication** (Required)
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your publishable and secret keys
4. Update in `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

**C. Google Gemini API** (Required for AI features)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Update in `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

**D. Inngest** (Optional - for background jobs)
1. Go to [Inngest](https://www.inngest.com)
2. Sign up and get your keys
3. Update in `.env.local`

### 3. Set Up Database

Run Prisma migrations:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Quick Setup (No Database Required for Testing)

If you just want to test the UI without database:

1. Install dependencies: `npm install`
2. Get Clerk keys (free): https://dashboard.clerk.com
3. Update `.env.local` with Clerk keys
4. Comment out database calls in the code (temporary)
5. Run: `npm run dev`

## Database Options

### Option 1: Neon (Recommended - Free & Easy)
1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string
5. Paste in `.env.local` as `DATABASE_URL`

### Option 2: Supabase (Free & Feature-rich)
1. Go to https://supabase.com
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string (set mode to "Session")
5. Paste in `.env.local` as `DATABASE_URL`

### Option 3: Local PostgreSQL
```bash
# Install PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql

# Create database
createdb unipath

# Update .env.local
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/unipath"
```

## Troubleshooting

### Database Connection Error
- Verify your `DATABASE_URL` is correct
- Make sure your database is running
- Run: `npx prisma db push`

### Clerk Authentication Error
- Check your Clerk keys are correct
- Make sure you're using the right environment keys (test vs production)
- Visit the Clerk claim URL if in keyless mode

### Port Already in Use
The app will automatically use the next available port (e.g., 3001)

### Missing Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

For deploying to production:

1. Set up production database (Neon, Supabase, etc.)
2. Update environment variables on your hosting platform
3. Run build:
   ```bash
   npm run build
   npm start
   ```

## Support

For issues or questions:
- Check the documentation
- Open an issue on GitHub
- Contact the UniPath team

---

**Happy coding! 🚀**
