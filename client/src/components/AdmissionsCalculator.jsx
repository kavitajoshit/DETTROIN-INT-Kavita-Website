import React, { useState } from 'react';
import { Calculator, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { calculateAdmissionsFee } from '../services/api';

export default function AdmissionsCalculator() {
  const [grade, setGrade] = useState('Class 11');
  const [transportZone, setTransportZone] = useState('Zone A (Vasant Kunj / Munirka)');
  const [isNewAdmission, setIsNewAdmission] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await calculateAdmissionsFee({ grade, transportZone, isNewAdmission });
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="section-title">
          <span className="badge-gold">Parent Admissions Portal</span>
          <h2 style={{ marginTop: '10px' }}>Interactive Fee & Eligibility Estimator</h2>
          <p>
            Get an instant transparent estimate of quarterly tuition, transport fees, and admission registration procedures.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '40px', alignItems: 'start' }}>
          {/* Form Side */}
          <div className="glass-card" style={{ padding: '32px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Calculator color="var(--primary-burgundy)" size={24} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-burgundy)' }}>Configure Admission Details</h3>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                  Target Academic Grade:
                </label>
                <select 
                  value={grade} 
                  onChange={(e) => setGrade(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--bg-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                >
                  <option>Foundation 1 (Age 3+)</option>
                  <option>Foundation 2 (Age 4+)</option>
                  <option>Class 1</option>
                  <option>Class 5</option>
                  <option>Class 8</option>
                  <option>Class 11 (Science Stream)</option>
                  <option>Class 11 (Commerce Stream)</option>
                  <option>Class 11 (Humanities Stream)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                  School Transport Bus Service:
                </label>
                <select 
                  value={transportZone} 
                  onChange={(e) => setTransportZone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--bg-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                >
                  <option>Zone A (Vasant Kunj / Munirka)</option>
                  <option>Zone B (South Delhi / Saket / Hauz Khas)</option>
                  <option>Zone C (Gurugram / Noida / Central Delhi)</option>
                  <option>No School Transport (Self Arrangement)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  id="newAdm" 
                  checked={isNewAdmission} 
                  onChange={(e) => setIsNewAdmission(e.target.checked)} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-burgundy)' }}
                />
                <label htmlFor="newAdm" style={{ fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }}>
                  Include one-time Caution Deposit & Registration Fee (New Student)
                </label>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate Fee & Eligibility'} <Sparkles size={18} />
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div>
            {result ? (
              <div className="glass-card" style={{ padding: '32px', background: 'var(--bg-surface)', borderLeft: '5px solid var(--primary-burgundy)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge-gold">{result.admissionStatus}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--emerald-accent)', fontWeight: 600 }}>✓ Verified Rates</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-burgundy)', marginBottom: '8px' }}>
                  Fee Breakdown: {result.grade}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0', padding: '16px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>Quarterly Base Tuition:</span>
                    <strong>₹ {result.breakdown.quarterlyTuition.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>Quarterly Co-Curricular & Activity:</span>
                    <strong>₹ {result.breakdown.quarterlyActivity.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>Quarterly Lab & Tech Fee:</span>
                    <strong>₹ {result.breakdown.quarterlyLabTech.toLocaleString()}</strong>
                  </div>
                  {result.breakdown.quarterlyTransport > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span>Quarterly Transport Service:</span>
                      <strong>₹ {result.breakdown.quarterlyTransport.toLocaleString()}</strong>
                    </div>
                  )}
                  {result.breakdown.oneTimeCautionDeposit > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--accent-gold-hover)' }}>
                      <span>One-Time Refundable Caution Deposit:</span>
                      <strong>₹ {result.breakdown.oneTimeCautionDeposit.toLocaleString()}</strong>
                    </div>
                  )}
                </div>

                <div style={{ background: 'rgba(122, 0, 38, 0.06)', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Payable for Quarter 1:</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-burgundy)' }}>
                    ₹ {result.totalFirstTermPayable.toLocaleString()}
                  </div>
                </div>

                <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Proceed to Online Application Form <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-surface)' }}>
                <Calculator size={48} color="var(--primary-burgundy)" style={{ marginBottom: '16px', opacity: 0.7 }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Select Grade & Preferences</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  Click "Calculate Fee & Eligibility" to view itemized breakdown and admission instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
