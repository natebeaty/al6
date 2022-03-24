import Flickity from 'flickity';
import 'flickity-imagesloaded';
import 'flickity-fade';
import imagesLoaded from 'imagesloaded';
import fitvids from 'fitvids';

// Custom domReady
export const domReady = (callBack) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callBack);
  }
  else {
    callBack();
  }
}

domReady(() =>  {

  // Fit them vids! (makes video embeds responsive)
  fitvids();

  // If user has "reduce motion" enabled
  const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Find any image carousels and init Flickity
  document.querySelectorAll('.carousel').forEach((el) => {
    new Flickity(el, {
      pageDots: false,
      imagesLoaded: true,
      lazyLoad: 2,
      wrapAround: true,
      fade: (reducedMotionMQ.matches ? true : false) // If user has prefer-reduced-motion enabled, use fade instead of slide animation
    });
  });

  // Add data-label attributes to tables for mobile styles
  document.querySelectorAll('table').forEach((table) => {
    table.querySelectorAll('tbody tr').forEach((tr) => {
      let i = 0;
      tr.querySelectorAll('td').forEach((td) => {
        i++;
        let label = table.querySelector('thead th:nth-child('+i+')');
        td.setAttribute('data-label', label.innerText);
      });
    });
  });

});
