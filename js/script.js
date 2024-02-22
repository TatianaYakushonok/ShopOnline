import { timer } from './modules/timer.js';

const bannerTimer = document.querySelector('.timer');
const deadline = bannerTimer.dataset.timerDeadline;

timer(deadline);
