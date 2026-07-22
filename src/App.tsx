import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, MapPin, Calendar, Clock, Shirt, Gift, 
  ChevronLeft, ChevronRight, Music, Heart, MailOpen, 
  Send, Copy, Check, Users, Sparkles, Utensils, 
  PartyPopper, Camera, Crown, Smartphone, Facebook, Youtube,
  Compass
} from 'lucide-react';

import { 
  EVENT_DATE, MUSIC_URL, COVER_IMAGE, BG_PATTERN, GALLERY_IMAGES, 
  QUINCE_NAME_FIRST, QUINCE_NAME_LAST_1, QUINCE_NAME_LAST_2, 
  EVENT_TITLE, EVENT_THEME, LOCATION_NAME, LOCATION_ADDRESS, 
  LOCATION_MAP_URL, WHATSAPP_RSVP_NUMBER, WHATSAPP_RSVP_TEXT, 
  HERO_QUOTE, INVITATION_INTRO, FOOTER_QUOTE, MOTHER, SPONSORS,
  ITINERARY_ITEMS 
} from './data/eventData';

// Sub-components
import { WelcomeGate } from './components/WelcomeGate';
import { Countdown } from './components/Countdown';
import { GreekCalendar } from './components/GreekCalendar';
import { OlympusCloudscape } from './components/OlympusCloudscape';
import { GreekHoroscopeCarousel } from './components/GreekHoroscopeCarousel';
import { MusicPlayer } from './components/MusicPlayer';
import { Itinerary } from './components/Itinerary';
import { GiftList } from './components/GiftList';
import { Guestbook } from './components/Guestbook';
import { RsvpSection } from './components/RsvpSection';
import { CollaborativeGallery } from './components/CollaborativeGallery';
import { CreatorCard } from './components/CreatorCard';
import { ShareSection } from './components/ShareSection';
import { GreekPillars, CelestialClouds, GrecianDivider, GoldDustOverlay } from './components/GreekDecorations';
import { 
  GoldGradients, 
  GreekTempleIcon, 
  ApolloLyreIcon, 
  ZeusLightningIcon, 
  GreekAmphoraIcon, 
  CelestialWingsIcon, 
  AthenaOwlIcon, 
  TridentIcon 
} from './components/GreekIcons';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [isStandaloneGallery, setIsStandaloneGallery] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const isGallery = 
      window.location.search.includes('view=galeria') || 
      window.location.hash === '#/galeria' || 
      window.location.pathname.endsWith('/galeria') || 
      window.location.pathname.endsWith('/galeria/');
    if (isGallery) {
      setIsStandaloneGallery(true);
      setIsInvitationOpen(true); // Bypass the Welcome Gate
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio autoplay restricted by browser policy. Interaction required.", err);
        });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Date styling variables
  const formattedDay = "07";
  const formattedMonth = "08";
  const formattedYear = "2026";

  // Standalone mode template
  if (isStandaloneGallery) {
    return (
      <div className="min-h-screen relative bg-olympus-sky text-navy-deep selection:bg-gold-metallic/30 overflow-x-hidden">
        {/* Load the global gold gradients for SVG fills */}
        <GoldGradients />

        {/* --- Global Background Animations --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-olympus-sky bg-dark-constellations">
          {/* Olympus Greek Mythology Cloud Background */}
          <OlympusCloudscape />

          {/* Subtle marble veins mixed into the navy space background */}
          <div 
            className="absolute inset-0 opacity-[0.03] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${BG_PATTERN})`, mixBlendMode: 'overlay' }}
          />

          {/* Twinkling stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                '--duration': `${Math.random() * 3 + 2}s`
              } as any}
            />
          ))}

          {/* Golden floating dust */}
          <GoldDustOverlay />
        </div>

        {/* Corner Ornaments */}
        <div className="fixed top-0 left-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
          <img 
            src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
            alt="Decorative Top Left" 
            className="absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-left-top"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="fixed top-0 right-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
          <img 
            src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
            alt="Decorative Top Right" 
            className="absolute top-0 right-0 h-full w-[200%] max-w-none object-cover object-right-top"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Standalone Header with Greek Columns, Theme, Back to Invitation Link, etc. */}
        <header className="relative pt-16 pb-8 px-6 text-center z-10 max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col items-center">
            {/* Elegant Greek Lyre/Wing emblem */}
            <div className="w-16 h-16 rounded-full border border-gold-metallic/35 flex items-center justify-center bg-navy-deep/80 text-gold-metallic shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-4">
              <Camera className="w-8 h-8" />
            </div>
            
            <h1 className="font-cinzel-decorative text-4xl md:text-6xl text-gold-metallic tracking-wider uppercase text-shine-gold font-bold">
              {QUINCE_NAME_FIRST}
            </h1>
            
            <p className="font-trajan text-xs md:text-sm tracking-[0.4em] text-ivory/80 uppercase font-bold mt-2">
              {EVENT_TITLE} • {EVENT_THEME.toUpperCase()}
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-gold-metallic/30" />
              <span className="font-trajan text-[10px] tracking-widest text-gold-metallic uppercase font-bold">Templo de los Recuerdos</span>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-gold-metallic/30" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10">
          <CollaborativeGallery isStandalone={true} />
        </main>

        {/* Simple Footer */}
        <footer className="relative py-16 text-center z-10 max-w-md mx-auto space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-metallic/30 to-transparent w-full" />
          <p className="font-cormorant italic text-lg text-slate-700 leading-relaxed font-semibold">
            &ldquo;Tu presencia y cada recuerdo compartido hacen eterno este día.&rdquo;
          </p>
          <div className="pt-2">
            <a 
              href={window.location.origin + window.location.pathname}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-deep/60 border border-gold-metallic text-gold-metallic hover:bg-gold-metallic hover:text-navy-deep font-trajan text-[10px] tracking-[0.2em] font-bold transition-all duration-300 rounded-sm shadow-md"
            >
              <span>VER INVITACIÓN COMPLETA</span>
            </a>
          </div>
          <p className="font-trajan text-[9px] tracking-[0.2em] text-ivory/50 uppercase pt-4">
            {QUINCE_NAME_FIRST} • 2026
          </p>
        </footer>

        {/* Paper texture overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.025] z-[100]" 
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-paper.png')` }} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-olympus-sky text-navy-deep selection:bg-gold-metallic/30 overflow-x-hidden">
      {/* Load the global gold gradients for SVG fills */}
      <GoldGradients />

      {/* Background Music Player audio node */}
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* Welcome Invitation Gate Overlay */}
      <AnimatePresence mode="wait">
        {!isInvitationOpen && (
          <WelcomeGate onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      <div className={`${!isInvitationOpen ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* --- Global Background Animations --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-olympus-sky bg-dark-constellations">
          {/* Olympus Greek Mythology Cloud Background */}
          <OlympusCloudscape />

          {/* Subtle marble veins mixed into the navy space background */}
          <div 
            className="absolute inset-0 opacity-[0.03] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${BG_PATTERN})`, mixBlendMode: 'overlay' }}
          />

          {/* Twinkling stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                '--duration': `${Math.random() * 3 + 2}s`
              } as any}
            />
          ))}

          {/* Golden floating dust */}
          <GoldDustOverlay />
        </div>

        {/* Floating classical music coin */}
        {isInvitationOpen && (
          <>
            <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
            
            {/* Top Left Corner Ornament */}
            <div className="fixed top-0 left-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
                alt="Decorative Top Left" 
                className="absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-left-top"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Top Right Corner Ornament */}
            <div className="fixed top-0 right-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
                alt="Decorative Top Right" 
                className="absolute top-0 right-0 h-full w-[200%] max-w-none object-cover object-right-top"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Bottom Left Corner Ornament */}
            <div className="fixed bottom-0 left-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320345/esquinas_abajo_nqvpfs.png" 
                alt="Decorative Bottom Left" 
                className="absolute bottom-0 left-0 h-full w-[200%] max-w-none object-cover object-left-bottom"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Bottom Right Corner Ornament */}
            <div className="fixed bottom-0 right-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 overflow-hidden pointer-events-none z-40 select-none">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320345/esquinas_abajo_nqvpfs.png" 
                alt="Decorative Bottom Right" 
                className="absolute bottom-0 right-0 h-full w-[200%] max-w-none object-cover object-right-bottom"
                referrerPolicy="no-referrer"
              />
            </div>
          </>
        )}

        {/* --- Classical Pillars Framing the Screen --- */}
        <GreekPillars />

        <main className={`relative z-10 transition-all duration-1000 ${isInvitationOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* ================= HERO SECTION ================= */}
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative overflow-hidden">
            
            {/* Soft, volumetric celestial backlights */}
            <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-gold-metallic/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[35rem] h-[35rem] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full z-10">
              
              {/* Left Column: Cursive, serif names and date badge */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-2 flex flex-col items-center lg:items-start"
                >
                  <span className="text-gold-metallic text-xs md:text-sm tracking-[0.4em] uppercase font-trajan font-bold">
                    ¡Acompáñame a Celebrar!
                  </span>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-gold-metallic to-transparent mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-1"
                >
                  <span className="font-bickham text-6xl md:text-8xl text-gold-metallic block drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)] font-medium">
                    Ytzel
                  </span>
                  <h1 className="font-cursive text-3xl md:text-5xl lg:text-6xl text-navy-deep tracking-wide mt-2">
                    Figueroa Zapata
                  </h1>
                </motion.div>

                {/* Star-guided Quinceañera quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="max-w-md mx-auto lg:mx-0 border-l-2 border-gold-metallic/50 pl-6 text-left py-1"
                >
                  <p className="font-cormorant text-base md:text-lg italic text-navy-deep/80 leading-relaxed">
                    {HERO_QUOTE}
                  </p>
                </motion.div>

                {/* Date Badge: "07 | 08 | 2026" with Laurel branches */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="inline-flex items-center gap-4 justify-center py-3 px-6 bg-navy-deep border border-gold-metallic/30 rounded-sm relative"
                >
                  {/* Left branch */}
                  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-gold-metallic/60 transform scale-x-[-1]">
                    <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" />
                  </svg>

                  <div className="flex gap-4 font-serif-cinzel text-lg md:text-2xl font-bold text-white tracking-widest">
                    <span>{formattedDay}</span>
                    <span className="text-gold-metallic">|</span>
                    <span>{formattedMonth}</span>
                    <span className="text-gold-metallic">|</span>
                    <span>{formattedYear}</span>
                  </div>

                  {/* Right branch */}
                  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-gold-metallic/60">
                    <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" />
                  </svg>
                </motion.div>

              </div>

              {/* Right Column: Beautiful Portrait in Golden Laurel Halo */}
              <div className="lg:col-span-5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="relative w-72 h-96 md:w-80 md:h-[26rem] flex items-center justify-center z-10"
                >
                  {/* Rotating Grecian Key Ring under photo */}
                  <div className="absolute inset-[-15px] rounded-full border border-gold-metallic/20 pointer-events-none animate-[spin_50s_linear_infinite]" />
                  <div className="absolute inset-[-30px] rounded-full border border-dashed border-gold-metallic/10 pointer-events-none animate-[spin_80s_linear_infinite_reverse]" />

                  {/* High-end temple styled photo frame */}
                  <div className="w-full h-full rounded-sm overflow-hidden temple-photo-frame bg-navy-deep">
                    <img 
                      src={COVER_IMAGE} 
                      alt="Ytzel Figueroa"
                      className="w-full h-full object-cover grayscale-[5%] hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 z-20">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-gold-metallic font-semibold">Deslizar</span>
              <div className="w-px h-10 bg-gradient-to-b from-gold-metallic to-transparent" />
            </div>

            <CelestialClouds />
          </section>

          {/* ================= FAMILY SECTION ================= */}
          <section className="py-24 relative overflow-hidden bg-white/5 border-y-2 border-gold-metallic/25 bg-marble-veins">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none greek-key-bar" />
            
            <div className="max-w-4xl mx-auto px-6 space-y-12 text-center text-navy-deep relative z-10">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4 flex flex-col items-center"
              >
                <GrecianDivider />
                <p className="font-cormorant italic text-xl md:text-2xl text-navy-deep/90 leading-relaxed max-w-2xl mx-auto">
                  {INVITATION_INTRO}
                </p>
                <h2 className="font-cinzel-decorative text-4xl md:text-6xl text-gold-metallic font-bold tracking-[0.2em] text-shine-gold mt-2">
                  15 AÑOS
                </h2>
              </motion.div>
 
              <div className="grid md:grid-cols-2 gap-10 text-center pt-4">
                {/* Mother */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-3 p-6 bg-white/40 rounded-sm border border-gold-metallic/15 shadow-sm"
                >
                  <h3 className="font-trajan text-xs text-gold-metallic tracking-[0.2em] uppercase font-bold">
                    Bajo el amparo y amor de mi madre
                  </h3>
                  <div className="space-y-1 font-cormorant text-lg md:text-xl text-navy-deep font-semibold">
                    <p>{MOTHER}</p>
                  </div>
                </motion.div>
 
                {/* Sponsors */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3 p-6 bg-white/40 rounded-sm border border-gold-metallic/15 shadow-sm"
                >
                  <h3 className="font-trajan text-xs text-gold-metallic tracking-[0.2em] uppercase font-bold">
                    Con la guía y bendición de mis Padrinos
                  </h3>
                  <div className="space-y-1 font-cormorant text-lg md:text-xl text-navy-deep font-semibold">
                    <p>{SPONSORS[0]}</p>
                    <p>{SPONSORS[1]}</p>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>


          {/* ================= COUNTDOWN & NAV BAR ================= */}
          <section className="py-20 px-6 max-w-4xl mx-auto space-y-16">
            
            {/* Dynamic Marble Countdown Plaque */}
            <Countdown />

            {/* Greek Mythology Calendar with Highlighted Event Day */}
            <GreekCalendar />

            {/* Circular Marble Buttons Navigation Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {/* ITINERARIO */}
              <button 
                onClick={() => scrollToSection('itinerary-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <GreekTempleIcon className="w-full h-full text-navy-deep" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors">
                  Itinerario
                </span>
              </button>

              {/* DETALLES */}
              <button 
                onClick={() => scrollToSection('gifts-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <GreekAmphoraIcon className="w-full h-full text-navy-deep" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors">
                  Detalles
                </span>
              </button>

              {/* UBICACIÓN */}
              <button 
                onClick={() => scrollToSection('details-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <TridentIcon className="w-full h-full text-navy-deep" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors">
                  Ubicación
                </span>
              </button>

              {/* GALERÍA */}
              <button 
                onClick={() => scrollToSection('gallery-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <AthenaOwlIcon className="w-full h-full text-navy-deep" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors">
                  Galería
                </span>
              </button>

              {/* RECUERDOS */}
              <button 
                onClick={() => scrollToSection('upload-memories-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <Camera className="w-full h-full text-navy-deep p-0.5" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors text-center">
                  Recuerdos
                </span>
              </button>

              {/* CONFIRMAR ASISTENCIA */}
              <button 
                onClick={() => scrollToSection('rsvp-section')}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-marble-veins border-2 border-gold-metallic hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-gold-metallic shadow-[0_5px_15px_rgba(0,0,0,0.25)] relative p-3.5">
                  <div className="absolute inset-1 border border-gold-metallic/30 rounded-full" />
                  <CelestialWingsIcon className="w-full h-full text-navy-deep" />
                </div>
                <span className="mt-2 text-[10px] font-trajan text-navy-deep tracking-widest uppercase font-bold opacity-85 group-hover:text-gold-metallic transition-colors text-center">
                  Confirmar
                </span>
              </button>
            </div>
          </section>


          {/* ================= CORE INFO SECTION (THE GRID) ================= */}
          <section id="details-section" className="py-16 px-6 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Card 1: ITINERARIO SUMMARY */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="marble-plaque p-5 sm:p-8 flex flex-col justify-between space-y-6 relative"
              >
                <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gold-metallic bg-navy-deep text-gold-metallic shadow-inner p-2">
                    <GreekTempleIcon className="w-full h-full" />
                  </div>
                  <h3 className="font-trajan text-base text-navy-deep font-extrabold tracking-wider">
                    ITINERARIO
                  </h3>
                  <div className="w-12 h-px bg-gold-metallic/40" />
                </div>

                <div className="space-y-3 font-cormorant text-navy-deep text-sm font-semibold">
                  {ITINERARY_ITEMS.map((item, i) => (
                    <div key={i} className="grid grid-cols-[80px_1fr] items-baseline gap-2.5 border-b border-gold-metallic/15 pb-2 text-left">
                      <span className="font-serif-cinzel font-bold text-xs text-navy-deep/90 whitespace-nowrap">
                        {item.time.toUpperCase()}
                      </span>
                      <span className="font-trajan text-xs font-bold tracking-wide text-navy-deep uppercase leading-tight">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => scrollToSection('itinerary-section')}
                  className="w-full py-2.5 bg-navy-deep text-gold-metallic font-trajan text-[10px] tracking-widest font-bold hover:text-white border border-gold-metallic/35 transition-colors cursor-pointer"
                >
                  VER DETALLE COMPLETO
                </button>
              </motion.div>

              {/* Card 2: LUGAR */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="marble-plaque p-5 sm:p-8 flex flex-col justify-between space-y-6 relative"
              >
                <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gold-metallic bg-navy-deep text-gold-metallic shadow-inner p-2">
                    <TridentIcon className="w-full h-full" />
                  </div>
                  <h3 className="font-trajan text-base text-navy-deep font-extrabold tracking-wider">
                    LUGAR
                  </h3>
                  <div className="w-12 h-px bg-gold-metallic/40" />
                </div>

                <div className="text-center space-y-2 text-navy-deep">
                  <p className="font-trajan text-lg font-bold leading-tight tracking-wide">
                    {LOCATION_NAME}
                  </p>
                  <p className="font-cormorant text-sm text-slate-700 leading-relaxed font-semibold">
                    {LOCATION_ADDRESS}
                  </p>
                  <p className="font-trajan text-xs tracking-widest text-gold-metallic font-bold">
                    VIERNES <span className="font-serif-cinzel font-bold">07</span> DE AGOSTO
                  </p>
                </div>

                <a 
                  href={LOCATION_MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-navy-deep text-gold-metallic font-trajan text-[10px] tracking-widest font-bold hover:text-white border border-gold-metallic/35 transition-colors text-center block cursor-pointer"
                >
                  VER EN MAPA
                </a>
              </motion.div>

              {/* Card 3: DETALLES DIRECT ACCESS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="marble-plaque p-5 sm:p-8 flex flex-col justify-between space-y-6 relative"
              >
                <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gold-metallic bg-navy-deep text-gold-metallic shadow-inner p-2">
                    <GreekAmphoraIcon className="w-full h-full" />
                  </div>
                  <h3 className="font-trajan text-base text-navy-deep font-extrabold tracking-wider">
                    DETALLES
                  </h3>
                  <div className="w-12 h-px bg-gold-metallic/40" />
                </div>

                <div className="text-center space-y-2 text-navy-deep">
                  <p className="font-cormorant text-sm italic text-slate-600 leading-relaxed px-1">
                    &ldquo;Tu presencia es mi mayor detalle, y cada muestra de cariño o buenos deseos es invaluable para mí.&rdquo;
                  </p>
                </div>

                <button 
                  onClick={() => scrollToSection('gifts-section')}
                  className="w-full py-2.5 bg-navy-deep text-gold-metallic font-trajan text-[10px] tracking-widest font-bold hover:text-white border border-gold-metallic/35 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  MESA DE DETALLES
                </button>
              </motion.div>

            </div>
          </section>

          {/* ================= DETAILED ITINERARY ================= */}
          <Itinerary />

          {/* ================= GIFT LIST SECTION ================= */}
          <GiftList />

          {/* ================= GALLERY SECTION ================= */}
          <section id="gallery-section" className="py-24 px-4 overflow-hidden max-w-5xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 flex flex-col items-center">
              <GrecianDivider />
              <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-navy-deep tracking-wider uppercase text-shine-gold font-bold">
                Galería de Fotos
              </h2>
              <p className="font-cursive text-2xl md:text-3xl text-gold-metallic/85">
                Instantes de Magia en el Templo
              </p>
              <p className="font-trajan text-xs tracking-[0.5em] text-gold-metallic/80 uppercase font-semibold">
                Fotografías Oficiales
              </p>
            </div>

            {/* Greek Mythology Animated Horoscope / Carousel Gallery */}
            <div className="py-6">
              <GreekHoroscopeCarousel />
            </div>
          </section>


          {/* ================= COLLABORATIVE GALLERY SECTION ================= */}
          <CollaborativeGallery />


          {/* ================= RSVP SECTION ================= */}
          <RsvpSection />


          {/* ================= GUESTBOOK SECTION ================= */}
          <Guestbook />


          {/* ================= FOOTER ================= */}
          <section className="py-24 px-6 text-center space-y-16 bg-gradient-to-t from-black/50 to-transparent relative">
            
            <div className="absolute top-0 inset-x-0 h-40 pointer-events-none select-none z-10 opacity-60">
              <svg className="w-full h-40 fill-current text-marble-white transform scale-y-[-1]" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,100 C150,90 280,40 400,60 C520,80 620,110 750,90 C880,70 980,30 1100,50 C1220,70 1320,100 1440,80 L1440,120 L0,120 Z" />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 max-w-xl mx-auto z-10 relative pt-12"
            >
              <h3 className="font-cormorant italic text-3xl md:text-4xl text-gold-metallic leading-relaxed">
                {FOOTER_QUOTE}
              </h3>
              
              <div className="flex items-center justify-center gap-4">
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-gold-metallic/40" />
                <Heart className="w-5 h-5 text-gold-metallic fill-gold-metallic animate-pulse" />
                <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-gold-metallic/40" />
              </div>
            </motion.div>

            {/* Share Invitation Section */}
            <ShareSection />

            {/* Premium Translucent Creator Card (VAC Creativo) */}
            <div className="pt-6 relative z-10">
              <CreatorCard />
            </div>

            <div className="space-y-1 opacity-50 pt-6">
              <p className="font-trajan text-xs tracking-[0.6em] text-gold-metallic font-semibold uppercase">
                Ytzel Figueroa Zapata
              </p>
              <p className="font-trajan text-[9px] tracking-[0.2em] text-ivory/80 uppercase">
                {EVENT_TITLE} • <span className="font-serif-cinzel font-bold">2026</span>
              </p>
            </div>
          </section>

        </main>
      </div>

      {/* Luxury overlay subtle film grain paper texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-[100]" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-paper.png')` }} 
      />
    </div>
  );
}
