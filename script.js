// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Determine which page we're on
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('blog.html')) {
        loadSinglePost();
    } else if (!currentPage.includes('admin.html')) {
        // For the homepage or any other page that displays posts
        loadBlogPosts();
    }
});

// Load all blog posts for the homepage
function loadBlogPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;
    
    // Reference to the posts collection
    db.collection('posts')
        .orderBy('date', 'desc') // Sort by date, newest first
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                postsContainer.innerHTML = `
                    <div class="post">
                        <h3 class="post-title">Welcome to our blog!</h3>
                        <p class="post-date">${formatDate(new Date())}</p>
                        <p class="post-excerpt">No posts have been added yet. Check back soon!</p>
                    </div>
                `;
                return;
            }
            
            let postsHTML = '';
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const postId = doc.id;
                const postContent = post.content;
                
                // Create an excerpt (first 150 characters)
                let excerpt = stripHtml(postContent).substring(0, 150);
                if (stripHtml(postContent).length > 150) {
                    excerpt += '...';
                }
                
                postsHTML += `
                    <div class="post">
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-date">${formatDate(post.date.toDate())}</p>
                        <p class="post-excerpt">${excerpt}</p>
                        <a href="blog.html?id=${postId}" class="read-more">Read More</a>
                        
                        ${currentPage.includes('admin.html') ? `
                        <div class="post-admin-controls">
                            <button class="edit-button" data-id="${postId}">Edit</button>
                            <button class="delete-button" data-id="${postId}">Delete</button>
                        </div>
                        ` : ''}
                    </div>
                `;
            });
            
            postsContainer.innerHTML = postsHTML;
            
            // Add event listeners for admin controls if we're on the admin page
            if (currentPage.includes('admin.html')) {
                addAdminControlListeners();
            }
        })
        .catch((error) => {
            console.error("Error loading posts: ", error);
            postsContainer.innerHTML = `
                <div class="error">
                    <p>Error loading posts. Please try again later.</p>
                </div>
            `;
        });
}

// Load a single blog post for the blog.html page
function loadSinglePost() {
    const blogPostContainer = document.getElementById('blog-post-container');
    if (!blogPostContainer) return;
    
    // Get the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        // No post ID specified, redirect to homepage
        window.location.href = 'index.html';
        return;
    }
    
    // Fetch the post from Firestore
    db.collection('posts').doc(postId).get()
        .then((doc) => {
            if (doc.exists) {
                const post = doc.data();
                
                // Update the page title
                document.title = `${post.title} - The Garth Company`;
                
                // Display the post
                blogPostContainer.innerHTML = `
                    <article class="blog-post">
                        <h1 class="blog-post-title">${post.title}</h1>
                        <p class="blog-post-date">${formatDate(post.date.toDate())}</p>
                        <div class="blog-post-content">${post.content}</div>
                        <a href="index.html" class="back-button">Back to Home</a>
                    </article>
                `;
            } else {
                // Post not found, redirect to homepage
                window.location.href = 'index.html';
            }
        })
        .catch((error) => {
            console.error("Error loading post: ", error);
            blogPostContainer.innerHTML = `
                <div class="error">
                    <p>Error loading post. Please try again later.</p>
                    <a href="index.html" class="back-button">Back to Home</a>
                </div>
            `;
        });
}

// Helper function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Helper function to strip HTML tags
function stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}