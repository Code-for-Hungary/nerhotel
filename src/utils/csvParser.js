/**
 * @param {string} csvString Must be comma-separated, optionally quoted with double quotes, double quotes escaped
 *        with another double quote (Excel style). First row must contain the headers.
 * @returns {Object<string, string>[]} Array of objects where the keys are the headers, values the cell values.
 */
export function convertCsvToObject(csvString) {
  const [headers, ...rows] = csvToArray(csvString);

  return rows.map(row => row
    .reduce((result, value, index) => {
      result[headers[index]] = value;
      return result;
    }, {}));
}

/**
 * RFC 4180 compatible CSV parser.
 * @param {string} csvString Must be comma-separated, optionally quoted with double quotes, double quotes escaped
 *        with another double quote (Excel style).
 * @returns {[[string]]} The CSV content as a 2D array of strings
 */
export function csvToArray(csvString) {
  let currentCharacter;
  let previousCharacter = '';
  let rowIndex = 0;
  let row = [''];
  let fieldIndex = 0;
  let areWeInsideField = false;
  let returnValue = [row];
  for (currentCharacter of csvString) {
    if (currentCharacter === '"') {
      if (previousCharacter === '"' && !areWeInsideField) {
        row[fieldIndex] += '"';
      }
      areWeInsideField = !areWeInsideField;
    } else if (currentCharacter === ',' && !areWeInsideField) {
      fieldIndex++;
      row[fieldIndex] = '';
    } else if ((currentCharacter === '\n') && !areWeInsideField) {
      if (previousCharacter === '\r') {
        row[fieldIndex] = row[fieldIndex].slice(0, -1);
      }
      rowIndex++;
      row = [''];
      returnValue[rowIndex] = row;
      fieldIndex = 0;
    } else {
      row[fieldIndex] += currentCharacter;
    }
    previousCharacter = currentCharacter;
  }
  return returnValue;
}
