async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="edit-title"]').value.trim();
    const ingredients = document.querySelector('input[name="edit-ingredients"]').value.trim();
    const direction = document.querySelector('input[name="edit-direction"]').value.trim();
    const express_hint = document.querySelector('input[name="edit-hint"]').value.trim();
    const fileField = document.querySelector('input[type="file"');
    const formData = new FormData();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    formData.append('recipe_pic', fileField.files[0]);
    const upload = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
    })

    const data = await upload.json()
    const photo_path = data.pathname

    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, ingredients, direction, express_hint, photo_path }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);