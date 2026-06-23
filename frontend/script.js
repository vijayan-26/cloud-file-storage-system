document.getElementById("uploadForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await fetch("http://localhost:5000/files/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("message").innerText = data.message;

    } catch (error) {

        document.getElementById("message").innerText = "Upload Failed";

    }

});