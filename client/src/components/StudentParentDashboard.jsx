import React, { useState, useEffect } from 'react';
import { User, Users, BookOpen, Clock, Calendar, CheckCircle2, Bus, AlertCircle, FileText } from 'lucide-react';
import { fetchStudentDashboard, fetchParentDashboard } from '../services/api';

export default function StudentParentDashboard() {
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'parent'
  const [studentData, setStudentData] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboards = async () => {
      setLoading(true);
      const sData = await fetchStudentDashboard();
      const pData = await fetchParentDashboard();
      setStudentData(sData);
      setParentData(pData);
      setLoading(false);
    };
    loadDashboards();
  }, []);

  if (loading) {
    return (
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <p>Loading Veracross ERP Data Simulator...</p>
      </section>
    );
  }

  return (
    <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className="section-title">
          <span className="badge-gold">Veracross ERP Integration Simulator</span>
          <h2 style={{ marginTop: '10px' }}>Student & Parent Portal Experience</h2>
          <p>
            Seamless real-time synchronization of academic progress, attendance records, timetable, and parent communications.
          </p>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <button
            onClick={() => setViewMode('student')}
            className={viewMode === 'student' ? 'btn-primary' : 'btn-outline'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <User size={18} /> Student View (Aanya Sharma)
          </button>
          <button
            onClick={() => setViewMode('parent')}
            className={viewMode === 'parent' ? 'btn-gold' : 'btn-outline'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Users size={18} /> Parent View (Rajesh Sharma)
          </button>
        </div>

        {/* STUDENT VIEW */}
        {viewMode === 'student' && studentData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Student Header Card */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-burgundy)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.4rem' }}>
                  AS
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-burgundy)' }}>{studentData.name}</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    ID: {studentData.studentId} • {studentData.grade} • {studentData.house}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Academic GPA</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-burgundy)' }}>{studentData.gpa}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Term Attendance</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-accent)' }}>{studentData.attendancePercentage}</div>
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '24px' }}>
              {/* Today's Timetable */}
              <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Clock color="var(--primary-burgundy)" size={20} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-burgundy)' }}>Today's Class Timetable</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {studentData.todayTimetable.map((slot, idx) => (
                    <div key={idx} style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.92rem', display: 'block' }}>{slot.subject}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{slot.room}</span>
                      </div>
                      <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{slot.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Grades */}
              <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <BookOpen color="var(--accent-gold-hover)" size={20} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-burgundy)' }}>Recent Subject Assessment</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {studentData.recentGrades.map((g, idx) => (
                    <div key={idx} style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.92rem', display: 'block' }}>{g.subject}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--emerald-accent)' }}>{g.status}</span>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-burgundy)' }}>{g.grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARENT VIEW */}
        {viewMode === 'parent' && parentData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-burgundy)' }}>Welcome, {parentData.parentName}</h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Parent Portal ID: {parentData.parentId} • Ward: Aanya Sharma (Class 11-A)
                </span>
              </div>
              <span className="badge-gold">Verified Parent Portal</span>
            </div>

            <div className="grid-2" style={{ gap: '24px' }}>
              {/* Fee Invoice Card */}
              <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <FileText color="var(--primary-burgundy)" size={20} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-burgundy)' }}>Fee Payment & Invoices</h4>
                </div>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{parentData.feeInvoice.quarter}</span>
                    <span style={{ color: 'var(--emerald-accent)', fontWeight: 700 }}>✓ {parentData.feeInvoice.status}</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-dark)' }}>
                    {parentData.feeInvoice.amount}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Receipt: {parentData.feeInvoice.receiptNo} • Date: {parentData.feeInvoice.paymentDate}
                  </div>
                </div>
              </div>

              {/* Transport Tracking Card */}
              <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Bus color="var(--accent-gold-hover)" size={20} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-burgundy)' }}>School Bus Live Tracking</h4>
                </div>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-light)' }}>
                  <strong style={{ fontSize: '0.95rem', display: 'block' }}>{parentData.transportTracking.busRoute}</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--emerald-accent)', margin: '6px 0', fontWeight: 600 }}>
                    ● {parentData.transportTracking.liveStatus}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Driver Contact: {parentData.transportTracking.driverContact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
