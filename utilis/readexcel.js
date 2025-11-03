const xlsx = require('xlsx');

class ExcelUtils {
    static convertExcelDateToString(serial) {
        const epochStart = new Date(1900, 0, 1);
        const daysSinceEpoch = serial - 2;
        const date = new Date(epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${year}-${month}-${day}`; // Changed format to YYYY-MM-DD for better compatibility
    }

    static cleanFieldValue(value, isDateField = false) {
        if (value === undefined || value === null) {
            return '';
        }

        if (isDateField && typeof value === 'number') {
            return this.convertExcelDateToString(value);
        }

        return value.toString().trim();
    }

    static readExcel(filePath, sheetName) {
        try {
            const workbook = xlsx.readFile(filePath);
            const worksheet = workbook.Sheets[sheetName];
            const rawData = xlsx.utils.sheet_to_json(worksheet);

            return rawData.map((row, index) => {
                const cleanRow = {};
                
                // Process each field in the row
                for (const key in row) {
                    const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '');
                    const isDateField = ['dob', 'doj'].includes(normalizedKey);
                    cleanRow[normalizedKey] = this.cleanFieldValue(row[key], isDateField);
                }

                // Add metadata
                cleanRow._rowIndex = index + 2;
                cleanRow._rowNumber = index + 1;
                cleanRow._sheetName = sheetName;
                
                return cleanRow;
            });
        } catch (error) {
            console.error('❌ Error reading Excel file:', error.message);
            console.error('📂 File:', filePath);
            console.error('📑 Sheet:', sheetName);
            throw new Error(`Failed to read Excel file: ${error.message}`);
        }
    }
}

module.exports = { readExcel: ExcelUtils.readExcel.bind(ExcelUtils) };