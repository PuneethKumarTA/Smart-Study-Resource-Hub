import React from 'react';
import { 
  BookOpen, 
  Bot, 
  Layers, 
  Timer, 
  BarChart3, 
  Search, 
  Flame, 
  Sun, 
  Moon, 
  PlusCircle,
  GraduationCap
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  theme, 
  toggleTheme, 
  streakDays,
  onOpenUploadModal 
}) {
  const navItems = [
    { id: 'resources', label: 'Resource Hub', icon: BookOpen },
    { id: 'ai-assistant', label: 'AI Study Assistant', icon: Bot },
    { id: 'flashcards', label: 'Flashcard Studio', icon: Layers },
    { id: 'pomodoro', label: 'Focus Pomodoro', icon: Timer },
    { id: 'analytics', label: 'Study Analytics', icon: BarChart3 },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* 4-Stripe Color Palette Bar at Top Header */}
      <div className="palette-bar">
        <div className="stripe-1" title="Amber Gold (#F6C843)"></div>
        <div className="stripe-2" title="Canary Yellow (#F7E948)"></div>
        <div className="stripe-3" title="Pistachio Lime (#9CE05A)"></div>
        <div className="stripe-4" title="Leaf Green (#5CB947)"></div>
      </div>

      <div style={{
        maxWidth: '1350px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Logo */}
        <div 
          onClick={() => setActiveTab('resources')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--brand-gradient-4stop)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            boxShadow: '0 4px 14px rgba(246, 200, 67, 0.35)'
          }}>
            <GraduationCap size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: 1.1 }}>
              Smart Study <span className="gradient-text">Hub</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              AI-Powered Resource Hub
            </p>
          </div>
        </div>

        {/* Global Search Input */}
        <div style={{
          position: 'relative',
          flex: '1',
          maxWidth: '380px',
          minWidth: '220px'
        }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input 
            type="text"
            placeholder="Search notes, formulas, topics, or flashcards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '38px', borderRadius: 'var(--radius-full)' }}
          />
        </div>

        {/* Action Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Streak Counter Badge */}
          <div 
            title={`${streakDays} Day Active Study Streak!`}
            className="badge badge-amber"
            style={{ padding: '6px 12px', fontSize: '0.85rem', cursor: 'default' }}
          >
            <Flame size={18} color="#f6c843" fill="#f6c843" />
            <span>{streakDays} Day Streak</span>
          </div>

          {/* Quick Add Resource Button */}
          <button 
            className="btn btn-primary" 
            onClick={onOpenUploadModal}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={17} />
            <span>Add Resource</span>
          </button>

          {/* Theme Toggler Button */}
          <button 
            className="btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={19} color="#f7e948" /> : <Moon size={19} color="#5cb947" />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: '4px 20px'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: isActive ? 'var(--accent-subtle)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
