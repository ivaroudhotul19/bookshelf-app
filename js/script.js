document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        Book();
        alert("Buku berhasil ditambahkan");
    });

    if (storage_exist()) {
        load_storage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data telah Disimpan");
});
document.addEventListener("ondataloaded", () => {
    refresh();
});