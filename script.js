const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const commentInput = document.getElementById('comment');
const uploadStatus = document.getElementById('uploadStatus');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    uploadStatus.innerHTML = 'Uploading...';

    const files = fileInput.files;
    const comment = commentInput.value;

    if (files.length === 0) {
        uploadStatus.innerHTML = 'Please select a file to upload.';
        return;
    }

    for (const file of files) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('comment',comment);

            const response = await fetch('<YOUR_CLOUD_FUNCTION_URL>', { // Replace with your cloud function URL
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const uploadResult = await response.text();
                uploadStatus.innerHTML += `<br> ${uploadResult}`;
            } else {
                const errorMessage = await response.text();
                uploadStatus.innerHTML += `<br> Error uploading ${file.name}: ${errorMessage}`;
            }
        } catch (error) {
            uploadStatus.innerHTML += `<br> Network error: ${error.message}`;
        }
    }
});