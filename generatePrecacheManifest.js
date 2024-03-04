const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const directoryPath = path.join(__dirname, '_site');
const precacheManifest = [];

const hashFile = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
};

const generatePrecacheManifest = (dirPath, basePath = '') => {
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const webPath = path.join(basePath, file).replace(/\\/g, '/');
    if (fs.statSync(filePath).isDirectory()) {
      generatePrecacheManifest(filePath, webPath);
    } else {
      precacheManifest.push({
        url: webPath,
        revision: hashFile(filePath),
      });
    }
  });
};

generatePrecacheManifest(directoryPath);

// Exclude non-HTML files or specific paths if necessary
const filteredManifest = precacheManifest.filter(item => item.url.endsWith('.html'));

fs.writeFileSync('_site/precache-manifest.json', JSON.stringify(filteredManifest, null, 2));
