import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';

const AnimatedApp = withAnimations(App);

// Parallax
const initParallax = () => {
  const parallaxBands = document.querySelectorAll('.parallax-band');
  parallaxBands.forEach(band => {
    if (band.classList.contains('parallax-band-1')) {
      band.style.backgroundPosition = `center bottom ${window.scrollY * -0.5}px`;
    } else {
      band.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
  });
};

initParallax();
window.addEventListener('scroll', initParallax);

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);