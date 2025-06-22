# Resume Match UI Frontend

A modern Next.js application for AI-powered resume-job matching, cold email generation, and remote job discovery.

## Features

- 🤖 **Score Checker**: Upload resume and job description to get AI-powered fit score and suggestions
- 📧 **Cold Email Generator**: Generate personalized cold emails for job applications
- 🔍 **Remote Job Discovery**: Browse jobs from Remotive and We Work Remotely
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Built with Chakra UI for consistent, professional design
- ⚡ **Real-time Search**: Instant job filtering and search capabilities
- 🔗 **Seamless Integration**: Direct navigation from job browsing to score checking

## Pages

### `/` - Score Checker
- Upload PDF resume
- Enter job description (or auto-fill from jobs page)
- Get AI-powered fit score (1-10)
- Receive detailed improvement suggestions
- Alert notification when job description is pre-filled

### `/jobs` - Remote Jobs
- Browse remote jobs from multiple sources
- Search by job title, company, or description
- Filter by source (Remotive/We Work Remotely)
- View job details in modal
- Direct navigation to score checker with job description

### `/cold-email` - Cold Email Generator
- Generate personalized cold emails
- Based on resume and job description
- Professional tone and structure
- Ready-to-use email content

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
│   │   ├── jobs/
│   │   │   └── page.tsx         # Remote Jobs page
│   │   ├── cold-email/
│   │   │   └── page.tsx         # Cold Email Generator page
│   │   ├── layout.tsx           # Root layout with Chakra UI providers
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation component
│   │   ├── JobList.tsx          # Job listing component with modal
│   │   ├── JobDescriptionAlert.tsx # Alert for pre-filled job descriptions
│   │   └── ui/                  # Shared UI components
│   ├── services/
│   │   └── jobService.ts        # API service for job fetching
│   ├── types/
│   │   └── job.ts               # TypeScript types for job data
│   └── hooks/
│       └── useApiUrl.ts         # Custom hook for API URL management
├── public/                      # Static assets
└── package.json
```

## Key Components

### JobList Component
- **Responsive Grid**: Adapts from 1 column (mobile) to 3+ columns (desktop)
- **Search & Filtering**: Real-time search and source filtering
- **Job Details Modal**: Professional modal with full job information
- **Score Checker Integration**: Direct navigation with job description
- **Error Handling**: Graceful error states and loading indicators

### Job Description Alert
- **Auto-fill Notification**: Shows when job description is pre-filled
- **Clear Functionality**: Easy way to clear pre-filled content
- **Visual Feedback**: Clear indication of pre-filled state

### Navigation
- **Seamless Flow**: Easy navigation between all features
- **URL State**: Preserves job description in URL parameters
- **Browser Support**: Works with back/forward buttons

## User Flow

### Job Discovery to Score Checking
1. User visits `/jobs` page
2. Browses remote job listings
3. Clicks "Show Details" on interesting job
4. Modal opens with full job description
5. Clicks "📊 Check Resume Score for This Job"
6. Automatically navigates to score checker with job description pre-filled
7. Uploads resume and gets instant AI-powered score

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL` (optional): URL of the backend API
  - If not set, defaults to `http://localhost:8000`
  - Set this when deploying to production

## Dependencies

- **Next.js 15**: React framework with App Router
- **Chakra UI**: Component library for consistent design
- **TypeScript**: Type safety throughout the application
- **React Icons**: Professional icon set
- **Tailwind CSS**: Utility-first CSS framework

## Responsive Design

### Desktop (1200px+)
- 3+ column job grid
- Side-by-side score checker layout
- Full-width modals

### Tablet (768px-1200px)
- 2 column job grid
- Stacked score checker layout
- Optimized modal sizing

### Mobile (<768px)
- 1 column job grid
- Full-width layouts
- Touch-friendly interactions
- Mobile-optimized modals

## Performance Features

- **Lazy Loading**: Components load on demand
- **Optimized Re-renders**: Minimal component updates
- **Efficient Filtering**: Client-side filtering when possible
- **Memory Management**: Proper cleanup and state management

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Development

### Adding New Job Sources
1. Update `JobService` with new API endpoint
2. Add source to job types
3. Update filtering options in JobList component
4. Test with new source data

### Styling
- Uses Chakra UI theme system
- Custom CSS for complex layouts
- Responsive design patterns
- Consistent color scheme and typography

## Notes

- The UI is built with Chakra UI for consistent styling and components
- Responsive design works on all device sizes
- Form validation ensures required fields are provided
- Error handling for failed API requests with user-friendly messages
- Loading states provide clear feedback during operations
- URL parameters enable direct linking to specific job descriptions
- Modal design provides professional job detail viewing experience

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
