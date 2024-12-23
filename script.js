const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const commentInput = document.getElementById('comment');
const uploadStatus = document.getElementById('uploadStatus');
const uploadedFilesDiv = document.getElementById('uploadedFiles');

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

            const response = await fetch('https://asia-southeast1-github-website-445611.cloudfunctions.net/uploadFile', { // Replace with your cloud function URL
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const uploadResult = await response.text();
                uploadStatus.innerHTML += `<br> ${uploadResult}`;

                // Extract file name from response and generate a public link
                const fileName = uploadResult.split("File uploaded successfully: ")[1].split(" with comment")[0];
                const publicLink = `https://storage.googleapis.com/gcf-v2-sources-45640842396-asia-southeast1/${uploadFile}`; //Replace with your bucket name
                 // Create the display element
                const fileElement = document.createElement('div');
                const commentText = uploadResult.split("with comment: ")[1];
                  fileElement.innerHTML = `<a href="gcf-v2-sources-45640842396-asia-southeast1" target="_blank"> uploadFile{fileName} </a> <p>Comment: file{commentText}</p>`
                uploadedFilesDiv.appendChild(fileElement);
             } else {
                const errorMessage = await response.text();
                uploadStatus.innerHTML += `<br> Error uploading ${file.name}: ${errorMessage}`;
            }
        } catch (error) {
            uploadStatus.innerHTML += `<br> Network error: ${error.message}`;
        }
    }
});