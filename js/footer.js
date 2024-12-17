document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.querySelector('.common-footer');
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load footer: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => footerElement.innerHTML = html)
        .catch(error => console.error(error));
});
