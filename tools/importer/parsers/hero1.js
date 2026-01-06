/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Table Header ---
  const headerRow = ['Hero (hero1)'];

  // --- 2. Background Image Row ---
  // Find the first <img> inside the block (background image)
  const img = element.querySelector('img');
  const bgImgCell = img ? [img] : [''];

  // --- 3. Content Row ---
  // Find the main grid container
  const grid = element.querySelector('.aem-Grid');
  let contentElements = [];
  if (grid) {
    // Find the title (heading)
    const titleDiv = grid.querySelector('.title .cmp-title');
    if (titleDiv) {
      // Use the heading element inside titleDiv
      const heading = titleDiv.querySelector('h2, h1, h3, h4, h5, h6');
      if (heading) contentElements.push(heading);
    }
    // Find the CTA button (anchor)
    const buttonDiv = grid.querySelector('.button');
    if (buttonDiv) {
      const cta = buttonDiv.querySelector('a');
      if (cta) contentElements.push(cta);
    }
  }
  // Defensive: If nothing found, fallback to all text
  if (contentElements.length === 0) {
    contentElements = [element.textContent];
  }

  // --- 4. Table Construction ---
  const cells = [
    headerRow,
    bgImgCell,
    [contentElements],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
