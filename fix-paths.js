const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace only assets/images/ that don't have test1 prefix
      content = content.replace(/(?<!\/test1\/)(?<!test1\/)assets\/images\//g, '/test1/assets/images/');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

console.log('Fixing paths in dist/moments-studio/browser...');
replaceInDir('dist/moments-studio/browser');
console.log('Successfully updated all image paths in the built files.');
