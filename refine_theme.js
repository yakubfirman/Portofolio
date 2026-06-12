const fs = require('fs');
const path = require('path');

const directoriesToScan = ['./app', './components'];

const replacements = [
  // Navbar specific & UI specific artifacts
  { regex: /bg-white\/4\b/g, replacement: 'bg-white shadow-sm ring-1 ring-gray-200' },
  { regex: /bg-white\/3\b/g, replacement: 'bg-gray-50' },
  { regex: /bg-white\/7\b/g, replacement: 'bg-gray-100' },
  { regex: /ring-white\/8\b/g, replacement: 'ring-gray-200/50' },
  { regex: /bg-\[#0c0303\]\/98/g, replacement: 'bg-white/95' },
  { regex: /bg-black\/55/g, replacement: 'bg-gray-900/40' },
  { regex: /shadow-black\/60/g, replacement: 'shadow-gray-300/60' },
  { regex: /shadow-black\/40/g, replacement: 'shadow-gray-200/40' },
  { regex: /shadow-black\/30/g, replacement: 'shadow-gray-200/30' },
  { regex: /hover:bg-white\/4\b/g, replacement: 'hover:bg-gray-100' },
  { regex: /hover:bg-white\/7\b/g, replacement: 'hover:bg-gray-100' },
  { regex: /text-red-300/g, replacement: 'text-red-700' },
  { regex: /bg-red-700\/20/g, replacement: 'bg-red-50' },
  { regex: /bg-red-700\/15/g, replacement: 'bg-red-50' },
  
  // Gradients
  { regex: /from-\[#080303\]\/90/g, replacement: 'from-white/90' },
  { regex: /via-\[#080303\]\/50/g, replacement: 'via-white/50' },
  { regex: /from-\[#0a0a0a\]\/90/g, replacement: 'from-white/90' },
  
  // Shadows & Colors
  { regex: /text-gray-300/g, replacement: 'text-gray-600' },
  { regex: /shadow-red-950\/40/g, replacement: 'shadow-red-500/10' },
  { regex: /shadow-red-950\/50/g, replacement: 'shadow-red-500/20' },
  { regex: /bg-red-950\/30/g, replacement: 'bg-red-50' },
  { regex: /text-red-400\b/g, replacement: 'text-red-600' }, // Any lingering red-400
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

function processFiles() {
  let fileList = [];
  directoriesToScan.forEach(dir => {
    if (fs.existsSync(dir)) {
      fileList = fileList.concat(walkDir(dir));
    }
  });

  let modifiedCount = 0;

  fileList.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    replacements.forEach(({ regex, replacement }) => {
      content = content.replace(regex, replacement);
    });

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      modifiedCount++;
      console.log(`Refined: ${file}`);
    }
  });

  console.log(`Done refining! Modified ${modifiedCount} files.`);
}

processFiles();
