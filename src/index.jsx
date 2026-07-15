import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';

const AnimatedApp = withAnimations(App);

// Parallax
const initParallax = () => {
  const parallaxBands = document.querySelectorAll('.parallax-band');
  parallaxBands.forEach(band => {
    const rect = band.getBoundingClientRect();
    const offset = rect.top * 0.3;
    if (band.classList.contains('parallax-band-1')) {
      band.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    } else {
      band.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
  });
};

initParallax();
window.addEventListener('scroll', initParallax);

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);