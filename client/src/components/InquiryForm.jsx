import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { submitInquiry } from '../services/api';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    targetGrade: 'Class 1',
    message: ''
  });

  const [response, setResponse] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitInquiry(formData);
    setResponse(res);
    setSubmitting(false);
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-title">
          <span className="badge-gold">Connect With Admissions</span>
          <h2 style={{ marginTop: '10px' }}>Schedule a Campus Visit or Inquiry</h2>
          <p>Have questions regarding admissions, CBSE/IGCSE curriculum, or transport? Send an official inquiry.</p>
        </div>

        <div className="glass-card" style={{ padding: '36px', background: 'var(--bg-surface)' }}>
          {response ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={48} color="var(--emerald-accent)" style={{ marginBottom: '16px' }} />
              <h3 style={{ color: 'var(--primary-burgundy)', marginBottom: '8px' }}>Inquiry Submitted!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{response.message}</p>
              <span className="badge-gold" style={{ fontSize: '0.85rem' }}>Ref ID: {response.referenceId}</span>
              <div style={{ marginTop: '24px' }}>
                <button className="btn-outline" onClick={() => setResponse(null)}>
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="grid-2" style={{ gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-light)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-light)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-light)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>Target Grade</label>
                  <select
                    value={formData.targetGrade}
                    onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-light)', color: 'var(--text-main)' }}
                  >
                    <option>Foundation 1</option>
                    <option>Foundation 2</option>
                    <option>Class 1</option>
                    <option>Class 6</option>
                    <option>Class 11</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px' }}>Message / Specific Queries</label>
                <textarea
                  rows="4"
                  placeholder="Ask about admissions timeline, campus tour, or subject options..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-light)', color: 'var(--text-main)' }}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Send Inquiry to Admissions Office'} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
