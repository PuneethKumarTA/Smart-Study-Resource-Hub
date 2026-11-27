import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Clock, 
  Layers, 
  Target, 
  Award, 
  TrendingUp, 
  PieChart, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function StudyAnalytics({ analyticsData }) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWeeklyMinutes = Math.max(...analyticsData.weeklyFocusMinutes, 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <TrendingUp size={14} /> Knowledge & Mastery Analytics
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>
            Personal <span className="gradient-text">Study Dashboard</span>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Sparkles size={18} color="#9ce05a" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Overall Study Health: Excellent (98%)</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {/* KPI 1: Study Hours */}
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #f6c843' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Focus Time</span>
            <Clock size={20} color="#f6c843" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800 }} className="gradient-text">
            {analyticsData.totalStudyHours} hrs
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+2.5 hrs from last week</span>
        </div>

        {/* KPI 2: Active Streak */}
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #f7e948' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Streak</span>
            <Flame size={20} color="#f7e948" fill="#f7e948" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800 }} className="gradient-text">
            {analyticsData.streakDays} Days
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Keep the momentum going!</span>
        </div>

        {/* KPI 3: Flashcards Mastered */}
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #9ce05a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Cards Mastered</span>
            <Layers size={20} color="#9ce05a" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800 }} className="gradient-text">
            {analyticsData.cardsMastered}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Across 3 active decks</span>
        </div>

        {/* KPI 4: Quiz Avg Score */}
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #5cb947' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Average Quiz Score</span>
            <Target size={20} color="#5cb947" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800 }} className="gradient-text">
            {analyticsData.averageQuizScore}%
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Top 5% among learners</span>
        </div>
      </div>

      {/* Main Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Weekly Focus Time Bar Chart */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Weekly Focus Minutes</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>This Week</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '0 10px 10px 10px', borderBottom: '1px solid var(--border-color)' }}>
            {analyticsData.weeklyFocusMinutes.map((mins, idx) => {
              const heightPercent = (mins / maxWeeklyMinutes) * 100;
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{mins}m</span>
                  <div style={{
                    width: '28px',
                    height: `${heightPercent}%`,
                    minHeight: '8px',
                    background: 'var(--brand-gradient-4stop)',
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                    transition: 'height 0.4s ease'
                  }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {daysOfWeek[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Subject Study Distribution</h3>
            <PieChart size={18} color="var(--accent-primary)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analyticsData.subjectDistribution.map(item => (
              <div key={item.subject} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span>{item.subject}</span>
                  <span style={{ color: item.color }}>{item.percentage}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    background: item.color,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Achievement Badges Showcase */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={20} color="#f6c843" />
          <h3 style={{ fontSize: '1.15rem' }}>Earned Achievements & Badges</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {analyticsData.achievements.map(ach => (
            <div key={ach.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: ach.unlocked ? 'var(--border-color-glow)' : 'var(--border-color)',
              opacity: ach.unlocked ? 1 : 0.5
            }}>
              <div style={{
                fontSize: '1.8rem',
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-full)',
                background: ach.unlocked ? 'var(--accent-subtle)' : 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {ach.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{ach.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ach.desc}</p>
                {ach.unlocked && (
                  <span style={{ fontSize: '0.72rem', color: '#5cb947', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <CheckCircle size={12} /> Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
