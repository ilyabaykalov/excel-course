const CODES = {
  A: 65,
  Z: 90
};

function toCell(content) {
  return `
    <div class='cell' contenteditable>${ content }</div>
  `;
}

function toColumn(content) {
  return `
    <div class='column'>
        ${ content }
        <div class='col-resize'></div>
    </div>
  `;
}

function createRow(content, index = '') {
  const resize = index ? '<div class="row-resize"></div>' : '';
  return `
    <div class='row'>
        <div class='row-info'>
            ${ index }
            ${ resize }
        </div>
        <div class='row-data'>${ content }</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 25) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
