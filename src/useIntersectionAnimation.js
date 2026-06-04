import { onMount, onCleanup } from 'solid-js';

/**
 * Hook per animazioni trigger su scroll con IntersectionObserver nativo
 * @param {string} selector - CSS selector degli elementi da animare
 * @param {Object} options - Configurazione
 * @param {number} options.threshold - Quando triggerare (0-1, default 0.15)
 * @param {string} options.rootMargin - Margine viewport (default '0px')
 * @param {string} options.animationClass - Classe CSS da aggiungere (default 'animate-in')
 * @param {boolean} options.once - Anima una sola volta (default true)
 */
export function useIntersectionAnimation(selector, options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    animationClass = 'animate-in',
    once = true
  } = options;

  onMount(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) {
      console.warn(`useIntersectionAnimation: No elements found for selector "${selector}"`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Rimuovi classe se esce da viewport e once=false
            entry.target.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Osserva tutti gli elementi
    elements.forEach((el) => {
      observer.observe(el);
    });

    // ✅ Cleanup automatico
    onCleanup(() => {
      observer.disconnect();
    });
  });
}
