/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns7)'];

  // Find the main recipe-detail container
  const recipeDetail = element.querySelector('.recipe-detail');
  if (!recipeDetail) return;

  // Left column: all text and actions
  const left = recipeDetail.querySelector('.cmp-recipe-detail__left-container');
  // Right column: image with play overlay
  const right = recipeDetail.querySelector('.cmp-recipe-detail__right-container');

  // Defensive: build left column content
  const leftColumnContent = [];
  if (left) {
    // Tag (yellow pill)
    const tag = left.querySelector('.cmp-recipe-detail__sub-tags');
    if (tag) leftColumnContent.push(tag);
    // Title
    const title = left.querySelector('.cmp-recipe-detail__title');
    if (title) leftColumnContent.push(title);
    // Prep info (time + ingredients)
    const prepInfo = left.querySelector('.cmp-recipe-detail__prep-info');
    if (prepInfo) leftColumnContent.push(prepInfo);
    // Description
    const desc = left.querySelector('.cmp-recipe-detail__description');
    if (desc) leftColumnContent.push(desc);
    // Social actions (download/share)
    const social = left.querySelector('.cmp-recipe-detail__social-component');
    if (social) leftColumnContent.push(social);
  }

  // Defensive: build right column content
  let rightColumnContent = null;
  if (right) {
    // The video/image container
    const video = right.querySelector('.cmp-recipe-detail__video');
    if (video) {
      // Compose a wrapper for the two images (main + play)
      // Use the video container as-is
      rightColumnContent = video;
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftColumnContent, rightColumnContent]
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
