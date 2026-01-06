/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main content wrapper
  const contentWrapper = element.querySelector('.cmp-yippee-banner--content-without-cta');

  let leftCol = document.createElement('div');
  let rightCol = document.createElement('div');

  if (contentWrapper) {
    // Find the carousel item (should be only one for this block)
    const carouselItem = contentWrapper.querySelector('.cmp-carousel__item');
    if (carouselItem) {
      // LEFT COLUMN: Heading and description
      const info = carouselItem.querySelector('.cmp-yippee-banner__item-info');
      if (info) {
        // Move the heading and paragraph into a new div for the left column
        const heading = info.querySelector('.cmp-yippee-banner__item-title');
        const desc = info.querySelector('.cmp-yippee-banner__item-desc');
        if (heading) leftCol.appendChild(heading);
        if (desc) leftCol.appendChild(desc);
      }
      // RIGHT COLUMN: Image with play button overlay
      const imageSection = carouselItem.querySelector('.cmp-yippee-banner__item-image');
      if (imageSection) {
        // Move the image containers (main image and play icon) into the right column
        imageSection.querySelectorAll('.lazy-image-container').forEach(imgCont => {
          rightCol.appendChild(imgCont);
        });
      }
    }
  }

  // Ensure fallback if missing content
  if (!leftCol.hasChildNodes()) {
    const fallbackHeading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (fallbackHeading) leftCol.appendChild(fallbackHeading.cloneNode(true));
    const fallbackP = element.querySelector('p');
    if (fallbackP) leftCol.appendChild(fallbackP.cloneNode(true));
  }
  if (!rightCol.hasChildNodes()) {
    const fallbackImg = element.querySelector('img');
    if (fallbackImg) rightCol.appendChild(fallbackImg.cloneNode(true));
  }

  // Build the Columns (columns3) table
  const headerRow = ['Columns (columns3)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
