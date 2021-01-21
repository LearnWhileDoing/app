const convertRemToPixels = (rem) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export default convertRemToPixels;
