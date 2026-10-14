const memories = [
  { note: 'Esta foto siempre me saca una sonrisa', alt: 'Un retrato cercano de ella con sus lentes' },
  { note: 'Nuestro sí, y todo lo que seguimos construyendo', alt: 'El anillo de compromiso en su mano' },
  { note: 'Una salida contigo que todavía recuerdo con cariño', alt: 'Una cena entre flores de colores' },
  { note: 'Ese abrazo que siempre quiero repetir', alt: 'Los dos abrazados, compartiendo un momento tranquilo' },
  { note: 'Nuestras manos juntas, como tantas veces', alt: 'Nuestras manos juntas sobre la mesa' },
  { note: 'Un momento tranquilo de esos que disfruto contigo', alt: 'Ella descansando junto a mí' },
  { note: 'Tu risa. De verdad, podría escucharla todo el día', alt: 'Ella riendo y cubriéndose el rostro en una cita' },
].map((memory, index) => ({ ...memory, src: `./public/fotos/recuerdo-${String(index + 1).padStart(2, '0')}.jpeg` }))

const passions = {
  ciencia: {
    icon: '⌕',
    title: 'Tu curiosidad no le teme a lo diminuto',
    text: 'Me gusta escucharte contar lo que vas descubriendo de los parásitos. Se nota cuánto te interesa entenderlos, incluso en sus detalles más pequeños. Me encanta esa parte tuya, y también que siempre me termines enseñando algo nuevo.',
  },
  arte: {
    icon: '◈',
    title: 'Ves belleza donde otros no',
    text: 'Me gusta cómo te tomas el tiempo de mirar, crear y encontrar algo que te llame la atención. Me encanta que tengas tus propios gustos e ideas, y quiero seguir escuchando qué te gusta de cada obra o de cada cosa que haces.',
  },
  violin: {
    icon: '♫',
    title: 'Tienes magia en tus manos',
    text: 'Sé que aprender violín requiere práctica y paciencia, y me gusta que sigas dedicándole tiempo a algo que disfrutas. Quiero escucharte tocar cuando quieras compartirlo conmigo, desde una melodía nueva hasta esos ratitos de práctica.',
  },
  animales: {
    icon: '♡',
    title: 'Tu amor es inmenso',
    text: 'Me gusta lo pendiente que estás de los gatos y de los animales, y que también busques ayudar a las personas cuando puedes. Esa forma de preocuparte por otros es una de las cosas que más quiero de ti. Yo también quiero acompañarte en eso el resto de mi vida.',
  },
  flores: {
    icon: '✿',
    title: 'Tienes un corazon de jardín',
    text: 'Ya sé cuánto te gustan las flores, y me gusta que algo tan sencillo te alegre el día. Quiero seguir aprendiendo cuáles son tus favoritas, regalarte algunas sin esperar una fecha especial y llenar la casa de plantas contigo.',
  },
}

const reasons = [
  'Porque incluso cuando tenemos un problema, mi amor por ti sigue aquí y quiero encontrar contigo la forma de salir adelante.',
  'Porque me gusta cómo cuidas a los demás, y quiero que también sepas que puedes contar conmigo.',
  'Porque tus sueños me importan. Quiero apoyarte sin pedirte que dejes de ser tú.',
  'Porque te respeto: quiero escucharte, tomar en cuenta lo que sientes y hablar con honestidad.',
  'Porque me acuerdo con cariño de nuestro 25/07 y de todo lo que hemos compartido desde entonces.',
  'Porque me emociona imaginar nuestra familia y esos nombres que elegimos: Adhara, Elian y Kyomi.',
  'Porque te amo también en un día cualquiera, sin una ocasión especial ni una razón que demostrar.',
  'Porque sigo queriendo construir contigo, con paciencia, cariño y trabajo en equipo.',
]

const memoryGrid = document.querySelector('#memory-grid')
const lightbox = document.querySelector('#lightbox')
const lightboxImage = document.querySelector('#lightbox-image')
const lightboxCaption = document.querySelector('#lightbox-caption')
const lightboxCount = document.querySelector('#lightbox-count')
let activePhoto = 0
let previousFocus = null

memoryGrid.innerHTML = memories.map((memory, index) => `
  <button class="memory-photo memory-photo-${index + 1}" type="button" aria-label="Ampliar foto: ${memory.note}">
    <img src="${memory.src}" alt="${memory.alt}" loading="lazy" />
    <span class="memory-caption">${memory.note}</span>
    <span class="photo-expand" aria-hidden="true">↗</span>
  </button>
`).join('')

const revealElements = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.14 })

  revealElements.forEach((element) => revealObserver.observe(element))
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'))
}

const letterToggle = document.querySelector('#letter-toggle')
const letterContent = document.querySelector('#letter-content')
const letterLayout = document.querySelector('#letter-layout')

function setLetterOpen(isOpen) {
  letterContent.hidden = !isOpen
  letterToggle.hidden = isOpen
  letterToggle.setAttribute('aria-expanded', String(isOpen))
  letterLayout.classList.toggle('letter-is-open', isOpen)
  if (isOpen) document.querySelector('#letter-close').focus()
  else letterToggle.focus()
}

letterToggle.addEventListener('click', () => setLetterOpen(true))
document.querySelector('#letter-close').addEventListener('click', () => setLetterOpen(false))

const passionTabs = [...document.querySelectorAll('.passion-tab')]
const panelIcon = document.querySelector('#panel-icon')
const panelTitle = document.querySelector('#panel-title')
const panelText = document.querySelector('#panel-text')

function selectPassion(tab) {
  const passion = passions[tab.dataset.passion]
  passionTabs.forEach((item) => {
    const isSelected = item === tab
    item.classList.toggle('is-active', isSelected)
    item.setAttribute('aria-selected', String(isSelected))
    item.tabIndex = isSelected ? 0 : -1
  })
  panelIcon.textContent = passion.icon
  panelTitle.textContent = passion.title
  panelText.textContent = passion.text
  const panel = document.querySelector('#passion-panel')
  panel.style.animation = 'none'
  requestAnimationFrame(() => { panel.style.animation = '' })
}

passionTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPassion(tab))
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const step = event.key === 'ArrowRight' ? 1 : -1
    const nextTab = passionTabs[(index + step + passionTabs.length) % passionTabs.length]
    selectPassion(nextTab)
    nextTab.focus()
  })
})
passionTabs.forEach((tab, index) => { tab.tabIndex = index === 0 ? 0 : -1 })

let reasonIndex = 0
document.querySelector('#reason-button').addEventListener('click', () => {
  reasonIndex = (reasonIndex + 1) % reasons.length
  const reasonText = document.querySelector('#reason-text')
  reasonText.textContent = `“${reasons[reasonIndex]}”`
  reasonText.style.animation = 'none'
  requestAnimationFrame(() => { reasonText.style.animation = '' })
  document.querySelector('#reason-counter').textContent = `${String(reasonIndex + 1).padStart(2, '0')} / ${String(reasons.length).padStart(2, '0')}`
})

const secretToast = document.querySelector('#secret-toast')
let toastTimer

function showSecret(message) {
  secretToast.textContent = message
  secretToast.hidden = false
  secretToast.classList.remove('toast-visible')
  requestAnimationFrame(() => secretToast.classList.add('toast-visible'))
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    secretToast.classList.remove('toast-visible')
    window.setTimeout(() => { secretToast.hidden = true }, 250)
  }, 3400)
}

document.querySelector('#anniversary-note').addEventListener('click', () => {
  showSecret('25/07. Ese día empezó una parte muy bonita de mi vida: nosotros. Te amo, mi amor.')
})

let flowerTaps = 0
let flowerTimer
document.querySelector('#secret-flower').addEventListener('click', () => {
  flowerTaps += 1
  window.clearTimeout(flowerTimer)
  flowerTimer = window.setTimeout(() => { flowerTaps = 0 }, 1800)
  if (flowerTaps >= 5) {
    flowerTaps = 0
    showSecret('Encontraste mi mensajito escondido: te volvería a elegir en todos mis planes.')
  }
})

const catMessages = [
  'Reporte de Grace: Grace estaría orgulloso de la maravillosa mujer que eres. Nunca pierdas esa fuerza. Te amo muchísimo.',
  'Reporte de Grace: tu forma de cuidar a los animales y a quienes quieres es algo muy especial. No dejes de ser así.',
  'Reporte de Grace: incluso en tus días difíciles sigues siendo una mujer increíble. No tienes que poder con todo sola; aquí estoy contigo.',
  'Reporte de Grace: eres muy amada, hoy y todos los días. Firmado: Grace, con un miau y todo mi amor.',
]
let catMessageIndex = 0
document.querySelector('#cat-secret').addEventListener('click', () => {
  showSecret(catMessages[catMessageIndex])
  catMessageIndex = (catMessageIndex + 1) % catMessages.length
})

document.querySelector('#hero-portrait').addEventListener('dblclick', () => {
  showSecret('Esta foto me recuerda cuánto me gusta estar contigo. Ven por un abrazo cuando quieras.')
})

function showPhoto(index) {
  activePhoto = (index + memories.length) % memories.length
  const memory = memories[activePhoto]
  lightboxImage.src = memory.src
  lightboxImage.alt = memory.alt
  lightboxCaption.textContent = memory.note
  lightboxCount.textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(memories.length).padStart(2, '0')}`
}

function openLightbox(index, trigger) {
  previousFocus = trigger
  showPhoto(index)
  lightbox.hidden = false
  document.body.classList.add('modal-open')
  document.querySelector('#lightbox-close').focus()
}

function closeLightbox() {
  lightbox.hidden = true
  document.body.classList.remove('modal-open')
  previousFocus?.focus()
}

memoryGrid.addEventListener('click', (event) => {
  const photoButton = event.target.closest('.memory-photo')
  if (photoButton) openLightbox([...memoryGrid.children].indexOf(photoButton), photoButton)
})
document.querySelector('#lightbox-close').addEventListener('click', closeLightbox)
document.querySelector('#lightbox-prev').addEventListener('click', () => showPhoto(activePhoto - 1))
document.querySelector('#lightbox-next').addEventListener('click', () => showPhoto(activePhoto + 1))
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox()
})
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowRight') showPhoto(activePhoto + 1)
  if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1)
  if (event.key === 'Tab') {
    const focusable = [...lightbox.querySelectorAll('button:not([disabled])')]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
})