/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block header
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Find all card elements
  const cardNodes = element.querySelectorAll('.cmp-tab-group__tab');

  cardNodes.forEach(card => {
    // Image: find the first img inside this card
    const img = card.querySelector('img');
    // Title: find the title element
    const title = card.querySelector('.cmp-tab-group__title');
    // For this block, only image and title (no description/cta)
    // Title should be styled as a heading (wrap in <strong>)
    let titleEl;
    if (title) {
      titleEl = document.createElement('strong');
      titleEl.textContent = title.textContent.trim();
    }
    rows.push([
      img,
      titleEl || ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
