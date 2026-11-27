import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-study-hub';

app.use(cors());
app.use(express.json());

let resources = [
  {
    id: 'res-1',
    title: 'Data Structures & Algorithms Cheat Sheet',
    subject: 'Computer Science',
    type: 'Cheatsheet',
    rating: 4.9,
    reviewsCount: 142,
    author: 'Prof. Alex Chen',
    readTime: '15 min read',
    tags: ['Algorithms', 'Data Structures', 'Trees', 'Graphs', 'Big-O'],
    summary: 'Comprehensive reference covering time/space complexities, Array, Linked List, Binary Tree, Heap, Trie, Graph traversal algorithms (BFS/DFS), Dynamic Programming patterns, and Sorting routines.',
    contentUrl: 'https://developer.mozilla.org',
    bookmarked: true,
    fileSize: '2.4 MB PDF',
    downloads: 1250,
    dateAdded: '2026-08-01'
  },
  {
    id: 'res-2',
    title: 'Multivariable Calculus & Partial Derivatives Summary',
    subject: 'Mathematics',
    type: 'Notes',
    rating: 4.8,
    reviewsCount: 98,
    author: 'Dr. Sarah Lin',
    readTime: '25 min read',
    tags: ['Calculus', 'Derivatives', 'Vectors', 'Integrals', 'Math'],
    summary: 'In-depth notes on gradient vectors, directional derivatives, Lagrange multipliers, double and triple integrals, line integrals, Green’s Theorem, and Stokes’ Theorem with solved examples.',
    contentUrl: 'https://khanacademy.org',
    bookmarked: false,
    fileSize: '3.8 MB PDF',
    downloads: 870,
    dateAdded: '2026-08-05'
  },
  {
    id: 'res-3',
    title: 'Quantum Mechanics & Wave-Particle Duality',
    subject: 'Physics',
    type: 'Video Tutorial',
    rating: 4.95,
    reviewsCount: 210,
    author: 'Dr. Richard Feynman Hub',
    readTime: '45 min watch',
    tags: ['Physics', 'Quantum', 'Schrödinger', 'Photons', 'Wave Mechanics'],
    summary: 'Visual interactive lecture explaining the double-slit experiment, Heisenberg Uncertainty Principle, Schrödinger equation derivation, and quantum tunneling applications.',
    contentUrl: 'https://youtube.com',
    bookmarked: true,
    fileSize: '720p HD Video',
    downloads: 2400,
    dateAdded: '2026-08-08'
  }
];

let decks = [
  {
    id: 'deck-1',
    title: 'Computer Science: Core Concepts & Complexity',
    subject: 'Computer Science',
    cardCount: 8,
    masteryPercentage: 75,
    cards: [
      { id: 'c1', front: 'What is the time complexity of QuickSort in the average case vs worst case?', back: 'Average case: O(N log N)\nWorst case: O(N²)' },
      { id: 'c2', front: 'What is the difference between a Process and a Thread?', back: 'Process has isolated memory space; Thread shares memory inside process.' }
    ]
  }
];

let tasks = [
  { id: 't-1', text: 'Review Binary Search Tree rotations & balance factors', category: 'CS', completed: false, priority: 'High' },
  { id: 't-2', text: 'Complete Calculus III practice problem set #4', category: 'Math', completed: true, priority: 'Medium' }
];

let analytics = {
  totalStudyHours: 14.5,
  streakDays: 5,
  cardsMastered: 42,
  quizzesTaken: 18,
  averageQuizScore: 92,
  weeklyFocusMinutes: [45, 90, 120, 75, 150, 180, 110],
  subjectDistribution: [
    { subject: 'Computer Science', percentage: 40, color: '#f6c843' },
    { subject: 'Mathematics', percentage: 25, color: '#f7e948' },
    { subject: 'Physics', percentage: 20, color: '#9ce05a' },
    { subject: 'Biology', percentage: 15, color: '#5cb947' }
  ]
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Smart Study Resource Hub Server running successfully',
    mongoUri: mongoUri ? 'configured' : 'missing',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/resources', (req, res) => {
  res.json(resources);
});

app.post('/api/resources', (req, res) => {
  const newResource = {
    id: `res-${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0],
    rating: 5.0,
    reviewsCount: 1,
    downloads: 0,
    bookmarked: false,
    ...req.body
  };
  resources.unshift(newResource);
  res.status(201).json(newResource);
});

app.delete('/api/resources/:id', (req, res) => {
  const { id } = req.params;
  resources = resources.filter(r => r.id !== id);
  res.json({ success: true, message: `Resource ${id} deleted` });
});

app.get('/api/decks', (req, res) => {
  res.json(decks);
});

app.post('/api/decks', (req, res) => {
  const newDeck = {
    id: `deck-${Date.now()}`,
    cardCount: req.body.cards?.length || 0,
    masteryPercentage: 0,
    ...req.body
  };
  decks.push(newDeck);
  res.status(201).json(newDeck);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: `t-${Date.now()}`,
    completed: false,
    priority: 'Medium',
    ...req.body
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});

const clientDistPath = path.join(__dirname, '../client/dist');
const clientExists = true;

if (clientExists) {
  app.use(express.static(clientDistPath));
}

app.get(/^(?!\/api).*/, (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).send('Frontend build not found. Run npm run build in the client folder first.');
    }
  });
});

export default app;
