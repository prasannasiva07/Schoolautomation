const xlsx = require('xlsx');

function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const rawData = xlsx.utils.sheet_to_json(worksheet);

  // Normalize: trim spaces, lowercase keys, replace spaces/underscores
  return rawData.map(row => {
    const cleanRow = {};
    for (const key in row) {
      const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '');
      cleanRow[normalizedKey] =
        row[key] !== undefined ? row[key].toString().trim() : '';
    }
    return cleanRow;
  });
}

module.exports = { readExcel };
