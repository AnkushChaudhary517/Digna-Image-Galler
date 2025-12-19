import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist/spa');
const indexHtml = join(distDir, 'index.html');
const errorHtml = join(distDir, 'error.html');

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, errorHtml);
  console.log('✓ Copied index.html to error.html for S3 error handling');
} else {
  console.error('✗ index.html not found in dist/spa');
  process.exit(1);
}

