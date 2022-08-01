const commentFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#comment-body').value.trim();
  
    if (title && body) {
        
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/viewpost/${id}`);
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
  .querySelector('#comment-button')
  .addEventListener('click', commentFormHandler);