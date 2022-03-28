const $device_mobile_h2 = document.querySelector('.device-mobile h2');
const $slideToggle = document.querySelector('.slideToggle');

$device_mobile_h2.addEventListener('click', function (e) {
    slideToggle($slideToggle);
});

function slideDown(element) {
    $slideToggle.classList.toggle('active');
    const height = element.clientHeight + 'px';

    element.style.height = 0;

    window.setTimeout(() => {
        element.style.height = height;
    }, 0);
}

function slideUp(element) {
    element.style.height = 0;

    element.addEventListener('transitionend', function end (e){
        element.classList.toggle('active');
        element.style.height = 'auto'
        element.removeEventListener('transitionend', end);
    });
}

function slideToggle(element) {
    element.style.overflow = 'hidden';
    if (!element.classList.contains('active')) {
        slideDown(element);
    } else {
        slideUp(element);
    }
}