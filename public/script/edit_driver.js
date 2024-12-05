

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

// Function to add a new phone number input field
function addPhoneInput() {
    const phoneNumbersContainer = document.querySelector('.phone-numbers');
    const phoneWrapper = document.createElement('div');
    phoneWrapper.classList.add('phone-wrapper');
    
    phoneWrapper.innerHTML = `
        <input type="text" name="phone[]" placeholder="Enter Phone Number">
        <button type="button" class="remove-phone-btn" onclick="removePhoneInput(this)">-</button>
    `;
    phoneNumbersContainer.appendChild(phoneWrapper);
}

// Function to remove a phone number input field
function removePhoneInput(button) {
    const phoneWrapper = button.closest('.phone-wrapper');
    phoneWrapper.remove();
}
