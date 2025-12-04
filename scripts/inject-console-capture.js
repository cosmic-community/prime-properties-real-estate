const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outDir = path.join(process.cwd(), '.next/server/app');

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into ${filePath}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(outDir);
console.log('Console capture script injection complete.');