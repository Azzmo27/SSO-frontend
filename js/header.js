document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('.common-header');
    fetch('../templates/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load header: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => headerElement.innerHTML = html)
        .catch(error => console.error('Error loading header:', error));
});
