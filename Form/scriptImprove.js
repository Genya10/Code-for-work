const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  const fields = {
    phone: form.querySelector("input[name=phone]"),
    firstName: form.querySelector("input[name=firstName]"),
    lastName: form.querySelector("input[name=lastName]"),
    email: form.querySelector("input[name=email]"),
  };
  
  const errorFields = {
    firstName: form.querySelectorAll('.error-msg')[0],
    lastName: form.querySelectorAll('.error-msg')[1],
    email: form.querySelectorAll('.error-msg')[2],
    phone: form.querySelectorAll('.error-msg')[3],
  };

  const submitBtn = form.querySelector('.btn-form');

  // Сообщения об ошибках для телефона
  const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

  // Инициализация intl-tel-input для телефона
  const phoneInput = window.intlTelInput(fields.phone, {
    initialCountry: "it",
    preferredCountries: ["it"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    separateDialCode: true,
    strictMode: true,
    autoPlaceholder: "aggressive"
  });

  // Отображение ошибки для поля
  const showError = (field, errorContainer, msg) => {
    field.classList.add("error");
    errorContainer.innerHTML = msg;
    errorContainer.classList.add("show");
  };

  // Сброс всех ошибок
  const resetErrors = () => {
    form.querySelectorAll('.error-msg').forEach(el => {
      el.classList.remove("show");
      el.innerHTML = "";
    });
    form.querySelectorAll('input').forEach(input => input.classList.remove("error"));
  };

  // Валидация текстовых полей
  const validateTextField = (field, fieldErrorContainer, fieldName) => {
    if (!field.value.trim()) {
      showError(field, fieldErrorContainer, `${fieldName} не может быть пустым`);
      return false;
    }
    return true;
  };

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Общая функция для валидации телефона
  const validatePhone = () => {
    const phoneValue = fields.phone.value.trim();
    if (!phoneValue) {
      showError(fields.phone, errorFields.phone, "Required");
      return false;
    }
    if (!phoneInput.isValidNumber()) {
      const errorCode = phoneInput.getValidationError();
      const msg = errorMap[errorCode] || "Invalid number";
      showError(fields.phone, errorFields.phone, msg);
      return false;
    }
    return true;
  };

  // Обработчики для валидации телефона
  const phoneValidationHandler = () => {
    resetErrors();
    validatePhone();
  };

  fields.phone.addEventListener('blur', phoneValidationHandler);
  fields.phone.addEventListener('keyup', phoneValidationHandler);

  // Обработка кнопки отправки формы
  submitBtn.addEventListener('click', (event) => {
    resetErrors();

    let isValid = true;

    if (!validateTextField(fields.firstName, errorFields.firstName, "Имя")) isValid = false;
    if (!validateTextField(fields.lastName, errorFields.lastName, "Фамилия")) isValid = false;
    if (!validateEmail(fields.email.value)) {
      showError(fields.email, errorFields.email, "Введите корректный email");
      isValid = false;
    }
    if (!validatePhone()) isValid = false;

    if (!isValid) {
      event.preventDefault(); // Предотвращаем отправку формы, если есть ошибки
    }
  });

  // Обработка изменения кода страны в поле телефона
  fields.phone.addEventListener("countrychange", () => {
    const selectedCountryData = phoneInput.getSelectedCountryData();
    intlTelSetGeoCode(selectedCountryData.iso2);
    intlTelSetPhoneCode(selectedCountryData.dialCode);
  });
});