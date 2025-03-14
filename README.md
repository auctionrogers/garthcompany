# The Garth Company Blog

A simple static blog site for The Garth Company.

## Features

- Simple and clean design
- Responsive layout
- Blog post listing
- Individual blog post pages
- Admin page for creating new posts

## Structure

- `index.html` - Homepage with list of blog posts
- `blog.html` - Template for individual blog posts
- `admin.html` - Admin page for creating new posts
- `styles.css` - Main stylesheet
- `scripts.js` - JavaScript for site functionality
- `posts.json` - JSON file containing blog posts

## Getting Started

1. Clone this repository
2. Open the files in your code editor
3. Make any desired changes
4. Deploy to GitHub Pages

## Deployment to GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository settings
4. Scroll down to the GitHub Pages section
5. Select the branch you want to deploy (usually 'main')
6. Click Save

Your site will be published at `https://yourusername.github.io/repositoryname/`

## Custom Domain Setup

To use your custom domain (garthcompany.com):

1. In your GitHub repository, go to Settings > Pages
2. Under "Custom domain", enter your domain name (garthcompany.com)
3. Click Save
4. Set up your domain's DNS:
   - Create an A record pointing to GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or create a CNAME record pointing to `yourusername.github.io`

## Updating Blog Posts

In a real-world scenario, you would use a content management system (CMS) or a backend API to manage blog posts. For this simple static site, blog posts are stored in the `posts.json` file.

To add a new post:
1. Open `posts.json`
2. Add a new entry following the same format as existing posts
3. Save and push changes to GitHub

## Future Improvements

- Add search functionality
- Implement categories and tags
- Add pagination for blog posts
- Create a proper backend for blog post management