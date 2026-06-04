import { render } from 'solid-js/web';
import App from './App';
import { withAnimations } from './withAnimations';

const AnimatedApp = withAnimations(App);

const root = document.getElementById('root');
render(() => <AnimatedApp />, root);