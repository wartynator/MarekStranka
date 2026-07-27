import { useState } from 'react'
import {
  ArrowRight, BarChart3, Building2, Check, ChevronRight, FileCheck2,
  FileText, Gauge, Leaf, Mail, MapPin, Menu, Phone, Quote,
  ShieldCheck, X, Zap,
} from 'lucide-react'
import './App.css'

const servicesEn = [
  { icon: FileCheck2, title: 'Energy Performance Certificates', text: 'Clear, accurate certification prepared in line with current requirements for residential and non-residential properties.' },
  { icon: BarChart3, title: 'Building Energy Assessment', text: 'A detailed review of energy demand, building systems, fabric performance, and opportunities for measurable improvement.' },
  { icon: Gauge, title: 'Energy Efficiency Consulting', text: 'Independent technical guidance for property owners, architects, developers, and organizations at every project stage.' },
  { icon: Leaf, title: 'Consumption Reduction', text: 'Practical recommendations prioritized by impact, investment level, and realistic long-term energy savings.' },
  { icon: Building2, title: 'All Building Types', text: 'Support for houses, apartment buildings, commercial premises, and public buildings, both new and existing.' },
  { icon: FileText, title: 'Technical Documentation', text: 'Well-structured calculations, documentation, and technical reports that are easy to review and ready to use.' },
]

const servicesSk = [
  { icon: FileCheck2, title: 'Energetické certifikáty budov', text: 'Prehľadná a presná certifikácia vypracovaná podľa aktuálnych požiadaviek pre bytové aj nebytové budovy.' },
  { icon: BarChart3, title: 'Energetické hodnotenie budov', text: 'Podrobné posúdenie potreby energie, technických systémov, obalových konštrukcií a možností merateľného zlepšenia.' },
  { icon: Gauge, title: 'Poradenstvo v energetickej efektívnosti', text: 'Nezávislé technické poradenstvo pre vlastníkov, architektov, developerov a organizácie v každej fáze projektu.' },
  { icon: Leaf, title: 'Znižovanie spotreby energie', text: 'Praktické odporúčania zoradené podľa prínosu, potrebnej investície a reálnych dlhodobých úspor.' },
  { icon: Building2, title: 'Všetky typy budov', text: 'Podpora pre rodinné a bytové domy, komerčné priestory aj verejné budovy, nové aj existujúce.' },
  { icon: FileText, title: 'Technická dokumentácia', text: 'Prehľadné výpočty, dokumentácia a technické správy pripravené na kontrolu aj praktické použitie.' },
]

const projectsEn = [
  { number: '01', type: 'Residential', title: 'Low-energy family homes', text: 'Energy assessment and certification for new-build and existing single-family homes.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { number: '02', type: 'Multi-residential', title: 'Apartment buildings', text: 'Whole-building analysis focused on envelope performance and shared technical systems.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85' },
  { number: '03', type: 'Commercial', title: 'Efficient workplaces', text: 'Assessment and optimization strategies for offices, retail, and mixed-use buildings.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85' },
  { number: '04', type: 'Renovation', title: 'Energy retrofit projects', text: 'Option studies that compare renovation measures and identify the most effective path forward.', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=85' },
  { number: '05', type: 'Certification', title: 'Compliance documentation', text: 'Reliable energy certificates and technical reports for handover, sale, rental, or approval.', image: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&w=1200&q=85' },
]

const projectsSk = [
  { number: '01', type: 'Rodinné domy', title: 'Nízkoenergetické rodinné domy', text: 'Energetické hodnotenie a certifikácia nových aj existujúcich rodinných domov.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { number: '02', type: 'Bytové budovy', title: 'Bytové domy', text: 'Komplexná analýza budovy so zameraním na obalové konštrukcie a spoločné technické systémy.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85' },
  { number: '03', type: 'Komerčné budovy', title: 'Efektívne pracoviská', text: 'Hodnotenie a optimalizačné stratégie pre kancelárie, prevádzky a polyfunkčné budovy.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85' },
  { number: '04', type: 'Obnova', title: 'Projekty energetickej obnovy', text: 'Porovnanie variantov obnovy a určenie najefektívnejšieho postupu pre konkrétnu budovu.', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=85' },
  { number: '05', type: 'Certifikácia', title: 'Dokumentácia súladu', text: 'Spoľahlivé energetické certifikáty a technické správy pre kolaudáciu, predaj, prenájom či schvaľovanie.', image: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&w=1200&q=85' },
]

const benefitsEn = [
  ['Professional approach', 'Careful work, dependable delivery, and attention to every technical detail.'],
  ['Clear communication', 'Complex findings explained in direct language so you can make informed decisions.'],
  ['Accurate documentation', 'Thorough calculations and reports prepared for practical use and formal requirements.'],
  ['Practical recommendations', 'Realistic measures suited to the building, budget, and long-term objectives.'],
  ['Standards expertise', 'Current knowledge of building energy performance principles and applicable standards.'],
]

const benefitsSk = [
  ['Profesionálny prístup', 'Dôsledná práca, spoľahlivé dodanie a pozornosť venovaná každému technickému detailu.'],
  ['Zrozumiteľná komunikácia', 'Komplexné zistenia vysvetlené priamo, aby ste sa mohli rozhodovať s istotou.'],
  ['Presná dokumentácia', 'Dôkladné výpočty a správy pripravené na praktické použitie aj splnenie formálnych požiadaviek.'],
  ['Praktické odporúčania', 'Realistické opatrenia prispôsobené budove, rozpočtu a dlhodobým cieľom.'],
  ['Znalosť noriem', 'Aktuálne znalosti princípov energetickej hospodárnosti budov a platných noriem.'],
]

const copy = {
  sk: {
    role: 'Špecialista na energetiku budov', nav: ['Domov', 'O mne', 'Služby', 'Referencie', 'Kontakt'], navIds: ['home', 'about', 'services', 'portfolio', 'contact'],
    consultation: 'Požiadať o konzultáciu', menu: 'Prepnúť navigáciu', mainNav: 'Hlavná navigácia', imageAlt: 'Fasáda modernej energeticky efektívnej budovy',
    heroEyebrow: 'Nezávislé odborné poradenstvo', heroTitle: <>Energetická hospodárnosť<br />budov</>, heroCopy: 'Pomáham vlastníkom, developerom, architektom a firmám porozumieť energetickej hospodárnosti budov, zvýšiť ich efektívnosť a prijímať správne rozhodnutia.', viewServices: 'Zobraziť služby', highlights: 'Hlavné výhody služieb', stats: [['Nezávislosť', 'Odborné poradenstvo'], ['Presnosť', 'Energetická dokumentácia'], ['Praktickosť', 'Efektívne riešenia']], explore: 'Objaviť', scroll: 'Prejsť na sekciu O mne',
    aboutLabel: '01 / O mne', aboutEyebrow: 'Spoľahlivé odborné znalosti, jasné výstupy', aboutTitle: 'Lepšia energetická hospodárnosť začína dôkladným pochopením budovy.', aboutLead: <>Som <strong>Marek Ujhazi</strong>, nezávislý konzultant so zameraním na energetickú hospodárnosť budov.</>, aboutP1: 'Spájam technické znalosti s praktickým a priamym prístupom. Klientom poskytujem spoľahlivý obraz o fungovaní budovy, spotrebe energie a opatreniach s najväčším prínosom.', aboutP2: 'Od prvotného posúdenia až po finálnu dokumentáciu sa zameriavam na efektívne riešenia v súlade s predpismi a skutočnými podmienkami každej budovy.', values: ['Technická presnosť', 'Spoľahlivé dodanie', 'Jasné odporúčania'],
    servicesLabel: '02 / Služby', servicesEyebrow: 'Čomu sa venujem', servicesTitle: 'Poradenstvo v energetickej efektívnosti', servicesIntro: 'Cielené technické služby pre lepšie rozhodnutia pri projektovaní, výstavbe, obnove, predaji aj prevádzke budov.',
    portfolioLabel: '03 / Vybrané projekty', portfolioEyebrow: 'Typy referenčných projektov', portfolioTitle: 'Energetické hodnotenie budov v praxi', portfolioIntro: 'Ukážkové kategórie projektov. Nahraďte ich vlastnými realizáciami, fotografiami a dosiahnutými výsledkami.', example: 'ukážka',
    benefitsLabel: '04 / Prečo spolupracovať so mnou', benefitsEyebrow: 'Istota v každej fáze', benefitsTitle: 'Odborné rady, ktoré môžete využiť.', benefitsIntro: 'Kvalitné energetické poradenstvo nie je iba o výpočtoch. Technické zistenia premieňam na jasné a užitočné ďalšie kroky.',
    contactEyebrow: 'Začnime rozhovor', contactTitle: 'Zlepšime energetickú hospodárnosť vašej budovy.', contactIntro: 'Ozvite sa mi a prediskutujeme váš projekt, potrebnú dokumentáciu alebo najlepší spôsob zníženia energetickej náročnosti budovy.', email: 'E-mail', phone: 'Telefón', area: 'Oblasť pôsobenia', region: '[Vaše mesto / región]',
    formTitle: 'Povedzte mi o svojom projekte', formIntro: 'Odpoviem vám čo najskôr.', name: 'Meno', namePlaceholder: 'Vaše meno', message: 'Správa', messagePlaceholder: 'Stručne opíšte budovu a spôsob, akým vám môžem pomôcť...', submit: 'Odoslať dopyt', sent: 'Ďakujem. Váš dopyt bol zaznamenaný.', footer: 'Energetické certifikáty. Hodnotenia. Praktická efektívnosť.', rights: 'Všetky práva vyhradené.',
    metaTitle: 'Marek Ujhazi | Energetická hospodárnosť budov', metaDescription: 'Nezávislý konzultant pre energetické certifikáty, hodnotenie budov, energetickú efektívnosť a technickú dokumentáciu.',
  },
  en: {
    role: 'Building Energy Consultant', nav: ['Home', 'About', 'Services', 'Portfolio', 'Contact'], navIds: ['home', 'about', 'services', 'portfolio', 'contact'], consultation: 'Request a consultation', menu: 'Toggle navigation', mainNav: 'Main navigation', imageAlt: 'Contemporary energy-efficient building facade',
    heroEyebrow: 'Independent building energy expertise', heroTitle: <>Energy Performance<br />of Buildings</>, heroCopy: 'I help property owners, developers, architects, and businesses understand performance, improve efficiency, and make confident energy decisions.', viewServices: 'View services', highlights: 'Service highlights', stats: [['Independent', 'Technical advice'], ['Accurate', 'Energy documentation'], ['Practical', 'Efficiency solutions']], explore: 'Explore', scroll: 'Scroll to about section',
    aboutLabel: '01 / About', aboutEyebrow: 'Reliable expertise, clearly delivered', aboutTitle: 'Better-performing buildings begin with a clear understanding.', aboutLead: <>I am <strong>Marek Ujhazi</strong>, an independent consultant specializing in the energy performance of buildings.</>, aboutP1: 'I combine technical knowledge with a practical, straightforward approach. My work gives clients a reliable view of how their building performs, where energy is being used, and which improvements will make the greatest difference.', aboutP2: 'From initial assessment to final documentation, I focus on solutions that are efficient, regulation-compliant, and appropriate for the real conditions of each building.', values: ['Technical precision', 'Dependable delivery', 'Clear recommendations'],
    servicesLabel: '02 / Services', servicesEyebrow: 'What I do', servicesTitle: 'Energy Efficiency Consulting', servicesIntro: 'Focused technical services to support better decisions through design, construction, renovation, sale, and operation.', portfolioLabel: '03 / Selected work', portfolioEyebrow: 'Reference project types', portfolioTitle: 'Building Energy Assessment in Practice', portfolioIntro: 'Representative project categories. Replace these examples with your completed work, photography, and results.', example: 'example',
    benefitsLabel: '04 / Why work with me', benefitsEyebrow: 'Confidence at every stage', benefitsTitle: 'Professional advice you can act on.', benefitsIntro: 'Good energy consulting is not only about calculations. It is about turning technical evidence into a clear and useful next step.', contactEyebrow: 'Start a conversation', contactTitle: "Let's improve your building's performance.", contactIntro: "Get in touch to discuss your project, required documentation, or the best way to reduce your building's energy demand.", email: 'Email', phone: 'Phone', area: 'Service area', region: '[Your City / Region]', formTitle: 'Tell me about your project', formIntro: 'I will respond as soon as possible.', name: 'Name', namePlaceholder: 'Your name', message: 'Message', messagePlaceholder: 'Briefly describe the building and how I can help...', submit: 'Send enquiry', sent: 'Thank you. Your enquiry has been recorded.', footer: 'Energy certificates. Assessments. Practical efficiency.', rights: 'All rights reserved.', metaTitle: 'Marek Ujhazi | Energy Performance of Buildings', metaDescription: 'Independent building energy consultant providing energy certificates, building assessments, efficiency consulting, and technical documentation.',
  },
}

function App() {
  const [language, setLanguage] = useState('sk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const t = copy[language]
  const services = language === 'sk' ? servicesSk : servicesEn
  const projects = language === 'sk' ? projectsSk : projectsEn
  const benefits = language === 'sk' ? benefitsSk : benefitsEn

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    setFormSent(false)
    document.documentElement.lang = nextLanguage
    document.title = copy[nextLanguage].metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy[nextLanguage].metaDescription)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSent(true)
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Marek Ujhazi domov">
          <span className="brand-mark"><Building2 size={24} strokeWidth={1.8} /></span>
          <span><strong>MAREK UJHAZI</strong><small>{t.role}</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label={t.mainNav}>
          {t.nav.map((item, index) => <a key={t.navIds[index]} href={`#${t.navIds[index]}`} onClick={closeMenu}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label="Language / Jazyk">{['sk', 'en'].map((code) => <button key={code} type="button" className={language === code ? 'active' : ''} onClick={() => changeLanguage(code)} aria-pressed={language === code}>{code.toUpperCase()}</button>)}</div>
          <a className="header-cta" href="#contact">{t.consultation} <ArrowRight size={17} /></a>
        </div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={t.menu}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-image" role="img" aria-label={t.imageAlt} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow light"><span /> {t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t.consultation} <ArrowRight size={18} /></a>
              <a className="button button-ghost" href="#services">{t.viewServices} <ChevronRight size={18} /></a>
            </div>
          </div>
          <div className="hero-stats" aria-label={t.highlights}>
            {t.stats.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}
          </div>
          <a className="scroll-cue" href="#about" aria-label={t.scroll}><span>{t.explore}</span><i /></a>
        </section>

        <section className="section about-section" id="about">
          <div className="section-label">{t.aboutLabel}</div>
          <div className="about-heading">
            <p className="eyebrow"><span /> {t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
          </div>
          <div className="about-content">
            <p className="lead">{t.aboutLead}</p>
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
            <div className="about-values">
              {t.values.map((value) => <span key={value}><Check size={17} /> {value}</span>)}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-label">{t.servicesLabel}</div>
          <div className="section-intro">
            <div><p className="eyebrow"><span /> {t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2></div>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="service-item" key={title}><span className="service-number">0{index + 1}</span><Icon className="service-icon" size={29} strokeWidth={1.6} /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="portfolio">
          <div className="portfolio-inner">
            <div className="section-label light-label">{t.portfolioLabel}</div>
            <div className="section-intro portfolio-heading">
              <div><p className="eyebrow light"><span /> {t.portfolioEyebrow}</p><h2>{t.portfolioTitle}</h2></div>
              <p>{t.portfolioIntro}</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <img src={project.image} alt={`${project.title} – ${t.example}`} /><div className="project-shade" /><span className="project-number">{project.number}</span>
                  <div className="project-copy"><span>{project.type}</span><h3>{project.title}</h3><p>{project.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section benefits-section" id="benefits">
          <div className="section-label">{t.benefitsLabel}</div>
          <div className="benefits-layout">
            <div className="benefits-sticky">
              <p className="eyebrow"><span /> {t.benefitsEyebrow}</p><h2>{t.benefitsTitle}</h2>
              <p>{t.benefitsIntro}</p><Quote size={42} strokeWidth={1.3} />
            </div>
            <div className="benefit-list">
              {benefits.map(([title, text], index) => (
                <div className="benefit-item" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div><ShieldCheck size={24} strokeWidth={1.5} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow light"><span /> {t.contactEyebrow}</p><h2>{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
            <div className="contact-details">
              <a href="mailto:your.email@example.com"><Mail size={20} /><span><small>{t.email}</small>your.email@example.com</span></a>
              <a href="tel:+000000000000"><Phone size={20} /><span><small>{t.phone}</small>+00 000 000 000</span></a>
              <div><MapPin size={20} /><span><small>{t.area}</small>{t.region}</span></div>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading"><Zap size={24} /><div><h3>{t.formTitle}</h3><p>{t.formIntro}</p></div></div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">{t.name}</label><input id="name" name="name" type="text" placeholder={t.namePlaceholder} required />
              <label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" placeholder="vy@firma.sk" required />
              <label htmlFor="message">{t.message}</label><textarea id="message" name="message" rows="5" placeholder={t.messagePlaceholder} required />
              <button className="button button-primary form-button" type="submit">{t.submit} <ArrowRight size={18} /></button>
              {formSent && <p className="form-status" role="status"><Check size={17} /> {t.sent}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home"><span className="brand-mark"><Building2 size={24} strokeWidth={1.8} /></span><span><strong>MAREK UJHAZI</strong><small>{t.role}</small></span></a>
        <p>{t.footer}</p><span>© 2026 Marek Ujhazi. {t.rights}</span>
      </footer>
    </div>
  )
}

export default App
