"use strict";

window.addEventListener('scroll', function () {
    const accordions = document.querySelectorAll('.accordion-cont');
    const scrollPosition = window.scrollY + window.innerHeight;

    accordions.forEach(function (accordion) {
        const accordionPosition = accordion.offsetTop;

        if (scrollPosition > accordionPosition) {
            accordion.classList.add('show');
        }
    });
});

window.addEventListener('scroll', function () {
    const cards = document.querySelectorAll('.card-animation');

    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (screenPosition > cardPosition) {
            card.classList.add('show');
        }
    });
});

window.addEventListener('scroll', function () {
    const video = document.querySelectorAll('.video-animation');

    video.forEach(video => {
        const videoPosition = video.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (screenPosition > videoPosition) {
            video.classList.add('show');
        }
    });
});

window.addEventListener('scroll', function () {
    const title = document.querySelectorAll('.title-animation');

    title.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (screenPosition > titlePosition) {
            title.classList.add('show');
        }
    });
});