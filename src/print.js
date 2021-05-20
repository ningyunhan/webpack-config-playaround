import _ from 'lodash';

export default function print() {
  // eslint-disable-next-line
  console.log('print');
}
// eslint-disable-next-line
console.log(_.join(['Another', 'module', 'loaded!'], ' '));
