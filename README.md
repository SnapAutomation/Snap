# 9GAG Clone - Mobile Web App

A modern, mobile-first clone of 9GAG built with React, TypeScript, and Tailwind CSS. Features infinite scroll, upvote/downvote functionality, and a sleek mobile interface.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with touch-friendly interactions
- 🔄 **Infinite Scroll** - Automatically loads more content as you scroll
- ⬆️ **Voting System** - Upvote and downvote posts with visual feedback
- 🎬 **Media Support** - Display images and videos with lazy loading
- 🏷️ **Tags & Categories** - Organized content with tag system
- ⚡ **Fast Loading** - Optimized performance with React 18 and Vite
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- 🔍 **Responsive** - Works great on all screen sizes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Bundler**: Modern ES modules
- **State Management**: React Hooks

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Top navigation bar
│   ├── PostCard.tsx    # Individual post component
│   └── LoadingSpinner.tsx  # Loading animation
├── data/               # Mock data and utilities
│   └── mockData.ts     # Sample posts and data generation
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Components

### PostCard
- Displays post title, media content, and interaction buttons
- Handles image lazy loading and video playback
- Manages voting state with visual feedback
- Mobile-optimized touch interactions

### Header
- Sticky navigation bar with logo and action buttons
- Search and menu functionality (placeholder)
- Mobile-first responsive design

### Infinite Scroll
- Uses Intersection Observer API for performance
- Automatically loads more content when near bottom
- Loading states and end-of-feed handling

## Mobile Optimizations

- Touch-friendly button sizes (minimum 44px)
- Smooth scrolling with momentum
- Optimized images with lazy loading
- Responsive design for all screen sizes
- Performance optimized for mobile devices

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Voting System
- Click upvote/downvote to interact with posts
- Visual feedback with color changes
- Point counting with formatted display (1.2k, etc.)
- Toggle votes (click again to remove vote)

### Media Handling
- Images with lazy loading and placeholder
- Video thumbnails with play button overlay
- Responsive media sizing
- Loading states and error handling

### Navigation
- Bottom navigation bar (Hot/Trending/Fresh)
- Sticky header with search and menu
- Mobile-optimized layout

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning and development.