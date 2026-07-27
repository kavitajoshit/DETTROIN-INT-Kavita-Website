import React, { useState } from 'react';
import { Award, BookOpen, Play, ArrowRight, ShieldCheck, X } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const [videoModal, setVideoModal] = useState(false);
  return <section className="hero-section" aria-labelledby="hero-heading">
    <div className="container hero-grid">
      <div className="hero-content">
        <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Established 1990 · Vasant Kunj, New Delhi</p>
        <h1 id="hero-heading">Nurturing independent minds through <em>excellence in deed.</em></h1>
        <p className="hero-intro">Vasant Valley School encourages students to push boundaries, nurture original thinking, and develop the core dimensions of a meaningful life.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setActiveTab('admissions')}>Explore admissions <ArrowRight size={18} /></button>
          <button className="btn-secondary" onClick={() => setVideoModal(true)}><Play size={16} fill="currentColor" /> Take a virtual tour</button>
        </div>
        <dl className="hero-facts"><div><dt>1990</dt><dd>Year established</dd></div><div><dt>8 acres</dt><dd>Green campus</dd></div><div><dt>10:1</dt><dd>Student–teacher ratio</dd></div></dl>
      </div>
      <aside className="hero-feature" aria-label="School highlights">
        <div className="hero-feature-art"><img src="/synapse_2026_4.jpeg" alt="Students collaborating during a school science quiz" loading="eager" /><span>Curious minds.<br />Meaningful learning.</span></div>
        <div className="feature-list"><div><Award aria-hidden="true" /><p><strong>Learning with understanding</strong><span>A thoughtful, child-centred education.</span></p></div><div><BookOpen aria-hidden="true" /><p><strong>A complete learning experience</strong><span>Academic and non-academic learning in balance.</span></p></div></div>
      </aside>
    </div>
    {videoModal && <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="tour-title" onClick={() => setVideoModal(false)}><div className="modal-content tour-modal" onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setVideoModal(false)} aria-label="Close virtual tour"><X /></button><Play size={40} aria-hidden="true" /><h2 id="tour-title">Vasant Valley Campus Tour</h2><p>Experience our green campus, learning spaces, and student life.</p><button className="btn-primary" onClick={() => setVideoModal(false)}>Close tour</button></div></div>}
  </section>;
}
