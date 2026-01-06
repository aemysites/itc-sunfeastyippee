/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns15)'];

  // Find the main recipe-detail container
  const recipeDetail = element.querySelector('.cmp-recipe-detail');
  if (!recipeDetail) return;

  // Left column: all text content and actions
  const left = recipeDetail.querySelector('.cmp-recipe-detail__left-container');
  // Right column: image with play overlay
  const right = recipeDetail.querySelector('.cmp-recipe-detail__right-container');

  // Defensive: If either left or right is missing, fallback to the whole block in one cell
  if (!left || !right) {
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // --- LEFT COLUMN CONTENT ---
  // Title
  const title = left.querySelector('.cmp-recipe-detail__title');
  // Prep info (time and ingredients)
  const prepInfo = left.querySelector('.cmp-recipe-detail__prep-info');
  // Description
  const desc = left.querySelector('.cmp-recipe-detail__description');
  // Social actions
  const social = left.querySelector('.cmp-recipe-detail__social-component');

  // Compose left column content
  const leftColumnContent = [];
  if (title) leftColumnContent.push(title);
  if (prepInfo) leftColumnContent.push(prepInfo);
  if (desc) leftColumnContent.push(desc);
  if (social) leftColumnContent.push(social);

  // --- RIGHT COLUMN CONTENT ---
  // The main food image is always the first img in .cmp-recipe-detail__video
  const videoContainer = right.querySelector('.cmp-recipe-detail__video');
  let foodImg = null;
  let playIcon = null;
  if (videoContainer) {
    const imgs = videoContainer.querySelectorAll('img');
    if (imgs.length > 0) {
      foodImg = imgs[0];
      // Play icon is the second image
      if (imgs.length > 1) playIcon = imgs[1];
    }
  }

  // Compose right column content: food image and play icon overlay
  const rightColumnContent = [];
  if (foodImg) rightColumnContent.push(foodImg);
  if (playIcon) rightColumnContent.push(playIcon);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftColumnContent, rightColumnContent]
  ], document);

  element.replaceWith(table);
}
