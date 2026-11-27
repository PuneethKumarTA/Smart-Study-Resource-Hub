import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Copy, 
  Check, 
  Plus, 
  ArrowRight,
  Zap,
  BookOpenCheck
} from 'lucide-react';

export default function AIAssistant({ onShowToast, onAddFlashcards }) {
  const [mode, setMode] = useState('summarizer'); // 'summarizer' | 'quiz' | 'tutor'

  // --- Summarizer State ---
  const [rawText, setRawText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // --- Quiz Generator State ---
  const [quizTopic, setQuizTopic] = useState('Data Structures & Algorithms');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- AI Tutor Chat State ---
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Study Tutor. Ask me any question about Computer Science, Math formulas, Physics principles, or exam study strategies!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Sample AI Summarizer Generator Handler
  const handleSummarize = () => {
    if (!rawText.trim()) {
      onShowToast('Please paste or type study notes to summarize.');
      return;
    }

    setIsSummarizing(true);
    setTimeout(() => {
      // Intelligently construct summary based on text input
      const words = rawText.split(' ');
      const keyTopics = words.length > 5 ? words.slice(0, 4).join(', ') : 'Core Concept';

      setSummaryResult({
        title: `AI Digest: ${keyTopics}...`,
        summary: `This material focuses on key foundational concepts surrounding ${keyTopics}. It details core principles, procedural steps, and high-yield examination facts.`,
        keyBullets: [
          'Primary Theorem: Establishes the relationship between input variables and asymptotic upper bounds.',
          'Critical Formula/Rule: Ensure proper memory allocation and base case checking in recursion.',
          'Common Exam Gotcha: Edge cases often involve empty collections or boundary index values.',
          'Real-World Application: Optimized for latency-critical applications and concurrent systems.'
        ],
        generatedCards: [
          { front: `What is the main concept of ${keyTopics}?`, back: 'It establishes the relationship between input complexity and execution efficiency.' },
          { front: `What edge cases should be monitored for ${keyTopics}?`, back: 'Empty data sets, null pointers, and boundary limits.' }
        ]
      });

      setIsSummarizing(false);
      onShowToast('AI Summary generated successfully!');
    }, 1200);
  };

  // Sample Quiz Generator Handler
  const handleGenerateQuiz = () => {
    setIsGeneratingQuiz(true);
    setQuizSubmitted(false);
    setUserAnswers({});

    setTimeout(() => {
      let sampleQuestions = [];
      if (quizTopic.includes('CS') || quizTopic.includes('Data') || quizTopic.includes('Algorithm')) {
        sampleQuestions = [
          {
            id: 'q1',
            question: 'What is the average time complexity of searching in a balanced Binary Search Tree?',
            options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
            correctIndex: 1,
            explanation: 'In a balanced BST, the height of the tree is log₂N, resulting in O(log N) search complexity.'
          },
          {
            id: 'q2',
            question: 'Which data structure follows the LIFO (Last In, First Out) principle?',
            options: ['Queue', 'Array', 'Stack', 'Linked List'],
            correctIndex: 2,
            explanation: 'A Stack operates on Last-In, First-Out (LIFO) order (e.g. push and pop operations).'
          },
          {
            id: 'q3',
            question: 'What is the primary advantage of a Hash Table?',
            options: ['Guaranteed sorted order', 'O(1) average lookup time', 'Lowest memory usage', 'No collisions ever'],
            correctIndex: 1,
            explanation: 'Hash tables offer O(1) constant average time complexity for insert, search, and delete.'
          },
          {
            id: 'q4',
            question: 'Which sorting algorithm is guaranteed to be stable and run in O(N log N) worst-case time?',
            options: ['QuickSort', 'MergeSort', 'BubbleSort', 'SelectionSort'],
            correctIndex: 1,
            explanation: 'MergeSort divides the array recursively and merges sorted halves, running in O(N log N) stably.'
          }
        ];
      } else {
        sampleQuestions = [
          {
            id: 'q1',
            question: 'What is the derivative of f(x) = e^(2x)?',
            options: ['e^(2x)', '2 * e^(2x)', '2x * e^(2x)', 'e^x'],
            correctIndex: 1,
            explanation: 'Applying the chain rule: d/dx [e^(2x)] = e^(2x) * d/dx [2x] = 2 * e^(2x).'
          },
          {
            id: 'q2',
            question: 'State Newton’s 3rd Law of Motion.',
            options: ['F = ma', 'Energy cannot be created or destroyed', 'For every action, there is an equal and opposite reaction', 'PV = nRT'],
            correctIndex: 2,
            explanation: 'Newton’s 3rd law states that when one body exerts a force on a second, the second exerts an equal and opposite force.'
          },
          {
            id: 'q3',
            question: 'What is the matrix determinant of [[2, 3], [1, 4]]?',
            options: ['5', '8', '11', '14'],
            correctIndex: 0,
            explanation: 'Determinant of 2x2 matrix [[a, b], [c, d]] is (a*d - b*c). (2*4 - 3*1) = 8 - 3 = 5.'
          }
        ];
      }

      setCurrentQuiz({ topic: quizTopic, questions: sampleQuestions });
      setIsGeneratingQuiz(false);
      onShowToast(`Interactive Quiz generated for "${quizTopic}"!`);
    }, 1000);
  };

  // Submit Quiz Handler
  const handleQuizSubmit = () => {
    if (Object.keys(userAnswers).length < currentQuiz.questions.length) {
      onShowToast('Please answer all questions before submitting.');
      return;
    }
    setQuizSubmitted(true);
    onShowToast('Quiz submitted! Check your score report below.');
  };

  // Calculate Quiz Score
  const quizScore = currentQuiz && quizSubmitted
    ? currentQuiz.questions.reduce((score, q, idx) => (userAnswers[idx] === q.correctIndex ? score + 1 : score), 0)
    : 0;

  // Send AI Tutor Message
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    const query = chatInput;
    setChatInput('');

    // Simulate Tutor Response
    setTimeout(() => {
      let aiText = '';
      if (query.toLowerCase().includes('big o') || query.toLowerCase().includes('complexity')) {
        aiText = 'Big-O notation specifies how the runtime or memory requirements of an algorithm grow as the input size $N$ increases.\n\nKey Complexities to remember:\n- $O(1)$: Constant time (Hash table lookup)\n- $O(\\log N)$: Logarithmic time (Binary Search)\n- $O(N)$: Linear time (Simple loop)\n- $O(N \\log N)$: Linearithmic (MergeSort)';
      } else if (query.toLowerCase().includes('math') || query.toLowerCase().includes('calculus')) {
        aiText = 'In Calculus, the Fundamental Theorem connects derivatives and definite integrals:\n$$\\int_{a}^{b} f(x)dx = F(b) - F(a)$$\nwhere $F\'(x) = f(x)$. Make sure to apply substitution or integration by parts when tackling composite functions!';
      } else {
        aiText = `Great study question on "${query}"! When tackling this topic, break it down into 3 core steps:\n1. Understand the foundational definitions.\n2. Practice 2-3 solved examples.\n3. Test your memory with flashcards or practice quizzes. Let me know if you want a step-by-step formula breakdown!`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 800);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* AI Header Navigation Modes */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <Bot size={15} /> AI Smart Intelligence Engine
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>
            AI-Powered <span className="gradient-text">Study Assistant</span>
          </h2>
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMode('summarizer')}
            className={mode === 'summarizer' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '10px 18px' }}
          >
            <FileText size={18} />
            <span>Note Summarizer</span>
          </button>

          <button
            onClick={() => {
              setMode('quiz');
              if (!currentQuiz) handleGenerateQuiz();
            }}
            className={mode === 'quiz' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '10px 18px' }}
          >
            <HelpCircle size={18} />
            <span>Quiz Generator</span>
          </button>

          <button
            onClick={() => setMode('tutor')}
            className={mode === 'tutor' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '10px 18px' }}
          >
            <Sparkles size={18} />
            <span>AI Tutor Chat</span>
          </button>
        </div>
      </div>

      {/* MODE 1: NOTE SUMMARIZER */}
      {mode === 'summarizer' && (
        <div style={{ display: 'grid', gridTemplateColumns: summaryResult ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Panel */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Paste Notes or Transcript</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {rawText.length} characters
              </span>
            </div>

            <textarea
              className="input-field"
              rows={12}
              placeholder="Paste your lecture notes, textbook excerpt, or study guide text here... (e.g., QuickSort algorithm mechanics, derivative rules, or quantum mechanics equations)"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.6 }}
            />

            <button
              className="btn btn-primary"
              onClick={handleSummarize}
              disabled={isSummarizing}
              style={{ alignSelf: 'flex-start', opacity: isSummarizing ? 0.7 : 1 }}
            >
              {isSummarizing ? (
                <>
                  <Zap size={18} className="pulse-glow" />
                  <span>Synthesizing Notes...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate AI Summary & Flashcards</span>
                </>
              )}
            </button>
          </div>

          {/* Result Panel */}
          {summaryResult && (
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-lime">
                  <BookOpenCheck size={14} /> AI Synthesis Ready
                </span>
                <button 
                  className="btn-icon"
                  onClick={() => copyToClipboard(`${summaryResult.title}\n\n${summaryResult.summary}\n\nKey Takeaways:\n${summaryResult.keyBullets.join('\n')}`)}
                  title="Copy to Clipboard"
                >
                  {copied ? <Check size={18} color="var(--leaf-green)" /> : <Copy size={18} />}
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--accent-primary)' }}>
                  {summaryResult.title}
                </h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {summaryResult.summary}
                </p>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#f6c843' }}>
                  Key High-Yield Bullet Takeaways
                </h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {summaryResult.keyBullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Auto-Generated Flashcards */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Auto-Generated Flashcards ({summaryResult.generatedCards.length})
                  </h4>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    onClick={() => {
                      onAddFlashcards(summaryResult.generatedCards);
                      onShowToast('Flashcards added to your deck!');
                    }}
                  >
                    <Plus size={14} />
                    <span>Save to Flashcards</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {summaryResult.generatedCards.map((card, idx) => (
                    <div key={idx} style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px' }}>
                        Q: {card.front}
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        A: {card.back}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: INTERACTIVE QUIZ GENERATOR */}
      {mode === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Topic Setup Bar */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Select Topic:</span>
              <select
                className="input-field"
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                style={{ width: 'auto', minWidth: '240px' }}
              >
                <option value="Data Structures & Algorithms">CS: Data Structures & Algorithms</option>
                <option value="Mathematics & Calculus">Math: Differential Calculus & Vectors</option>
                <option value="Physics & Electromagnetism">Physics: Electromagnetism & Newton Laws</option>
              </select>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleGenerateQuiz}
              disabled={isGeneratingQuiz}
            >
              <RotateCcw size={18} />
              <span>Generate New Quiz</span>
            </button>
          </div>

          {/* Quiz Card View */}
          {currentQuiz && (
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: '4px' }}>
                    Practice Quiz
                  </span>
                  <h3 style={{ fontSize: '1.3rem' }}>{currentQuiz.topic}</h3>
                </div>

                {quizSubmitted && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }} className="gradient-text">
                      Score: {quizScore} / {currentQuiz.questions.length}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ({Math.round((quizScore / currentQuiz.questions.length) * 100)}% Mastery)
                    </span>
                  </div>
                )}
              </div>

              {/* Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {currentQuiz.questions.map((q, qIdx) => {
                  const isCorrect = userAnswers[qIdx] === q.correctIndex;
                  return (
                    <div key={q.id} style={{
                      background: 'var(--bg-secondary)',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', lineHeight: 1.4 }}>
                        {qIdx + 1}. {q.question}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswers[qIdx] === optIdx;
                          let btnStyle = {
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            textAlign: 'left',
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease'
                          };

                          if (isSelected && !quizSubmitted) {
                            btnStyle.background = 'var(--accent-subtle)';
                            btnStyle.borderColor = 'var(--accent-primary)';
                            btnStyle.color = 'var(--accent-primary)';
                            btnStyle.fontWeight = '600';
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle.background = 'rgba(92, 185, 71, 0.2)';
                              btnStyle.borderColor = '#5cb947';
                              btnStyle.color = '#5cb947';
                              btnStyle.fontWeight = '700';
                            } else if (isSelected && !isCorrect) {
                              btnStyle.background = 'rgba(239, 68, 68, 0.2)';
                              btnStyle.borderColor = '#ef4444';
                              btnStyle.color = '#ef4444';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              style={btnStyle}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setUserAnswers({ ...userAnswers, [qIdx]: optIdx });
                                }
                              }}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && <CheckCircle2 size={18} color="#5cb947" />}
                              {quizSubmitted && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
                      {quizSubmitted && (
                        <div style={{
                          marginTop: '16px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          borderLeft: `4px solid ${isCorrect ? '#5cb947' : '#f6c843'}`,
                          fontSize: '0.88rem',
                          color: 'var(--text-secondary)'
                        }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz CTA */}
              {!quizSubmitted && (
                <div style={{ marginTop: '28px', textAlign: 'right' }}>
                  <button className="btn btn-primary" onClick={handleQuizSubmit}>
                    <CheckCircle2 size={18} />
                    <span>Submit Answers & View Score</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: AI TUTOR CHAT */}
      {mode === 'tutor' && (
        <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '620px', overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'var(--brand-gradient-4stop)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem' }}>AI Study Tutor Bot</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>● Online • Ready to answer study questions</p>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '14px 18px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'user' ? 'var(--brand-gradient-4stop)' : 'var(--bg-secondary)',
                  color: m.sender === 'user' ? '#0f172a' : 'var(--text-primary)',
                  fontWeight: m.sender === 'user' ? 600 : 400,
                  fontSize: '0.93rem',
                  lineHeight: 1.55,
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'pre-line'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Ask a question (e.g. Explain Dijkstra algorithm vs A* search)..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ borderRadius: 'var(--radius-full)' }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0 20px' }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
