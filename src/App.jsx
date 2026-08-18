import emailjs from '@emailjs/browser'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BarChart3, Building2, Check, ChevronRight, FileCheck2,
  Gauge, Leaf, Mail, MapPin, Menu, Phone, Quote,
  ShieldCheck, X, Zap,
} from 'lucide-react'
import './App.css'

const company = {
  name: 'E&E Concept',
  roleSk: 'Energetické poradenstvo pre budovy',
  roleEn: 'Building Energy Consulting',
  email: 'marekujhazi9@gmail.com',
  phone: '+421 944 375 589',
}

const servicesEn = [
  { icon: FileCheck2, title: 'Energy Performance Certificates', text: 'Clear, accurate certification prepared in line with current requirements for residential and non-residential properties.' },
  { icon: BarChart3, title: 'Building Energy Assessment', text: 'A detailed review of energy demand, building systems, fabric performance, and opportunities for measurable improvement.' },
  { icon: Gauge, title: 'Energy Efficiency Consulting', text: 'Independent technical guidance for property owners, architects, developers, and organizations at every project stage.' },
  { icon: Leaf, title: 'Energy-Saving Measure Design', text: 'Practical retrofit proposals focused on measurable primary-energy savings and realistic long-term operation.' },
  { icon: Building2, title: 'All Building Types', text: 'Support for houses, apartment buildings, commercial premises, and public buildings, both new and existing.' },
]

const servicesSk = [
  { icon: FileCheck2, title: 'Energetické certifikáty budov', text: 'Prehľadná a presná certifikácia vypracovaná podľa aktuálnych požiadaviek pre bytové aj nebytové budovy.' },
  { icon: BarChart3, title: 'Energetické hodnotenie budov', text: 'Podrobné posúdenie potreby energie, technických systémov, obalových konštrukcií a možností merateľného zlepšenia.' },
  { icon: Gauge, title: 'Poradenstvo v energetickej efektívnosti', text: 'Nezávislé technické poradenstvo pre vlastníkov, architektov, developerov a organizácie v každej fáze projektu.' },
  { icon: Leaf, title: 'Návrh úsporných opatrení', text: 'Praktické návrhy obnovy so zameraním na merateľné úspory primárnej energie a dlhodobo efektívnu prevádzku.' },
  { icon: Building2, title: 'Všetky typy budov', text: 'Podpora pre rodinné a bytové domy, komerčné priestory aj verejné budovy, nové aj existujúce.' },
]

const projectsEn = [
  {
    number: '01',
    type: 'Family House',
    title: 'Secovce - Sabados',
    measures: [
      'External wall insulation',
      'Ceiling insulation towards attic',
      'Replacement of windows and doors',
      'New heat source',
      'New distribution for heating and hot water',
    ],
    saving: 'Primary energy savings: 73%',
    oldImage: '/references/rd_secovce_sabados_old.jpg',
    newImage: '/references/rd_secovce_sabados.jpg',
  },
  {
    number: '02',
    type: 'Family House',
    title: 'Secovce - Janotik',
    measures: [
      'External wall insulation',
      'Roof structure insulation',
      'Ceiling insulation towards attic',
      'Replacement of windows and doors',
    ],
    saving: 'Primary energy savings: 65%',
    oldImage: '/references/rd_secovce_janotik_old.jpg',
    newImage: '/references/rd_secovce_janotik.jpg',
  },
  {
    number: '03',
    type: 'Family House',
    title: 'Secovce - Janotikova',
    measures: [
      'External wall insulation',
      'Ceiling insulation towards attic',
      'Replacement of windows and doors',
      'Heat source replacement',
    ],
    saving: 'Primary energy savings: 66%',
    oldImage: '/references/rd_secovce_janotikova_old.jpg',
    newImage: '/references/rd_secovce_janotikova.jpg',
  },
  {
    number: '04',
    type: 'Family House',
    title: 'Slivnik - Jurko',
    measures: [
      'External wall insulation',
      'Ceiling insulation towards attic',
      'Roof structure insulation',
      'Ground-floor slab insulation',
      'Replacement of windows and doors',
      'New heating and hot water system',
    ],
    saving: 'Primary energy savings: 75%',
    oldImage: '/references/rd_slivnik_jurko_old.jpg',
    newImage: '/references/rd_slivnik_jurko.jpg',
  },
  {
    number: '05',
    type: 'Family House',
    title: 'Nova Bana - Paucek',
    measures: [
      'External wall insulation',
      'Ceiling insulation towards attic',
      'Ground-floor slab insulation',
      'Replacement of windows and doors',
      'New heating and hot water system',
      'Photovoltaic system',
    ],
    saving: 'Primary energy savings: 95%',
    oldImage: '/references/rd_nova_bana_paucek_old.jpg',
    newImage: '/references/rd_nova_bana_paucek.jpg',
  },
]

const projectsSk = [
  {
    number: '01',
    type: 'Rodinný dom',
    title: 'Secovce - Sabados',
    measures: [
      'Zateplenie obvodového plášťa',
      'Zateplenie stropu do povaly',
      'Výmena výplní otvorov (okná, dvere)',
      'Nový zdroj tepla',
      'Nové rozvody pre systém vykurovania a prípravy teplej vody',
    ],
    saving: 'Úspora primárnej energie: 73%',
    oldImage: '/references/rd_secovce_sabados_old.jpg',
    newImage: '/references/rd_secovce_sabados.jpg',
  },
  {
    number: '02',
    type: 'Rodinný dom',
    title: 'Secovce - Janotik',
    measures: [
      'Zateplenie obvodového plášťa',
      'Zateplenie strešnej konštrukcie',
      'Zateplenie stropu do povaly',
      'Výmena výplní otvorov (okná, dvere)',
    ],
    saving: 'Úspora primárnej energie: 65%',
    oldImage: '/references/rd_secovce_janotik_old.jpg',
    newImage: '/references/rd_secovce_janotik.jpg',
  },
  {
    number: '03',
    type: 'Rodinný dom',
    title: 'Secovce - Janotikova',
    measures: [
      'Zateplenie obvodového plášťa',
      'Zateplenie stropu do povaly',
      'Výmena výplní otvorov (okná, dvere)',
      'Výmena zdroja tepla',
    ],
    saving: 'Úspora primárnej energie: 66%',
    oldImage: '/references/rd_secovce_janotikova_old.jpg',
    newImage: '/references/rd_secovce_janotikova.jpg',
  },
  {
    number: '04',
    type: 'Rodinný dom',
    title: 'Slivnik - Jurko',
    measures: [
      'Zateplenie obvodového plášťa',
      'Zateplenie stropu do povaly',
      'Zateplenie strešnej konštrukcie',
      'Zateplenie podlahy na teréne',
      'Výmena výplní otvorov (okná, dvere)',
      'Nový systém vykurovania a prípravy teplej vody',
    ],
    saving: 'Úspora primárnej energie: 75%',
    oldImage: '/references/rd_slivnik_jurko_old.jpg',
    newImage: '/references/rd_slivnik_jurko.jpg',
  },
  {
    number: '05',
    type: 'Rodinný dom',
    title: 'Nova Bana - Paucek',
    measures: [
      'Zateplenie obvodového plášťa',
      'Zateplenie stropu do povaly',
      'Zateplenie podlahy na teréne',
      'Výmena výplní otvorov (okná, dvere)',
      'Nový systém vykurovania a prípravy teplej vody',
      'Fotovoltaický systém',
    ],
    saving: 'Úspora primárnej energie: 95%',
    oldImage: '/references/rd_nova_bana_paucek_old.jpg',
    newImage: '/references/rd_nova_bana_paucek.jpg',
  },
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
    role: company.roleSk, nav: ['Domov', 'O nás', 'Služby', 'Referencie', 'Kontakt'], navIds: ['home', 'about', 'services', 'portfolio', 'contact'],
    consultation: 'Požiadať o konzultáciu', menu: 'Prepnúť navigáciu', mainNav: 'Hlavná navigácia', imageAlt: 'Fasáda modernej energeticky efektívnej budovy',
    heroEyebrow: 'Energetické poradenstvo · Košice a celé Slovensko', heroTitle: <>Energetická hospodárnosť<br />budov</>, heroCopy: 'Pomáhame vlastníkom nehnuteľností, developerom, architektom a firmám získať energetický certifikát, vykonať odborné hodnotenie budovy a navrhnúť opatrenia na zníženie energetickej náročnosti.', viewServices: 'Zobraziť služby', highlights: 'Hlavné výhody služieb', stats: [['Nezávislosť', 'Odborné poradenstvo'], ['Presnosť', 'Energetické hodnotenie'], ['Praktickosť', 'Efektívne riešenia']], explore: 'Objaviť', scroll: 'Prejsť na sekciu O nás',
    aboutLabel: '01 / O nás', aboutEyebrow: 'Spoľahlivé odborné znalosti, jasné výstupy', aboutTitle: 'Lepšia energetická hospodárnosť začína dôkladným pochopením budovy.', aboutLead: <>Spoločnosť <strong>{company.name}</strong> je mladá, dynamická firma s viac ako 5-ročnými skúsenosťami v oblasti energetického poradenstva pre budovy.</>, aboutP1: 'Pôsobíme predovšetkým v regióne Košíc, kde máme dlhoročné korene a dôkladnú znalosť miestneho trhu. Vďaka online forme spolupráce však poskytujeme naše služby klientom na celom Slovensku – rýchlo, flexibilne a bez zbytočných komplikácií.', aboutP2: 'Spájame technické znalosti s praktickým prístupom. Každému klientovi poskytujeme spoľahlivý obraz o energetickej hospodárnosti jeho budovy a jasné odporúčania, ktoré sa dajú reálne uplatniť.', values: ['Technická presnosť', 'Spoľahlivé dodanie', 'Jasné odporúčania'],
    servicesLabel: '02 / Služby', servicesEyebrow: 'Čomu sa venujeme', servicesTitle: 'Poradenstvo v energetickej efektívnosti', servicesIntro: 'Cielené technické služby pre rodinné domy, bytové domy, komerčné aj verejné budovy – od projektu cez predaj až po rekonštrukciu.', faqLabel: '05 / Časté otázky', faqEyebrow: 'Odpovede na vaše otázky', faqTitle: 'Čo potrebujete vedieť', faqIntro: 'Nájdite odpovede na najčastejšie otázky o energetickej certifikácii a hodnotení budov.', faqs: [{q:'Čo je energetický certifikát budovy?',a:'Energetický certifikát je odborný dokument, ktorý hodnotí energetickú hospodárnosť budovy a zaraďuje ju do energetickej triedy (A0 až G). Je povinný pri predaji, prenájme alebo kolaudácii nových budov a vydáva sa na základe výpočtu energetickej potreby budovy.'},{q:'Kedy je energetický certifikát povinný?',a:'Energetický certifikát je povinný pri predaji alebo prenájme budovy alebo jej časti, pri dokončení novostavby a pri väčšej obnove budovy. Povinnosti stanovuje zákon č. 555/2005 Z. z. o energetickej hospodárnosti budov v platnom znení.'},{q:'Aký je rozdiel medzi energetickým certifikátom a energetickým auditom?',a:'Energetický certifikát hodnotí celkovú energetickú hospodárnosť budovy a priraďuje jej energetickú triedu. Energetický audit je podrobnejšia analýza zameraná prevažne na väčšie budovy alebo podniky. E&E Concept sa zameriava na certifikáciu, hodnotenie a poradenstvo v energetickej hospodárnosti budov.'},{q:'Pre aké typy budov poskytujete služby?',a:'Pracujeme s rodinnými domami, bytovými domami, komerčnými priestormi, administratívnymi budovami aj verejnými budovami – novostavby aj existujúce budovy pred rekonštrukciou, predajom alebo kolaudáciou.'},{q:'Aké podklady budete potrebovať?',a:'Konkrétne podklady závisia od typu budovy a požadovanej služby. Zvyčajne ide o projektovú dokumentáciu alebo zameranie budovy, informácie o konštrukčných vrstvách a materiáloch a technické špecifikácie inštalovaných systémov (vykurovanie, vetranie, teplá voda). Presné požiadavky upresníme po prvom kontakte.'},{q:'Ako prebieha spolupráca?',a:'Po prvom kontakte zistíme, aký typ posúdenia potrebujete a aké podklady sú k dispozícii. Poskytneme vám odborné hodnotenie, výstupný dokument a vysvetlenie výsledkov. Väčšinu agendy vieme vyriešiť online, bez nutnosti osobnej návštevy.'},{q:'Ako dlho platí energetický certifikát?',a:'Energetický certifikát má platnosť 10 rokov, pokiaľ v medzičase nedôjde k väčšej obnove budovy, ktorá by výrazne zmenila jej energetickú hospodárnosť.'},{q:'Pôsobíte len v Košiciach?',a:'Primárne pôsobíme v regióne Košíc, kde máme dlhoročné zázemie. Vďaka online forme spolupráce však poskytujeme naše služby klientom na celom Slovensku – rýchlo a bez zbytočných komplikácií.'}],
    portfolioLabel: '03 / Referencie', portfolioEyebrow: 'Realizované návrhy úprav', portfolioTitle: 'Energetické hodnotenie budov v praxi', portfolioIntro: 'Vybrané referencie s navrhnutými opatreniami a dosiahnutou úsporou primárnej energie.', proposedChanges: 'Návrh úprav', previous: 'Predchádzajúca referencia', next: 'Nasledujúca referencia', before: 'Pred', after: 'Po',
    benefitsLabel: '04 / Prečo spolupracovať s nami', benefitsEyebrow: 'Istota v každej fáze', benefitsTitle: 'Odborné rady, ktoré môžete využiť.', benefitsIntro: 'Kvalitné energetické poradenstvo nie je iba o výpočtoch. Technické zistenia premieňame na jasné a užitočné ďalšie kroky.',
    contactEyebrow: 'Začnime rozhovor', contactTitle: 'Potrebujete energetický certifikát alebo hodnotenie budovy?', contactIntro: 'Ozvite sa nám a prediskutujeme váš projekt. Pôsobíme v Košiciach a vďaka online spolupráci obsluhujeme klientov po celom Slovensku.', email: 'E-mail', phone: 'Telefón', area: 'Oblasť pôsobenia', region: 'Košice a celé Slovensko', beforeAlt: 'stav pred obnovou', afterAlt: 'stav po obnove',
    formTitle: 'Povedzte nám o svojom projekte', formIntro: 'Odpovieme vám čo najskôr.', name: 'Meno', namePlaceholder: 'Vaše meno', message: 'Správa', messagePlaceholder: 'Stručne opíšte budovu a spôsob, akým vám môžeme pomôcť...', submit: 'Odoslať dopyt', sent: 'Ďakujeme. Váš dopyt bol zaznamenaný.', footer: 'Energetické certifikáty. Hodnotenia.', rights: 'Všetky práva vyhradené.',
    metaTitle: 'Energetická certifikácia budov Košice | E&E Concept', metaDescription: 'Energetický certifikát, hodnotenie a poradenstvo v energetickej hospodárnosti budov. Košice a celé Slovensko. Rodinné domy, byty, komerčné budovy.',
  },
  en: {
    role: company.roleEn, nav: ['Home', 'About Us', 'Services', 'References', 'Contact'], navIds: ['home', 'about', 'services', 'portfolio', 'contact'], consultation: 'Request a consultation', menu: 'Toggle navigation', mainNav: 'Main navigation', imageAlt: 'Contemporary energy-efficient building facade',
    heroEyebrow: 'Building energy expertise · Košice, Slovakia', heroTitle: <>Energy Performance<br />of Buildings</>, heroCopy: 'We help property owners, developers, architects, and businesses obtain energy performance certificates, assess their buildings, and identify practical measures to reduce energy demand.', viewServices: 'View services', highlights: 'Service highlights', stats: [['Independent', 'Technical advice'], ['Accurate', 'Energy documentation'], ['Practical', 'Efficiency solutions']], explore: 'Explore', scroll: 'Scroll to about section',
    aboutLabel: '01 / About Us', aboutEyebrow: 'Reliable expertise, clearly delivered', aboutTitle: 'Better-performing buildings begin with a clear understanding.', aboutLead: <><strong>{company.name}</strong> is a young, dynamic firm with over 5 years of experience in building energy consulting.</>, aboutP1: 'We are based primarily in the Košice region, where we have deep local roots and a strong understanding of the market. Through online collaboration, we serve clients across all of Slovakia — efficiently, flexibly, and without unnecessary complexity.', aboutP2: 'We combine technical expertise with a practical approach, giving each client a clear picture of their building\'s energy performance and actionable recommendations that work in real conditions.', values: ['Technical precision', 'Dependable delivery', 'Clear recommendations'],
    servicesLabel: '02 / Services', servicesEyebrow: 'What we do', servicesTitle: 'Energy Efficiency Consulting', servicesIntro: 'Focused technical services for family homes, apartment buildings, commercial and public buildings — from design and construction through to sale and renovation.', faqLabel: '05 / FAQ', faqEyebrow: 'Common questions', faqTitle: 'What you need to know', faqIntro: 'Answers to the most common questions about building energy certification and assessment.', faqs: [{q:'What is a building energy performance certificate?',a:'An energy performance certificate (EPC) is a formal document that rates a building\'s energy efficiency and classifies it into an energy class (A0 to G). It is required when selling, renting, or completing a new building, and is based on a calculated assessment of the building\'s energy demand.'},{q:'When is an energy performance certificate required?',a:'An EPC is required when selling or renting a building or part of a building, upon completion of a new building, and in the case of major renovation. Requirements are set by Slovak Act No. 555/2005 Coll. on building energy performance, as amended. [REQUIRES LEGAL VERIFICATION OF CURRENT REQUIREMENTS]'},{q:'What is the difference between an EPC and an energy audit?',a:'An energy performance certificate assesses overall building energy efficiency and assigns an energy class. An energy audit is a more detailed analysis typically required for larger buildings or enterprises. E&E Concept focuses on energy performance certification, assessment, and consulting.'},{q:'What types of buildings do you work with?',a:'We work with family houses, apartment buildings, commercial premises, administrative buildings, and public buildings — both new constructions and existing buildings undergoing renovation, sale, or planning approval.'},{q:'What documentation will you need?',a:'The specific documents depend on the building type and service required. Typically this includes project documentation or a building survey, details of construction layers and materials, and technical specifications of installed systems (heating, ventilation, hot water). We will confirm the exact requirements after your initial enquiry.'},{q:'How does the process work?',a:'After your initial contact, we establish what type of assessment you need and what documents are available. We then provide a technical assessment, the output document, and a clear explanation of the findings. Most of the process can be handled online.'},{q:'How long is an energy performance certificate valid?',a:'An energy performance certificate is valid for 10 years, unless a major renovation significantly changes the building\'s energy performance in the meantime. [REQUIRES LEGAL VERIFICATION]'},{q:'Do you operate outside Košice?',a:'Our primary base is the Košice region, but we serve clients across Slovakia through online collaboration. Get in touch and we\'ll confirm how we can help.'}], portfolioLabel: '03 / Selected work', portfolioEyebrow: 'Reference project types', portfolioTitle: 'Building Energy Assessment in Practice', portfolioIntro: 'Representative project categories. Replace these examples with your completed work, photography, and results.', example: 'example',
    benefitsLabel: '04 / Why work with us', benefitsEyebrow: 'Confidence at every stage', benefitsTitle: 'Professional advice you can act on.', benefitsIntro: 'Good energy consulting is not only about calculations. It is about turning technical evidence into a clear and useful next step.',
    contactEyebrow: 'Start a conversation', contactTitle: 'Need an energy certificate or building assessment?', contactIntro: 'Get in touch to discuss your project. Based in Košice, we serve clients across Slovakia through online collaboration.', email: 'Email', phone: 'Phone', area: 'Service area', region: 'Košice & Slovakia', beforeAlt: 'before renovation', afterAlt: 'after renovation',
    formTitle: 'Tell us about your project', formIntro: 'We will respond as soon as possible.', name: 'Name', namePlaceholder: 'Your name', message: 'Message', messagePlaceholder: 'Briefly describe the building and how we can help...', submit: 'Send enquiry', sent: 'Thank you. Your enquiry has been recorded.', footer: 'Energy certificates. Assessments. Practical efficiency.', rights: 'All rights reserved.', metaTitle: 'Building Energy Certificates & Assessment | E&E Concept Slovakia', metaDescription: 'Energy performance certificates, building assessments and efficiency consulting in Košice and across Slovakia. Family homes, apartments, commercial buildings.',
    proposedChanges: 'Proposed retrofit measures', previous: 'Previous reference', next: 'Next reference', before: 'Before', after: 'After',
  },
}

function App() {
  const [language, setLanguage] = useState('sk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [formError, setFormError] = useState(false)
  const [formSending, setFormSending] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)
  const formRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)
  const t = copy[language]
  const services = language === 'sk' ? servicesSk : servicesEn
  const projects = language === 'sk' ? projectsSk : projectsEn
  const benefits = language === 'sk' ? benefitsSk : benefitsEn

  useEffect(() => {
    setCurrentProject((prev) => (prev >= projects.length ? 0 : prev))
  }, [language, projects.length])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 7000)

    return () => clearInterval(intervalId)
  }, [projects.length])

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    setFormSent(false)
    setFormError(false)
    document.documentElement.lang = nextLanguage
    document.title = copy[nextLanguage].metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy[nextLanguage].metaDescription)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSending(true)
    setFormError(false)
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      .then(() => {
        setFormSent(true)
        formRef.current.reset()
      })
      .catch(() => setFormError(true))
      .finally(() => setFormSending(false))
  }

  const previousProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="E&E Concept domov">
          <span className="brand-mark"><img src="/ee-logo-transparent.png" alt="Logo firmy E&E Concept" /></span>
          <span><strong>{company.name.toUpperCase()}</strong><small>{t.role}</small></span>
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
            <div className="project-slideshow" aria-live="polite">
              <article className="project-card" key={projects[currentProject].number}>
                <div className="project-images">
                  <figure>
                    <img src={projects[currentProject].oldImage} alt={`${projects[currentProject].type} – ${projects[currentProject].title}, ${t.beforeAlt}`} />
                    <figcaption>{t.before}</figcaption>
                  </figure>
                  <figure>
                    <img src={projects[currentProject].newImage} alt={`${projects[currentProject].type} – ${projects[currentProject].title}, ${t.afterAlt}`} />
                    <figcaption>{t.after}</figcaption>
                  </figure>
                </div>
                <div className="project-shade" />
                <span className="project-number">{projects[currentProject].number}</span>
                <div className="project-copy">
                  <p className="project-measures-title">{t.proposedChanges}:</p>
                  <ul>
                    {projects[currentProject].measures.map((measure) => <li key={measure}>{measure}</li>)}
                  </ul>
                  <p className="project-saving">{projects[currentProject].saving}</p>
                </div>
              </article>
              <div className="slideshow-controls">
                <button type="button" className="slideshow-arrow" onClick={previousProject} aria-label={t.previous}><ArrowLeft size={18} /></button>
                <div className="slideshow-dots" role="tablist" aria-label="Project slides">
                  {projects.map((project, index) => (
                    <button
                      key={project.number}
                      type="button"
                      className={index === currentProject ? 'active' : ''}
                      aria-selected={index === currentProject}
                      onClick={() => setCurrentProject(index)}
                    />
                  ))}
                </div>
                <button type="button" className="slideshow-arrow" onClick={nextProject} aria-label={t.next}><ArrowRight size={18} /></button>
              </div>
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

        <section className="section faq-section" id="faq">
          <div className="section-label">{t.faqLabel}</div>
          <div className="section-intro">
            <div><p className="eyebrow"><span /> {t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div>
            <p>{t.faqIntro}</p>
          </div>
          <div className="faq-list">
            {t.faqs.map(({ q, a }) => (
              <details key={q} className="faq-item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow light"><span /> {t.contactEyebrow}</p><h2>{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
            <div className="contact-details">
              <a href={`mailto:${company.email}`}><Mail size={20} /><span><small>{t.email}</small>{company.email}</span></a>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}><Phone size={20} /><span><small>{t.phone}</small>{company.phone}</span></a>
              <div><MapPin size={20} /><span><small>{t.area}</small>{t.region}</span></div>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading"><Zap size={24} /><div><h3>{t.formTitle}</h3><p>{t.formIntro}</p></div></div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <label htmlFor="name">{t.name}</label><input id="name" name="name" type="text" placeholder={t.namePlaceholder} required />
              <label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" placeholder="vy@firma.sk" required />
              <label htmlFor="message">{t.message}</label><textarea id="message" name="message" rows="5" placeholder={t.messagePlaceholder} required />
              <button className="button button-primary form-button" type="submit" disabled={formSending}>{formSending ? '…' : <>{t.submit} <ArrowRight size={18} /></>}</button>
              {formSent && <p className="form-status" role="status"><Check size={17} /> {t.sent}</p>}
              {formError && <p className="form-status form-status--error" role="alert">{language === 'sk' ? `Odoslanie zlyhalo. Skúste nás kontaktovať priamo na ${company.email}.` : `Sending failed. Please email us directly at ${company.email}.`}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home"><span className="brand-mark"><img src="/ee-logo-transparent.png" alt="Logo firmy E&E Concept" /></span><span><strong>{company.name.toUpperCase()}</strong><small>{t.role}</small></span></a>
        <p>{t.footer}</p><span>© 2026 {company.name}. {t.rights}</span>
      </footer>
    </div>
  )
}

export default App
