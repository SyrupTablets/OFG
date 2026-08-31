# OFG Studio — Vercel deployment

This is a framework-free static website. No build command or environment variables are required.

## Deploy with Vercel

1. Extract this folder and upload it to a new GitHub repository.
2. In Vercel, choose **Add New → Project**, then import that GitHub repository.
3. Keep the framework preset as **Other** and leave the build command empty.
4. Click **Deploy**.

Vercel will publish `index.html` at the project root. The `assets` directory contains the logo, all project images, and the bilingual agreement PDF; keep it intact.

## Future updates

Edit the site files locally, then commit and push them to the connected GitHub repository. Vercel automatically creates a new deployment for each push. Custom-domain setup is completed from the project’s **Settings → Domains** area in Vercel.
