# Deployment Guide for Quickmart

## Backend Deployment (Server)

### 1. Environment Variables
Create a `.env` file in the Server directory with:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Email (for order notifications)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your.email@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Deployment
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### 2. Install Dependencies
```bash
cd Server
npm install --production
```

### 3. Deploy to Platform
**For Render.com:**
- Connect your GitHub repository
- Set environment variables in Render dashboard
- Build Command: `npm install`
- Start Command: `npm start`

**For Railway:**
- Connect repository
- Add environment variables
- Railway will auto-detect Node.js

## Frontend Deployment (Client)

### 1. Environment Variables
Create a `.env` file in the client directory with:

```env
VITE_BACKEND_URL=https://your-backend-domain.com
VITE_CURRENCY=₹
```

### 2. Build for Production
```bash
cd client
npm run build
```

### 3. Deploy to Platform
**For Vercel/Netlify:**
- Connect repository
- Set environment variables in dashboard
- Build Command: `cd client && npm run build`
- Output Directory: `client/dist`

## Important CORS Configuration

The backend is configured to handle CORS automatically:

1. **Development**: Allows `http://localhost:5173`
2. **Production**: Uses `FRONTEND_URL` environment variable
3. **Fallback**: Allows all origins when `NODE_ENV=production`

## Troubleshooting "Failed to fetch products" Error

### 1. Check Environment Variables
- Ensure `VITE_BACKEND_URL` is set correctly in frontend
- Ensure `FRONTEND_URL` is set in backend

### 2. Verify API Endpoints
Test your deployed backend:
```bash
curl https://your-backend-domain.com/api/product/list
```

### 3. Check CORS Headers
```bash
curl -H "Origin: https://your-frontend-domain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://your-backend-domain.com/api/product/list
```

### 4. Common Issues
- **CORS Error**: Frontend URL not in backend's allowed origins
- **Network Error**: Backend URL incorrect or backend not running
- **Timeout**: Backend taking too long to respond (10-second timeout added)

### 5. Debug Steps
1. Check browser console for exact error
2. Verify backend is accessible directly
3. Check environment variables in deployment platform
4. Ensure both frontend and backend are deployed and running

## Example Working Configuration

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/quickmart
FRONTEND_URL=https://quickmart-frontend.vercel.app
NODE_ENV=production
PORT=5000
```

**Frontend (.env):**
```env
VITE_BACKEND_URL=https://quickmart-backend.onrender.com
```

This configuration ensures proper CORS handling and API communication between deployed frontend and backend.
