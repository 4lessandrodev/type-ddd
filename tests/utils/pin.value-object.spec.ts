import { PinValueObject } from '../../lib/utils/pin.value-object';
describe('pin.value-object', () => {
	it('should be defined', () => {
		const create = PinValueObject.create;
		expect(create).toBeDefined();
	});

	it('should fail if provide an invalid length', () => {
		const errorPin = PinValueObject.create('0');
		expect(errorPin.isFail()).toBeTruthy();
	});

	it('should create a valid pin if provide an valid length', () => {
		const pin = PinValueObject.create('AB-123');
		expect(pin.isOk()).toBeTruthy();
		expect(pin.value()?.value()).toHaveLength(6);
	});

	it('should create a valid pin if not provide value', () => {
		const pin = PinValueObject.create();
		expect(pin.isOk()).toBeTruthy();
		expect(pin.value()?.value()).toHaveLength(5);
	});

	it('should generate default a valid pin', () => {
		const pin = PinValueObject.generatePin();
		expect(pin.isOk()).toBeTruthy();
		expect(pin.value()?.value()).toHaveLength(5);
	});

	it('should create a generatePin a valid pin with 3 digits', () => {
		const pin = PinValueObject.generatePin({
			lettersLength: 0,
			numbersLength: 3,
		});
		expect(pin.isOk()).toBeTruthy();
		expect(pin.value()?.value()).toHaveLength(3);
	});

	it('should create a valid pin with 15 length', () => {
		const pin = PinValueObject.generatePin({
			lettersLength: 7,
			numbersLength: 7,
		});
		expect(pin.isOk()).toBeTruthy();
		expect(pin.value()?.value()).toHaveLength(15);
	});
});
