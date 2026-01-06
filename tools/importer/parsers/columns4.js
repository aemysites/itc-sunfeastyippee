/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns4)'];

  // Find logo block (contains Yippee logo)
  const logoBlock = element.querySelector('.cmp-new-footer__logo');
  // Find the background image (ITC logo)
  const bgImg = element.querySelector(':scope > img');

  // Compose first column: ITC logo, Yippee logo, and any text nodes
  const firstCol = document.createElement('div');
  if (bgImg) firstCol.appendChild(bgImg.cloneNode(true));
  if (logoBlock) firstCol.appendChild(logoBlock.cloneNode(true));

  // Extract any text nodes directly under the root element
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      firstCol.appendChild(p);
    }
  });
  // Also check for any <span>, <small>, <p> elements directly under the root
  Array.from(element.querySelectorAll(':scope > span, :scope > small, :scope > p')).forEach(el => {
    if (el.textContent.trim()) {
      firstCol.appendChild(el.cloneNode(true));
    }
  });

  // Also check for text nodes inside the logo block (if any)
  if (logoBlock) {
    Array.from(logoBlock.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        firstCol.appendChild(p);
      }
    });
    Array.from(logoBlock.querySelectorAll('span, small, p')).forEach(el => {
      if (el.textContent.trim()) {
        firstCol.appendChild(el.cloneNode(true));
      }
    });
  }

  // Find the nav block
  const navBlock = element.querySelector('.cmp-new-footer__nav');
  let navColumns = [];
  if (navBlock) {
    navColumns = Array.from(navBlock.querySelectorAll(':scope > ul'));
  }

  // Ensure we always have 4 columns (fill with empty string if missing)
  const row = [firstCol];
  for (let i = 0; i < 3; i++) {
    row.push(navColumns[i] || '');
  }

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the element
  element.replaceWith(table);
}
