let position = 0;

document.addEventListener("DOMContentLoaded", function () {
  const carouselButtons = document.querySelectorAll(
    ".gallery-carousel__button"
  );
  carouselButtons.forEach((button) => {
    button.addEventListener("click", (event) =>
      handlerClickOnCarouselButtons(event)
    );
  });
});

function handlerClickOnCarouselButtons(event) {
  // DOM Elements
  const button = event.target;
  const carousel = button.closest(".gallery-carousel");
  const buttonNext = carousel.querySelector(".next-button");
  const buttonPrev = carousel.querySelector(".prev-button");
  const carouselItemsList = carousel.querySelector(
    ".gallery-carousel__items-list"
  );

  const wrapperWidth = carousel.querySelector(
    ".gallery-carousel__wrapper"
  ).offsetWidth;
  const itemsListWidth = carouselItemsList.offsetWidth;
  const gap = parseInt(getComputedStyle(carouselItemsList).gap);

  const direction = button.classList.contains("next-button") ? "left" : "right";

  if (direction == "left") {
    position -= wrapperWidth + gap;
  } else {
    position += wrapperWidth + gap;
  }

  toggleNavigationButtons(
    position,
    itemsListWidth,
    wrapperWidth,
    buttonNext,
    buttonPrev
  );

  rotateCarousel(carouselItemsList, position);

  toggleNavigationButtons(
    position,
    itemsListWidth,
    wrapperWidth,
    buttonNext,
    buttonPrev
  );
}

function rotateCarousel(carousel, position) {
  carousel.style.transform = `translateX(${position}px)`;
}

function toggleNavigationButtons(
  position,
  itemsListWidth,
  wrapperWidth,
  buttonNext,
  buttonPrev
) {
  if (itemsListWidth + (position - wrapperWidth) <= 0) {
    buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }

  if (position === 0) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }
}
