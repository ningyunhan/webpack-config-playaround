import './index.css';

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
