import './index.css';
// import $ from 'jquery';
import print from './print';

const c = (a, b) => a + b;
const a = 12;

const b = new Promise((resolve) => {
  setTimeout(() => {
    resolve(12);
  }, 1000);
}).then((data) => {
  // eslint-disable-next-line
	console.log(data);
});

// eslint-disable-next-line
console.log(c(12, 23));
// eslint-disable-next-line
console.log(12, a, b);
// eslint-disable-next-line
// console.log($)

print();

if (module.hot) {
  module.hot.accept('./print.js', () => {
    print();
  });
}
