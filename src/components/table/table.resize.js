import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();

  const type = $resizer.data.resize === 'column';

  $resizer.css(type
      ? { opacity: 1, bottom: '-100vh' }
      : { opacity: 1, right: '-100vw' });

  let value;
  document.onmousemove = e => {
    const delta = type
        ? e.pageX - coordinates.right
        : e.pageY - coordinates.bottom;

    value = delta + (type
        ? coordinates.width
        : coordinates.height);

    $resizer.css(type
        ? { opacity: 1, right: `${ -delta }px` }
        : { opacity: 1, bottom: `${ -delta }px` });
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    type && $root
        .findAll(`[data-column="${ $parent.data.column }"]`)
        .forEach(element => element.style.width = `${ value }px`);

    $parent.css(type
        ? { width: `${ value }px` }
        : { height: `${ value }px` });

    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
  };
}
