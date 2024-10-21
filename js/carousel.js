document.addEventListener("DOMContentLoaded", function () {
  // Все карусели на странице
  const carousels = document.querySelectorAll(".gallery-carousel");

  // Установка анимации для каждой карусели
  carousels.forEach((carousel) => {
    let index = 0;
    let position;

    // Тип карусели
    const isAutoplay = carousel.dataset.autoplay === "true";
    const isLoop = carousel.dataset.loop === "true";

    // Основные DOM элементы карусели
    const buttonNext = carousel.querySelector(".next-button");
    const buttonPrev = carousel.querySelector(".prev-button");
    const carouselItemsList = carousel.querySelector(
      ".gallery-carousel__items-list"
    );
    const indicatorsWrapper = carousel.querySelector(
      ".gallery-carousel__indicators"
    );
    const counterWrapper = carousel.querySelector(".gallery-carousel__counter");
    const counterCurrent = carousel.querySelector(
      ".gallery-carousel__current-slide-number"
    );
    const counterAll = carousel.querySelector(
      ".gallery-carousel__all-sliders-number"
    );
    const countItems = carousel.querySelectorAll(
      ".gallery-carousel__item"
    ).length;

    // Размеры элементов
    const wrapperWidth = carousel.querySelector(
      ".gallery-carousel__wrapper"
    ).offsetWidth;
    const itemsListWidth = carouselItemsList.offsetWidth;
    const countSliders = Math.round(itemsListWidth / wrapperWidth);
    const gap = parseInt(getComputedStyle(carouselItemsList).gap) || 0;

    //Настройка индикаторов
    let indicators;
    if (indicatorsWrapper) {
      indicators = createIndicators(indicatorsWrapper, countSliders);
      setIndicator(indicators, index);
    }

    if (counterWrapper) {
      counterAll.innerHTML = countSliders;
      setCounter(counterCurrent, index + 1);
    }

    // Функция для обработки кликов по кнопкам
    function handleClick(direction) {
      //Убираю выделение индикатора
      if (indicatorsWrapper) {
        setIndicator(indicators, index);
      }

      // Изменение индекса
      if (direction === "next") {
        index++;
        if (isLoop) {
          if (index === countSliders) {
            index = 0;
          }
        }
      } else if (direction === "prev") {
        index--;
        if (isLoop) {
          if (index < 0) {
            index = countSliders - 1;
          }
        }
      }

      // Вычисляем новое положение карусели
      position = -(wrapperWidth + gap) * index + 1;

      // Прокрутка карусели
      rotateCarousel(carouselItemsList, position);

      //Обновляю индикатор
      if (indicatorsWrapper) {
        setIndicator(indicators, index);
      }
      if (counterWrapper) {
        counterAll.innerHTML = countSliders;
        setCounter(counterCurrent, index + 1);
      }

      if (!isLoop) {
        // Дисейбл кнопок в случае крайних положений
        setNavigationButtons(index, countSliders, buttonNext, buttonPrev);
      }
    }

    // Обработчики событий по кликам на кнопки
    buttonNext.addEventListener("click", () => handleClick("next"));
    buttonPrev.addEventListener("click", () => handleClick("prev"));

    // Начальные состояния кнопок
    if (!isLoop) buttonPrev.disabled = true;
  });
});

function rotateCarousel(carousel, position) {
  carousel.style.transform = `translateX(${position}px)`;
}

function setNavigationButtons(index, countSliders, buttonNext, buttonPrev) {
  // Начало карусели
  if (index === 0) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }

  // Конец карусели
  if (index + 1 === countSliders) {
    buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }
}

function createIndicators(wrapper, count) {
  const indicators = [];
  for (let i = 0; i < count; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("gallery-carousel__indicator");
    wrapper.append(indicator);
    indicators.push(indicator);
  }
  return indicators;
}

function setIndicator(indicators, index) {
  indicators[index].classList.toggle("gallery-carousel__indicator_current");
}

function setCounter(counterCurrent, index) {
  counterCurrent.innerHTML = index;
}
