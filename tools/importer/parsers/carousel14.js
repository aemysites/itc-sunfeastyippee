/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Carousel block
  const headerRow = ['Carousel (carousel14)'];

  // Find the carousel container
  const carousel = element.querySelector('.cmp-carousel');
  if (!carousel) return;

  // Extract the heading above the carousel
  let heading = element.querySelector('.cmp-cards__heading');

  // Find all carousel items (slides)
  const slideEls = carousel.querySelectorAll('.cmp-carousel__item');

  // Prepare rows for each slide (image mandatory, but include even if missing)
  const rows = [];
  slideEls.forEach(slide => {
    // Image: find the first img inside the slide
    let img = slide.querySelector('img');
    let imageCell = img ? img : '';

    // Text content: find the card title and time
    const content = slide.querySelector('.cmp-card__content');
    let cellContent = [];
    if (content) {
      // Title (h2)
      const title = content.querySelector('.cmp-card__title');
      if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent;
        cellContent.push(h2);
      }
      // Time (number and 'Mins')
      const timeWrapper = content.querySelector('.cmp-card__time-wrapper');
      const time = timeWrapper ? timeWrapper.querySelector('.cmp-card__time') : null;
      const mins = content.querySelector('.cmp-card__minutes');
      if (time && mins) {
        const timeP = document.createElement('p');
        timeP.textContent = `${time.textContent} ${mins.textContent.trim()}`;
        cellContent.push(timeP);
      }
    }
    rows.push([imageCell, cellContent]);
  });

  // Add heading as a separate row after the header
  if (heading) {
    const headingEl = document.createElement('h2');
    headingEl.textContent = heading.textContent;
    rows.unshift(['', headingEl]);
  }

  // Add CTA button if present (e.g., 'View all') as a separate row after slides
  const cta = element.querySelector('.cmp-button');
  if (cta) {
    rows.push(['', cta]);
  }

  // Compose table cells: header, heading row, slides, CTA row
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
