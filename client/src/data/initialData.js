// Initial Starter Data for Smart Study Resource Hub

export const INITIAL_RESOURCES = [
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
  },
  {
    id: 'res-4',
    title: 'Molecular Biology: DNA Replication & Transcription',
    subject: 'Biology',
    type: 'Diagram Guide',
    rating: 4.7,
    reviewsCount: 84,
    author: 'BioEdu Network',
    readTime: '20 min read',
    tags: ['Genetics', 'DNA', 'RNA', 'Enzymes', 'Cell Biology'],
    summary: 'Step-by-step illustrated guide to helicase, DNA polymerase, RNA primase, Okazaki fragments, mRNA splicing, ribosomal translation, and post-translational modifications.',
    contentUrl: 'https://ncbi.nlm.nih.gov',
    bookmarked: false,
    fileSize: '5.1 MB PDF',
    downloads: 620,
    dateAdded: '2026-08-10'
  },
  {
    id: 'res-5',
    title: 'Corporate Financial Modeling & Valuation Principles',
    subject: 'Business',
    type: 'Past Paper',
    rating: 4.85,
    reviewsCount: 115,
    author: 'Wharton Study Group',
    readTime: '30 min read',
    tags: ['Finance', 'Valuation', 'DCF', 'EBITDA', 'Accounting'],
    summary: 'Exam past paper solutions for Discounted Cash Flow (DCF) modeling, Weighted Average Cost of Capital (WACC), Comparable Companies Analysis, and LBO valuation fundamentals.',
    contentUrl: 'https://investopedia.com',
    bookmarked: false,
    fileSize: '1.9 MB PDF',
    downloads: 1100,
    dateAdded: '2026-08-11'
  }
];

export const INITIAL_FLASHCARD_DECKS = [
  {
    id: 'deck-1',
    title: 'Computer Science: Core Concepts & Complexity',
    subject: 'Computer Science',
    cardCount: 8,
    masteryPercentage: 75,
    cards: [
      { id: 'c1', front: 'What is the time complexity of QuickSort in the average case vs worst case?', back: 'Average case: O(N log N)\nWorst case: O(N²) (when pivot is poorly chosen, e.g. already sorted array).' },
      { id: 'c2', front: 'What is the difference between a Process and a Thread?', back: 'A Process has its own isolated memory space.\nA Thread shares memory space with other threads inside the same process.' },
      { id: 'c3', front: 'Define Big-O notation.', back: 'Big-O notation describes the upper bound of algorithm execution time or space requirement relative to input size N.' },
      { id: 'c4', front: 'What is a Binary Search Tree (BST) property?', back: 'For every node: all keys in its left subtree are smaller, and all keys in its right subtree are larger.' },
      { id: 'c5', front: 'Explain Dijkstra’s Algorithm purpose.', back: 'Finds the shortest path from a starting source node to all other nodes in a weighted graph with non-negative edge weights.' },
      { id: 'c6', front: 'What is ACID in Database Systems?', back: 'Atomicity, Consistency, Isolation, Durability - principles ensuring reliable transaction processing.' },
      { id: 'c7', front: 'Difference between TCP and UDP?', back: 'TCP is connection-oriented, reliable, and guarantees packet order.\nUDP is connectionless, faster, but does not guarantee delivery.' },
      { id: 'c8', front: 'What is Dynamic Programming?', back: 'An optimization technique that solves complex problems by breaking them down into overlapping subproblems and storing results (memoization).' }
    ]
  },
  {
    id: 'deck-2',
    title: 'Mathematics: Differential Formulas & Theorems',
    subject: 'Mathematics',
    cardCount: 5,
    masteryPercentage: 60,
    cards: [
      { id: 'm1', front: 'What is the Derivative of sin(x) and cos(x)?', back: 'd/dx [sin(x)] = cos(x)\nd/dx [cos(x)] = -sin(x)' },
      { id: 'm2', front: 'State Euler’s Identity.', back: 'e^(i * π) + 1 = 0 (Relates e, i, π, 1, and 0).' },
      { id: 'm3', front: 'What is the Fundamental Theorem of Calculus?', back: 'Relates differentiation and integration: ∫[a to b] f(x) dx = F(b) - F(a) where F’(x) = f(x).' },
      { id: 'm4', front: 'What is the Product Rule for Derivatives?', back: 'd/dx [u * v] = u\' * v + u * v\'' },
      { id: 'm5', front: 'Define Eigenvalue equation.', back: 'A * v = λ * v, where A is a square matrix, v is an eigenvector, and λ is the eigenvalue.' }
    ]
  },
  {
    id: 'deck-3',
    title: 'Physics: Fundamental Laws & Electromagnetism',
    subject: 'Physics',
    cardCount: 5,
    masteryPercentage: 80,
    cards: [
      { id: 'p1', front: 'State Newton’s Second Law of Motion.', back: 'Force = Mass * Acceleration (F = m * a)' },
      { id: 'p2', front: 'What is Faraday’s Law of Electromagnetic Induction?', back: 'An induced electromotive force (EMF) in any closed circuit is equal to the negative rate of change of magnetic flux through the circuit.' },
      { id: 'p3', front: 'What is the speed of light in a vacuum (c)?', back: 'Approximately 3 x 10^8 meters per second (299,792,458 m/s).' },
      { id: 'p4', front: 'What is Bernoulli’s Principle?', back: 'An increase in the speed of a fluid occurs simultaneously with a decrease in static pressure or fluid potential energy.' },
      { id: 'p5', front: 'What is Coulomb’s Law?', back: 'Electrostatic force F = k * (|q1 * q2|) / r², where q1, q2 are charges and r is distance.' }
    ]
  }
];

export const INITIAL_TASKS = [
  { id: 't-1', text: 'Review Binary Search Tree rotations & balance factors', category: 'CS', completed: false, priority: 'High' },
  { id: 't-2', text: 'Complete Calculus III practice problem set #4', category: 'Math', completed: true, priority: 'Medium' },
  { id: 't-3', text: 'Summarize Chapter 5: Quantum Tunneling', category: 'Physics', completed: false, priority: 'High' },
  { id: 't-4', text: 'Create 10 flashcards for Bio Cell Organelles', category: 'Bio', completed: false, priority: 'Low' }
];

export const INITIAL_ANALYTICS = {
  totalStudyHours: 14.5,
  streakDays: 5,
  cardsMastered: 42,
  quizzesTaken: 18,
  averageQuizScore: 92,
  weeklyFocusMinutes: [45, 90, 120, 75, 150, 180, 110], // Mon-Sun
  subjectDistribution: [
    { subject: 'Computer Science', percentage: 40, color: '#f6c843' },
    { subject: 'Mathematics', percentage: 25, color: '#f7e948' },
    { subject: 'Physics', percentage: 20, color: '#9ce05a' },
    { subject: 'Biology', percentage: 15, color: '#5cb947' }
  ],
  achievements: [
    { id: 'a1', title: 'Focus Pioneer', icon: '⚡', desc: 'Completed 10 Pomodoro sessions', unlocked: true },
    { id: 'a2', title: 'Flashcard Wizard', icon: '🎴', desc: 'Mastered 30+ flashcards', unlocked: true },
    { id: 'a3', title: 'Quiz Mastermind', icon: '🎯', desc: 'Scored 100% on 5 practice quizzes', unlocked: true },
    { id: 'a4', title: '7-Day Streak', icon: '🔥', desc: 'Studied 7 days in a row', unlocked: false }
  ]
};
