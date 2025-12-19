# S3 Static Website Deployment Configuration

This document explains how to configure your S3 bucket for proper React Router SPA routing.

## Problem

When deploying a React SPA to S3, direct access to routes like `/auth/callback` results in a 404 error because S3 looks for a file at that path, which doesn't exist.

## Solution

Configure S3 to use `error.html` as the error document. This file is automatically created during the build process and is identical to `index.html`, allowing React Router to handle all client-side routes.

## S3 Bucket Configuration Steps

1. **Go to your S3 bucket** in the AWS Console
2. **Navigate to Properties tab**
3. **Scroll down to "Static website hosting"**
4. **Enable static website hosting** if not already enabled
5. **Set the following:**
   - **Index document**: `index.html`
   - **Error document**: `error.html` ⚠️ **This is critical!**
6. **Save the changes**

## Build Process

The build process automatically creates `error.html` by copying `index.html`:

```bash
pnpm build
# or
pnpm build:client
```

This ensures that when S3 can't find a file (like `/auth/callback`), it serves `error.html`, which loads your React app and allows React Router to handle the routing.

## Verification

After deploying and configuring:

1. Access your S3 website endpoint
2. Try accessing `/auth/callback` directly
3. It should load your React app instead of showing a 404
4. React Router will then handle the route and process the OAuth callback

## Alternative: CloudFront Distribution

If you're using CloudFront in front of S3:

1. Create a CloudFront distribution pointing to your S3 bucket
2. Configure custom error responses:
   - **HTTP Error Code**: `403: Forbidden`
   - **Response Page Path**: `/index.html`
   - **HTTP Response Code**: `200: OK`
   - **Error Caching Minimum TTL**: `0` (or your preference)
3. Repeat for `404: Not Found` errors

This approach also works and may provide better performance with CloudFront caching.

