async function uploadImage() {
	const fileInput = document.getElementById("fileInput");
	const messageDiv = document.getElementById("message");

	if (fileInput.files.length === 0) {
		messageDiv.innerHTML = "Please select a file.";
		return;
	}

	const formData = new FormData();
	formData.append("image", fileInput.files[0]);

	try {
		const response = await fetch("http://localhost:5000/api/users/upload", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();
		if (result.success) {
			messageDiv.innerHTML = "Image uploaded successfully!";
		} else {
			messageDiv.innerHTML = "Failed to upload image.";
		}
	} catch (error) {
		console.error("Error:", error);
		messageDiv.innerHTML = "An error occurred.";
	}
}

async function fetchImages() {
	const imageContainer = document.getElementById("imageContainer");
	imageContainer.innerHTML = ""; // Clear previous images

	try {
		const response = await fetch("http://localhost:5000/api/users/files"); // Adjust this to your actual endpoint
		const images = await response.json();

		if (images.length > 0) {
			images.forEach((image) => {
				const img = document.createElement("img");
				img.src = image.url;
				img.alt = "Uploaded Image";
				imageContainer.appendChild(img);
			});
		} else {
			imageContainer.innerHTML = "No images found.";
		}
	} catch (error) {
		console.error("Error fetching images:", error);
		imageContainer.innerHTML = "An error occurred while fetching images.";
	}
}
