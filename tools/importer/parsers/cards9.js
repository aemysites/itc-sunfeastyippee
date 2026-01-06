/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards9) block header
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Find all card elements within the container
  const cardEls = element.querySelectorAll('.cmp-product-explore-listing__product-item .card, .cmp-product-explore-listing__product-item > .card');

  cardEls.forEach(card => {
    // Image: .cmp-card__media img
    const img = card.querySelector('.cmp-card__media img');
    // Title: .cmp-card__title
    const title = card.querySelector('.cmp-card__title');
    // Time: .cmp-card__time and .cmp-card__minutes
    const timeNum = card.querySelector('.cmp-card__time');
    const timeLabel = card.querySelector('.cmp-card__minutes');

    // Build text content for right cell
    const textContent = document.createElement('div');
    if (title) {
      const h2 = document.createElement('h2');
      h2.innerHTML = title.innerHTML.trim();
      textContent.appendChild(h2);
    }
    if (timeNum && timeLabel) {
      const p = document.createElement('p');
      p.innerHTML = `${timeNum.textContent.trim()} ${timeLabel.textContent.trim()}`;
      textContent.appendChild(p);
    }

    // Add the row: [image, textContent]
    rows.push([
      img ? img : '',
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
