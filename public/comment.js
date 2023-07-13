const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-text').value.trim();
    const post_id = parseInt(window.location.pathname.split('/').pop());

    if (content) {
        const response = await fetch('/api/comments/create', {
            method: 'POST',
            body: JSON.stringify({ content: content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert('Error - Cannot create comment');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('click', newCommentHandler);