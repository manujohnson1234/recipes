document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.delete-recipe').forEach(function (deleteButton) {
        deleteButton.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            var url = '/delete/' + id;

            if (confirm('Delete Recipe?')) {
                fetch(url, {
                    method: 'DELETE'
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log('Deleting Recipe....');
                    window.location.href = '/';
                })
                .catch(function(error) {
                    console.error('Error during delete request:', error);
                });
            }
        });
    });

    document.querySelectorAll('.edit-recipe').forEach(function (editButton) {
        editButton.addEventListener('click', function () {
            document.getElementById('edit-form-name').value = this.getAttribute('data-name');
            document.getElementById('edit-form-ingredients').value = this.getAttribute('data-ingredients');
            document.getElementById('edit-form-directions').value = this.getAttribute('data-directions');
            document.getElementById('edit-form-id').value = this.getAttribute('data-id');
        });
    });
});
