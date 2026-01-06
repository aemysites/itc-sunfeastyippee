/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the columns block
  const headerRow = ['Columns (columns11)'];

  // Find all carousel items (each is a column)
  const items = Array.from(
    element.querySelectorAll('.cmp-carousel__item')
  );

  // Defensive: if no carousel items, do nothing
  if (!items.length) return;

  // For each carousel item, extract the image and title, and wrap in a div for layout
  const columns = items.map(item => {
    // Image
    const img = item.querySelector('img');
    // Title
    const title = item.querySelector('.cmp-our-values__item-title');
    // Compose column content
    const colDiv = document.createElement('div');
    if (img) colDiv.appendChild(img);
    if (title) {
      // Clone the title node to avoid moving it from the DOM
      const titleClone = title.cloneNode(true);
      // Make sure it's bold and centered (optional, but matches screenshot)
      titleClone.style.display = 'block';
      titleClone.style.fontWeight = 'bold';
      titleClone.style.textAlign = 'center';
      colDiv.appendChild(titleClone);
    }
    return colDiv;
  });

  // Build the table: header, then one row with the columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
