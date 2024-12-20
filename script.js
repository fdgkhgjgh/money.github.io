document.getElementById('postForm').addEventListener('submit', function(event) {

    event.preventDefault();



    const content = document.getElementById('postContent').value;

    const media = document.getElementById('mediaUpload').files[0];



    const post = document.createElement('div');

    post.className = 'post';



    const textNode = document.createElement('p');

    textNode.textContent = content;



    post.appendChild(textNode);



    if (media) {

        const mediaUrl = URL.createObjectURL(media);

        const mediaElement = document.createElement(media.type.startsWith('image/') ? 'img' : 'video');

        mediaElement.src = mediaUrl;

        mediaElement.controls = true; // For video controls

        mediaElement.style.maxWidth = '100%'; // Make sure it fits the post



        post.appendChild(mediaElement);

    }



    document.getElementById('posts').prepend(post);

    document.getElementById('postForm').reset();

});

