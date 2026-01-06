/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns13) block header
  const headerRow = ['Columns (columns13)'];

  // --- LEFT COLUMN: Extract content ---
  const left = element.querySelector('.cmp-recipe-detail__left-container');
  // Defensive: if not found, fallback to first child
  const leftCol = left || element.querySelector('.cmp-recipe-detail > div:first-child');

  // --- RIGHT COLUMN: Extract content ---
  const right = element.querySelector('.cmp-recipe-detail__right-container');
  // Defensive: if not found, fallback to second child
  const rightCol = right || element.querySelector('.cmp-recipe-detail > div:nth-child(2)');

  // Ensure both columns exist, else fallback to empty div
  const leftCell = leftCol || document.createElement('div');
  const rightCell = rightCol || document.createElement('div');

  // Build the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCell, rightCell],
  ], document);

  // Replace the original element with the columns table
  element.replaceWith(table);
}
