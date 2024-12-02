function previewImage(event, previewId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewId);
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result; // Set image source to file content
            preview.style.display = "block"; // Show the preview image
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        preview.style.display = "none"; // Hide the preview if no file selected
    }
}