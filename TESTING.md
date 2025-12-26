# Testing Guide

## Automated Testing

This project includes an automated test suite to verify the build before deployment.

### Running Tests

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the test server:**
   ```bash
   cd out && npx serve -p 3001
   ```

3. **Run the automated tests** (in a new terminal):
   ```bash
   npm run test:build
   ```

### What Gets Tested

The test suite automatically checks:

1. **Server Status** - Verifies the test server is running
2. **Page Generation** - Confirms all HTML files were generated
3. **Page Loading** - Tests that all pages load without 404 errors
4. **Internal Links** - Validates all internal navigation links work
5. **Required Files** - Ensures critical pages exist:
   - Homepage (`index.html`)
   - Blog list and all blog posts
   - Projects list and all project pages

### Test Results

The script will output:
- ✓ Green checkmarks for passing tests
- ✗ Red X marks for failing tests
- Summary with total/passed/failed counts
- Exit code 0 for success, 1 for failure

### Example Output

```
================================
Portfolio Build Test Suite
================================

Test 1: Checking if server is running...
✓ Server is running at http://localhost:3001

Test 2: Finding all generated pages...
Found 10 HTML pages

Test 3: Checking all pages load correctly...
✓ /blog/building-portfolio-nextjs
✓ /blog/service-mesh
✓ /projects/portfolio-website
...

================================
Test Summary
================================
Total Tests: 48
Passed: 48
Failed: 0

✓ All tests passed! Ready to deploy.
```

## Manual Testing Checklist

After automated tests pass, manually verify:

### Navigation
- [ ] Click through all nav menu items
- [ ] Test "View All" links on homepage
- [ ] Test breadcrumb navigation

### Project Cards
- [ ] Click project card image (should open live demo in new tab)
- [ ] Click GitHub button (should open repository in new tab)
- [ ] Click Blog button (should navigate to blog post)

### Blog Posts
- [ ] Table of contents links scroll to correct sections
- [ ] GitHub/Live URL buttons work
- [ ] Reading progress bar updates on scroll

### Dark Mode
- [ ] Toggle dark/light mode
- [ ] Verify theme persists on page navigation

### Responsive Design
- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

## CI/CD Integration

### Automated Testing in GitHub Actions

The automated test suite runs automatically in GitHub Actions for:

1. **Pull Requests** - Tests run on every PR before preview deployment
2. **Main Branch** - Tests run before production deployment

### Workflow Steps

1. Install dependencies (`npm ci`)
2. Build the project (`npm run build`)
3. Start test server on port 3001
4. Run automated tests (`npm run test:build`)
5. Stop test server
6. Deploy to Firebase (only if tests pass)

If tests fail, the deployment is automatically blocked.

### Viewing Test Results

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. Select a workflow run
4. Click "Run automated tests" to see detailed output

### Configuration Files

- [.github/workflows/firebase-hosting-merge.yml](.github/workflows/firebase-hosting-merge.yml) - Production deployments
- [.github/workflows/firebase-hosting-pull-request.yml](.github/workflows/firebase-hosting-pull-request.yml) - PR previews

## Manual Deployment

If you want to deploy manually (bypassing CI/CD):

```bash
npm run build
firebase deploy --only hosting
```

However, it's recommended to:
1. Push to a branch
2. Create a pull request
3. Let automated tests run
4. Merge to master for automatic deployment
