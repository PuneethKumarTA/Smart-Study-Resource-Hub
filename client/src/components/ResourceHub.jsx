import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Star, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  Eye, 
  Filter, 
  Sparkles, 
  Clock, 
  Tag, 
  FileText, 
  Check, 
  X,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function ResourceHub({ 
  resources, 
  setResources, 
  searchQuery, 
  onShowToast, 
  isUploadOpen, 
  setIsUploadOpen 
}) {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [activeResourceModal, setActiveResourceModal] = useState(null);

  // New Resource Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Computer Science');
  const [newType, setNewType] = useState('Notes');
  const [newAuthor, setNewAuthor] = useState('');
  const [newReadTime, setNewReadTime] = useState('15 min read');
  const [newSummary, setNewSummary] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newContentUrl, setNewContentUrl] = useState('');

  const subjects = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Biology', 'Business'];
  const resourceTypes = ['All', 'Cheatsheet', 'Notes', 'Video Tutorial', 'Diagram Guide', 'Past Paper'];

  // Filter & Sort Logic
  const filteredResources = useMemo(() => {
    return resources
      .filter((res) => {
        const matchesSubject = selectedSubject === 'All' || res.subject === selectedSubject;
        const matchesType = selectedType === 'All' || res.type === selectedType;
        const matchesQuery = !searchQuery || 
          res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSubject && matchesType && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.downloads - a.downloads;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'recent') return new Date(b.dateAdded) - new Date(a.dateAdded);
        return 0;
      });
  }, [resources, selectedSubject, selectedType, searchQuery, sortBy]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        const nextState = !res.bookmarked;
        onShowToast(nextState ? 'Resource added to bookmarks!' : 'Resource removed from bookmarks.');
        return { ...res, bookmarked: nextState };
      }
      return res;
    }));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      onShowToast('Please fill out title and summary fields.');
      return;
    }

    const createdItem = {
      id: `res-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      type: newType,
      rating: 5.0,
      reviewsCount: 1,
      author: newAuthor || 'Community Contributor',
      readTime: newReadTime,
      tags: newTags ? newTags.split(',').map(t => t.trim()) : ['Study Guide'],
      summary: newSummary,
      contentUrl: newContentUrl || 'https://wikipedia.org',
      bookmarked: false,
      fileSize: '1.5 MB PDF',
      downloads: 10,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setResources([createdItem, ...resources]);
    setIsUploadOpen(false);
    onShowToast('New study resource published successfully!');

    // Reset Form
    setNewTitle('');
    setNewSummary('');
    setNewTags('');
    setNewContentUrl('');
  };

  // Helper for badge color class based on subject
  const getSubjectBadge = (subject) => {
    switch (subject) {
      case 'Computer Science': return 'badge-amber';
      case 'Mathematics': return 'badge-yellow';
      case 'Physics': return 'badge-lime';
      case 'Biology': return 'badge-leaf';
      default: return 'badge-amber';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Banner with Palette Gradient Backdrop */}
      <div className="glass-card" style={{
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(246, 200, 67, 0.08) 0%, rgba(156, 224, 90, 0.08) 100%)',
        border: '1px solid var(--border-color-glow)'
      }}>
        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 2 }}>
          <div className="badge badge-lime" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> Smart Knowledge Hub
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Explore Verified <span className="gradient-text">Study Resources</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Access curated lecture notes, algorithm cheatsheets, exam past papers, and formula guides across CS, Mathematics, Physics, and Life Sciences.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setIsUploadOpen(true)}
          style={{
            position: 'absolute',
            right: '28px',
            bottom: '28px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <Plus size={18} />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Filter & Toolbar Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Subject Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', marginRight: '4px' }}>
            Subject:
          </span>
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={selectedSubject === sub ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '6px 16px', fontSize: '0.85rem' }}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Resource Type & Sorting */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'var(--bg-secondary)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          {/* Type Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} color="var(--text-muted)" />
            {resourceTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: selectedType === type ? 'var(--accent-primary)' : 'transparent',
                  background: selectedType === type ? 'var(--accent-subtle)' : 'transparent',
                  color: selectedType === type ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              <option value="popular">Most Popular (Downloads)</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
          <FileText size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
          <h3>No study resources found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Try adjusting your search terms or filter selection.
          </p>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredResources.map((res) => (
            <div 
              key={res.id} 
              className="glass-card"
              onClick={() => setActiveResourceModal(res)}
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div>
                {/* Header Badges & Bookmark */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className={`badge ${getSubjectBadge(res.subject)}`}>
                      {res.subject}
                    </span>
                    <span className="badge badge-lime" style={{ opacity: 0.85 }}>
                      {res.type}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => toggleBookmark(res.id, e)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: res.bookmarked ? '#f6c843' : 'var(--text-muted)' }}
                    title={res.bookmarked ? 'Bookmarked' : 'Add Bookmark'}
                  >
                    {res.bookmarked ? <BookmarkCheck size={22} fill="#f6c843" /> : <Bookmark size={22} />}
                  </button>
                </div>

                {/* Resource Title */}
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: 1.35 }}>
                  {res.title}
                </h3>

                {/* Summary snippet */}
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.88rem', 
                  display: '-webkit-box', 
                  WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  {res.summary}
                </p>

                {/* Tags array */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {res.tags.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem',
                      background: 'var(--bg-primary)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)'
                    }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Metadata */}
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f6c843', fontWeight: 600 }}>
                  <Star size={15} fill="#f6c843" />
                  <span>{res.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({res.reviewsCount})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {res.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    <Download size={14} /> {res.downloads}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resource Detail Modal */}
      {activeResourceModal && (
        <div className="modal-overlay" onClick={() => setActiveResourceModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className={`badge ${getSubjectBadge(activeResourceModal.subject)}`} style={{ marginBottom: '8px' }}>
                  {activeResourceModal.subject} • {activeResourceModal.type}
                </span>
                <h2 style={{ fontSize: '1.4rem', lineHeight: 1.3 }}>{activeResourceModal.title}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  By {activeResourceModal.author} • Added on {activeResourceModal.dateAdded}
                </p>
              </div>
              <button className="btn-icon" onClick={() => setActiveResourceModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.92rem', marginBottom: '8px', color: 'var(--accent-primary)' }}>
                Resource Overview & Key Takeaways
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {activeResourceModal.summary}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Resource Topics & Keywords</h5>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeResourceModal.tags.map(t => (
                  <span key={t} className="badge badge-lime">
                    <Tag size={12} /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="btn btn-secondary"
                onClick={(e) => toggleBookmark(activeResourceModal.id, e)}
              >
                {activeResourceModal.bookmarked ? (
                  <>
                    <BookmarkCheck size={18} color="#f6c843" fill="#f6c843" />
                    <span>Bookmarked</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={18} />
                    <span>Bookmark Resource</span>
                  </>
                )}
              </button>

              <a 
                href={activeResourceModal.contentUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary"
                onClick={() => {
                  setResources(prev => prev.map(r => r.id === activeResourceModal.id ? { ...r, downloads: r.downloads + 1 } : r));
                  onShowToast('Opening resource material...');
                }}
              >
                <ExternalLink size={18} />
                <span>Open Material ({activeResourceModal.fileSize})</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal */}
      {isUploadOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem' }}>
                Upload New <span className="gradient-text">Study Resource</span>
              </h2>
              <button className="btn-icon" onClick={() => setIsUploadOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Resource Title *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Advanced Operating Systems Memory Management Notes"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Subject</label>
                  <select 
                    className="input-field" 
                    value={newSubject} 
                    onChange={(e) => setNewSubject(e.target.value)}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Resource Type</label>
                  <select 
                    className="input-field" 
                    value={newType} 
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="Notes">Notes</option>
                    <option value="Cheatsheet">Cheatsheet</option>
                    <option value="Video Tutorial">Video Tutorial</option>
                    <option value="Diagram Guide">Diagram Guide</option>
                    <option value="Past Paper">Past Paper</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Author / Source</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Prof. Stanford Lectures"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Estimated Read Time</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. 15 min read"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Summary / Key Highlights *</label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Provide a detailed summary of key concepts covered in this material..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tags (comma-separated)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Algorithms, Operating Systems, Virtual Memory"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Document / Link URL</label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://example.com/notes.pdf"
                  value={newContentUrl}
                  onChange={(e) => setNewContentUrl(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={18} />
                  <span>Publish Resource</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
