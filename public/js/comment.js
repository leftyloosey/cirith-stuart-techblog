const commentFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#comment-body').value.trim();
  
    if (body) {
        
      const post_id = event.target.getAttribute('data-id');
      // alert(post_id)
      console.log("POST ID IS", post_id)
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // document.location.replace(`/comments/${id}`);
        // document.location.replace(`/`);
        document.location.reload();
        console.log("Response OK for comment")
      } else {
        alert('Please log in to comment');
      }
    }
  };

  document
  .querySelector('#comment-button')
  .addEventListener('click', commentFormHandler);