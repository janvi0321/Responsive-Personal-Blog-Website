document.addEventListener('DOMContentLoaded', () => {
    // Add Comment
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const postId = this.dataset.postId;
            const textarea = this.querySelector('textarea');
            const text = textarea.value.trim();
            if (!text) return;

            const commentList = document.getElementById(`comments-list-${postId}`);
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `
                <p class="comment-text">${text}</p>
                <div class="comment-meta">
                    <span>Posted Just Now</span>
                    <span class="delete-btn">Delete</span>
                </div>
            `;
            commentList.prepend(comment);
            textarea.value = '';

            updateCount(postId, 1);
        });
    });

    // Delete Comment
    document.querySelector('.posts-container').addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Delete this comment?')) {
                const comment = e.target.closest('.comment');
                const postId = comment.closest('.blog-post').querySelector('.comment-form').dataset.postId;
                comment.remove();
                updateCount(postId, -1);
            }
        }
    });

    // Update comment count
    function updateCount(postId, change) {
        const header = document.querySelector(`.comment-form[data-post-id="${postId}"]`)
                         .closest('.blog-post')
                         .querySelector('.comments-section h4');
        let count = parseInt(header.textContent.match(/\((\d+)\)/)[1]);
        header.textContent = `Comments (${count + change})`;
    }
});
