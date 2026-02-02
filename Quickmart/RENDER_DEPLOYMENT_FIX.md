# Quick Fix for Render Deployment

## Problem
Your frontend is deployed on Render but products are not showing because it's trying to connect to localhost:5000.

## Solution Options

### Option 1: Deploy Backend to Render (Recommended)

**Backend Deployment:**
1. Go to Render.com → New Web Service
2. Connect your GitHub repository
3. Root Directory: `Server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Environment Variables:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://quickmart-frontend-sntg.onrender.com
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   STRIPE_SECRET_KEY=sk_test_...
   ```

**Frontend Environment Variable:**
In your Render frontend dashboard, add:
```
VITE_BACKEND_URL=https://your-backend-name.onrender.com
```

### Option 2: Use ngrok (Quick Temporary Fix)

If you want to test quickly without deploying backend:

1. Install ngrok: `npm install -g ngrok`
2. Run your local server: `cd Server && npm start`
3. In another terminal: `ngrok http 5000`
4. Copy the ngrok URL (e.g., https://abc123.ngrok.io)
5. Add to your Render frontend environment:
   ```
   VITE_BACKEND_URL=https://abc123.ngrok.io
   ```

### Option 3: Use Railway/Heroku Alternative

Deploy backend to Railway:
1. Go to Railway.app
2. Connect repository
3. Set environment variables
4. Get the URL and add to frontend

## Testing CORS Fix

The backend is now configured to explicitly allow:
- `https://quickmart-frontend-sntg.onrender.com`

## Steps to Fix Right Now:

1. **Deploy Backend** to Render using Option 1
2. **Get Backend URL** from Render dashboard
3. **Update Frontend** environment variable with backend URL
4. **Redeploy Frontend** to apply changes

Your products should then load correctly on the deployed site!
