const fs = require('fs');
const path = require('path');

const directoriesToScan = ['./app', './components'];

const replacements = [
  // Navbar.tsx
  { regex: /bg-red-700(.*?)text-gray-900/g, replacement: 'bg-red-700$1text-white' }, // Fix button text
  { regex: /bg-gray-900\/40 backdrop-blur-sm/g, replacement: 'bg-gray-900/40 backdrop-blur-sm' }, // Actually, gray-900/40 is standard for a dim backdrop. I'll leave it or change to black/20. Let's change to black/20 for a lighter dim.
  { regex: /bg-gray-900\/40/g, replacement: 'bg-black/20' },
  
  // ContactSection.tsx
  { regex: /hover:bg-red-950\/25 hover:text-gray-200/g, replacement: 'hover:bg-red-50 hover:text-gray-900' },
  
  // SpeakingSection.tsx
  { regex: /bg-red-950\/60/g, replacement: 'bg-red-50' },
  
  // TimelineItem.tsx
  { regex: /bg-red-950\/40/g, replacement: 'bg-red-50' },
  
  // GitHubSection.tsx might have dark elements too
  { regex: /bg-\[#0a0a0a\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#111\]/g, replacement: 'bg-gray-50' },
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

    // Also specifically fix button text contrast globally
    content = content.replace(/bg-red-700([^<]*?)text-gray-900/g, 'bg-red-700$1text-white');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      modifiedCount++;
      console.log(`Polished: ${file}`);
    }
  });

  console.log(`Done polishing! Modified ${modifiedCount} files.`);
}

processFiles();
