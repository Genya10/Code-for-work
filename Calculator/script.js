// CALCULATOR

let $range = $(".js-slider-1");
let $range2 = $(".js-slider-2");

let $result = $(".calc-profit-sum");

let values_p = ["1 month", "3 month", "6 month", "9 month", "12 month"];

let inputValue = 300;
let dataFrom = 0;

$range.ionRangeSlider({
  skin: "round",
  type: "single",
  grid: true,
  min: 0,
  max: 4,
  postfix: "",
  from: 0,
  values: values_p,
  onStart: function (data) {
    dataFrom = data.from;
    $result.text("€ " + calcResult(data));
  },
  onChange: function (data) {
    dataFrom = data.from;
    $result.text("€ " + calcResult(data));
  },
  onUpdate: function (data) {
    dataFrom = data.from;
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
  from: 1163,
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

function calcResult() {
  return Math.round(inputValue * ((dataFrom + 1) * 3.3) + inputValue);
}