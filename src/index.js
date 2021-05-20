import './index.css';
import $ from 'jquery';
// import _ from 'lodash';
import print from './print';

const c = (a, b) => a + b;
const a = 12;

// eslint-disable-next-line
console.log(c(12, 23));
// eslint-disable-next-line
console.log(12, a, b);

print();

// if (module.hot) {
//   module.hot.accept('./print.js', () => {
//     print();
//   });
// }
// eslint-disable-next-line
console.log(a, $, _.join(['www']));
