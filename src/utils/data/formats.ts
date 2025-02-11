const Formats = {
  '1': [
    { name: 'Nombre', type: 'string', required: true },
    { name: 'Edad', type: 'number', required: true },
    { name: 'Nums', type: 'array', required: true, itemType: 'number' },
  ],
  '2': [
    { name: 'Nombre', type: 'number', required: true },
    { name: 'Edad', type: 'string', required: true },
    { name: 'Nums', type: 'array', required: false, itemType: 'number' },
  ],
} as const;

function getFormat(idFormat: string) {
  switch(idFormat) {
    case '1':
      return Formats['1'];
    case '2': 
      return Formats['2'];
    default:
      return Formats['1'];    
  }
}

export default getFormat;