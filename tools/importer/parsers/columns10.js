/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract a single column's content
  function extractColumnContent(detailsContainer, idx) {
    // Image (first img in the container)
    const img = detailsContainer.querySelector('img');
    // Title (first element with cmp-our-values__item-title)
    let titleText = '';
    const title = detailsContainer.querySelector('.cmp-our-values__item-title');
    if (title) {
      // For the third column, extract only the first text node (not the full textContent)
      if (idx === 2) {
        const firstTextNode = Array.from(title.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (firstTextNode) {
          titleText = firstTextNode.textContent.trim();
        } else {
          titleText = title.textContent.trim();
        }
      } else {
        titleText = title.textContent.trim();
      }
    }
    // Description (first element with cmp-our-values__item-title--description)
    const desc = detailsContainer.querySelector('.cmp-our-values__item-title--description');
    // Compose a fragment for the column
    const frag = document.createElement('div');
    if (img) frag.appendChild(img);
    if (titleText) {
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      frag.appendChild(document.createElement('br'));
      frag.appendChild(strong);
    }
    if (desc) {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(desc);
    }
    return frag;
  }

  // Get all columns (details containers)
  const columns = Array.from(element.querySelectorAll('.cmp-our-values__details-container'));
  const cells = [
    ['Columns (columns10)'],
    columns.map((col, idx) => extractColumnContent(col, idx))
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
