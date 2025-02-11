function isValidRowFormat(row: any, format: any): { valid: boolean; column: number } {
  const response = { valid: true, column: 0 };

  const keys = Object.keys(row);

  for (let index = 0; index < format.length; index++) {
    const { name, type, required, itemType } = format[index];
    const key = keys[index];
    const value = row[key];

    if (required && value === undefined) {
      return { valid: false, column: index };
    }

    if (name.toLowerCase() !== key.toLowerCase()) {
      return { valid: false, column: index };
    }

    if (type === 'array') {
      const parsedArray = parseArray(value);

      if (!Array.isArray(parsedArray)) {
        return { valid: false, column: index };
      }

      if (itemType && !parsedArray.every((item: any) => typeof item === itemType)) {
        return { valid: false, column: index };
      }
    } else if (typeof value !== type) {
      return { valid: false, column: index };
    }
  }
  return response;
}

function parseArray(value: any): any[] | null {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

export default isValidRowFormat;
