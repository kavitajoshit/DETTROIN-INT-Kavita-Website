import React, { useEffect, useState } from 'react';
import { Brain, Activity, Globe, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FivePillars({ pillars }) {
  const [selectedPillar, setSelectedPillar] = useState(pillars[0] || {
    id: "cerebral",
    title: "Cerebral Development",
    icon: "🧠",
    desc: "Nurturing analytical thinking, problem-solving, CBSE & IGCSE academic distinction, and lifelong learning habits.",
    highlights: ["Stem & Robotics Lab", "Inter-school Debating Forum", "Research Grants at CEE@VVS"]
  });

  useEffect(() => {
    if (pillars.length) {
      setSelectedPillar((current) => pillars.find((pillar) => pillar.id === current.id) || pillars[0]);
    }
  }, [pillars]);

  const getPillarIcon = (id) => {
    switch (id) {
      case 'cerebral': return <Brain size={24} color="var(--primary-burgundy)" />;
      case 'physical': return <Activity size={24} color="var(--accent-gold-hover)" />;
      case 'social': return <Globe size={24} color="var(--emerald-accent)" />;
      case 'emotional': return <Heart size={24} color="#EC4899" />;
      case 'spiritual': return <Sparkles size={24} color="#8B5CF6" />;
      default: return <Brain size={24} />;
    }
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className="section-title">
          <span className="badge-gold">Pedagogical Framework</span>
          <h2 style={{ marginTop: '10px' }}>The 5 Pillars of Student Growth</h2>
          <p>
            Education at Vasant Valley School transcends traditional textbooks. We cultivate five balanced dimensions of human development.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          {pillars.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPillar(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: selectedPillar.id === item.id ? 'var(--primary-burgundy)' : 'var(--glass-border)',
                background: selectedPillar.id === item.id ? 'var(--primary-burgundy)' : 'var(--bg-surface)',
                color: selectedPillar.id === item.id ? '#FFFFFF' : 'var(--text-main)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: selectedPillar.id === item.id ? '0 4px 15px rgba(122, 0, 38, 0.25)' : 'none'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="glass-card" style={{ padding: '36px', background: 'var(--bg-surface)' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(122, 0, 38, 0.08)'
                }}>
                  {getPillarIcon(selectedPillar.id)}
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-burgundy)' }}>
                  {selectedPillar.title}
                </h3>
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                {selectedPillar.desc}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Initiatives & Facilities:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedPillar.highlights || ["Dedicated Labs", "Faculty Mentorship", "Annual Project Showcase"]).map((hl, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--emerald-accent)" />
                    <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div style={{
              height: '260px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(122, 0, 38, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '24px'
            }}>
              <span style={{ fontSize: '4rem', marginBottom: '12px' }}>{selectedPillar.icon}</span>
              <h4 className="serif" style={{ fontSize: '1.4rem', color: 'var(--accent-gold-light)' }}>
                {selectedPillar.title} Pillar
              </h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '8px' }}>
                Integrated across CBSE & IGCSE Curricula
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
