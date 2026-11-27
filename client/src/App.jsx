import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResourceHub from './components/ResourceHub';
import AIAssistant from './components/AIAssistant';
import FlashcardStudio from './components/FlashcardStudio';
import PomodoroPlanner from './components/PomodoroPlanner';
import StudyAnalytics from './components/StudyAnalytics';

import { 
  INITIAL_RESOURCES, 
  INITIAL_FLASHCARD_DECKS, 
  INITIAL_TASKS, 
  INITIAL_ANALYTICS 
} from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('study_hub_theme') || 'dark';
  });

  // Resources State
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('study_hub_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // Flashcards State
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem('study_hub_decks');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARD_DECKS;
  });

  // Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('study_hub_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Analytics State
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('study_hub_analytics');
    return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
  });

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('study_hub_theme', theme);
  }, [theme]);

  // LocalStorage Persist
  useEffect(() => {
    localStorage.setItem('study_hub_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('study_hub_decks', JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem('study_hub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('study_hub_analytics', JSON.stringify(analytics));
  }, [analytics]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddFlashcardsFromAI = (newCards) => {
    setDecks(prev => {
      if (prev.length === 0) return prev;
      const targetDeck = prev[0];
      const updatedCards = [...targetDeck.cards, ...newCards];
      return prev.map(d => d.id === targetDeck.id ? { ...d, cards: updatedCards, cardCount: updatedCards.length } : d);
    });
  };

  const handlePomodoroSessionComplete = (minutes) => {
    setAnalytics(prev => {
      const addedHours = Number((minutes / 60).toFixed(2));
      return {
        ...prev,
        totalStudyHours: Number((prev.totalStudyHours + addedHours).toFixed(1))
      };
    });
  };

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        streakDays={analytics.streakDays}
        onOpenUploadModal={() => setIsUploadOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'resources' && (
          <ResourceHub
            resources={resources}
            setResources={setResources}
            searchQuery={searchQuery}
            onShowToast={showToast}
            isUploadOpen={isUploadOpen}
            setIsUploadOpen={setIsUploadOpen}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <AIAssistant
            onShowToast={showToast}
            onAddFlashcards={handleAddFlashcardsFromAI}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardStudio
            decks={decks}
            setDecks={setDecks}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'pomodoro' && (
          <PomodoroPlanner
            tasks={tasks}
            setTasks={setTasks}
            onShowToast={showToast}
            onSessionComplete={handlePomodoroSessionComplete}
          />
        )}

        {activeTab === 'analytics' && (
          <StudyAnalytics
            analyticsData={analytics}
          />
        )}
      </main>

      {/* Toast Notifications Overlay */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span>✨</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
