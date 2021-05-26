import './index.css';

const _ = require('lodash');

console.log(_.join(['Another', 'module', 'loaded!']));

// 注册service worker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker')
      .then(() => {})
      .catch(() => {});
  });
}


