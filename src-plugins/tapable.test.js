const {
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook,
} = require("tapable");

class Lesson {
	constructor() {
		this.hooks = {
			go: new SyncHook(["address", "ww"]),
			goBail: new SyncBailHook(["address"]),
			leave: new AsyncParallelHook(["name", "age"]),
		};
	}

	tap() {
		this.hooks.go.tap("class03", (a, b) => {
			console.log("class03", a, b);
		});
		this.hooks.go.tap("class04", (a, b) => {
			console.log("class04", a, b);
		});
	}

	tapBail() {
		this.hooks.goBail.tap("class03", (a, b) => {
			console.log("class03", a, b);
			return 12;
		});
		this.hooks.goBail.tap("class04", (a, b) => {
			console.log("class04", a, b);
		});
	}

	tapAsyncParallel() {
        this.hooks.leave.tapPromise("tapPromise", (name, age) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('this is from promise');
                    resolve();
                }, 2000)
            });
		});

		this.hooks.leave.tapAsync("tapAsync", (name, age, cb) => {
			setTimeout(() => {
                console.log('this is from async');
				cb();
			}, 1000);
		});

	}

	start() {
		this.hooks.go.call("hi", "how");
	}

	startBail() {
		this.hooks.goBail.call("hi bail");
	}

	startAsync() {
		this.hooks.leave.callAsync("jack", 25, () => {
			console.log("all end");
		});
	}
}

const l = new Lesson();
l.tapAsyncParallel();
l.startAsync();
