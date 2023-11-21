# simple-deferred-promise

[![Build Status](https://ci.systest.eu/api/badges/gergof/simple-deferred-promise/status.svg)](https://ci.systest.eu/gergof/simple-deferred-promise)

A dead simple deferred promise with TypeScript support

### Usage

This module is an ESM only module.

```ts
import Deferred from 'simple-deferred-promise';

const a = new Deferred<string>();

a.then(res => console.log(res));

a.resolve('foo'); // or a.reject('bar');

// You can also access the non-deferred promise:
a.promise.then(res => console.log(res));

// this will not work:
a.promise.resolve('123');
```

You don't have to install this module, you can just copy paste the entire source code, it's just 50 lines:
```ts
class Deferred<T = void> implements Promise<T> {
	[Symbol.toStringTag] = 'Promise';

	private _promise: Promise<T>;
	private _resolve!: (value: T | PromiseLike<T>) => void;
	private _reject!: (reason?: any) => void;
	private _state: 'pending' | 'fulfilled' | 'rejected' = 'pending';

	public get state(): 'pending' | 'fulfilled' | 'rejected' {
		return this._state;
	}

	constructor() {
		this._promise = new Promise<T>((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}

	public then<TResult1, TResult2>(
		onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
		onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
	): Promise<TResult1 | TResult2> {
		return this._promise.then(onfulfilled, onrejected);
	}

	public catch<TResult>(
		onrejected?: (reason: any) => TResult | PromiseLike<TResult>
	): Promise<T | TResult> {
		return this._promise.catch(onrejected);
	}

	public finally(onfinally?: (() => void) | undefined | null): Promise<T> {
		return this._promise.finally(onfinally);
	}

	public get promise(): Promise<T> {
		return this._promise;
	}

	public resolve(value: T | PromiseLike<T>): void {
		this._resolve(value);
		this._state = 'fulfilled';
	}

	public reject(reason?: any): void {
		this._reject(reason);
		this._state = 'rejected';
	}
}
```
