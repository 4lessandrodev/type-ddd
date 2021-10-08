import { DateValueObject } from '../../lib/utils/date-value-object';
describe('date.value-object', () => {
	const currentDate = new Date();

	it('should be defined', () => {
		const date = DateValueObject.create;
		expect(date).toBeDefined();
	});

	it('should create a date with success if not provide value', () => {
		const date = DateValueObject.create();
		expect(date.value).toBeDefined();
	});

	it('should create a date with success', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.value).toBe(currentDate);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YYYY/MM/DD HH:MM:SS')).toMatch(
			/[0-9]{4}\/[0-9]{2}\/[0-9]{2}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('DD-MM-YY')).toMatch(/[0-9]{2}\-[0-9]{2}\-[0-9]{2}/);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('DD-MM-YYYY')).toMatch(
			/[0-9]{2}\-[0-9]{2}\-[0-9]{4}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('DD-MM-YYYY HH:MM:SS')).toMatch(
			/[0-9]{2}\-[0-9]{2}\-[0-9]{4}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('DD-MM-YY HH:MM:SS')).toMatch(
			/[0-9]{2}\-[0-9]{2}\-[0-9]{2}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YY-MM-DD HH:MM:SS')).toMatch(
			/[0-9]{2}\-[0-9]{2}\-[0-9]{2}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YY-MM-DD')).toMatch(/[0-9]{2}\-[0-9]{2}\-[0-9]{2}/);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toMatch(
			/[0-9]{4}\-[0-9]{2}\-[0-9]{2}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YYYY-MM-DD')).toMatch(
			/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/
		);
	});

	it('should format date', () => {
		const date = DateValueObject.create(currentDate);
		expect(date.format('YYYY/MM/DD H' as any)).toMatch(
			/[0-9]{4}\-[0-9]{2}\-[0-9]{2}[\s][0-9]{2}[\:][0-9]{2}[\:][0-9]{2}/
		);
	});

	it('should is weekDay', () => {
		const date = DateValueObject.create(new Date('2021-10-08 00:00:00'));
		expect(date.isWeekday()).toBeTruthy();
	});

	it('should is not weekDay', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		expect(date.isWeekday()).toBeFalsy();
	});

	it('should add one day', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		date.addDays(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-10 00:00:00');
	});

	it('should add one hour', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		date.addHours(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-09 01:00:00');
	});

	it('should add one month', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		date.addMonths(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-11-09 00:00:00');
	});

	it('should add one minute', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		date.addMinutes(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-09 00:01:00');
	});

	it('should add one week', () => {
		const date = DateValueObject.create(new Date('2021-10-01 00:00:00'));
		date.addWeeks(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-08 00:00:00');
	});

	it('should add one year', () => {
		const date = DateValueObject.create(new Date('2021-01-01 00:00:00'));
		date.addYears(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2022-01-02 00:00:00');
	});

	it('should subtract one day', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:00:00'));
		date.subtractDays(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-08 00:00:00');
	});

	it('should subtract one hour', () => {
		const date = DateValueObject.create(new Date('2021-10-09 02:00:00'));
		date.subtractHours(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-09 01:00:00');
	});

	it('should subtract one month', () => {
		const date = DateValueObject.create(new Date('2021-12-09 00:00:00'));
		date.subtractMonths(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-11-08 00:00:00');
	});

	it('should subtract one minute', () => {
		const date = DateValueObject.create(new Date('2021-10-09 00:02:00'));
		date.subtractMinutes(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-09 00:01:00');
	});

	it('should subtract one week', () => {
		const date = DateValueObject.create(new Date('2021-10-08 00:00:00'));
		date.subtractWeeks(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-10-01 00:00:00');
	});

	it('should subtract one year', () => {
		const date = DateValueObject.create(new Date('2022-01-02 00:00:00'));
		date.subtractYears(1);
		expect(date.format('YYYY-MM-DD HH:MM:SS')).toBe('2021-01-01 00:00:00');
	});

	it('should calculate difference in days', () => {
		const date = DateValueObject.create(new Date('2022-01-25 00:00:00'));
		expect(date.differenceInDays(new Date('2022-01-20 00:00:00'))).toBe(5);
	});

	it('should calculate difference in hours', () => {
		const date = DateValueObject.create(new Date('2022-01-20 03:00:00'));
		expect(date.differenceInHours(new Date('2022-01-20 00:00:00'))).toBe(3);
	});

	it('should calculate difference in hours', () => {
		const date = DateValueObject.create(new Date('2022-01-20 00:00:00'));
		expect(date.differenceInHours(new Date('2022-01-20 03:00:00'))).toBe(
			-3
		);
	});

	it('should calculate difference in weeks', () => {
		const date = DateValueObject.create(new Date('2022-01-08 00:00:00'));
		expect(date.differenceInWeeks(new Date('2022-01-01 00:00:00'))).toBe(1);
	});

	it('should calculate difference in minutes', () => {
		const date = DateValueObject.create(new Date('2022-01-01 01:00:00'));
		expect(date.differenceInMinutes(new Date('2022-01-01 00:00:00'))).toBe(
			60
		);
	});

	it('should calculate difference in months', () => {
		const date = DateValueObject.create(new Date('2022-02-01 00:00:00'));
		expect(date.differenceInMonths(new Date('2022-01-01 00:00:00'))).toBe(
			1
		);
	});

	it('should calculate difference in years', () => {
		const date = DateValueObject.create(new Date('2022-01-02 00:00:00'));
		expect(date.differenceInYears(new Date('2021-01-01 00:00:00'))).toBe(1);
	});
});
