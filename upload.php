<?php

$uploadDir = 'uploads/'; // Directory where uploaded files will be stored



if (!file_exists($uploadDir)) {

    mkdir($uploadDir, 0777, true);

}



if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {

    $fileName = $_FILES['file']['name'];

    $filePath = $uploadDir . $fileName;



    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {

        echo "File uploaded successfully: " . $fileName;

    } else {

        echo "Error uploading file";

    }

} else {

    echo "Error: " . $_FILES['file']['error'];

}

?>

