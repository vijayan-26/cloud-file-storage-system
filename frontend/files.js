async function loadFiles() {

    try {

        const response = await fetch("http://localhost:5000/files/all");

        const files = await response.json();

        const fileList = document.getElementById("fileList");

        fileList.innerHTML = "";

        files.forEach(file => {

            fileList.innerHTML += `
                <div style="margin-bottom:20px;">
                    <h3>${file.originalname}</h3>

                    <a href="${file.fileurl}" target="_blank">
                        View File
                    </a>
                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadFiles();