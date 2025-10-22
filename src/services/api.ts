import { Post, Comment } from '../types';

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Posts API
  async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: Post[], hasMore: boolean }> {
    return this.request(`/posts?page=${page}&limit=${limit}`);
  }

  async getPost(id: string): Promise<Post> {
    return this.request(`/posts/${id}`);
  }

  async votePost(id: string, voteType: 'up' | 'down'): Promise<Post> {
    return this.request(`/posts/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ voteType }),
    });
  }

  async searchPosts(query: string): Promise<Post[]> {
    return this.request(`/posts/search?q=${encodeURIComponent(query)}`);
  }

  // Comments API
  async getComments(postId: string): Promise<Comment[]> {
    return this.request(`/posts/${postId}/comments`);
  }

  async addComment(postId: string, text: string, parentId?: string): Promise<Comment> {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, parentId }),
    });
  }

  async voteComment(postId: string, commentId: string, voteType: 'up' | 'down'): Promise<Comment> {
    return this.request(`/posts/${postId}/comments/${commentId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ voteType }),
    });
  }

  // User API
  async getCurrentUser(): Promise<{ id: string; username: string; avatar?: string }> {
    return this.request('/user/me');
  }

  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async register(username: string, email: string, password: string): Promise<{ token: string; user: any }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }
}

// Create API instance
export const api = new ApiClient(API_BASE_URL);

// Helper functions for gradual migration
export const useApiOrMock = {
  async getPosts(page: number, limit: number, mockFallback: () => Promise<any>) {
    try {
      return await api.getPosts(page, limit);
    } catch (error) {
      console.warn('API not available, using mock data');
      return mockFallback();
    }
  },

  async votePost(id: string, voteType: 'up' | 'down', mockFallback: () => void) {
    try {
      return await api.votePost(id, voteType);
    } catch (error) {
      console.warn('API not available, using mock behavior');
      mockFallback();
    }
  },

  async getComments(postId: string, mockFallback: () => Comment[]) {
    try {
      return await api.getComments(postId);
    } catch (error) {
      console.warn('API not available, using mock data');
      return mockFallback();
    }
  }
};

export default api;