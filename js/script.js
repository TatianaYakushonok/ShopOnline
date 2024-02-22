import { timer } from './modules/timer.js';

const bannerTimer = document.querySelector('[data-timer-deadline]');
const deadline = bannerTimer.dataset.timerDeadline;

timer(deadline);
