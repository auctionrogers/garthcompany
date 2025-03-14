// Initialize admin functionality when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load all blog posts with admin controls
    loadBlogPosts();
    
    // Setup the new post form
    setupNewPostForm();
    
    // Setup show/hide toggle for the new post form
    document.getElementById('show-new-post-form').addEventListener('click', function() {
        const formSection = document.getElementById('new-post-section');
        formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
        
        // Change button text based on form visibility
        this.textContent = formSection.style.display === 'none' ? 
            'Create New Blog Post' : 'Hide Form';
    });
});

// Setup the form for creating new posts
function setupNewPostForm() {
    const form = document.getElementById('new-post-form');
    const postStatus = document.getElementById('post-status');
    
    // Add post form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value;
        
        // Validate inputs
        if (!title || !content) {
            showStatus('Please fill out all fields', 'error');
            return;
        }
        
        // Disable the submit button while processing
        const submitButton = document.getElementById('submit-post');
        submitButton.disabled = true;
        submitButton.textContent = 'Saving...';
        
        // Create a new post document in Firestore
        db.collection('posts').add({
            title: title,
            content: content,
            date: firebase.firestore.Timestamp.now()
        })
        .then((docRef) => {
            // Reset the form
            form.reset();
            
            // Show success message
            showStatus('Post successfully created!', 'success');
            
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Save Post';
            
            // Reload the posts list
            loadBlogPosts();
            
            // Hide the form after successful submission
            document.getElementById('new-post-section').style.display = 'none';
            document.getElementById('show-new-post-form').textContent = 'Create New Blog Post';
        })
        .catch((error) => {
            console.error("Error adding post: ", error);
            showStatus('Error creating post. Please try again.', 'error');
            
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Save Post';
        });
    });
}

// Show status messages
function showStatus(message, type) {
    const statusElement = document.getElementById('post-status');
    statusElement.textContent = message;
    statusElement.className = 'status-message ' + type;
    statusElement.style.display = 'block';
    
    // Hide the message after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

// Add event listeners for edit and delete buttons
function addAdminControlListeners() {
    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            deletePost(postId);
        });
    });
}

// Function to handle post editing
function editPost(postId) {
    // Get the post data from Firestore
    db.collection('posts').doc(postId).get()
        .then((doc) => {
            if (doc.exists) {
                const post = doc.data();
                
                // Populate the form with the post data
                document.getElementById('post-title').value = post.title;
                document.getElementById('post-content').value = post.content;
                
                // Show the form
                const formSection = document.getElementById('new-post-section');
                formSection.style.display = 'block';
                document.getElementById('show-new-post-form').textContent = 'Hide Form';
                
                // Change the form submission behavior for editing
                const form = document.getElementById('new-post-form');
                const submitButton = document.getElementById('submit-post');
                
                // Update the button text
                submitButton.textContent = 'Update Post';
                
                // Store the original submit handler
                const originalSubmitHandler = form.onsubmit;
                
                // Create new handler for update
                form.onsubmit = function(e) {
                    e.preventDefault();
                    
                    // Get updated values
                    const updatedTitle = document.getElementById('post-title').value.trim();
                    const updatedContent = document.getElementById('post-content').value;
                    
                    // Validate inputs
                    if (!updatedTitle || !updatedContent) {
                        showStatus('Please fill out all fields', 'error');
                        return;
                    }
                    
                    // Disable the submit button while processing
                    submitButton.disabled = true;
                    submitButton.textContent = 'Updating...';
                    
                    // Update the post in Firestore
                    db.collection('posts').doc(postId).update({
                        title: updatedTitle,
                        content: updatedContent,
                        // Optionally update the date if you want to bring it to the top
                        // date: firebase.firestore.Timestamp.now()
                    })
                    .then(() => {
                        // Reset the form
                        form.reset();
                        
                        // Show success message
                        showStatus('Post successfully updated!', 'success');
                        
                        // Re-enable the submit button and restore original text
                        submitButton.disabled = false;
                        submitButton.textContent = 'Save Post';
                        
                        // Reload the posts list
                        loadBlogPosts();
                        
                        // Hide the form after successful submission
                        document.getElementById('new-post-section').style.display = 'none';
                        document.getElementById('show-new-post-form').textContent = 'Create New Blog Post';
                        
                        // Restore the original submit handler
                        form.onsubmit = originalSubmitHandler;
                    })
                    .catch((error) => {
                        console.error("Error updating post: ", error);
                        showStatus('Error updating post. Please try again.', 'error');
                        
                        // Re-enable the submit button
                        submitButton.disabled = false;
                        submitButton.textContent = 'Update Post';
                    });
                };
            } else {
                showStatus('Post not found', 'error');
            }
        })
        .catch((error) => {
            console.error("Error getting post: ", error);
            showStatus('Error loading post. Please try again.', 'error');
        });
}

// Function to handle post deletion
function deletePost(postId) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        // Delete the post from Firestore
        db.collection('posts').doc(postId).delete()
            .then(() => {
                // Show success message
                showStatus('Post successfully deleted!', 'success');
                
                // Reload the posts list
                loadBlogPosts();
            })
            .catch((error) => {
                console.error("Error deleting post: ", error);
                showStatus('Error deleting post. Please try again.', 'error');
            });
    }
}

// Function to determine if we're in current admin context
const currentPage = window.location.pathname;