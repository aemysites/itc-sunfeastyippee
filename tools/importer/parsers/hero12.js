/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header
  const headerRow = ['Hero (hero12)'];

  // 2. Background Image Row
  // Find the background image from the inline style or data-attribute-desktop
  let bgImgUrl = null;
  const container = element.querySelector('[class*="cmp-container"]');
  if (container) {
    // Try inline style first
    const style = container.getAttribute('style') || '';
    const bgMatch = style.match(/background-image:\s*url\\?\(([^)]+)\)/i);
    if (bgMatch) {
      // Remove escaped slashes and leading path if needed
      bgImgUrl = bgMatch[1].replace(/\\/g, '');
      // If the url is relative, try to resolve to absolute
      if (bgImgUrl.startsWith('/')) {
        bgImgUrl = container.getAttribute('data-attribute-desktop') || bgImgUrl;
      }
    } else {
      // Fallback to data-attribute-desktop
      bgImgUrl = container.getAttribute('data-attribute-desktop');
    }
  }
  let bgImgElem = '';
  if (bgImgUrl) {
    bgImgElem = document.createElement('img');
    bgImgElem.src = bgImgUrl;
    bgImgElem.alt = '';
  } else {
    // Always output something in the cell
    bgImgElem = document.createTextNode('');
  }

  // 3. Content Row
  // Title
  const titleDiv = element.querySelector('.cmp-title');
  let heading = '';
  if (titleDiv) {
    const h1 = titleDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (h1) heading = h1;
  }
  // Subheading
  const textDiv = element.querySelector('.cmp-text');
  let subheading = '';
  if (textDiv) {
    const p = textDiv.querySelector('p');
    if (p) subheading = p;
  }
  // CTA Button
  let cta = '';
  const buttonLink = element.querySelector('.cmp-button');
  if (buttonLink) {
    cta = buttonLink;
  }

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // 4. Build Table
  const rows = [
    headerRow,
    [bgImgElem],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
