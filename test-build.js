const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const BASE_URL = 'http://localhost:3001';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function findAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.startsWith('_')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractLinksFromHtml(htmlContent) {
  const links = new Set();

  // Simple regex to find href attributes starting with /
  const hrefRegex = /href=["']([^"'#]+)["']/g;
  let match;

  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.includes('#')) {
      links.add(href);
    }
  }

  return Array.from(links);
}

async function checkUrl(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function testFile(filePath) {
  const relativePath = path.relative(OUT_DIR, filePath);
  const urlPath = '/' + relativePath.replace(/\\/g, '/').replace('/index.html', '/').replace('.html', '');
  const url = `${BASE_URL}${urlPath}`;

  totalTests++;

  const result = await checkUrl(url);

  if (result.ok) {
    passedTests++;
    log(`✓ ${urlPath}`, colors.green);
    return { success: true, url: urlPath, links: [] };
  } else {
    failedTests++;
    log(`✗ ${urlPath} - Status: ${result.status}`, colors.red);
    return { success: false, url: urlPath, status: result.status };
  }
}

async function testInternalLinks(filePath) {
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const links = extractLinksFromHtml(htmlContent);
  const results = [];

  for (const link of links) {
    totalTests++;
    const url = `${BASE_URL}${link}`;
    const result = await checkUrl(url);

    if (result.ok) {
      passedTests++;
      log(`  ✓ Link: ${link}`, colors.green);
    } else {
      failedTests++;
      log(`  ✗ Link: ${link} - Status: ${result.status}`, colors.red);
      results.push({ link, status: result.status });
    }
  }

  return results;
}

async function runTests() {
  log('\n================================', colors.cyan);
  log('Portfolio Build Test Suite', colors.cyan);
  log('================================\n', colors.cyan);

  // Check if out directory exists
  if (!fs.existsSync(OUT_DIR)) {
    log('Error: out directory not found. Run "npm run build" first.', colors.red);
    process.exit(1);
  }

  // Test 1: Check if server is running
  log('Test 1: Checking if server is running...', colors.blue);
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      log(`✓ Server is running at ${BASE_URL}\n`, colors.green);
    } else {
      log(`✗ Server returned status ${response.status}\n`, colors.red);
      process.exit(1);
    }
  } catch (error) {
    log(`✗ Cannot connect to ${BASE_URL}`, colors.red);
    log('Please start the server first: cd out && npx serve -p 3001\n', colors.yellow);
    process.exit(1);
  }

  // Test 2: Find all HTML files
  log('Test 2: Finding all generated pages...', colors.blue);
  const htmlFiles = findAllHtmlFiles(OUT_DIR);
  log(`Found ${htmlFiles.length} HTML pages\n`, colors.green);

  // Test 3: Check all pages load without 404
  log('Test 3: Checking all pages load correctly...', colors.blue);
  const failedPages = [];
  for (const file of htmlFiles) {
    const result = await testFile(file);
    if (!result.success) {
      failedPages.push(result);
    }
  }
  log('');

  // Test 4: Check all internal links
  log('Test 4: Checking all internal links...', colors.blue);
  const brokenLinks = [];

  // Check links from key pages
  const keyPages = htmlFiles.filter(f =>
    f.includes('index.html') ||
    f.includes('blog.html') ||
    f.includes('projects.html')
  );

  for (const file of keyPages) {
    const relativePath = path.relative(OUT_DIR, file);
    log(`\nChecking links in: ${relativePath}`, colors.yellow);
    const links = await testInternalLinks(file);
    if (links.length > 0) {
      brokenLinks.push({ page: relativePath, links });
    }
  }

  // Test 5: Check required files exist
  log('\n\nTest 5: Checking required files...', colors.blue);
  const requiredFiles = [
    'index.html',
    'blog.html',
    'projects.html',
    'blog/building-portfolio-nextjs.html',
    'blog/service-mesh.html',
    'blog/terraform-state.html',
    'projects/portfolio-website.html',
    'projects/gitops-pipeline.html',
    'projects/automated-landing-zones.html',
  ];

  requiredFiles.forEach(file => {
    totalTests++;
    const filePath = path.join(OUT_DIR, file);
    if (fs.existsSync(filePath)) {
      passedTests++;
      log(`✓ ${file}`, colors.green);
    } else {
      failedTests++;
      log(`✗ ${file} - File not found`, colors.red);
    }
  });

  // Summary
  log('\n================================', colors.cyan);
  log('Test Summary', colors.cyan);
  log('================================', colors.cyan);
  log(`Total Tests: ${totalTests}`, colors.blue);
  log(`Passed: ${passedTests}`, colors.green);
  log(`Failed: ${failedTests}`, failedTests > 0 ? colors.red : colors.green);

  if (failedPages.length > 0) {
    log('\nFailed Pages:', colors.red);
    failedPages.forEach(p => log(`  - ${p.url} (${p.status})`, colors.red));
  }

  if (brokenLinks.length > 0) {
    log('\nBroken Links:', colors.red);
    brokenLinks.forEach(item => {
      log(`  In ${item.page}:`, colors.yellow);
      item.links.forEach(l => log(`    - ${l.link} (${l.status})`, colors.red));
    });
  }

  if (failedTests === 0) {
    log('\n✓ All tests passed! Ready to deploy.', colors.green);
    process.exit(0);
  } else {
    log('\n✗ Some tests failed. Please fix the issues before deploying.', colors.red);
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  log(`\nError running tests: ${error.message}`, colors.red);
  process.exit(1);
});
