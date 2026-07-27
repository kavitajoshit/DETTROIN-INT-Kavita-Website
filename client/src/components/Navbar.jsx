import React, { useEffect, useState } from 'react';
import { Sun, Moon, Phone, MapPin, Menu, X, User } from 'lucide-react';

const links = [
  ['home', 'Home'], ['pillars', 'Learning Experience'], ['admissions', 'Admissions'],
  ['events', 'News & Events'], ['news', 'Recognition']
];

export default function Navbar({ theme, toggleTheme, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span><MapPin size={14} aria-hidden="true" /> Sector C, Vasant Kunj, New Delhi</span>
          <a href="tel:+911141767940"><Phone size={14} aria-hidden="true" /> +91 11 41767940</a>
        </div>
      </div>
      <div className="container nav-shell">
        <button className="brand" onClick={() => navigate('home')} aria-label="Vasant Valley School home">
          <img className="brand-mark" src="/logo-vasant-valley.svg" alt="" />
          <span className="brand-copy"><strong>Vasant Valley School</strong><em>Excellence in Deed</em></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([tab, label]) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => navigate(tab)}>{label}</button>)}
          <button className="nav-portal" onClick={() => navigate('dashboard')}><User size={15} /> LOG IN</button>
        </nav>
        <div className="mobile-actions">
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(value => !value)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu">{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {links.map(([tab, label]) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => navigate(tab)}>{label}</button>)}
        <button onClick={() => navigate('dashboard')}>Student & Parent Portal</button>
      </nav>
    </header>
  );
}
