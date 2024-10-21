document.addEventListener("DOMContentLoaded", function () {
  // Все карусели на странице
  const carousels = document.querySelectorAll(".gallery-carousel");

  // Установка анимации для каждой карусели
  carousels.forEach((carousel) => {
    let position = 0;

    // Тип карусели
    const isAutoplay = carousel.dataset.autoplay === "true";
    const isLoop = carousel.dataset.loop === "true";

    // Основные DOM елементы карусели
    const buttonNext = carousel.querySelector(".next-button");
    const buttonPrev = carousel.querySelector(".prev-button");
    const carouselItemsList = carousel.querySelector(
      ".gallery-carousel__items-list"
    );

    // Размеры элементов
    const wrapperWidth = carousel.querySelector(
      ".gallery-carousel__wrapper"
    ).offsetWidth;
    const itemsListWidth = carouselItemsList.offsetWidth;
    const gap = parseInt(getComputedStyle(carouselItemsList).gap) || 0;

    // Функция для обработки кликов по кнопкам
    function handleClick(direction) {
      // Изменение позиции
      if (direction === "next") {
        position -= wrapperWidth + gap;
      } else if (direction === "prev") {
        position += wrapperWidth + gap;
      }
      position = Math.max(
        Math.min(position, 0),
        -(itemsListWidth - wrapperWidth)
      );

      // Прокрутка карусели
      rotateCarousel(carouselItemsList, position);

      // Дисейбл кнопок в случае крайних положений
      setNavigationButtons(
        position,
        itemsListWidth,
        wrapperWidth,
        buttonNext,
        buttonPrev
      );
    }

    // Обработчики событий по кликам на кнопки
    buttonNext.addEventListener("click", () => handleClick("next"));
    buttonPrev.addEventListener("click", () => handleClick("prev"));

    // Начальные состояния кнопок
    buttonPrev.disabled = true;
  });
});

function rotateCarousel(carousel, position) {
  carousel.style.transform = `translateX(${position}px)`;
}

function setNavigationButtons(
  position,
  itemsListWidth,
  wrapperWidth,
  buttonNext,
  buttonPrev
) {
  // Начало карусели
  if (position === 0) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }

  // Конец карусели
  if (position <= -(itemsListWidth - wrapperWidth)) {
    buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }
}
