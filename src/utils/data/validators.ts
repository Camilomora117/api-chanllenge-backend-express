function isValidRowFormat(row: any, format: any): boolean {
    for (const field of format) {
      const { name, type, required, itemType} = field;
      const value = row[name];
      if (required && value === undefined) {
        console.log("1")
        return false;
      } else if (type === 'array') {
        if (!Array.isArray(value)) {
          return false;
        }
        if (itemType && !value.every((item) => typeof item === itemType)) {
          return false;
        }
      } else if (typeof value !== type) {
        console.log("3")
        return false;
      }
    }
    console.log("end")
    return true;
}

export default isValidRowFormat;