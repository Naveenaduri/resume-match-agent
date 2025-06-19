# Resume Match UI Frontend

A Next.js application for resume-job matching and cold email generation.

## Features

- Score Checker: Upload your resume and job description to get a fit score and improvement suggestions
- Cold Email Generator: Generate personalized cold emails based on your resume and the job description
- Modern UI with Chakra UI components
- Responsive design for both desktop and mobile

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the project root:
```env
# Optional: Set custom backend URL (defaults to http://localhost:8000)
NEXT_PUBLIC_BACKEND_URL=your-backend-url
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
resume-match-ui/
├── src/
│   ├── app/
│   │   ├── page.tsx             # Score Checker page
│   │   ├── cold-email/
│   │   │   └── page.tsx         # Cold Email Generator page
│   │   ├── layout.tsx           # Root layout with Chakra UI providers
│   │   └── globals.css          # Global styles
│   └── components/
│       ├── Navbar.tsx           # Navigation component
│       └── ui/                  # Shared UI components
├── public/                      # Static assets
└── package.json
```

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL` (optional): URL of the backend API
  - If not set, defaults to `http://localhost:8000`
  - Set this when deploying to production

## Notes

- The UI is built with Chakra UI for consistent styling and components
- Responsive design works on both desktop and mobile devices
- Form validation ensures both resume and job description are provided
- Error handling for failed API requests
- Loading states for better user experience

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
