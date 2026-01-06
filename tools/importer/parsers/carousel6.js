/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards container
  const cardsRoot = element.querySelector('.cmp-cards');
  if (!cardsRoot) return;

  // Prepare rows: first row is header
  const rows = [['Carousel (carousel6)']];

  // Extract carousel heading text (e.g. "You may also want to try")
  const heading = cardsRoot.querySelector('.cmp-cards__heading');

  // Find carousel track with card items
  const carouselTrack = cardsRoot.querySelector('.slick-track');
  if (!carouselTrack) return;

  // Get all visible carousel items (not cloned)
  const cardItems = Array.from(carouselTrack.querySelectorAll('.cmp-carousel__item'))
    .filter(item => !item.classList.contains('slick-cloned'));

  cardItems.forEach((cardItem, idx) => {
    // Image extraction: look for <img> inside .cmp-card__media or lazy-image-container
    let img = cardItem.querySelector('.cmp-card__media img, .lazy-image-container img');
    let imgCell = img ? img : '';

    // Text cell: Title, time, and minutes, and any additional content
    const content = cardItem.querySelector('.cmp-card__content');
    let textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';
    textCell.style.gap = '8px';

    // For the first slide, add heading at the top of text cell
    if (idx === 0 && heading && heading.textContent.trim()) {
      const headingEl = document.createElement('h2');
      headingEl.textContent = heading.textContent.trim();
      textCell.appendChild(headingEl);
    }

    // Title
    const title = content ? content.querySelector('.cmp-card__title') : null;
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent;
      textCell.appendChild(h2);
    }

    // Time and minutes
    const timeWrapper = content ? content.querySelector('.cmp-card__time-wrapper') : null;
    const time = timeWrapper ? timeWrapper.querySelector('.cmp-card__time') : null;
    const mins = content ? content.querySelector('.cmp-card__minutes') : null;
    if (time && mins) {
      const timeDiv = document.createElement('div');
      timeDiv.textContent = `${time.textContent} ${mins.textContent.trim()}`;
      textCell.appendChild(timeDiv);
    }

    // Add any additional description text (all <p> except .cmp-card__minutes)
    if (content) {
      Array.from(content.querySelectorAll('p:not(.cmp-card__minutes)')).forEach(p => {
        const pClone = document.createElement('p');
        pClone.textContent = p.textContent;
        textCell.appendChild(pClone);
      });
    }

    // Also add any direct text nodes under .cmp-card__content (for flexibility)
    if (content) {
      Array.from(content.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textCell.appendChild(p);
        }
      });
    }

    // Only add text cell if there's content
    if (textCell.childNodes.length === 0) textCell = '';

    // Add row if there is any content in either cell
    if (imgCell || textCell) {
      rows.push([imgCell, textCell]);
    }
  });

  // Add CTA as call-to-action in the last slide's text cell (if present)
  const cta = cardsRoot.querySelector('.cmp-button__text');
  const ctaLink = cardsRoot.querySelector('.cmp-button');
  if (cta && ctaLink && ctaLink.href && rows.length > 1) {
    const lastTextCell = rows[rows.length - 1][1];
    if (lastTextCell && lastTextCell.nodeType === Node.ELEMENT_NODE) {
      const ctaDiv = document.createElement('div');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = cta.textContent;
      ctaDiv.appendChild(a);
      lastTextCell.appendChild(ctaDiv);
    }
  }

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
