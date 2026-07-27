import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Tag, Clock } from 'lucide-react';
import { fetchEvents } from '../services/api';

export default function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const categories = ['All', 'Sports', 'Academic', 'STEM', 'Cultural'];

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="section-title">
          <span className="badge-gold">School Life & Activities</span>
          <h2 style={{ marginTop: '10px' }}>Events Calendar</h2>
          <p>Upcoming inter-house competitions, CEE workshops, cultural galas, and athletic championships.</p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--primary-burgundy)' : 'var(--glass-border)',
                background: filter === cat ? 'var(--primary-burgundy)' : 'var(--bg-surface)',
                color: filter === cat ? '#FFF' : 'var(--text-main)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.88rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid-2" style={{ gap: '24px' }}>
          {filteredEvents.map(evt => (
            <div key={evt.id} className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{evt.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-burgundy)', fontWeight: 700 }}>
                  📅 {evt.date}
                </span>
              </div>

              <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-burgundy)', marginBottom: '8px' }}>
                {evt.title}
              </h4>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {evt.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <MapPin size={15} color="var(--accent-gold-hover)" /> {evt.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
