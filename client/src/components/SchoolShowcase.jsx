import React, { useState } from 'react';
import { ArrowRight, BookOpen, BrainCircuit, HeartHandshake, Lightbulb, Quote, X } from 'lucide-react';

const galleryImages = [
  { src: '/laissez_faire_2026_4-1.jpeg', title: 'Creative expression', alt: 'Students taking part in a creative classroom activity' },
  { src: '/synapse_2026_4.jpeg', title: 'Learning together', alt: 'Students at a science quiz' },
  { src: '/synapse_2026_6.jpeg', title: 'Technology in action', alt: 'Students learning in a technology lab' },
  { src: '/synapse_2026_7.jpeg', title: 'A vibrant school community', alt: 'Students gathered in the school auditorium' }
];

export default function SchoolShowcase({ setActiveTab }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return <>
    <section className="welcome-section section-padding" aria-labelledby="welcome-heading">
      <div className="container welcome-grid">
        <div className="image-frame image-frame-tall"><img src="/laissez_faire_2026_4-1.jpeg" alt="Students making art together in a classroom" loading="lazy" /></div>
        <div className="welcome-copy"><p className="eyebrow">A place to belong, grow and contribute</p><h2 id="welcome-heading">A joyful education for a changing world.</h2><p>Every day at Vasant Valley is shaped by inquiry, collaboration and care. Our learning community helps children find their voice, build confidence and approach the world with curiosity.</p><div className="value-list"><span><HeartHandshake /> A caring community</span><span><Lightbulb /> Purposeful learning</span><span><BrainCircuit /> Independent thinking</span></div><button className="text-link" onClick={() => setActiveTab('pillars')}>Discover the learning experience <ArrowRight size={17} /></button></div>
      </div>
    </section>
    <section className="programs-section section-padding" aria-labelledby="programs-heading"><div className="container"><div className="section-title"><p className="eyebrow">Learning beyond the textbook</p><h2 id="programs-heading">Many ways to discover what you can do.</h2><p>Academic depth meets hands-on exploration, with room for every learner to question, create and connect.</p></div><div className="program-grid"><article><BookOpen /><h3>Academic inquiry</h3><p>Structured learning experiences that encourage students to understand deeply and think independently.</p></article><article><BrainCircuit /><h3>Innovation & technology</h3><p>Collaborative, practical spaces where ideas become projects and knowledge becomes confidence.</p></article><article><HeartHandshake /><h3>Life at school</h3><p>Rich cultural, sporting and social experiences that help young people discover their place in a community.</p></article></div></div></section>
    <section className="principal-section section-padding" aria-labelledby="message-heading"><div className="container principal-grid"><div className="principal-copy"><p className="eyebrow">Our educational purpose</p><Quote aria-hidden="true" /><h2 id="message-heading">Education is preparation for life.</h2><p>We believe in an education that is rigorous, enjoyable and deeply human—one that develops compassion, resilience and a lasting love of learning.</p><p className="message-signoff">Vasant Valley School</p></div><div className="image-frame"><img src="/synapse_2026_7.jpeg" alt="Students attending an event in the school auditorium" loading="lazy" /></div></div></section>
    <section className="gallery-section section-padding" aria-labelledby="gallery-heading"><div className="container"><div className="section-title"><p className="eyebrow">Campus life</p><h2 id="gallery-heading">Learning in every direction.</h2><p>A glimpse of the curious, collaborative and energetic life of our school community.</p></div><div className="gallery-grid">{galleryImages.map((image, index) => <button className={`gallery-card gallery-card-${index + 1}`} key={image.src} onClick={() => setSelectedImage(image)} aria-label={`View larger image: ${image.title}`}><img src={image.src} alt={image.alt} loading="lazy" /><span>{image.title}<ArrowRight size={17} /></span></button>)}</div></div></section>
    <section className="testimonial-section"><div className="container"><Quote aria-hidden="true" /><blockquote>“A school day is an opportunity to be curious, to contribute and to grow alongside one another.”</blockquote><p>— The Vasant Valley learning community</p><button className="btn-primary" onClick={() => setActiveTab('admissions')}>Begin your admissions journey <ArrowRight size={17} /></button></div></section>
    {selectedImage && <div className="modal-overlay gallery-lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={() => setSelectedImage(null)}><div className="lightbox-content" onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedImage(null)} aria-label="Close image preview"><X /></button><img src={selectedImage.src} alt={selectedImage.alt} /><p>{selectedImage.title}</p></div></div>}
  </>;
}
