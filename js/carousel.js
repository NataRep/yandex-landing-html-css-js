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
  const button = event.target;
  const carousel = button.closest(".gallery-carousel");
  const carouselItemsList = carousel.querySelector(
    ".gallery-carousel__items-list"
  );
  const gap = parseInt(getComputedStyle(carouselItemsList).gap);
  console.log(gap);
  const direction = button.classList.contains("next-button") ? "left" : "right";

  const wrapperWith = carousel.querySelector(
    ".gallery-carousel__wrapper"
  ).offsetWidth;
  console.log(wrapperWith);

  if (direction == "left") {
    position -= wrapperWith + gap;
  } else {
    position += wrapperWith + gap;
  }

  rotateCarousel(carouselItemsList, position);
}

function rotateCarousel(carousel, position) {
  carousel.style.transform = `translateX(${position}px)`;

  /* const wrapper = carousel.querySelector(".gallery-carousel__wrapper");
  const itemWith = carousel.querySelector(
    ".gallery-carousel__item"
  ).offsetWidth;
  const wrapperWith = wrapper.offsetWidth;

  console.log(wrapperWith);

  const carouselItemsList = carousel.querySelector(
    ".gallery-carousel__items-list"
  );
  const position =
    parseInt(getComputedStyle(carouselItemsList).transform) != NaN
      ? parseInt(getComputedStyle(carouselItemsList).transform)
      : 0;

  console.log(getComputedStyle(carouselItemsList).transform);
  */
}
