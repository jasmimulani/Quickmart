# Wake Up Backend Service (Fix Timeout Issue)

## Problem
Your backend service on Render is going to sleep (cold start) and taking too long to wake up, causing 10-second timeouts.

## Quick Solutions

### Option 1: Redeploy Backend (Recommended)
1. Go to your Render Dashboard
2. Find your backend service (`quickmart-nw62.onrender.com`)
3. Click "Manual Deploy" → "Deploy Latest Commit"
4. Wait 2-3 minutes for deployment

### Option 2: Wake Up Service Manually
Visit these URLs to wake up your backend:
- https://quickmart-nw62.onrender.com/
- https://quickmart-nw62.onrender.com/health

Wait 30 seconds after visiting, then refresh your frontend.

### Option 3: Use Uptime Robot (Permanent Fix)
1. Go to https://uptimerobot.com/
2. Create a free account
3. Add new monitor:
   - Monitor Type: HTTP
   - URL: https://quickmart-nw62.onrender.com/health
   - Monitoring Interval: 5 minutes
4. This will keep your backend awake 24/7

## What I Fixed:
✅ Increased timeout from 10s to 30s
✅ Added automatic retry logic
✅ Added health check endpoint
✅ Better error handling

## Expected Result:
After redeployment, your products should load within 30 seconds, and the retry logic will handle temporary timeouts automatically.

The timeout error should be completely resolved after the backend redeployment!
