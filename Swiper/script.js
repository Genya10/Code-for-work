const swiper = new Swiper('.swiper-container', {
  loop: true, // Слайдер зацикленный
  slidesPerView: 1, // Показывать одну карточку за раз
  spaceBetween: 30, // Расстояние между карточками
  navigation: { //устанавливаем навигационные стрелки слайдера
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination', // элемент,который служит контейнером для пагинации
    clickable: true, // Включаем кликабельную пагинацию
  },
});