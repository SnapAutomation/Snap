import { Post } from '../types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'When you finally understand a programming joke',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop',
    points: 1247,
    commentsCount: 89,
    tags: ['Programming', 'Funny'],
    createdAt: '2h',
    type: 'image'
  },
  {
    id: '2',
    title: 'Me trying to explain why I need another monitor',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=500&fit=crop',
    points: 892,
    commentsCount: 45,
    tags: ['Tech', 'Relatable'],
    createdAt: '4h',
    type: 'image'
  },
  {
    id: '3',
    title: 'Cat discovers the internet',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    points: 2341,
    commentsCount: 156,
    tags: ['Animals', 'Cute'],
    createdAt: '6h',
    type: 'video'
  },
  {
    id: '4',
    title: 'When the pizza arrives exactly on time',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=500&fit=crop',
    points: 567,
    commentsCount: 23,
    tags: ['Food', 'Mood'],
    createdAt: '8h',
    type: 'image'
  },
  {
    id: '5',
    title: 'Working from home expectations vs reality',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=600&fit=crop',
    points: 1789,
    commentsCount: 234,
    tags: ['Work', 'Funny'],
    createdAt: '10h',
    type: 'image'
  },
  {
    id: '6',
    title: 'Dog learns to use doorbell',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    points: 3456,
    commentsCount: 289,
    tags: ['Animals', 'Smart'],
    createdAt: '12h',
    type: 'video'
  },
  {
    id: '7',
    title: 'When you find a parking spot in the city',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=500&fit=crop',
    points: 987,
    commentsCount: 67,
    tags: ['City', 'Relatable'],
    createdAt: '14h',
    type: 'image'
  },
  {
    id: '8',
    title: 'Trying to look busy when the boss walks by',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    points: 2134,
    commentsCount: 178,
    tags: ['Work', 'Funny'],
    createdAt: '16h',
    type: 'image'
  },
  {
    id: '9',
    title: 'Baby elephant playing in water',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    points: 4567,
    commentsCount: 345,
    tags: ['Animals', 'Cute'],
    createdAt: '18h',
    type: 'video'
  },
  {
    id: '10',
    title: 'When you remember you have leftovers in the fridge',
    imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=500&fit=crop',
    points: 1456,
    commentsCount: 89,
    tags: ['Food', 'Happy'],
    createdAt: '20h',
    type: 'image'
  }
];

// Function to generate more posts for infinite scroll
export const generateMorePosts = (startId: number, count: number): Post[] => {
  const moreImages = [
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&h=600&fit=crop',
  ];

  const titles = [
    'Another hilarious meme',
    'This made my day',
    'Relatable content incoming',
    'You won\'t believe this',
    'Peak internet humor',
    'This is why I love the internet',
    'Can\'t stop laughing',
    'Too real to handle'
  ];

  const tags = [
    ['Funny', 'Meme'],
    ['Relatable', 'Mood'],
    ['Animals', 'Cute'],
    ['Tech', 'Geek'],
    ['Food', 'Yummy'],
    ['Work', 'Life']
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: (startId + i).toString(),
    title: titles[i % titles.length],
    imageUrl: moreImages[i % moreImages.length],
    points: Math.floor(Math.random() * 3000) + 100,
    commentsCount: Math.floor(Math.random() * 200) + 10,
    tags: tags[i % tags.length],
    createdAt: `${Math.floor(Math.random() * 24) + 1}h`,
    type: 'image' as const
  }));
};