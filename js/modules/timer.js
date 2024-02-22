const declOfNum = (num, words) => {
  return words[
    num == 1 || (num > 19 && num % 10 == 1)
      ? 0
      : (num > 1 && num < 5) || (num > 19 && num % 10 > 1 && num % 10 < 5)
      ? 1
      : 2
  ];
};

const createTimer = (item) => {
  const bannerTimer = document.querySelector('.banner__timer');
  bannerTimer.classList.add('timer');
  bannerTimer.insertAdjacentHTML(
    'beforeend',
    `
    <p class="timer__title">До конца акции:</p>

    <div class="timer__container">
      <p class="timer__item timer__item_days"><span
          class="timer__count timer__count_days">${item.days}</span>
        <span class="timer__units timer__units_days">${item.strDays}</span>
      </p>
      <p class="timer__item timer__item_hours"><span
          class="timer__count timer__count_hours">${item.hours}</span>
        <span class="timer__units timer__units_hours">${item.strHours}</span>
      </p>
      <p class="timer__item timer__item_minutes"><span
          class="timer__count timer__count_minutes">${item.minutes}</span>
        <span class="timer__units timer__units_minutes">${item.strMinutes}</span>
      </p>
      <p class="timer__item timer__item_seconds"><span
          class="timer__count timer__count_seconds">${item.seconds}</span>
        <span class="timer__units timer__units_seconds">${item.strSeconds}</span>
      </p>
    </div>
    `,
  );

  return bannerTimer;
};

export const timer = (deadline) => {
  const timer = getTimeRemaining();
  createTimer(timer);

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

  function getTimeRemaining() {
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

    const arrDays = ['день', 'дня', 'дней'];
    const arrHours = ['час', 'часа', 'часов'];
    const arrMinutes = ['минута', 'минуты', 'минут'];
    const arrSeconds = ['секунда', 'секунды', 'секунд'];

    const strDays = declOfNum(days, arrDays);
    const strHours = declOfNum(hours, arrHours);
    const strMinutes = declOfNum(minutes, arrMinutes);
    const strSeconds = declOfNum(second, arrSeconds);

    return {
      timeRemaining,
      seconds,
      minutes,
      hours,
      days,
      strDays,
      strHours,
      strMinutes,
      strSeconds,
    };
  }

  const start = () => {
    const timer = getTimeRemaining();

    if (timer.hours < 10 || timer.minutes < 10 || timer.seconds < 10) {
      timerCountDays.textContent = timer.days;
      timerCountHours.textContent = String(timer.hours).padStart(2, '0');
      timerCountMinutes.textContent = String(timer.minutes).padStart(2, '0');
      timerCountSeconds.textContent = String(timer.seconds).padStart(2, '0');
    } else {
      timerCountDays.textContent = timer.days;
      timerCountHours.textContent = timer.hours;
      timerCountMinutes.textContent = timer.minutes;
      timerCountSeconds.textContent = timer.seconds;
    }

    if (timer.days === 0) {
      timerItemdays.style.display = 'none';
      timerItemSeconds.style.display = 'block';
    }

    timerUnitsDays.textContent = timer.strDays;
    timerUnitsHours.textContent = timer.strHours;
    timerUnitsMinutes.textContent = timer.strMinutes;
    timerUnitsSeconds.textContent = timer.strSeconds;

    const intervalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      bannerTimer.remove();
    }
  };

  start();
};
