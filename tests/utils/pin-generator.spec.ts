import pinGenerator from '../../src/utils/pin-generator.util';
describe('pin-generator', () => {
	it('should be defined', () => {
		const generator = pinGenerator;
		expect(generator).toBeDefined();
	});

	it('should generate a default pin 3 digits', () => {
		const pin = pinGenerator({
			lettersLength: 0,
			numbersLength: 3,
		});

		expect(pin).toHaveLength(3);
	});

	it('should generate a default pin 7 digits', () => {
		const pin = pinGenerator({
			lettersLength: 0,
			numbersLength: 7,
		});

		expect(pin).toHaveLength(7);
	});

	it('should generate a default pin 15 digits includes -', () => {
		const pin = pinGenerator({
			lettersLength: 7,
			numbersLength: 7,
		});

		expect(pin).toHaveLength(15);
	});

	it('should generate a default pin 7 digits includes -', () => {
		const pin = pinGenerator({
			lettersLength: 3,
			numbersLength: 3,
		});

		expect(pin).toHaveLength(7);
	});
});
