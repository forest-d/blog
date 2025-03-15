// Function to add captions to images based on their title attributes
document.addEventListener('DOMContentLoaded', function() {
    // Find all images in post content
    const images = document.querySelectorAll('.post img');

    // Process each image
    images.forEach(function(img) {
        // Only add caption if the image has a title attribute
        if (img.title && img.title.trim() !== '') {
            // Create a container div
            const container = document.createElement('div');
            container.className = 'image-container';

            // Move image inside the container
            const parent = img.parentNode;
            parent.insertBefore(container, img);
            container.appendChild(img);

            // Wait for image to load to get accurate dimensions
            if (img.complete) {
                addCaption(img, container);
            } else {
                img.onload = function() {
                    addCaption(img, container);
                };
            }
        }
    });

    function addCaption(img, container) {
        // Get exact image width including borders and padding
        const imgWidth = img.offsetWidth;

        // Calculate the full width including borders and padding
        const fullWidth = imgWidth;

        // Create and add the caption
        const caption = document.createElement('div');
        caption.className = 'image-caption';
        caption.textContent = img.title;
        caption.style.width = fullWidth + 'px'; // Set width to match image's full width
        caption.style.maxWidth = fullWidth + 'px'; // Ensure it doesn't exceed image width
        container.appendChild(caption);

        // Set container width to match image
        container.style.width = 'auto';
        container.style.maxWidth = imgWidth + 'px';
    }
});