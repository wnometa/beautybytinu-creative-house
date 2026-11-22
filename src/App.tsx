import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Camera,
  CalendarDays,
  Check,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

type Page = 'home' | 'creative-space';

type Service = {
  number: string;
  title: string;
  description: string;
  label: string;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Event makeup',
    description:
      'Polished, camera-ready beauty for every celebration, launch, dinner, and milestone.',
    label: 'For your moment',
  },
  {
    number: '02',
    title: 'Personalized beauty',
    description:
      'A considered session designed around your features, your style, and the way you want to feel.',
    label: 'Made for you',
  },
  {
    number: '03',
    title: 'Bridal artistry',
    description:
      'Timeless bridal looks with a calm, thoughtful process from your trial through to the big day.',
    label: 'For your forever',
  },
];

const spaceSets = [
  { name: 'The Eden Set', description: 'Botanical, bright, and full of life.', image: '/images/IMG_2914.jpg', position: '15% 29%' },
  { name: 'The Oasis Arch', description: 'Warm, sculptural, and intimate.', image: '/images/IMG_2916.jpg', position: 'center' },
  { name: 'The Urban Loft', description: 'A confident backdrop for bold ideas.', image: '/images/IMG_2914.jpg', position: '85% 29%' },
  { name: 'The Marble Wall', description: 'Quiet texture for elevated stories.', image: '/images/IMG_2914.jpg', position: '15% 74%' },
  { name: 'The Alcove', description: 'Soft light, clean lines, endless mood.', image: '/images/IMG_2914.jpg', position: '50% 74%' },
  { name: 'The Serenity Set', description: 'A calm canvas for considered work.', image: '/images/IMG_2914.jpg', position: '85% 74%' },
];

function usePage(): [Page, (page: Page) => void] {
  const getPage = (): Page => window.location.pathname.startsWith('/creative-space') ? 'creative-space' : 'home';
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const handlePopState = () => setPage(getPage());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPage: Page) => {
    const path = nextPage === 'creative-space' ? '/creative-space' : '/';
    window.history.pushState({}, '', path);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [page, navigate];
}

function BrandMark() {
  return (
    <a className="brand-mark" href="/" onClick={(event) => { event.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
      <span className="brand-monogram">BT</span>
      <span className="brand-copy">
        <strong>BEAUTY BY TINU</strong>
        <small>Creative House</small>
      </span>
    </a>
  );
}

function Header({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id: string) => {
    if (page !== 'home') {
      navigate('home');
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`site-header ${menuOpen ? 'menu-is-open' : ''}`}>
      <div className="header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} onClick={() => { navigate('home'); setMenuOpen(false); }}>Beauty</button>
          <button onClick={() => navigate('creative-space')} className={page === 'creative-space' ? 'active' : ''}>Creative space</button>
          <button onClick={() => goToSection('about')}>Our story</button>
        </nav>
        <a className="header-cta" href="mailto:beautybytinu@gmail.com?subject=Booking%20request">Book a session <ArrowRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <div className="mobile-nav">
        <button onClick={() => { navigate('home'); setMenuOpen(false); }}>Beauty</button>
        <button onClick={() => { navigate('creative-space'); setMenuOpen(false); }}>Creative space</button>
        <button onClick={() => goToSection('about')}>Our story</button>
        <a href="mailto:beautybytinu@gmail.com?subject=Booking%20request" onClick={() => setMenuOpen(false)}>Book a session <ArrowRight size={15} /></a>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">Beauty · Content · Creativity</span>
          <h2>Come as you are.<br /><em>Leave fully yourself.</em></h2>
        </div>
        <a className="circle-link" href="mailto:beautybytinu@gmail.com?subject=Booking%20request" aria-label="Book a session">
          <ArrowDownRight size={26} />
        </a>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><BrandMark /><p>Beauty experiences and creative spaces, thoughtfully made in Lagos.</p></div>
        <div className="footer-column"><span>Explore</span><button onClick={() => navigate('home')}>Beauty services</button><button onClick={() => navigate('creative-space')}>Creative space</button><button onClick={() => { navigate('home'); window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 80); }}>Our story</button></div>
        <div className="footer-column"><span>Connect</span><a href="mailto:beautybytinu@gmail.com">beautybytinu@gmail.com</a><a href="tel:+2348071560920">+234 807 156 0920</a><a href="#contact">Magodo Shangisha, Lagos</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Beauty By Tinu. All rights reserved.</span><span>Made for beautiful ideas.</span></div>
    </footer>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <main>
        <section className="home-hero">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-content page-shell">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={14} /> The beauty house</span>
              <h1>Beauty that feels like <em>you.</em></h1>
              <p>Thoughtful beauty experiences for the woman who wants to feel polished, present, and completely herself.</p>
              <div className="hero-actions"><a className="button button-dark" href="mailto:beautybytinu@gmail.com?subject=Beauty%20booking%20request">Book your beauty session <ArrowRight size={16} /></a><a className="text-link" href="#services">Explore services <ArrowDownRight size={16} /></a></div>
              <div className="hero-note"><span className="note-line" />Based in Lagos<br />Available for destination bookings</div>
            </div>
            <div className="hero-art">
              <div className="art-frame"><img src="/images/IMG_2917.jpg" alt="Beauty By Tinu Creative House logo" /></div>
              <div className="art-stamp"><span>BT</span><small>Beauty<br />By Tinu</small></div>
              <div className="art-caption"><span>01</span><span>Beauty, content<br />& creativity</span></div>
            </div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><ArrowDownRight size={18} /></div>
        </section>

        <section className="intro-section page-shell" id="about">
          <div className="section-kicker"><span>01</span><span>Our approach</span></div>
          <div className="intro-layout"><h2>More than a look.<br /><em>It’s a feeling.</em></h2><div className="intro-copy"><p>Beauty By Tinu is a creative house built around the belief that beauty should feel personal, not prescribed.</p><p>From your first consultation to the final touch, every detail is considered to help you feel at ease, confident, and seen.</p><a className="text-link" href="mailto:beautybytinu@gmail.com?subject=Tell%20me%20more">Get to know us <ArrowRight size={16} /></a></div></div>
          <div className="principles"><div><span>01</span><strong>Considered</strong><p>Every detail has a reason.</p></div><div><span>02</span><strong>Personal</strong><p>Your face. Your story. Your way.</p></div><div><span>03</span><strong>Effortless</strong><p>Beauty that moves with you.</p></div></div>
        </section>

        <section className="services-section" id="services">
          <div className="page-shell"><div className="section-kicker light"><span>02</span><span>What we do</span></div><div className="services-heading"><h2>Beauty, <em>made personal.</em></h2><p>Whether you are celebrating, creating, or simply making time for yourself, there is a place for you here.</p></div><div className="service-list">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div><span className="service-label">{service.label}</span><h3>{service.title}</h3><p>{service.description}</p></div><a href="mailto:beautybytinu@gmail.com?subject=Beauty%20booking%20request" aria-label={`Book ${service.title}`}><ArrowUpRight size={22} /></a></article>)}</div></div>
        </section>

        <section className="consultation-section page-shell"><div className="consultation-card"><div className="consultation-image"><img src="/images/IMG_2916.jpg" alt="The warm, considered interior of the Beauty By Tinu creative house" /></div><div className="consultation-copy"><span className="eyebrow">Your glow, wherever you are</span><h2>Not in Lagos?<br /><em>We can still meet.</em></h2><p>Get expert guidance for skincare, makeup, haircare, and fragrance through a personal virtual consultation.</p><a className="button button-light" href="mailto:beautybytinu@gmail.com?subject=Virtual%20consultation">Book a virtual consultation <ArrowRight size={16} /></a></div></div></section>

        <section className="space-teaser"><div className="space-teaser-image"><img src="/images/IMG_2915.jpg" alt="A styled creative set inside Beauty By Tinu Creative House" /></div><div className="space-teaser-copy"><span className="eyebrow">Now welcoming creators</span><h2>Your ideas.<br /><em>Our space.</em></h2><p>A considered content house for photo, video, podcasts, interviews, events, and all the ideas waiting to take shape.</p><button className="button button-light" onClick={() => navigate('creative-space')}>Explore the creative space <ArrowRight size={16} /></button><div className="space-meta"><span><Camera size={16} /> Photo & video</span><span><CalendarDays size={16} /> Events & more</span></div></div></section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function CreativeSpacePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <main className="creative-page">
        <section className="creative-hero page-shell"><div className="creative-hero-copy"><span className="eyebrow"><Camera size={14} /> Beauty By Tinu Creative House</span><h1>A space for<br /><em>making.</em></h1><p>Every corner, curated with intention. A warm, flexible creative house for the stories, campaigns, and moments you want to bring to life.</p><a className="button button-dark" href="mailto:beautybytinu@gmail.com?subject=Creative%20space%20booking">Book the space <ArrowRight size={16} /></a><div className="creative-location"><MapPin size={16} /><span>7C Basheer Shittu Street<br />Magodo Shangisha, Lagos</span></div></div><div className="creative-hero-image"><img src="/images/IMG_2915.jpg" alt="A styled chair and warm archway inside the creative house" /><div className="image-label"><span>02</span><span>Make room<br />for your ideas</span></div></div></section>

        <section className="space-intro page-shell"><div className="section-kicker"><span>01</span><span>The house</span></div><div className="space-intro-grid"><h2>Designed for<br /><em>your point of view.</em></h2><div><p>Beauty By Tinu Creative House is a private, comfortable space for people who care about how their work feels.</p><p>Choose a set, bring your team, and make something that looks and feels like you. Natural light, studio lights, and considered details are already waiting.</p></div></div><div className="amenities"><div><Camera size={22} /><strong>Multiple creative sets</strong><span>Find the right mood for every story.</span></div><div><Sparkles size={22} /><strong>Natural lighting</strong><span>Beautiful light from morning to golden hour.</span></div><div><Check size={22} /><strong>Private & comfortable</strong><span>A calm room to focus and create.</span></div><div><CalendarDays size={22} /><strong>Affordable rates</strong><span>Flexible sessions for every kind of idea.</span></div></div></section>

        <section className="sets-section"><div className="page-shell"><div className="section-kicker"><span>02</span><span>Explore our spaces</span></div><div className="sets-heading"><h2>Find your <em>set.</em></h2><p>Six distinct moods, one intentionally designed creative house.</p></div><div className="sets-grid">{spaceSets.map((space, index) => <article className="set-card" key={space.name}><div className="set-image"><img src={space.image} alt={space.name} style={{ objectPosition: space.position }} /><span>0{index + 1}</span></div><div className="set-details"><div><h3>{space.name}</h3><p>{space.description}</p></div><ArrowUpRight size={20} /></div></article>)}</div></div></section>

        <section className="oasis-feature page-shell"><div className="oasis-image"><img src="/images/IMG_2916.jpg" alt="The Oasis Arch set at Beauty By Tinu Creative House" /></div><div className="oasis-copy"><span className="eyebrow">Set spotlight</span><h2>The Oasis<br /><em>Arch</em></h2><p>Warm, earthy, and effortlessly inviting. Designed around a beautifully crafted arched doorway, The Oasis Arch creates a refined yet welcoming atmosphere for portraits, brand campaigns, interviews, lifestyle content, and storytelling.</p><a className="text-link" href="mailto:beautybytinu@gmail.com?subject=The%20Oasis%20Arch%20booking">Book this set <ArrowRight size={16} /></a></div></section>

        <section className="booking-banner"><div className="page-shell booking-inner"><div><span className="eyebrow">Ready when you are</span><h2>Bring your next<br /><em>idea to life.</em></h2></div><a className="button button-light" href="mailto:beautybytinu@gmail.com?subject=Creative%20space%20booking">Book your session <ArrowRight size={16} /></a></div></section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function App() {
  const [page, navigate] = usePage();

  return <div className="app"><Header page={page} navigate={navigate} />{page === 'creative-space' ? <CreativeSpacePage navigate={navigate} /> : <HomePage navigate={navigate} />}</div>;
}

export default App;
