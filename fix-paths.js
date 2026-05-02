const fs = require('fs');
const path = require('path');

function replaceInDir(dir, find, replace) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, find, replace);
    } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(new RegExp(find, 'g'), replace);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

console.log('Fixing paths in dist/moments-studio/browser...');
replaceInDir('dist/moments-studio/browser', 'assets/images/', '/test1/assets/images/');
replaceInDir('dist/moments-studio/browser', '"assets/images/', '"/test1/assets/images/');
replaceInDir('dist/moments-studio/browser', '\'assets/images/', '\'/test1/assets/images/');
replaceInDir('dist/moments-studio/browser', 'images/', '/test1/images/');
replaceInDir('dist/moments-studio/browser', '"images/', '"/test1/images/');
replaceInDir('dist/moments-studio/browser', '\'images/', '\'/test1/images/');
console.log('Successfully updated all image paths in the built files.');
