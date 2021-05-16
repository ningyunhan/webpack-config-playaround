import './index.css';
// import Promise from 'core-js-pure/features/promise';

const c = (a, b) => a + b;
const a = 12;

const b = new Promise((resolve) => {
  setTimeout(() => {
    resolve(12);
  }, 1000);
}).then((data) => {
  console.log(data);
});

// eslint-disable-next-line
console.log(c(12,23))
console.log(12, a, b);
