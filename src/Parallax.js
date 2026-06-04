window.addEventListener('scroll', () => {
  const parallaxBands = document.querySelectorAll('.parallax-band');
  parallaxBands.forEach(band => {
    band.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
  });
});