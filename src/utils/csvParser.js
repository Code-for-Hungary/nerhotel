/**
 * @param {string} csvString Must be comma-separated, optionally quoted with double quotes, double quotes escaped
 *        with another double quote (Excel style). First row must contain the headers.
 * @returns {Object<string, string>[]} Array of objects where the keys are the headers, values the cell values.
 */
export function convertCsvToObject(csvString) {
  let { header, rows} = parseCSV(csvString);
  return rows.map(row => row
    .reduce((result, value, index) => {
      result[header[index]] = value;
      return result;
    }, {}));
}

/**
 * @param {string} csvString Must be comma-separated, optionally quoted with double quotes, double quotes escaped
 *        with another double quote (Excel style).
 * @returns {Object<string[], string[][]>} An object with the header fields and the array of rows with their fields
 */
function parseCSV(string) {
  const [header, ...rows] = string.split('\n');
  const headerWithFields = header.split(',').map(i => i.replace(/"/g, ''));
  const rowsWithFields = rows.map(row => {
    const fields = row.split(',"').map(i => i.replace(/"/g, ''));
    return fields;
  })

  return { header: headerWithFields, rows: rowsWithFields };
}

