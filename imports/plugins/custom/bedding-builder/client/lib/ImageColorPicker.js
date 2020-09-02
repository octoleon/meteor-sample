/**
 * @file
 * Image color-picker lib. Allows user to pick a color from an image & get hex.
 */

export function initImageColorPicker (imageSelector, canvasSelector, callback) {
  const img = _(imageSelector);
  const canvas = _(canvasSelector);

  img.addEventListener('click', function (e) {
    const x = e.offsetX || e.layerX || 0;
    const y = e.offsetY || e.layerY || 0;

    useCanvas(canvas, img, function () {
      const p = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
      const hexCode = rgbToHex(p[0], p[1], p[2]);
      callback(hexCode);
    });
  });
}

function useCanvas (el, image, callback) {
  el.width = image.width;
  el.height = image.height;
  el.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
  return callback();
}

function _ (selector) {
  return document.querySelector(selector);
}

function rgbToHex (r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex (c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
