export const APP_CONFIG = {
  POSTS_PER_PAGE: 10,
  MAX_PAGES: 5,
  LOAD_MORE_THRESHOLD: 0.1,
  LOAD_MORE_ROOT_MARGIN: '100px',
  API_DELAY: 1000, // Simulated API delay in ms
} as const;

export const MEDIA_CONFIG = {
  IMAGE_QUALITY: {
    THUMBNAIL: 'w=400&h=300&fit=crop',
    MEDIUM: 'w=600&h=800&fit=crop',
    LARGE: 'w=800&h=1200&fit=crop',
  },
  VIDEO_FORMATS: ['mp4', 'webm', 'ogg'],
} as const;

export const UI_CONFIG = {
  VOTE_COLORS: {
    UPVOTE: 'orange',
    DOWNVOTE: 'blue',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
  },
} as const;