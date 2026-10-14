document.addEventListener('error', (event) => {
  const image = event.target
  if (!(image instanceof HTMLImageElement)) return

  const source = image.getAttribute('src')
  if (!source || !source.includes('/public/fotos/')) return

  image.setAttribute('src', source.replace('/public/fotos/', '/fotos/'))
}, true)