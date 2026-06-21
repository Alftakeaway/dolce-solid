import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';

const AnimatedApp = withAnimations(App);

// Parallax inline
window.addEventListener('scroll', () => {
  const parallaxBands = document.querySelectorAll('.parallax-band');
  parallaxBands.forEach(band => {
    band.style.backgroundPosition = `center ${window.scrollY * -0.5}px`;
  });
});

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);