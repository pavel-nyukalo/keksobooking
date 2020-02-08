'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var numberRooms = adForm.querySelector('select[name=rooms]');
  var numberGuests = adForm.querySelector('select[name=capacity]');
  var typeFlat = adForm.querySelector('select[name=type]');
  var pricePerNight = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein]');
  var timeOut = adForm.querySelector('select[name=timeout]');

  // Валидация комнат и гостей
  var checkNumberOfGuestsAndRooms = function () {
    var roomsValue = parseInt(numberRooms.value, 10);
    var guestsValue = parseInt(numberGuests.value, 10);

    if (roomsValue !== 100 && guestsValue === 0) {
      numberGuests.setCustomValidity('Недостаточно гостей');
    } else if (roomsValue < guestsValue) {
      numberGuests.setCustomValidity('Гостей очень много');
    } else if (roomsValue === 100 && guestsValue !== 0) {
      numberGuests.setCustomValidity('Данный вариант не для гостей');
    } else {
      numberGuests.setCustomValidity('');
    }
  };

  // Установка минимальной цены
  var setMinPrice = function () {
    var selectedType = typeFlat.value;
    var value;

    if (selectedType === 'bungalo') {
      value = 0;
    } else if (selectedType === 'flat') {
      value = 1000;
    } else if (selectedType === 'house') {
      value = 5000;
    } else {
      value = 10000;
    }

    pricePerNight.setAttribute('min', value);
    pricePerNight.setAttribute('placeholder', value);
  };

  // Синхронизация времени заезда и выезда
  var toSyncTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  var toSyncTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  // Валидация формы
  numberRooms.addEventListener('change', function () {
    checkNumberOfGuestsAndRooms();
  });

  typeFlat.addEventListener('change', function () {
    setMinPrice();
  });

  timeIn.addEventListener('change', function () {
    toSyncTimeOut();
  });

  timeOut.addEventListener('change', function () {
    toSyncTimeIn();
  });
})();
