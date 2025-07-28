export interface Post {
  id: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  points: number;
  commentsCount: number;
  tags: string[];
  createdAt: string;
  userVote?: 'up' | 'down' | null;
  type: 'image' | 'video' | 'gif';
}

export interface Comment {
  id: string;
  text: string;
  points: number;
  author: string;
  createdAt: string;
  replies?: Comment[];
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
}