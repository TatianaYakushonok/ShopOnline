import { timer } from './modules/timer.js';
import './modules/blog.js';
//import './modules/article.js';

const bannerTimer = document.querySelector('[data-timer-deadline]');
const deadline = bannerTimer.dataset.timerDeadline;

timer(deadline);
