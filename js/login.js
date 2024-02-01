let isImage1 = true;

function toggleCheckboxImage() {
    let image = document.getElementById('checkbox');

    if(isImage1) {
        image.src = "./assets/img/login/checked.png";
    } else {
        image.src = "./assets/img/login/unchecked.png";
    }

    isImage1 = !isImage1;
}

