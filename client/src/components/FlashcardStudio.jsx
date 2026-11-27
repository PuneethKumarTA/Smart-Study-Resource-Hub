import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Check, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Brain,
  Trophy,
  ThumbsUp,
  Flame
} from 'lucide-react';

export default function FlashcardStudio({ decks, setDecks, onShowToast }) {
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id || 'deck-1');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCardsCount, setMasteredCardsCount] = useState(0);
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);

  // New Deck Form State
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckSubject, setNewDeckSubject] = useState('Computer Science');
  const [cardFrontInput, setCardFrontInput] = useState('');
  const [cardBackInput, setCardBackInput] = useState('');
  const [draftCards, setDraftCards] = useState([]);

  const currentDeck = decks.find(d => d.id === selectedDeckId) || decks[0];
  const currentCard = currentDeck?.cards[cardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (cardIndex < currentDeck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      onShowToast('Completed deck review! Great job!');
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  const handleAssessment = (grade) => {
    if (grade === 'easy' || grade === 'good') {
      setMasteredCardsCount(prev => prev + 1);
      onShowToast(`Marked card as ${grade.toUpperCase()}! Mastery updated.`);
    } else {
      onShowToast(`Marked card for review (${grade.toUpperCase()}).`);
    }
    handleNextCard();
  };

  const handleAddDraftCard = () => {
    if (!cardFrontInput.trim() || !cardBackInput.trim()) {
      onShowToast('Please enter both question (front) and answer (back).');
      return;
    }
    setDraftCards([...draftCards, { id: `c-${Date.now()}`, front: cardFrontInput, back: cardBackInput }]);
    setCardFrontInput('');
    setCardBackInput('');
    onShowToast('Card added to draft deck!');
  };

  const handleSaveNewDeck = (e) => {
    e.preventDefault();
    if (!newDeckTitle.trim() || draftCards.length === 0) {
      onShowToast('Please specify a title and add at least 1 card.');
      return;
    }

    const createdDeck = {
      id: `deck-${Date.now()}`,
      title: newDeckTitle,
      subject: newDeckSubject,
      cardCount: draftCards.length,
      masteryPercentage: 0,
      cards: draftCards
    };

    setDecks([...decks, createdDeck]);
    setSelectedDeckId(createdDeck.id);
    setCardIndex(0);
    setIsCreateDeckOpen(false);
    setNewDeckTitle('');
    setDraftCards([]);
    onShowToast('New Custom Flashcard Deck Created!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner & Deck Selector */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="badge badge-lime" style={{ marginBottom: '8px' }}>
            <Brain size={14} /> Active Recall & Spaced Repetition
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>
            Interactive <span className="gradient-text">Flashcard Studio</span>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Deck Select Dropdown */}
          <select
            className="input-field"
            value={selectedDeckId}
            onChange={(e) => {
              setSelectedDeckId(e.target.value);
              setCardIndex(0);
              setIsFlipped(false);
            }}
            style={{ width: 'auto', minWidth: '260px' }}
          >
            {decks.map(d => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.cards.length} cards)
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={() => setIsCreateDeckOpen(true)}>
            <Plus size={18} />
            <span>Create New Deck</span>
          </button>
        </div>
      </div>

      {/* Deck Progress Bar */}
      {currentDeck && (
        <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
            <span>Card {cardIndex + 1} of {currentDeck.cards.length}</span>
            <span style={{ color: 'var(--accent-primary)' }}>Session Mastered: {masteredCardsCount} cards</span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((cardIndex + 1) / currentDeck.cards.length) * 100}%`,
              background: 'var(--brand-gradient-4stop)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {/* 3D Flip Card Workspace */}
      {currentCard && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {/* Card Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              maxWidth: '680px',
              minHeight: '340px',
              perspective: '1000px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '340px',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
              {/* FRONT OF CARD */}
              <div className="glass-card" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--border-color-glow)',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-amber">{currentDeck.subject}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to Flip Card 🔄</span>
                </div>

                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                    {currentCard.front}
                  </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <RotateCw size={16} />
                  <span>Reveal Answer</span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="glass-card" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--accent-primary)',
                background: 'var(--bg-secondary)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-lime">Answer & Key Explanation</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to Flip Back</span>
                </div>

                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                    {currentCard.back}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <span>Assess your recall confidence below</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Spaced Repetition Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '680px' }}>
            {/* Self Rating Repetition Buttons */}
            {isFlipped && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', animation: 'fadeIn 0.3s ease' }}>
                <button 
                  className="btn" 
                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}
                  onClick={() => handleAssessment('again')}
                >
                  🔴 Again
                </button>
                <button 
                  className="btn" 
                  style={{ background: 'rgba(246, 200, 67, 0.2)', color: '#f6c843', border: '1px solid #f6c843' }}
                  onClick={() => handleAssessment('hard')}
                >
                  🟠 Hard
                </button>
                <button 
                  className="btn" 
                  style={{ background: 'rgba(156, 224, 90, 0.2)', color: '#9ce05a', border: '1px solid #9ce05a' }}
                  onClick={() => handleAssessment('good')}
                >
                  🟢 Good
                </button>
                <button 
                  className="btn" 
                  style={{ background: 'rgba(92, 185, 71, 0.25)', color: '#5cb947', border: '1px solid #5cb947' }}
                  onClick={() => handleAssessment('easy')}
                >
                  🔵 Easy
                </button>
              </div>
            )}

            {/* Stepper Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handlePrevCard} 
                disabled={cardIndex === 0}
                style={{ opacity: cardIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={18} />
                <span>Previous Card</span>
              </button>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Use Left/Right or Click Card to Flip
              </span>

              <button 
                className="btn btn-secondary" 
                onClick={handleNextCard} 
                disabled={cardIndex === currentDeck.cards.length - 1}
                style={{ opacity: cardIndex === currentDeck.cards.length - 1 ? 0.5 : 1 }}
              >
                <span>Next Card</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Custom Deck */}
      {isCreateDeckOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateDeckOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem' }}>
                Create Custom <span className="gradient-text">Flashcard Deck</span>
              </h2>
              <button className="btn-icon" onClick={() => setIsCreateDeckOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveNewDeck} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Deck Title *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Organic Chemistry Functional Groups"
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Subject</label>
                <select 
                  className="input-field" 
                  value={newDeckSubject}
                  onChange={(e) => setNewDeckSubject(e.target.value)}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Add Cards Section */}
              <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.92rem', marginBottom: '12px', color: 'var(--accent-primary)' }}>
                  Add Card ({draftCards.length} added)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Front Question / Prompt..."
                    value={cardFrontInput}
                    onChange={(e) => setCardFrontInput(e.target.value)}
                  />
                  <textarea 
                    className="input-field" 
                    rows={2} 
                    placeholder="Back Answer / Explanation..."
                    value={cardBackInput}
                    onChange={(e) => setCardBackInput(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn btn-accent" 
                    onClick={handleAddDraftCard}
                    style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    <Plus size={14} />
                    <span>Add Card to Deck</span>
                  </button>
                </div>
              </div>

              {/* Draft Cards List */}
              {draftCards.length > 0 && (
                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {draftCards.map((c, idx) => (
                    <div key={idx} style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Q:</strong> {c.front}</span>
                      <span style={{ color: 'var(--text-muted)' }}>Card #{idx + 1}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsCreateDeckOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={18} />
                  <span>Save Deck</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
