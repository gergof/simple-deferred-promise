import Deferred from './index';

describe('States', () => {
	test('Default state should be pending', () => {
		const d = new Deferred();

		expect(d.state).toBe('pending');
	});

	test('State shoud be fulfilled after resolve', () => {
		const d = new Deferred();
		d.resolve();

		expect(d.state).toBe('fulfilled');
	});

	test('State should be rejected after reject', () => {
		const d = new Deferred();
		d.catch(() => {});
		d.reject();

		expect(d.state).toBe('rejected');
	});
});

test('Resolve', () => {
	const d = new Deferred<string>();

	d.resolve('123');

	expect(d).resolves.toBe('123');
});

test('Reject', () => {
	const d = new Deferred<string>();

	d.reject('321');

	expect(d).rejects.toBe('321');
});
