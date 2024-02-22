export const timer = (deadline) => {
  const bannerTimer = document.querySelector('.timer');
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerCountSeconds = document.querySelector('.timer__count_seconds');
  const timerUnitsDays = document.querySelector('.timer__units_days');
  const timerUnitsHours = document.querySelector('.timer__units_hours');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
  const timerUnitsSeconds = document.querySelector('.timer__units_seconds');
  const timerItemdays = document.querySelector('.timer__item_days');
  const timerItemSeconds = document.querySelector('.timer__item_seconds');

  const getTimeRemaining = () => {
    const date = new Date(deadline).toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    });
    const [first, second] = date.split(',').map((item) => item.trim());
    const [day, month, year] = first.split('.');
    const [hoursD, minutesD, secondsD] = second.split(':');
    const dateStop = new Date(year, month - 1, day, hoursD, minutesD, secondsD);
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
    const days = Math.floor((timeRemaining / 1000 / 60 / 60 / 24) % 24);

    return { timeRemaining, seconds, minutes, hours, days };
  };

  const start = () => {
    const timer = getTimeRemaining();

    if (timer.hours < 10 || timer.minutes < 10 || timer.seconds < 10) {
      timerCountDays.textContent = timer.days;
      timerCountHours.textContent = String(timer.hours).padStart(2, '0');
      timerCountMinutes.textContent = String(timer.minutes).padStart(2, '0');
      if (timerCountSeconds) {
        timerCountSeconds.textContent = String(timer.seconds).padStart(2, '0');
      }
    } else {
      timerCountDays.textContent = timer.days;
      timerCountHours.textContent = timer.hours;
      timerCountMinutes.textContent = timer.minutes;
      if (timerCountSeconds) {
        timerCountSeconds.textContent = timer.seconds;
      }
    }

    if (timer.days === 0) {
      timerItemdays.style.display = 'none';
      timerItemSeconds.style.display = 'block';
    }

    const strDays =
      timer.days == 1 || (timer.days > 19 && timer.days % 10 == 1)
        ? 'день'
        : (timer.days > 1 && timer.days < 5) ||
          (timer.days > 19 && timer.days % 10 > 1 && timer.days % 10 < 5)
        ? 'дня'
        : 'дней';
    const strHours =
      timer.hours == 1 || (timer.hours > 19 && timer.hours % 10 == 1)
        ? 'час'
        : (timer.hours > 1 && timer.hours < 5) ||
          (timer.hours > 19 && timer.hours % 10 > 1 && timer.hours % 10 < 5)
        ? 'часа'
        : 'часов';
    const strMinutes =
      timer.minutes == 1 || (timer.minutes > 19 && timer.minutes % 10 == 1)
        ? 'минута'
        : (timer.minutes > 1 && timer.minutes < 5) ||
          (timer.minutes > 19 &&
            timer.minutes % 10 > 1 &&
            timer.minutes % 10 < 5)
        ? 'минуты'
        : 'минут';
    const strSeconds =
      timer.seconds == 1 || (timer.seconds > 19 && timer.seconds % 10 == 1)
        ? 'секунда'
        : (timer.seconds > 1 && timer.seconds < 5) ||
          (timer.seconds > 19 &&
            timer.seconds % 10 > 1 &&
            timer.seconds % 10 < 5)
        ? 'секунды'
        : 'секунд';

    timerUnitsDays.textContent = strDays;
    timerUnitsHours.textContent = strHours;
    timerUnitsMinutes.textContent = strMinutes;
    timerUnitsSeconds.textContent = strSeconds;

    const intervalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      bannerTimer.remove();
    }
  };

  start();
};
