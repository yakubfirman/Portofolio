const fs = require('fs');
const path = require('path');

const directoriesToScan = ['./app', './components'];

const replacements = [
  // Button.tsx (fix text-gray-900 on red button)
  { regex: /bg-red-700 text-gray-900/g, replacement: 'bg-red-700 text-white' },
  { regex: /bg-red-600 text-gray-900/g, replacement: 'bg-red-600 text-white' },
  
  // ProjectCard.tsx
  { regex: /bg-\[#0a0202\]/g, replacement: 'bg-gray-100' },
  { regex: /from-\[#0d0404\]/g, replacement: 'from-gray-900/10' },
  
  // SkillsSection.tsx
  { regex: /from-\[#0a0a0a\]\b/g, replacement: 'from-[#fafafa]' },
  { regex: /bg-white\/\[0\.025\]/g, replacement: 'bg-white' },
  { regex: /border-white\/\[0\.06\]/g, replacement: 'border-gray-200' },
  { regex: /hover:border-white\/\[0\.15\]/g, replacement: 'hover:border-red-300' },
  { regex: /hover:bg-white\/\[0\.05\]/g, replacement: 'hover:bg-red-50' },
  { regex: /text-gray-900\/25/g, replacement: 'text-gray-400' },
  { regex: /text-gray-900\/30/g, replacement: 'text-gray-600' },
  { regex: /bg-red-950\/10/g, replacement: 'bg-red-500/10' },
  { regex: /bg-rose-900\/8/g, replacement: 'bg-rose-500/10' },
  { regex: /bg-red-900\/8/g, replacement: 'bg-red-500/10' },
  
  // Footer.tsx
  { regex: /bg-\[#060606\]/g, replacement: 'bg-gray-50' },
  { regex: /bg-red-950\/20/g, replacement: 'bg-red-500/10' },
  { regex: /bg-red-900\/10/g, replacement: 'bg-red-500/5' },
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
      console.log(`Polished: ${file}`);
    }
  });

  console.log(`Done polishing! Modified ${modifiedCount} files.`);
}

processFiles();
