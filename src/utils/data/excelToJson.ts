import * as XLSX from 'xlsx';

class ExcelParser {
  static convertToJson(buffer: Buffer): any {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(sheet);
    } catch (error) {
      throw new Error('Error parsing Excel file');
    }
  }
}

export default ExcelParser;