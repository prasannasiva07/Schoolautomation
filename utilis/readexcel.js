const xlsx = require('xlsx');

function _convertExcelDateToString(serial) {
   
    const epochStart = new Date(1900, 0, 1);
    
    const daysSinceEpoch = serial - 2;
    const date = new Date(epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const rawData = xlsx.utils.sheet_to_json(worksheet);

 
  return rawData.map((row, index) => {
    const cleanRow = {};
    for (const key in row) {
      const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '');
      let value = row[key];
      
      
      if (normalizedKey === 'dob' || normalizedKey === 'doj') {
        if (typeof value === 'number') {
          value = _convertExcelDateToString(value);
        }
      }
      
      cleanRow[normalizedKey] = value !== undefined ? value.toString().trim() : '';
    }

    
    cleanRow._rowIndex = index + 2; 
    return cleanRow;
  });
}

module.exports = { readExcel };