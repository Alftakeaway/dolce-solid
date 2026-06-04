import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';
import { initParallax } from './parallax';  // ← AGGIUNGI

const AnimatedApp = withAnimations(App);

initParallax();  // ← AGGIUNGI

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);