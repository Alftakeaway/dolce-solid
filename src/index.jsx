import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';

const AnimatedApp = withAnimations(App);

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);

// Parallax - dopo render
const initParallax = () => {
  const parallaxBands = document.querySelectorAll('.parallax-band');
  parallaxBands.forEach(band => {
    const rect = band.getBoundingClientRect();
    const offset = rect.top * 0.3;
    band.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  });
};

window.addEventListener('scroll', initParallax);