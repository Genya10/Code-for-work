const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  const phoneInputField = form.querySelector("input[name=phone]");
  const firstNameField = form.querySelector("input[name=firstName]");
  const lastNameField = form.querySelector("input[name=lastName]");
  const emailField = form.querySelector("input[name=email]");
  const submitBtn = form.querySelector('.btn-form');

  // Сообщения об ошибках
  const firstNameError = form.querySelectorAll('.error-msg')[0];
  const lastNameError = form.querySelectorAll('.error-msg')[1];
  const emailError = form.querySelectorAll('.error-msg')[2];
  const phoneError = form.querySelectorAll('.error-msg')[3];

  // Сообщения об ошибках для телефона
  const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

  // Инициализация intl-tel-input для телефона
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "it", // Устанавливаем начальную страну (Италия)
    preferredCountries: ["it"], // Приоритетная страна для выбора
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",//Скрипт для валидации
    separateDialCode: true, // Код страны отображается отдельно
    strictMode: true, // Включаем строгий режим для валидации
    autoPlaceholder: "aggressive" // Автоматическое заполнение placeholder'а
  });

    // Отображение ошибки для поля
    const showError = (field, errorContainer, msg) => {
      field.classList.add("error");
      errorContainer.innerHTML = msg; // Вставляем текст ошибки в контейнер
      errorContainer.classList.add("show");
    };

  // Сброс сообщений об ошибках
  const reset = () => {
    form.querySelectorAll('.error-msg').forEach(el => {
      el.classList.remove("show");
      el.innerHTML = ""; // Очищаем текст ошибки
    });
    // Убираем класс "error" из всех полей, чтобы удалить визуальное выделение ошибки
    form.querySelectorAll('input').forEach(input => input.classList.remove("error"));
  };

  // Валидация имени, фамилии и email
  const validateTextField = (field, fieldErrorContainer, fieldName) => {
    // Проверяем, если поле пустое (без учета пробелов)
    if (field.value.trim() === "") {
      // Если поле пустое, показываем ошибку
      showError(field, fieldErrorContainer, `${fieldName} не может быть пустым`);
      return false; // Возвращаем false, если валидация не пройдена
    }
    return true; // Если поле не пустое, возвращаем true
  };

  // Функция для проверки валидности email с помощью регулярного выражения
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); // Проверяем, соответствует ли email шаблону
  };

  // Валидация телефона при потере фокуса
  phoneInputField.addEventListener('blur', () => {
    reset();
    if (phoneInputField.value.trim()) { // Проверяем, если поле телефона не пустое
      if (!phoneInput.isValidNumber()) { // Если номер телефона невалиден
        const errorCode = phoneInput.getValidationError(); //Получаем код ошибки от плагина intl-tel-input
        // Получаем сообщение об ошибке, либо выводим "Invalid number" по умолчанию
        const msg = errorMap[errorCode] || "Invalid number";
        showError(phoneInputField, phoneError, msg); // Показываем сообщение об ошибке
      }
    }
  });

  // Валидация телефона при вводе (по каждому символу)
  phoneInputField.addEventListener('keyup', () => {
    reset();
    // Если поле не пустое и введенный номер невалиден
    if (phoneInputField.value.trim() && !phoneInput.isValidNumber()) {
      const errorCode = phoneInput.getValidationError(); // Получаем код ошибки
      const msg = errorMap[errorCode] || "Invalid number"; // Получаем сообщение об ошибке
      showError(phoneInputField, phoneError, msg);
    }
  });

  // Обработка кнопки отправки формы
  submitBtn.addEventListener('click', (event) => {
    reset();

    // Проверка всех полей
    let isValid = true;  // Переменная для проверки, валидна ли форма

    if (!validateTextField(firstNameField, firstNameError, "Имя")) {
      isValid = false; // Если поле невалидно, меняем статус формы на "невалидна"
    }
    if (!validateTextField(lastNameField, lastNameError, "Фамилия")) {
      isValid = false;
    }
    if (!validateEmail(emailField.value)) {
      showError(emailField, emailError, "Введите корректный email");
      isValid = false;
    }

    if (!phoneInputField.value.trim()) { //Проверяем, заполнено ли поле телефона
      showError(phoneInputField, phoneError, "Required");//Если поле пустое,показываем ошибку "Required"
      isValid = false;
    } else if (!phoneInput.isValidNumber()) {  //Если номер телефона невалиден
      const errorCode = phoneInput.getValidationError();
      const msg = errorMap[errorCode] || "Invalid number";
      showError(phoneInputField, phoneError, msg);
      isValid = false;
    }

    if (!isValid) { // Если хотя бы одно поле невалидно
      event.preventDefault(); // Предотвращаем отправку формы
    }
  });

  // Обработка изменений кода страны в поле телефона
  phoneInputField.addEventListener("countrychange", () => {
    // Получаем данные о выбранной стране
    const selectedCountryData = phoneInput.getSelectedCountryData();
    // Устанавливаем геокод страны (например, 'it' для Италии)
    intlTelSetGeoCode(selectedCountryData.iso2);
    // Устанавливаем телефонный код страны (например, '+39' для Италии)
    intlTelSetPhoneCode(selectedCountryData.dialCode);
  });
});