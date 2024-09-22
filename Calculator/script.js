// CALCULATOR
let $range1 = $(".js-slider-1");
let $range2 = $(".js-slider-2");
// Переменная для отображения результата
let $result = $(".calc-profit-sum");
// Массив значений для первого слайдера (периоды в месяцах)
let values_p = ["1 month", "3 month", "6 month", "9 month", "12 month"];

let inputValue = 300; // Стартовое значение для второго слайдера (сумма)
let dataFrom = 0; // Стартовое значение для первого слайдера (индекс периода)

$range1.ionRangeSlider({
  skin: "round", // Используем тему "round" для слайдера
  type: "single", // Одноканальный слайдер (один ползунок)
  grid: true, // Отображение сетки (разделители под слайдером)
  min: 0, // Минимальное значение (индекс массива values_p)
  max: 4, // Максимальное значение (индекс массива values_p)
  postfix: "", // Нет постфикса для значений
  from: 0, // Начальное значение (индекс массива values_p)
  values: values_p,  // Значения слайдера — периоды в месяцах
  // Колбэк, который срабатывает при инициализации слайдера:
  onStart: function (data) {
    dataFrom = data.from; // Сохраняем выбранное значение (индекс периода)
    $result.text("€ " + calcResult(data)); // Пересчитываем и обновляем результат
  },
  // Колбэк, который срабатывает при изменении значения слайдера:
  onChange: function (data) {
    dataFrom = data.from; // Обновляем выбранный период
    $result.text("€ " + calcResult(data));
  },
  // Колбэк, который срабатывает при обновлении слайдера:
  onUpdate: function (data) {
    dataFrom = data.from; // Обновляем значение периода при изменении данных
    $result.text("€ " + calcResult(data));
    console.log("onUpdate", data, $input.val());
  },
});

$range2.ionRangeSlider({
  skin: "round",
  type: "single",
  grid: true,
  min: 300,
  max: 15000,
  postfix: " €",
  from: 2000,
  // values: values_p,
  onStart: function (data) {
    inputValue = data.from;
    $result.text("€ " + calcResult(data));
  },
  onChange: function (data) {
    inputValue = data.from;
    $result.text("€ " + calcResult(data));
  },
  onUpdate: function (data) {
    inputValue = data.from;
    $result.text("€ " + calcResult(data));
  },
});

// Функция для вычисления возможной прибыли
function calcResult() {
  // Вычисляем прибыль по формуле: умножаем сумму на коэффициент (зависит от периода)
  // Затем добавляем исходную сумму. Используем округление до ближайшего целого числа.
  return Math.round(inputValue * ((dataFrom + 1) * 3.3) + inputValue);
}