import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Heart,
  HeartHandshake,
  Microscope,
  Music2,
  Palette,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'

type PassionKey = 'curiosidad' | 'arte' | 'musica' | 'ternura' | 'flores'

type Memory = {
  src: string
  alt: string
  note: string
}

const memories: Memory[] = [
  {
    src: '/fotos/recuerdo-01.jpeg',
    alt: 'Un retrato cercano de ella con sus lentes',
    note: 'Esa mirada que siempre quiero encontrar',
  },
  {
    src: '/fotos/recuerdo-02.jpeg',
    alt: 'El anillo de compromiso en su mano',
    note: 'El día que elegimos seguir caminando juntos',
  },
  {
    src: '/fotos/recuerdo-03.jpeg',
    alt: 'Una cena entre flores de colores',
    note: 'Una cita sencilla que guardo con cariño',
  },
  {
    src: '/fotos/recuerdo-04.jpeg',
    alt: 'Los dos abrazados, compartiendo un momento tranquilo',
    note: 'Mi lugar seguro también tiene tu abrazo',
  },
  {
    src: '/fotos/recuerdo-05.jpeg',
    alt: 'Nuestras manos juntas sobre la mesa',
    note: 'Me gusta todo lo que construimos, paso a paso',
  },
  {
    src: '/fotos/recuerdo-06.jpeg',
    alt: 'Ella descansando junto a mí',
    note: 'Hasta el silencio se siente bonito contigo',
  },
  {
    src: '/fotos/recuerdo-07.jpeg',
    alt: 'Ella riendo y cubriéndose el rostro en una cita',
    note: 'Tu risa es una de mis formas favoritas de alegría',
  },
]

const passions: { key: PassionKey; label: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    key: 'curiosidad',
    label: 'Ciencia',
    icon: Microscope,
    title: 'Tu curiosidad no le teme a lo diminuto',
    text: 'Me encanta que puedas encontrar fascinante un mundo que muchas personas ni siquiera se detienen a mirar. Tu amor por los parásitos habla de una mente curiosa, valiente y llena de preguntas.',
  },
  {
    key: 'arte',
    label: 'Arte',
    icon: Palette,
    title: 'Ves belleza donde otros no',
    text: 'Tu sensibilidad artística le agrega color a lo cotidiano. Admiro la forma en que te encanta la música, el dibujar, la pintura y todo lo que te permite expresarte. Quiero seguir aprendiendo de ti y de esa mirada tan especial.',
  },
  {
    key: 'musica',
    label: 'Violín',
    icon: Music2,
    title: 'Tienes magia en tus manos',
    text: 'Cada nota requiere paciencia, escucha y corazón. Me gusta verte dedicarte a algo que amas, y quiero seguir acompañándote mientras llenas el mundo de música, TÚ MÚSICA.',
  },
  {
    key: 'ternura',
    label: 'Cuidado',
    icon: HeartHandshake,
    title: 'Tu amor es inmenso',
    text: 'La forma en que quieres a los animales y buscas ayudar a los demás dice mucho de ti. No es algo pequeño: haces que quienes te rodean se sientan vistos y acompañados.',
  },
  {
    key: 'flores',
    label: 'Flores',
    icon: Flower2,
    title: 'Tienes un corazón de jardín',
    text: 'Me gusta que las flores te despierten tanta alegría. Ojalá nunca te falten colores, espacios para crear y tiempo para cuidar todo eso que te hace florecer, tu eres mi flor mas hermosa y delicada mi vida.',
  },
]

const reasons = [
  'Porque contigo puedo ser yo, con mis días luminosos y también los difíciles.',
  'Porque tu manera de cuidar a los demás hace más amable el mundo que compartimos.',
  'Porque admiro tus sueños y quiero hacerles espacio, nunca pedirte que los hagas pequeños.',
  'Porque respetarte también es escucharte, celebrar tus decisiones y crecer a tu lado.',
  'Porque hasta un momento sencillo se vuelve un recuerdo bonito cuando lo vivimos juntos.',
  'Porque te amo por quien eres, no por lo que haces por mí.',
]

function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [activePassion, setActivePassion] = useState<PassionKey>('curiosidad')
  const [reasonIndex, setReasonIndex] = useState(0)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const selectedPassion = passions.find((passion) => passion.key === activePassion) ?? passions[0]

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activePhoto === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') setActivePhoto((current: number | null) => ((current ?? 0) + 1) % memories.length)
      if (event.key === 'ArrowLeft') setActivePhoto((current: number | null) => ((current ?? 0) + memories.length - 1) % memories.length)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [activePhoto])

  const showNextReason = () => setReasonIndex((current: number) => (current + 1) % reasons.length)

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Ir al inicio">
          <span className="wordmark-icon"><Flower2 size={19} strokeWidth={1.7} /></span>
          <span>un jardín para dos</span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#carta">La carta</a>
          <a href="#admiro">Lo que admiro</a>
          <a href="#recuerdos">Recuerdos</a>
        </nav>
        <a className="header-heart" href="#promesa" aria-label="Ir a nuestra promesa"><Heart size={19} /></a>
      </header>

      <main>
        <section className="hero section-wrap" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> PARA MI PROMETIDA, CON TODO MI AMOR</p>
            <h1>A ti, que haces <em>florecer</em> hasta lo pequeño.</h1>
            <p className="hero-intro">Quería regalarte algo que pudieras recorrer despacito: como un paseo por nuestros recuerdos y por todas las cosas que hacen que te admire tanto.</p>
            <a className="text-link" href="#carta">Hay una carta esperándote <ArrowDown size={17} /></a>
            <div className="hero-signature"><span>con amor,</span><Heart size={17} fill="currentColor" /><span>siempre</span></div>
          </div>
          <div className="hero-portrait">
            <img src="/fotos/recuerdo-04.jpeg" alt="Un abrazo nuestro, de esos en los que todo se siente en calma" />
            <div className="photo-stamp"><Flower2 size={25} /><span>mi hogar<br />eres tú</span></div>
            <div className="portrait-note"><span>un instante nuestro</span><span>♥</span></div>
            <div className="hero-side-note">hecho con cariño<br />en cada detalle</div>
          </div>
          <a className="scroll-cue" href="#carta" aria-label="Deslizar hacia la carta"><span>DESLIZA DESPACITO</span><ArrowDown size={16} /></a>
        </section>

        <section className="letter-section section-wrap" id="carta">
          <div className="section-heading reveal">
            <p className="eyebrow"><span className="section-number">01</span> ALGO QUE QUIERO DECIRTE</p>
            <h2>Una carta hecha <em>para ti.</em></h2>
          </div>
          <div className={`letter-layout reveal ${isLetterOpen ? 'letter-is-open' : ''}`}>
            <div className="letter-aside">
              <span className="handwritten">abre cuando quieras</span>
              <div className="leaf-doodle" aria-hidden="true"><Flower2 size={54} strokeWidth={1} /></div>
              <p>No tienes que contestar nada. Solo quería que supieras lo que vive aquí.</p>
            </div>
            <article className="letter-paper">
              {!isLetterOpen ? (
                <button className="letter-seal" onClick={() => setIsLetterOpen(true)} aria-label="Abrir la carta">
                  <span className="seal-flower"><Flower2 size={30} strokeWidth={1.3} /></span>
                  <span className="seal-copy">abrir<br />mi carta</span>
                  <span className="seal-hint">toca aquí <ArrowUpRight size={14} /></span>
                </button>
              ) : (
                <div className="letter-content" aria-live="polite">
                  <button className="letter-close" onClick={() => setIsLetterOpen(false)} aria-label="Cerrar la carta"><X size={17} /></button>
                  <p className="letter-greeting">Mi amor,</p>
                  <p>Hay tantas cosas que amo de ti que a veces no sé por dónde empezar. Amo tu curiosidad, la forma en que te emocionan las flores, el arte, los animales y ese universo diminuto que tanto te gusta descubrir.</p>
                  <p>Pero, sobre todo, amo a la persona que eres: sensible, generosa, llena de intereses propios y de una luz que no necesita parecerse a la de nadie.</p>
                  <p>Quiero que a mi lado te sientas amada y, también, respetada. Quiero escucharte de verdad, cuidar tus tiempos, apoyar lo que sueñas y caminar contigo como tu compañero. No quiero apagar nada de lo que te hace ser tú; quiero aprender a cuidar todo eso contigo.</p>
                  <p>Gracias por elegirme y por dejarme construir un futuro a tu lado. Mi promesa no es que todo será perfecto: es que seguiré eligiéndote con ternura, honestidad y respeto, también en los días ordinarios.</p>
                  <p className="letter-closing">Te amo, hoy y en cada mañana que nos espera.<br /><span>Tu futuro esposo <Heart size={15} fill="currentColor" /></span></p>
                </div>
              )}
            </article>
          </div>
        </section>

        <section className="admire-section" id="admiro">
          <div className="section-wrap admire-inner">
            <div className="admire-heading reveal">
              <p className="eyebrow"><span className="section-number">02</span> TU MUNDO, TAN TUYO</p>
              <h2>Me encanta todo lo que te <em>enciende.</em></h2>
              <p>Hay muchas formas de conocerte. Elige una y te cuento algo que admiro de ti.</p>
            </div>
            <div className="passion-explorer reveal">
              <div className="passion-tabs" role="tablist" aria-label="Cosas que admiro de ti">
                {passions.map(({ key, label, icon: Icon }) => (
                  <button
                    className={`passion-tab ${activePassion === key ? 'is-active' : ''}`}
                    key={key}
                    id={`tab-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={activePassion === key}
                    aria-controls="passion-panel"
                    onClick={() => setActivePassion(key)}
                  >
                    <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
                  </button>
                ))}
              </div>
              <article className="passion-panel" id="passion-panel" role="tabpanel" aria-labelledby={`tab-${selectedPassion.key}`} key={selectedPassion.key}>
                <span className="panel-icon"><selectedPassion.icon size={29} strokeWidth={1.45} /></span>
                <p className="panel-kicker">UNA DE LAS MIL COSAS QUE ADMIRO</p>
                <h3>{selectedPassion.title}</h3>
                <p>{selectedPassion.text}</p>
                <Sparkles className="panel-sparkle" size={19} />
              </article>
              <div className="passion-footnote"><span>y hay muchísimo más de ti que amo</span><Heart size={15} fill="currentColor" /></div>
            </div>
          </div>
        </section>

        <section className="memories-section section-wrap" id="recuerdos">
          <div className="memories-heading reveal">
            <div>
              <p className="eyebrow"><span className="section-number">03</span> PEQUEÑOS TESOROS</p>
              <h2>Nosotros, en <em>momentos.</em></h2>
            </div>
            <p>Algunas fotos guardan un día entero<br />en un solo pedacito de luz.</p>
          </div>
          <div className="memory-grid reveal">
            {memories.map((memory, index) => (
              <button className={`memory-photo memory-photo-${index + 1}`} key={memory.src} onClick={() => setActivePhoto(index)} aria-label={`Ampliar foto: ${memory.note}`}>
                <img src={memory.src} alt={memory.alt} loading="lazy" />
                <span className="memory-caption">{memory.note}</span>
                <span className="photo-expand" aria-hidden="true"><ArrowUpRight size={17} /></span>
              </button>
            ))}
          </div>
          <p className="gallery-hint"><span>TOCA CUALQUIER FOTO PARA MIRARLA DE CERCA</span><span>01 — 07</span></p>
        </section>

        <section className="reasons-section">
          <div className="section-wrap reasons-inner reveal">
            <div className="reasons-flower"><Flower2 size={57} strokeWidth={1.15} /></div>
            <p className="eyebrow"><span className="section-number">04</span> UNA RAZÓN MÁS</p>
            <h2>Podría pasarme la vida encontrando <em>razones.</em></h2>
            <blockquote key={reasonIndex}>“{reasons[reasonIndex]}”</blockquote>
            <button className="reason-button" type="button" onClick={showNextReason}>Otra razón <Heart size={16} /></button>
            <span className="reason-counter">{String(reasonIndex + 1).padStart(2, '0')} / {String(reasons.length).padStart(2, '0')}</span>
          </div>
        </section>

        <section className="promise-section section-wrap" id="promesa">
          <div className="promise-image reveal">
            <img src="/fotos/recuerdo-02.jpeg" alt="Su anillo de compromiso, un símbolo de nuestra promesa" loading="lazy" />
            <span>un sí que sigue creciendo</span>
          </div>
          <div className="promise-copy reveal">
            <p className="eyebrow"><span className="section-number">05</span> LO QUE TE PROMETO</p>
            <h2>Que nunca tengas que hacerte <em>más pequeña</em> para caber en mi vida.</h2>
            <p>Quiero un amor en el que podamos ser nosotros mismos, acompañarnos sin perdernos y cuidarnos sin dejar de crecer. Gracias por ser mi persona favorita para imaginar todo lo que viene.</p>
            <a className="text-link" href="#inicio">Volver al principio <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-flower"><Flower2 size={20} /></div>
        <p>Con todo mi amor, para ti.</p>
        <span>SIEMPRE EN EL MISMO EQUIPO <Heart size={13} fill="currentColor" /></span>
      </footer>

      {activePhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería de recuerdos" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePhoto(null) }}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Cerrar galería"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev" onClick={() => setActivePhoto((activePhoto + memories.length - 1) % memories.length)} aria-label="Foto anterior"><ChevronLeft size={25} /></button>
          <figure className="lightbox-figure">
            <img src={memories[activePhoto].src} alt={memories[activePhoto].alt} />
            <figcaption><span>{memories[activePhoto].note}</span><span>{String(activePhoto + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}</span></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" onClick={() => setActivePhoto((activePhoto + 1) % memories.length)} aria-label="Foto siguiente"><ChevronRight size={25} /></button>
        </div>
      )}
    </>
  )
}

export default App