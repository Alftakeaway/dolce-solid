import { createEffect, onMount } from 'solid-js';
import { useIntersectionAnimation } from './useIntersectionAnimation';

/**
 * HOC che wrappa un componente e:
 * 1. Sostituisce data-aos in animate-* classes
 * 2. Applica il hook IntersectionObserver automaticamente
 * 3. Lascia il componente originale intatto
 */
export function withAnimations(Component) {
  return (props) => {
    onMount(() => {
      // Map da data-aos a animate-* classes
      const aosMap = {
        'fade-up': 'animate-fade-up',
        'fade-down': 'animate-fade-down',
        'fade-in': 'animate-fade-in',
        'zoom-in': 'animate-scale-up',
        'scale-up': 'animate-scale-up',
        'slide-in-left': 'animate-slide-in-left',
        'slide-in-right': 'animate-slide-in-right',
        'bounce-in': 'animate-bounce-in'
      };

      // Trova tutti gli elementi con data-aos
      document.querySelectorAll('[data-aos]').forEach((el) => {
        const aosValue = el.getAttribute('data-aos');
        const animateClass = aosMap[aosValue];

        if (animateClass) {
          // Aggiungi la classe animate-*
          el.classList.add(animateClass);
          // Rimuovi data-aos (opzionale, per pulizia)
          el.removeAttribute('data-aos');
          el.removeAttribute('data-aos-delay'); // Rimuovi anche delay se presente
        }
      });

      // Applica il hook per tutte le animazioni
      Object.values(aosMap).forEach((animateClass) => {
        useIntersectionAnimation(`.${animateClass}`);
      });
    });

    return <Component {...props} />;
  };
}
