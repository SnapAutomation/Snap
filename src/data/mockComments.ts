import { Comment } from '../types';

export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      text: 'This is so relatable! I spent 3 hours yesterday trying to understand a simple recursion joke 😅',
      points: 42,
      author: 'CodeNinja',
      createdAt: '2h',
      replies: [
        {
          id: 'c1-1',
          text: 'At least you got it eventually! I\'m still waiting for that "aha" moment',
          points: 15,
          author: 'DevNewbie',
          createdAt: '1h'
        }
      ]
    },
    {
      id: 'c2',
      text: 'Programming humor is the best humor. Change my mind.',
      points: 28,
      author: 'TechGuru',
      createdAt: '3h'
    },
    {
      id: 'c3',
      text: 'Me: *finally understands the joke* \nAlso me: *immediately forgets how it works*',
      points: 67,
      author: 'MemeLord',
      createdAt: '4h',
      replies: [
        {
          id: 'c3-1',
          text: 'The eternal struggle of every developer 😂',
          points: 23,
          author: 'BugHunter',
          createdAt: '3h'
        },
        {
          id: 'c3-2',
          text: 'This is why we have Stack Overflow bookmarked',
          points: 31,
          author: 'StackOverflowUser',
          createdAt: '2h'
        }
      ]
    }
  ],
  '2': [
    {
      id: 'c4',
      text: 'Two monitors? Those are rookie numbers! I need at least 4 to feel productive 😄',
      points: 35,
      author: 'MultiMonitor',
      createdAt: '1h'
    },
    {
      id: 'c5',
      text: 'My wife still doesn\'t understand why I need a 49-inch ultrawide "for work"',
      points: 89,
      author: 'UltrawideUser',
      createdAt: '2h',
      replies: [
        {
          id: 'c5-1',
          text: 'It\'s for "productivity" and "workflow optimization" 😉',
          points: 45,
          author: 'ProductivityGuru',
          createdAt: '1h'
        }
      ]
    }
  ],
  '3': [
    {
      id: 'c6',
      text: 'This cat has better internet skills than my grandparents',
      points: 156,
      author: 'CatLover',
      createdAt: '30m'
    },
    {
      id: 'c7',
      text: 'Plot twist: The cat is actually running a tech startup',
      points: 78,
      author: 'StartupCat',
      createdAt: '1h',
      replies: [
        {
          id: 'c7-1',
          text: 'CatCoin to the moon! 🚀',
          points: 34,
          author: 'CryptoKitty',
          createdAt: '45m'
        }
      ]
    }
  ],
  '4': [
    {
      id: 'c8',
      text: 'Pizza delivery timing is a science. This person has mastered it.',
      points: 23,
      author: 'PizzaScientist',
      createdAt: '2h'
    }
  ],
  '5': [
    {
      id: 'c9',
      text: 'Working from home: Expectation vs Reality in one image',
      points: 145,
      author: 'RemoteWorker',
      createdAt: '1h'
    },
    {
      id: 'c10',
      text: 'At least you\'re wearing pants in the expectation image',
      points: 203,
      author: 'PantsOptional',
      createdAt: '2h',
      replies: [
        {
          id: 'c10-1',
          text: 'Pants are overrated when working from home',
          points: 67,
          author: 'ComfortFirst',
          createdAt: '1h'
        }
      ]
    }
  ]
};

// Generate random comments for posts without predefined comments
export const generateRandomComments = (postId: string, count: number = 3): Comment[] => {
  const commentTexts = [
    'This made my day! 😂',
    'So relatable, I can\'t even...',
    'Quality content right here',
    'This is why I love the internet',
    'Can\'t stop laughing at this',
    'Shared this with all my friends',
    'This is too real 💯',
    'Peak internet humor',
    'I needed this laugh today',
    'This hits different',
    'Absolutely legendary',
    'This is art',
    'I\'m crying 😭😭😭',
    'This speaks to my soul',
    'Why is this so accurate?'
  ];

  const authors = [
    'FunnyGuy', 'MemeMaster', 'LaughTrack', 'ComedyGold', 'JokeStar',
    'HumorLord', 'WittyUser', 'ChuckleChamp', 'GiggleQueen', 'SmileKing',
    'LolMachine', 'HahaHero', 'FunTimes', 'JestJester', 'QuipQueen'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${postId}-c${i + 1}`,
    text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
    points: Math.floor(Math.random() * 100) + 1,
    author: authors[Math.floor(Math.random() * authors.length)],
    createdAt: `${Math.floor(Math.random() * 12) + 1}h`,
    replies: Math.random() > 0.7 ? [{
      id: `${postId}-c${i + 1}-r1`,
      text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      points: Math.floor(Math.random() * 50) + 1,
      author: authors[Math.floor(Math.random() * authors.length)],
      createdAt: `${Math.floor(Math.random() * 6) + 1}h`
    }] : undefined
  }));
};

export const getCommentsForPost = (postId: string): Comment[] => {
  return mockComments[postId] || generateRandomComments(postId);
};