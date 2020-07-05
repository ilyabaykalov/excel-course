import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';

import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coordinates = $parent.getCoordinates();

      document.onmousemove = e => {
        const delta = e.pageX - coordinates.right;
        const value = coordinates.width + delta;

        $parent.$el.style.width = `${ value }px`;
        document.querySelectorAll(`[data-column="${ $parent.data.column }"]`)
            .forEach(element => element.style.width = value + 'px');
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
