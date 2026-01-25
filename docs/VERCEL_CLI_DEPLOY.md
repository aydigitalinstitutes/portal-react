# Manual Vercel CLI Deployment

This guide explains how to deploy the AY Digital stack using the Vercel CLI. This is useful for manual updates or if you prefer the command line over the web dashboard.

## Prerequisites

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```
2.  **Login**:
    ```bash
    vercel login
    ```

## 1. Deploying the API (Backend)

The API must be deployed first to generate the URL needed for the frontend apps.

1.  Navigate to the API directory:
    ```bash
    cd api
    ```
2.  Deploy to Production:
    ```bash
    vercel deploy --prod
    ```
    -   **First Run**: Follow the prompts to set up the project.
        -   Scope: Select your team/user.
        -   Link to existing project: `N`
        -   Project Name: `aydigital-api`
        -   Code Location: `.` (Current directory)
        -   Build Settings: Modify? `N` (Auto-detected from `vercel.json`)
    -   **Environment Variables**: Go to the Vercel Dashboard for this project and add:
        -   `DATABASE_URL` (from Neon)
        -   `JWT_ACCESS_SECRET`
        -   `JWT_REFRESH_SECRET`

## 2. Deploying the Web (Frontend)

1.  Navigate to the project root:
    ```bash
    cd ..
    ```
    *(Ensure you are in the root `aydigital` folder)*
2.  Deploy to Production:
    ```bash
    vercel deploy --prod
    ```
    -   **First Run Setup**:
        -   Project Name: `aydigital-web`
        -   Code Location: `.`
    -   **Environment Variables**:
        -   `VITE_API_URL`: `https://aydigital-api.vercel.app/api/v1` (Use the URL from Step 1)

## 3. Deploying the Admin Portal

1.  Navigate to the admin directory:
    ```bash
    cd admin
    ```
2.  Deploy to Production:
    ```bash
    vercel deploy --prod
    ```
    -   **First Run Setup**:
        -   Project Name: `aydigital-admin`
        -   Code Location: `.`
    -   **Environment Variables**:
        -   `VITE_API_URL`: `https://aydigital-api.vercel.app/api/v1`

## Helper Script

We have provided a PowerShell script to simplify this process:

```powershell
./scripts/deploy-vercel.ps1
```

Follow the interactive prompts to deploy specific services.
