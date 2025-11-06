/**
 * Generates a simple blur placeholder for images
 * This creates a minimal 10x10 SVG with a gradient for blur effect
 */
export function getBlurDataURL(color: string = "#f4f4f5"): string {
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="${color}"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Theme-aware blur placeholder
 * Returns a light placeholder for light mode, dark for dark mode
 */
export const blurDataURLs = {
  light: getBlurDataURL("#f4f4f5"),
  dark: getBlurDataURL("#18181b"),
  neutral: getBlurDataURL("#e4e4e7"),
};
