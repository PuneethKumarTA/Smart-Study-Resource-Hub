import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  Check
} from 'lucide-react';

export default function PomodoroPlanner({ tasks, setTasks, onShowToast, onSessionComplete }) {
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSound, setActiveSound] = useState(null); // null | 'rain' | 'binaural' | 'library' | 'forest'
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // New Task Input State
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('CS');
  const [newTaskPriority, setNewTaskPriority] = useState('High');

  // Total duration based on mode
  const getInitialTime = (mode) => {
    switch (mode) {
      case 'focus': return 25 * 60;
      case 'shortBreak': return 5 * 60;
      case 'longBreak': return 15 * 60;
      default: return 25 * 60;
    }
  };

  const totalTime = getInitialTime(timerMode);

  // Mode Switch Handler
  const handleModeChange = (newMode) => {
    setTimerMode(newMode);
    setTimeLeft(getInitialTime(newMode));
    setIsRunning(false);
  };

  // Timer Tick Effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playCompletionChime();
      onShowToast(`🎉 ${timerMode === 'focus' ? 'Focus session' : 'Break'} completed! Great work!`);
      if (timerMode === 'focus') {
        onSessionComplete(25);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  // Web Audio Synthesizer Chime
  const playCompletionChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6); // G5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio fallback
    }
  };

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Task Toggle
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    onShowToast('Task removed from planner.');
  };

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const createdTask = {
      id: `t-${Date.now()}`,
      text: newTaskText,
      category: newTaskCategory,
      completed: false,
      priority: newTaskPriority
    };

    setTasks([createdTask, ...tasks]);
    setNewTaskText('');
    onShowToast('Study task added!');
  };

  // Circular Progress Calculation
  const strokeDasharray = 502; // 2 * PI * r (r = 80)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * (timeLeft / totalTime));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* LEFT COLUMN: TIMER & AMBIENT SOUNDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Timer Card */}
        <div className="glass-card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-primary)', padding: '6px', borderRadius: 'var(--radius-full)', marginBottom: '24px' }}>
            <button
              onClick={() => handleModeChange('focus')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: timerMode === 'focus' ? 'var(--brand-gradient-4stop)' : 'transparent',
                color: timerMode === 'focus' ? '#0f172a' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🎯 Focus (25m)
            </button>
            <button
              onClick={() => handleModeChange('shortBreak')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: timerMode === 'shortBreak' ? 'var(--brand-gradient-lime-leaf)' : 'transparent',
                color: timerMode === 'shortBreak' ? '#0f172a' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ☕ Short Break (5m)
            </button>
            <button
              onClick={() => handleModeChange('longBreak')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: timerMode === 'longBreak' ? 'var(--brand-gradient-amber-green)' : 'transparent',
                color: timerMode === 'longBreak' ? '#0f172a' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🌴 Long Break (15m)
            </button>
          </div>

          {/* SVG Radial Progress Ring */}
          <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '24px' }}>
            <svg width="220" height="220" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f6c843" />
                  <stop offset="33%" stopColor="#f7e948" />
                  <stop offset="66%" stopColor="#9ce05a" />
                  <stop offset="100%" stopColor="#5cb947" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="var(--bg-primary)"
                strokeWidth="12"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#timerGrad)"
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>

            {/* Time Display Center Text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                {formatTime(timeLeft)}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {timerMode === 'focus' ? 'Focus Session' : 'Rest & Refresh'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => setIsRunning(!isRunning)}
              style={{ width: '130px', padding: '12px' }}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(totalTime);
              }}
              title="Reset Timer"
            >
              <RotateCcw size={18} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Ambient Sound Player */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={18} color="var(--accent-primary)" />
              <span>Focus Ambient Audio</span>
            </h4>
            <button 
              className="btn-icon"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isAudioMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} />}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { id: 'rain', label: '🌧️ Lo-Fi Rain' },
              { id: 'binaural', label: '🧠 Binaural Beats' },
              { id: 'library', label: '📚 Study Library' },
              { id: 'forest', label: '🌿 Forest Birds' }
            ].map(snd => (
              <button
                key={snd.id}
                onClick={() => {
                  if (activeSound === snd.id) {
                    setActiveSound(null);
                    onShowToast('Ambient audio stopped.');
                  } else {
                    setActiveSound(snd.id);
                    onShowToast(`Playing ${snd.label}`);
                  }
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: activeSound === snd.id ? 'var(--accent-primary)' : 'var(--border-color)',
                  background: activeSound === snd.id ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
                  color: activeSound === snd.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {snd.label} {activeSound === snd.id && '▶'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: STUDY TASK CHECKLIST */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-amber" style={{ marginBottom: '4px' }}>
              Study Planner
            </span>
            <h3 style={{ fontSize: '1.25rem' }}>Session Tasks</h3>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {tasks.filter(t => t.completed).length} / {tasks.length} Completed
          </span>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Add new study goal or task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              className="input-field"
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="CS">Computer Science</option>
              <option value="Math">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Bio">Biology</option>
            </select>
            <select
              className="input-field"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button type="submit" className="btn btn-primary" style={{ padding: '0 16px' }}>
              <Plus size={18} />
            </button>
          </div>
        </form>

        {/* Tasks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '420px' }}>
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
              No tasks added yet. Add a study goal above!
            </p>
          ) : (
            tasks.map(t => (
              <div key={t.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                opacity: t.completed ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}>
                <div 
                  onClick={() => toggleTask(t.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                >
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.completed ? '#5cb947' : 'var(--text-muted)' }}>
                    {t.completed ? <CheckSquare size={20} fill="#5cb947" color="#0f172a" /> : <Square size={20} />}
                  </button>
                  <span style={{
                    fontSize: '0.92rem',
                    textDecoration: t.completed ? 'line-through' : 'none',
                    color: t.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>
                    {t.text}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>{t.category}</span>
                  <button 
                    onClick={() => deleteTask(t.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
