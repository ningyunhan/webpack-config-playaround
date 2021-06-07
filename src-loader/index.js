console.log("this is for test");


class Person {
    constructor(name) {
        this.name = name;
    }
    setName(name) {
        this.name = name;
    }
}

const person1 = new Person('jack');
console.log(person1.name);