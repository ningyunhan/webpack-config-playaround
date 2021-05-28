// import add from './add';
// import count from "./count";
// import $ from 'jquery';

console.log("index js loaded~~");

import(/* webpackChunkName: 'what' */"./add").then(({ default: add }) => {
	console.log(add(3, 2), '333');
});

// console.log(add(1, 2));
// console.log(count(3, 2));
