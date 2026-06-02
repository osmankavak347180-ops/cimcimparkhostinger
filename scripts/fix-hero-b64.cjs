const fs = require('fs');
let c = fs.readFileSync('src/sections.jsx', 'utf8');
const before = c.length;
let count = 0;
c = c.replace(/src: 'data:image\/[^']+'/g, () => {
  count++;
  if (count === 1) return "src: '/hero/cimcimpark-cimnastik-cocuk.jpg'";
  return "src: '/hero/cimcimpark-cocuk-hareket.jpg'";
});
fs.writeFileSync('src/sections.jsx', c, 'utf8');
console.log('Before:', before, 'After:', c.length, 'Removed:', before - c.length);
console.log('Replacements:', count);
console.log('Remaining data:image:', (c.match(/data:image/g) || []).length);
