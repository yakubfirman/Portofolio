const fs = require('fs');
const path = require('path');

const directoriesToScan = ['./app', './components'];

// A map of Tailwind classes to replace (dark -> light)
const replacements = [
  // Backgrounds
  { regex: /bg-\[#0a0a0a\]/g, replacement: 'bg-white' },
  { regex: /bg-black\/50/g, replacement: 'bg-white/80' },
  { regex: /bg-black/g, replacement: 'bg-white' },
  { regex: /bg-\[#111111\]/g, replacement: 'bg-gray-50' },
  { regex: /bg-\[#0d0d0d\]/g, replacement: 'bg-gray-100' },
  { regex: /bg-\[#0d0404\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#0f0505\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#130808\]/g, replacement: 'bg-gray-100' },
  { regex: /bg-red-950\/50/g, replacement: 'bg-red-50' },
  { regex: /bg-red-900\/20/g, replacement: 'bg-red-100/50' },
  { regex: /bg-red-900\/15/g, replacement: 'bg-red-100/30' },
  { regex: /bg-white\/5/g, replacement: 'bg-black/5' },
  { regex: /bg-white\/10/g, replacement: 'bg-black/5' },
  { regex: /bg-\[\#080303\]/g, replacement: 'bg-white' },
  { regex: /bg-gradient-to-t from-\[\#0a0a0a\]/g, replacement: 'bg-gradient-to-t from-white' },
  { regex: /via-\[\#0a0a0a\]\/80/g, replacement: 'via-white/80' },

  // Text
  { regex: /text-white\/60/g, replacement: 'text-gray-500' },
  { regex: /text-white\/80/g, replacement: 'text-gray-700' },
  { regex: /text-white/g, replacement: 'text-gray-900' },
  { regex: /text-gray-400/g, replacement: 'text-gray-600' },
  { regex: /text-gray-300/g, replacement: 'text-gray-700' },
  { regex: /text-gray-500/g, replacement: 'text-gray-500' },
  { regex: /text-red-400\/90/g, replacement: 'text-red-600' },
  { regex: /text-red-400/g, replacement: 'text-red-700' },
  { regex: /text-red-300\/70/g, replacement: 'text-red-600' },
  { regex: /text-green-400\/80/g, replacement: 'text-green-700' },
  { regex: /text-blue-400\/80/g, replacement: 'text-blue-700' },

  // Borders
  { regex: /border-white\/10/g, replacement: 'border-gray-200' },
  { regex: /border-white\/20/g, replacement: 'border-gray-300' },
  { regex: /border-white\/5/g, replacement: 'border-gray-100' },
  { regex: /border-white\/8/g, replacement: 'border-gray-200' },
  { regex: /border-red-900\/30/g, replacement: 'border-red-200' },
  { regex: /border-red-900\/20/g, replacement: 'border-red-100' },

  // Shadows
  { regex: /shadow-red-950\/40/g, replacement: 'shadow-red-200/50' },
  { regex: /shadow-black\/50/g, replacement: 'shadow-gray-200' },
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
      console.log(`Modified: ${file}`);
    }
  });

  console.log(`Done! Modified ${modifiedCount} files.`);
}

processFiles();
