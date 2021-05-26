// import add from './add';
// import count from "./count";

console.log("index js loaded~~");

import("./add").then(({ default: add }) => {
	console.log(add(3, 2), '333');
});

// console.log(add(1, 2));
// console.log(count(3, 2));
