import React, { useState, useEffect } from 'react';
import { Newspaper, Award, Search, ArrowRight } from 'lucide-react';
import { fetchNews } from '../services/api';

export default function Newsfeed() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className="section-title">
          <span className="badge-gold">Achievements & Press</span>
          <h2 style={{ marginTop: '10px' }}>News & Recognition</h2>
          <p>Stay updated with Vasant Valley School accolades, STEM achievements, and campus updates.</p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 36px auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search news by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px 12px 42px',
              borderRadius: '30px',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-surface)',
              color: 'var(--text-main)',
              fontSize: '0.95rem'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        <div className="grid-3">
          {filteredNews.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{item.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</span>
                </div>

                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-burgundy)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {item.title}
                </h4>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {item.summary}
                </p>
              </div>

              <button className="btn-outline" style={{ border: 'none', padding: 0, color: 'var(--primary-burgundy)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                Read Full Article <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
