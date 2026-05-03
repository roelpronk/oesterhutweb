/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Anchor, 
  Waves, 
  Ship, 
  Instagram, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Users, 
  Calendar, 
  Clock, 
  Droplets,
  Flame,
  Wine,
  Sun,
  Fish,
  Shell,
  Menu,
  X,
  Music
} from 'lucide-react';

// --- Types ---
type View = 'home' | 'menu' | 'reservation' | 'contact' | 'verhaal' | 'muziek';

// --- Components ---

const LogoIcon = ({ className = "w-10 h-10", invert = false }: { className?: string; invert?: boolean }) => {
  const color = invert ? "white" : "#1c2c44";
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shell Arcs */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M45 65C20 65 10 45 10 28C10 12 25 5 45 5" />
        <path d="M45 55C25 55 18 42 18 28C18 18 30 14 45 14" opacity="0.6" strokeWidth="2" />
        <path d="M45 45C32 45 26 38 26 28C26 20 35 18 45 18" opacity="0.3" strokeWidth="1.5" />
      </g>
      
      {/* Pearl */}
      <circle cx="34" cy="58" r="3.5" fill={color} />
      
      {/* Hut */}
      <path 
        d="M42 65V35L65 20L88 35V65H42Z" 
        fill={color}
      />
      <path 
        d="M58 65V56C58 52 61 50 65 50C69 50 72 52 72 56V65" 
        fill={invert ? "#1c2c44" : "#f5f5f4"} 
      />
      
      {/* Waves */}
      <g stroke={color} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M42 74C52 70 62 78 72 74C82 70 92 74 98 74" />
        <path d="M55 80C65 77 75 83 85 80" opacity="0.4" strokeWidth="2" />
      </g>
    </svg>
  );
};

const Navbar = ({ currentView, setView }: { currentView: View; setView: (v: View) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightText = !isScrolled && currentView === 'home';

  const navItems: { label: string; view: View }[] = [
    { label: 'Het Verhaal', view: 'verhaal' },
    { label: 'Menu', view: 'menu' },
    { label: 'Muziek', view: 'muziek' },
    { label: 'Reserveren', view: 'reservation' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12 ${
        isScrolled || currentView !== 'home' 
          ? 'bg-oester-stone/95 backdrop-blur-md border-b border-oester-blue/10 shadow-sm md:py-2' 
          : 'bg-transparent md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => {
            setView('home');
            setIsMenuOpen(false);
          }}
          className="flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:scale-105"
        >
          <span className={`font-serif text-xl md:text-2xl tracking-[0.3em] font-bold leading-tight transition-colors duration-500 ${
            isScrolled || currentView !== 'home' ? 'text-oester-blue' : 'text-white'
          }`}>OESTERHUT</span>
          <span className={`font-serif text-[7px] md:text-[8px] tracking-[0.6em] uppercase leading-none mt-1 transition-colors duration-500 text-center ${
            isScrolled || currentView !== 'home' ? 'text-stone-400' : 'text-white/60'
          }`}>Pop-up Gastronomy</span>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`font-serif text-[10px] tracking-[0.25em] uppercase transition-all relative pb-2 group cursor-pointer ${
                currentView === item.view 
                  ? 'text-oester-blue' 
                  : (isScrolled || currentView !== 'home' ? 'text-stone-500' : 'text-white/80') + ' hover:text-oester-blue'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-oester-blue transition-transform duration-300 origin-left ${
                currentView === item.view ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('reservation')}
            className={`hidden md:block px-8 py-3 font-sans text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${
              isScrolled || currentView !== 'home'
                ? 'bg-oester-blue text-white hover:bg-oester-blue/90'
                : 'bg-white text-oester-blue hover:bg-oester-stone'
            }`}
          >
            RESERVEER
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled || currentView !== 'home' || isMenuOpen ? 'text-oester-blue' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-oester-stone z-[60] flex flex-col items-center justify-center pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => {
                    setView(item.view);
                    setIsMenuOpen(false);
                  }}
                  className={`font-serif text-2xl tracking-[0.2em] uppercase transition-all ${
                    currentView === item.view ? 'text-oester-blue' : 'text-stone-400'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
                <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.1 }}
                onClick={() => {
                  setView('reservation');
                  setIsMenuOpen(false);
                }}
                className="mt-8 w-full py-5 bg-oester-blue text-white font-sans text-xs font-bold tracking-[0.3em] uppercase"
              >
                Direct Reserveren
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-20 flex flex-col items-center gap-4 text-oester-blue/40"
            >
              <div className="flex gap-6">
                <Instagram size={20} />
                <Mail size={20} />
              </div>
              <p className="text-[8px] tracking-[0.4em] uppercase">Amsterdam • Île de Ré • Cancale</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-stone-100 border-t border-stone-200 py-16 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex flex-col items-center md:items-start translate-y-1">
          <span className="font-serif text-lg tracking-[0.3em] font-bold leading-tight text-oester-blue">OESTERHUT</span>
          <span className="font-serif text-[6px] tracking-[0.4em] uppercase leading-none mt-1 text-stone-400 w-full text-center md:text-left">Pop-up Gastronomy</span>
        </div>
        <p className="font-serif text-xs italic text-stone-500 text-center md:text-left max-w-xs">
          © 2026 Oesterhut Amsterdam. Freshly shucked under the Atlantic breeze.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-8">
        {['Instagram', 'Newsletter', 'Pop-up Locations', 'Privacy'].map((item) => (
          <a key={item} href="#" className="font-serif text-xs italic text-stone-500 hover:text-oester-blue transition-colors">
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6 text-oester-blue/20">
        <Ship size={24} />
        <Waves size={24} />
      </div>
    </div>
  </footer>
);

// --- Views ---

const HomeView = ({ setView }: { setView: (v: View) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
  >
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZP6SFyU6qPiUnOpEpjH5ZOFhb1JLwr2z6hml_AtPeIr1vmf-TmcBsD4_FeFeW7vLXjXIWkjl2ooQpQiqQdScWdWLM2jc4f6Xd9iPkpFScJHHY9ugQ4SANpnvNCBuL93i8nfxgntOVpxXZhhah0-ALai-czhb3zFeTr5t8uEC9Yn5zp0nPUumWpRuz2nT2AmZHDrJF1lezUCFqwoWzn7xgBZe0VGoIQ61cpLausDHixVBgEDtJNeN8h_DJnw1Wbouy4SG43n_4H7UA" 
          alt="French Coast" 
          className="w-full h-full object-cover grayscale-[20%] brightness-[0.7]"
        />
      </div>
      <div className="relative z-10 text-center px-6 text-white max-w-4xl flex flex-col items-center">
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Oesterhut Amsterdam",
              "image": "https://www.oesterhut.nl/oesterhut_logo.png",
              "description": "Een uniek pop-up gastronomie concept gespecialiseerd in verse oesters uit Cancale, Île de Ré en de Waddenzee.",
              "servesCuisine": "French, Seafood, Oysters",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Amsterdam",
                "addressCountry": "NL"
              },
              "priceRange": "$$",
              "url": "https://www.oesterhut.nl"
            })}
          </script>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">De Franse Kust in Amsterdam</h1>
        <p className="font-serif italic text-lg md:text-xl mb-10 text-stone-100/90 max-w-2xl mx-auto">
          Verse oesters uit Cancale, Île de Ré en de Waddenzee. Zilte verhalen en wisselende locaties.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => setView('menu')}
            className="px-10 py-4 bg-white text-oester-blue font-bold text-xs tracking-[0.2em] hover:bg-stone-100 transition-colors cursor-pointer"
          >
            ONTDEK ONS MENU
          </button>
          <button 
            onClick={() => setView('reservation')}
            className="px-10 py-4 border border-white text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 transition-colors cursor-pointer"
          >
            RESERVEER EEN PLEK
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] tracking-[0.3em] uppercase">Discover More</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>

    {/* Story */}
    <section className="py-24 md:py-32 bg-oester-stone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl text-oester-blue">Onze Reis</h2>
            <div className="nautical-line"></div>
            <div className="space-y-6 text-oester-blue/80 leading-relaxed text-lg">
              <p>
                Oesterhut brengt de rauwe, ongefilterde ziel van de Franse oestercultuur naar de grachten van Amsterdam. Wat begon als een passie voor de zilte smaak van de oceaan, is uitgegroeid tot een rondreizend pop-up restaurant dat op onverwachte locaties verschijnt.
              </p>
              <p>
                Wij geloven in eenvoud: een vers geopende oester, een glas gekoelde Muscadet en het juiste gezelschap. Onze locaties in Amsterdam variëren van verborgen dakterrassen tot industriële hallen, elk met hun eigen unieke sfeer.
              </p>
            </div>
            <button className="inline-block font-bold text-xs tracking-[0.2em] border-b-2 border-oester-blue/20 pb-2 hover:border-oester-blue transition-all cursor-pointer">
              LEES HET VOLLEDIGE VERHAAL
            </button>
          </div>
          <div className="relative aspect-[4/5] order-1 md:order-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOCY9Hat_ThqCsO2x4XsgWxZCOLqFytucLGe9yJ0iw6nUP81BZuPBu62b5fzRax6eHTWbrBxcSSxUGEvPfL9CeZ7bON-YVilzSgvuvghwn57ENjz8JF5FN-1uKWwcgickJyg-FZZKVuyOR2_X9AFuV8cVTVV8XY-3lXyD9i1jtltTVIT5YNh4u62orwBoXR9osVzuG5FDEHKBkipalyPrjTObpQHBEG6I221WnT8VgnSXwrbxvaEun3PFzFcSvy6d1QXgruz3Eb1H" 
              alt="Shucking Oysters" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 p-8 bg-oester-stone/95 backdrop-blur-sm max-w-xs hidden lg:block border-l border-t border-oester-blue/5">
              <p className="font-serif italic text-sm text-oester-blue">
                "De zee geeft, wij openen. Geen franje, alleen de essentie."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Partners */}
    <section className="py-24 bg-oester-sand">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6 block">Onze Kwekers</span>
        <h3 className="font-serif text-3xl md:text-4xl text-oester-blue mb-16 max-w-3xl mx-auto">
          Met trots gepresenteerd door de meesters van de Atlantische oceaan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-12 border border-oester-blue/5 hover:border-oester-blue/20 transition-all group">
            <h4 className="font-serif text-2xl tracking-tighter font-bold mb-6 text-oester-blue">SAINT KERBER</h4>
            <p className="text-oester-blue/70 leading-relaxed text-sm">
              Direct uit de baai van Mont Saint-Michel. Hun erfgoed in Cancale staat garant voor oesters van absolute wereldklasse, gekweekt met respect voor de getijden.
            </p>
          </div>
          <div className="bg-white p-12 border border-oester-blue/5 hover:border-oester-blue/20 transition-all">
            <h4 className="font-serif text-2xl tracking-tighter font-bold mb-6 text-oester-blue">LA CABANE OCÉANE</h4>
            <p className="text-oester-blue/70 leading-relaxed text-sm">
              De zilte passie van het Île de Ré. Bekend om hun verfijnde 'Fines de Claire' oesters die de zon van de Franse westkust in zich dragen.
            </p>
          </div>
          <div className="bg-white p-12 border border-oester-blue/5 hover:border-oester-blue/20 transition-all">
            <h4 className="font-serif text-2xl tracking-tighter font-bold mb-6 text-oester-blue">WILDE WADOESTERS</h4>
            <p className="text-oester-blue/70 leading-relaxed text-sm">
              Puur natuur uit de Waddenzee. Handgeraapt met vakmanschap en oog voor het unieke ecosysteem. Een robuuste oester met een onnavolgbare zilte smaak uit eigen water.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRF3EBs-_MEq-IW-9fJPdl5lUtNdIL4JOz2uAXeQanEifNabmRVzGIiMwM0PfxqKEntEnM-RlcW1_ghPX4trQeM8rLmJPFIurhnDkf180B_PcmGk7oU3FDkq-WbkiVJvDb82RPz63tVea5KJGJDI_4Nc499k-OZNT3xY9vtQB3L0CpxxNFPtLmT3ZN2gFPc9OfLGP4z8gKUKLZc0e_tKgZ4IPBrgj_4OXNcT_XdN-JhHJQCvHYM6Uxk3fTjUjhQdVUtDIRivesBqDj" 
          alt="Next Event" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl mb-8">Schuif aan bij onze volgende pop-up</h2>
        <p className="text-lg text-stone-300 mb-12 max-w-xl mx-auto">
          Onze locaties zijn beperkt en de nachten zijn kort. Reserveer tijdig voor een onvergetelijke avond aan de Amsterdamse kade.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => setView('reservation')}
            className="px-12 py-5 bg-white text-oester-blue font-bold text-xs tracking-widest uppercase hover:bg-stone-100 transition-all cursor-pointer"
          >
            RESERVEREN
          </button>
          <button 
            onClick={() => setView('menu')}
            className="px-12 py-5 border border-white/40 text-white font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-all cursor-pointer"
          >
            MENU BEKIJKEN
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const MenuView = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
  >
    <div className="text-center mb-24">
      <h1 className="font-serif text-5xl md:text-7xl text-oester-blue mb-4">La Carte</h1>
      <p className="font-serif italic text-lg text-stone-500 max-w-2xl mx-auto">
        Une célébration de l'océan Atlantique, de la côte charentaise à votre assiette. Fraîcheur absolue et savoir-faire artisanal.
      </p>
      <div className="h-px w-24 bg-oester-blue/20 mx-auto mt-8"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Left Column */}
      <div className="lg:col-span-7 space-y-20">
        {/* Nos Huîtres */}
        <section aria-labelledby="oyster-menu-title">
          <h2 id="oyster-menu-title" className="font-serif text-3xl text-oester-blue border-b border-oester-blue/10 pb-3 mb-10 flex items-center gap-3">
            <Droplets size={24} aria-hidden="true" className="text-oester-blue/60" />
            La Carte des Huîtres & Fruits de Mer
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-stone-400 mb-6 uppercase">Les Fines de Claire</h3>
              <div className="space-y-4">
                <div className="flex items-end">
                  <span className="font-serif text-lg">La Douzaine (N°3)</span>
                  <div className="menu-leader"></div>
                  <span className="font-sans">24.00€</span>
                </div>
                <div className="flex items-end">
                  <span className="font-serif text-lg">La Demi-Douzaine (N°3)</span>
                  <div className="menu-leader"></div>
                  <span className="font-sans">13.00€</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-stone-400 mb-6 uppercase">La Sélection Oesterhut</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-end">
                    <span className="font-serif text-lg">Wilde Wadoesters (Waddenzee)</span>
                    <div className="menu-leader"></div>
                    <span className="font-sans">3.75€ / stuk</span>
                  </div>
                  <p className="text-[10px] italic text-stone-400">Puur natuur uit het Werelderfgoed. Robuust en vol van smaak.</p>
                </div>
                <div>
                  <div className="flex items-end">
                    <span className="font-serif text-lg">Cancale Spéciale Nº3</span>
                    <div className="menu-leader"></div>
                    <span className="font-sans">3.50€ / stuk</span>
                  </div>
                  <p className="text-[10px] italic text-stone-400">Direct uit de Franse baai. Zilt, stevig en karaktervol.</p>
                </div>
                <div>
                  <div className="flex items-end">
                    <span className="font-serif text-lg">Île de Ré Fines de Claire</span>
                    <div className="menu-leader"></div>
                    <span className="font-sans">3.25€ / stuk</span>
                  </div>
                  <p className="text-[10px] italic text-stone-400">Verfijnd en zacht, met een subtiele nootachtige afdronk.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-oester-sand p-8 border border-oester-blue/5">
                <h4 className="text-[10px] tracking-[0.3em] font-bold text-oester-blue/60 mb-6 flex items-center gap-2 uppercase">
                  <Wine size={14} />
                  Cocktails d'Huîtres
                </h4>
                <p className="text-[10px] italic text-stone-400 mb-4">Servis par 3 pièces</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Gin & Tonic, Concombre</span><span>12€</span></div>
                  <div className="flex justify-between"><span>Bloody Mary, Céleri</span><span>12€</span></div>
                  <div className="flex justify-between"><span>Yuzu & Gingembre</span><span>12€</span></div>
                </div>
              </div>
              <div className="bg-oester-blue p-8 text-white">
                <h4 className="text-[10px] tracking-[0.3em] font-bold text-white/60 mb-6 flex items-center gap-2 uppercase">
                  <Flame size={14} />
                  Huîtres Chaudes
                </h4>
                <p className="text-[10px] italic text-white/40 mb-4">Gratinées au four</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Beurre d'algues (x3)</span><span>14€</span></div>
                  <div className="flex justify-between"><span>Champagne & Poireaux (x3)</span><span>16€</span></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-stone-400 mb-6 uppercase">Marinées & Crues</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-lg">Tartare d'Huîtres & Maigre</h4>
                    <p className="text-xs text-stone-500 mt-1 italic">Citron vert, aneth, échalotes croquantes.</p>
                  </div>
                  <span className="font-sans">18.00€</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-lg">L'Assiette Océane</h4>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 italic">6 huîtres, crevettes roses, bulots.</p>
                  </div>
                  <span className="font-sans">26.00€</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fruits de Mer */}
        <section>
          <h2 className="font-serif text-3xl text-oester-blue border-b border-oester-blue/10 pb-3 mb-10 flex items-center gap-3">
            <Fish size={24} className="text-oester-blue/60" />
            Fruits de Mer & Coquillages
          </h2>
          <div className="space-y-6">
            {[
              { name: 'Crevettes Roses Impériales (x8)', price: '15.00€' },
              { name: 'Bulots de la Baie, Mayonnaise Maison', price: '11.00€' },
              { name: 'Poêlée de Palourdes au Thym', price: '19.00€' },
              { name: 'Langoustines Royales (x5)', price: '28.00€' },
            ].map((item) => (
              <div key={item.name} className="flex items-end">
                <span className="font-serif text-lg">{item.name}</span>
                <div className="menu-leader"></div>
                <span className="font-sans">{item.price}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 space-y-16">
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl1sfg8y5W7nw4WD8n9MCeOthX6ji3GiGwr7dBsL5N1N6eFrIQmGehMVUM9RzW0FBljE-Nn07WCBBEuEhI7e_dzyVJG-ok49ArJ7hfcf0moEZn6PenOB2PhiZQH3JFl41UP-U14G4KpNqSUldOlvTXqh1j5K55CsOfsZn5wTh-7QYGZndHvAlTx9W5r2HXtlF82TAbAlqI9Co0lwRgaV-1fn1ohzhbSJKJQ8sLh5siXKPM86_nGaEtd1_NE0xy_bEvMgACEubiVvXz" 
            alt="Menu Visual" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
        </div>

        <div className="bg-stone-200/50 p-10">
          <h2 className="font-serif text-3xl text-oester-blue mb-8">Mais Aussi...</h2>
          <div className="space-y-8">
            {[
              { name: 'Grillon Charentais', desc: 'Tradition de la région.', price: '9.00€' },
              { name: 'Crépinette de Porc Noir', desc: 'Servie chaude avec vos huîtres.', price: '8.00€' },
              { name: 'Rillettes de Maigre', desc: 'Citron confit & câpres.', price: '11.00€' },
              { name: 'Soupe de Poissons / Moules', desc: 'Rouille & croûtons aillés.', price: '14.00€' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-serif font-bold text-lg">{item.name}</span>
                  <span className="font-sans">{item.price}</span>
                </div>
                <p className="text-xs italic text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="font-serif text-3xl text-oester-blue border-b border-oester-blue/10 pb-3 mb-10 flex items-center gap-3">
            <Wine size={24} className="text-oester-blue/60" />
            Nos Cocktails & Spiritueux
          </h2>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-oester-blue/50 mb-6 uppercase">La Sélection Negroni</h3>
              <div className="space-y-4">
                {[
                  { name: 'Negroni Classico', desc: 'Gin, Campari, Vermouth Rosso, Orange.', price: '12.00€' },
                  { name: 'Negroni de l\'Océan', desc: 'Infusé à la salicorne, touche saline.', price: '14.00€' },
                  { name: 'Negroni Bianco', desc: 'Gin, Suze, Lillet Blanc, Citron.', price: '13.00€' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-end">
                      <span className="font-serif text-lg">{item.name}</span>
                      <div className="menu-leader"></div>
                      <span className="font-sans">{item.price}</span>
                    </div>
                    <p className="text-[10px] italic text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-oester-blue/50 mb-6 uppercase">Gins Premium & Tonic</h3>
              <div className="space-y-4">
                {[
                  { name: 'Gin Mare', desc: 'Méditerranéen, romarin, olive arbequina.', price: '14.00€' },
                  { name: 'Monkey 47', desc: 'Forêt Noire, 47 botaniques, complexe.', price: '16.00€' },
                  { name: 'Hendrick\'s Luna', desc: 'Floral, concombre, baies de genièvre.', price: '13.00€' },
                  { name: 'Copperhead', desc: 'Cardamome, coriandre, zestes d\'orange.', price: '15.00€' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-end">
                      <span className="font-serif text-lg">{item.name}</span>
                      <div className="menu-leader"></div>
                      <span className="font-sans">{item.price}</span>
                    </div>
                    <p className="text-[10px] italic text-stone-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-oester-blue border-b border-oester-blue/10 pb-3 mb-10 flex items-center gap-3">
            <Sun size={24} className="text-oester-blue/60" />
            Douceurs
          </h2>
          <div className="space-y-6">
            {[
              { name: 'Assiette de Fromages Affinés', price: '12.00€' },
              { name: 'Galette Charentaise', price: '7.00€' },
              { name: 'Glaces & Sorbets Artisanaux', price: '8.00€' },
              { name: 'Café Gourmand', price: '10.00€' },
            ].map((item) => (
              <div key={item.name} className="flex items-end">
                <span className="font-serif text-lg">{item.name}</span>
                <div className="menu-leader"></div>
                <span className="font-sans">{item.price}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </motion.div>
);

const ReservationView = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0 }}
    className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Side Visual */}
      <div className="lg:col-span-5 relative h-[500px] lg:h-auto overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBhYZdAobsNmqVj7_TKj-AJVNYISY3ZK1Emm4iQ7tBNtZbZ34qNQuJg88w9oe6kJID7Zg2RnQwQBIJHeueKTg9WdvlqZaQ9fZfN6VeG3aVMIJ_Cl0zlBRlbfi_DLE829yYR2H4cEp0W1P_vjpDXdUYuOfqRLSL5Td5O4kIIA6XwdDZENRVN3qejkX1wcwZXAN54mC4q5w7r8kNo8jl25qg7Ohxv9cGZcemgowPTacji9H9oWJ1MqMawLrMqzS57bh3e1EzEsKZiHhw" 
          alt="Reservation table" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white max-w-xs z-10">
          <p className="font-serif italic text-2xl mb-4 leading-relaxed">
            "Schuif aan voor een unieke oesterbeleving."
          </p>
          <div className="h-px w-12 bg-white/50"></div>
        </div>
        <div className="absolute inset-0 bg-oester-blue/20"></div>
      </div>

      {/* Form */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.3em] font-bold text-stone-400 mb-4 block uppercase">Pop-up Amsterdam</span>
          <h1 className="font-serif text-4xl md:text-5xl text-oester-blue mb-6">Reserveer een Tafel</h1>
          <p className="text-oester-blue/70 max-w-md text-lg leading-relaxed">
            Geniet van de verste vangst direct uit de Oosterschelde, geserveerd met passie en ziltige perfectie in onze tijdelijke haven.
          </p>
        </div>

        <form className="space-y-12 max-w-xl" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-2 group">
              <label className="text-[10px] tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-oester-blue transition-colors uppercase">Locatie</label>
              <div className="relative">
                <select className="w-full bg-transparent border-0 border-b border-stone-200 focus:border-oester-blue focus:ring-0 py-3 pl-0 pr-8 appearance-none font-serif text-lg outline-none cursor-pointer">
                  <option>Amsterdam Pop-up (Houthavens)</option>
                  <option>Amsterdam Pop-up (NDSM)</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-oester-blue transition-colors uppercase">Datum</label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full bg-transparent border-0 border-b border-stone-200 focus:border-oester-blue focus:ring-0 py-3 pl-0 appearance-none font-serif text-lg outline-none cursor-pointer" 
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-oester-blue transition-colors uppercase">Aantal Personen</label>
              <div className="relative">
                <select className="w-full bg-transparent border-0 border-b border-stone-200 focus:border-oester-blue focus:ring-0 py-3 pl-0 pr-8 appearance-none font-serif text-lg outline-none cursor-pointer">
                  <option>2 personen</option>
                  <option>3 personen</option>
                  <option>4 personen</option>
                  <option>5+ personen (op aanvraag)</option>
                </select>
                <Users size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] tracking-[0.2em] font-bold text-stone-400 group-focus-within:text-oester-blue transition-colors uppercase">Tijdstip</label>
              <div className="relative">
                <select className="w-full bg-transparent border-0 border-b border-stone-200 focus:border-oester-blue focus:ring-0 py-3 pl-0 pr-8 appearance-none font-serif text-lg outline-none cursor-pointer">
                  <option>17:00</option>
                  <option>18:00</option>
                  <option>19:30</option>
                  <option>20:30</option>
                </select>
                <Clock size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button className="w-full md:w-auto px-16 py-5 bg-oester-blue text-white font-bold text-xs tracking-widest uppercase hover:bg-oester-blue/90 transition-all shadow-xl shadow-oester-blue/10 cursor-pointer">
              BEVESTIG RESERVERING
            </button>
            <p className="mt-6 text-xs italic text-stone-500">
              Heeft u allergieën of specifieke wensen? Geef dit aan in de volgende stap.
            </p>
          </div>
        </form>
      </div>
    </div>

    {/* Icons section */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 bg-oester-sand p-12 md:p-20">
      <div className="text-center md:text-left space-y-4">
        <Fish size={32} className="text-oester-blue mx-auto md:mx-0" />
        <h3 className="font-serif text-xl font-bold">Dagverse Vangst</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Onze oesters worden elke ochtend geleverd vanuit Yerseke, voor de meest authentieke smaak.
        </p>
      </div>
      <div className="text-center md:text-left space-y-4">
        <Wine size={32} className="text-oester-blue mx-auto md:mx-0" />
        <h3 className="font-serif text-xl font-bold">Curated Pairing</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Onze sommelier heeft een selectie van natuurwijnen en champagnes die perfect aansluiten bij het ziltige karakter.
        </p>
      </div>
      <div className="text-center md:text-left space-y-4">
        <Sun size={32} className="text-oester-blue mx-auto md:mx-0" />
        <h3 className="font-serif text-xl font-bold">Unieke Locaties</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Wij strijken enkel neer op locaties met een verhaal, altijd dichtbij het kabbelende water.
        </p>
      </div>
    </section>
  </motion.div>
);

export default function App() {
  const [view, setView] = useState<View>('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen">
      <Navbar currentView={view} setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && <HomeView key="home" setView={setView} />}
          {view === 'menu' && <MenuView key="menu" />}
          {view === 'reservation' && <ReservationView key="reservation" />}
          {view === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="pt-48 pb-24 text-center px-6"
            >
              <div className="mb-12 flex justify-center">
                <img 
                  src="https://www.oesterhut.nl/oesterhut_logo.png" 
                  alt="Oesterhut Logo" 
                  className="w-48 h-auto"
                />
              </div>
              <h1 className="font-serif text-5xl text-oester-blue mb-8">Contact</h1>
              <div className="nautical-line mx-auto mb-8"></div>
              <p className="text-oester-blue/70 max-w-md mx-auto text-lg leading-relaxed mb-12">
                Heeft u vragen over onze pop-up locaties of privé-events? <br />
                Schroom niet om een zijpad in te slaan.
              </p>
              
              <div className="flex flex-col items-center gap-8 text-oester-blue">
                <a href="mailto:info@oesterhut.nl" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full border border-oester-blue/10 flex items-center justify-center group-hover:bg-oester-blue group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="font-serif italic text-lg decoration-oester-blue/20 underline decoration-1 underline-offset-4 group-hover:decoration-oester-blue transition-all">info@oesterhut.nl</span>
                </a>
                <a href="https://instagram.com/oesterhut" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full border border-oester-blue/10 flex items-center justify-center group-hover:bg-oester-blue group-hover:text-white transition-all">
                    <Instagram size={18} />
                  </div>
                  <span className="font-serif italic text-lg decoration-oester-blue/20 underline decoration-1 underline-offset-4 group-hover:decoration-oester-blue transition-all">@oesterhut</span>
                </a>
              </div>
            </motion.div>
          )}
          {view === 'verhaal' && (
            <motion.div 
              key="verhaal"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="pt-48 pb-24 text-center px-6 max-w-4xl mx-auto"
            >
              <div className="mb-16 flex justify-center">
                <img 
                  src="https://www.oesterhut.nl/oesterhut_logo.png" 
                  alt="Oesterhut Logo" 
                  className="w-64 h-auto"
                />
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-oester-blue mb-12">Ons Verhaal</h1>
              <div className="space-y-8 text-oester-blue/80 text-lg leading-relaxed text-left">
                <p className="font-serif italic text-2xl text-stone-400 mb-12 text-center">
                  "Geboren uit de getijden, geserveerd in de stad."
                </p>
                <p>
                  Oesterhut is meer dan een pop-up; het is een ode aan de zilte eenvoud van de Franse kusten. Onze reis begon in de zoute moerassen van de Charente-Maritime, waar we de kunst van het oesterkweken en het geduld van de natuur leerden waarderen.
                </p>
                <p>
                  We brachten niet alleen de oesters mee terug naar Amsterdam, maar ook de verhalen, de sfeer van de cabanes en de ongecompliceerde manier van genieten. Elk pop-up event is een tijdelijke haven waar we deze passie delen met gelijkgestemden.
                </p>
                <div className="flex justify-center pt-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-stone-300">
                    <div className="flex flex-col items-center gap-2"><Ship size={32} /><span className="text-[10px] tracking-widest uppercase">Ocean Heritage</span></div>
                    <div className="flex flex-col items-center gap-2"><Droplets size={32} /><span className="text-[10px] tracking-widest uppercase">Pure Salt</span></div>
                    <div className="flex flex-col items-center gap-2"><Sun size={32} /><span className="text-[10px] tracking-widest uppercase">Atlantic Spirit</span></div>
                    <div className="flex flex-col items-center gap-2"><Waves size={32} /><span className="text-[10px] tracking-widest uppercase">Changing Tides</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {view === 'muziek' && (
            <motion.div 
              key="muziek"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="pt-48 pb-24 text-center px-6 max-w-4xl mx-auto"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6 block">Beleving</span>
              <h1 className="font-serif text-5xl md:text-7xl text-oester-blue mb-12">Zilte Klanken</h1>
              
              <div className="bg-white p-8 md:p-16 border border-stone-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-oester-blue transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                <Music size={40} className="text-stone-200 mx-auto mb-8" />
                
                <h2 className="font-serif text-3xl text-oester-blue mb-4">Matthijs Lievaart</h2>
                <p className="font-serif italic text-xl text-stone-500 mb-8">Live op de Oesterhut</p>
                
                <div className="w-12 h-[1px] bg-stone-300 mx-auto mb-8"></div>
                
                <p className="text-oester-blue/70 leading-relaxed mb-10 max-w-lg mx-auto">
                  Terwijl de oesters worden geopend en de glazen worden ingeschonken, omlijst Matthijs de middag met zijn karakteristieke interpretaties van de Franse chanson en maritieme sferen.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <a 
                    href="https://matthijslievaart.nl/muziek/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-oester-blue text-oester-blue font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-oester-blue hover:text-white transition-all"
                  >
                    Beluister zijn Repertoire
                  </a>
                  <button 
                    onClick={() => setView('reservation')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-oester-blue text-white font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-oester-blue/90 shadow-xl transition-all"
                  >
                    Kom Genieten
                  </button>
                </div>
              </div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-stone-50 p-8">
                <div>
                  <h3 className="font-serif text-lg text-oester-blue mb-4">Sfeer & Ambiance</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Wij geloven dat gastronomie verder gaat dan de smaak alleen. De juiste klank op het juiste moment versterkt de zilte ervaring van onze oesters.
                  </p>
                </div>
                <div>
                    <h3 className="font-serif text-lg text-oester-blue mb-4">Frans Chanson</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Van Brel tot Aznavour, maar altijd met een eigentijdse twist die past bij de levendige sfeer van onze pop-up locaties.
                    </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
