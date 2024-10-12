const header = document.getElementById("header");
const sticky = header.offsetTop;

function handleScroll() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

window.onscroll = function() {
    handleScroll();
};

const progressBar = document.getElementById("progress-bar");
const images = document.querySelectorAll('img');
const totalAssets = images.length;
let loadedAssets = 0;

function updateProgress() {
    loadedAssets += 1;
    const progressPercentage = (loadedAssets / totalAssets) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (loadedAssets === totalAssets) {
        hideLoader();
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

images.forEach((img) => {
    if (img.complete) {
        updateProgress();
    } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress);
    }
});

window.addEventListener('load', function() {
    if (loadedAssets === totalAssets) {
        hideLoader();
    }
});
