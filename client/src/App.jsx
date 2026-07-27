import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FivePillars from './components/FivePillars';
import AdmissionsCalculator from './components/AdmissionsCalculator';
import StudentParentDashboard from './components/StudentParentDashboard';
import EventCalendar from './components/EventCalendar';
import Newsfeed from './components/Newsfeed';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import SchoolShowcase from './components/SchoolShowcase';

import { fetchSchoolInfo } from './services/api';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [pillarsData, setPillarsData] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchSchoolInfo().then(data => {
      if (data && data.pillars) setPillarsData(data.pillars);
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-root">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main>
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <SchoolShowcase setActiveTab={setActiveTab} />
            <FivePillars pillars={pillarsData} />
            <AdmissionsCalculator />
            <StudentParentDashboard />
            <EventCalendar />
            <Newsfeed />
            <InquiryForm />
          </>
        )}

        {activeTab === 'pillars' && (
          <FivePillars pillars={pillarsData} />
        )}

        {activeTab === 'admissions' && (
          <>
            <AdmissionsCalculator />
            <InquiryForm />
          </>
        )}

        {activeTab === 'dashboard' && (
          <StudentParentDashboard />
        )}

        {activeTab === 'events' && (
          <EventCalendar />
        )}

        {activeTab === 'news' && (
          <Newsfeed />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
