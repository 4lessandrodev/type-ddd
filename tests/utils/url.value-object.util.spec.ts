import { UrlValueObject } from '../../lib/utils/url.value-object';

describe('url.value-object', () => {
	it('should be defined', () => {
		const valueObject = UrlValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid url', () => {
		const valueObject = UrlValueObject.create('https://google.com');
		expect(valueObject.isSuccess()).toBe(true);
	});

	it('should create a valid url and get the value', () => {
		const valueObject = UrlValueObject.create('https://google.com').value();
		expect(valueObject.value()).toBe('https://google.com');
	});

	it('should fail if try to create an invalid url', () => {
		const valueObject = UrlValueObject.create('localhost');
		expect(valueObject.isFailure).toBeTruthy();
	});
});
