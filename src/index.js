import './index.css';

const c = (a, b) => a + b;
let a = 12;


const b = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(12);
    }, 1000);
}).then(data => {
    console.log(data);
})

// eslint-disable-next-line
console.log(c(12,23))
console.log(12)
