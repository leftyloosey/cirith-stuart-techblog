const editFormHandler = async (event) => {


    event.preventDefault();


    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (title && body) {
        
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
  .querySelector('#edit-button')
  .addEventListener('click', editFormHandler);