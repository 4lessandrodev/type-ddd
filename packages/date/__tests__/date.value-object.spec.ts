import Dates from '../index';

describe('Date', () => {

	describe('create', () => {
		it('should create an instance with success', () => {
			const instance = Dates.create();
			expect(instance.value()).toBeInstanceOf(Dates);
		});

		it('should create an instance with success', () => {
			const instance = Dates.create(new Date(2020, 1, 1, 1, 1, 1));
			expect(instance.value().value().toISOString()).toBe('2020-02-01T01:01:01.000Z');
		});

		it('should return result fail if provide an invalid value', () => {
			const instance = Dates.create({} as any);
			expect(instance.isFail()).toBeTruthy();
		});

		it('should init a valid v.o', () => {
			const instance = Dates.init();
			expect(instance).toBeInstanceOf(Dates);
		});

		it('should init a date with provided value', () => {
			const instance = Dates.init(new Date(2020, 1, 1, 1, 1, 1));
			expect(instance.value().toISOString()).toBe('2020-02-01T01:01:01.000Z');
		});

		it('should throw an error if provide an invalid value', () => {
			const build = () => Dates.init({} as any);
			expect(build).toThrowError();
		});
	});

	describe('addDays', () => {
		it('should add 1 day with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addDays(1).value().toISOString()).toBe('2020-01-02T08:00:00.000Z');
		});

		it('should add 7 days with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addDays(7).value().toISOString()).toBe('2020-01-08T08:00:00.000Z');
		});
	});

	describe('addMonths', () => {
		it('should add 1 month with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addMonths(1).value().toISOString()).toBe('2020-01-31T08:00:00.000Z');
		});

		it('should add 7 months with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addMonths(7).value().toISOString()).toBe('2020-07-29T08:00:00.000Z');
		});
	});

	describe('addHours', () => {
		it('should add 1 hour with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addHours(1).value().toISOString()).toBe('2020-01-01T09:00:00.000Z');
		});

		it('should add 7 hours with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addHours(7).value().toISOString()).toBe('2020-01-01T15:00:00.000Z');
		});
	});

	describe('addMinutes', () => {
		it('should add 1 minute with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addMinutes(1).value().toISOString()).toBe('2020-01-01T08:01:00.000Z');
		});

		it('should add 7 minutes with success', () => {
			const date = Dates.init(new Date('2020-01-01T08:00:00'));
			expect(date.addMinutes(7).value().toISOString()).toBe('2020-01-01T08:07:00.000Z');
		});
	});

	describe('addWeeks', () => {
		it('should add 1 week with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.addWeeks(1);
			expect(date2.value().toISOString()).toBe('2020-01-08T08:00:00.000Z');
			expect(date2.differenceInDays(date1)).toBe(7);
		});

		it('should add 7 weeks with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.addWeeks(7);
			expect(date2.value().toISOString()).toBe('2020-02-19T08:00:00.000Z');
			expect(date2.differenceInDays(date1)).toBe(49);
		});
	});

	describe('addYears', () => {
		it('should add 1 year with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.addYears(1);
			expect(date2.value().toISOString()).toBe('2020-12-31T08:00:00.000Z');
			expect(date2.differenceInDays(date1)).toBe(365);
		});

		it('should add 7 years with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.addYears(7);
			expect(date2.value().toISOString()).toBe('2026-12-30T08:00:00.000Z');
			expect(date2.differenceInDays(date1)).toBe(2555);
		});
	});

	describe('subtractDays', () => {
		it('should subtract 1 day with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractDays(1);
			expect(date2.value().toISOString()).toBe('2019-12-31T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(1);
		});

		it('should subtract 7 days with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractDays(7);
			expect(date2.value().toISOString()).toBe('2019-12-25T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(7);
		});
	});

	describe('subtractMonths', () => {
		it('should subtract 1 month with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMonths(1);
			expect(date2.value().toISOString()).toBe('2019-12-02T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(30);
		});

		it('should subtract 7 months with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMonths(7);
			expect(date2.value().toISOString()).toBe('2019-06-05T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(210);
		});
	});

	describe('subtractHours', () => {
		it('should subtract 1 hour with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractHours(1);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:00:00.000Z');
			expect(date1.differenceInHours(date2)).toBe(1);
		});

		it('should subtract 7 hours with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractHours(7);
			expect(date2.value().toISOString()).toBe('2020-01-01T01:00:00.000Z');
			expect(date1.differenceInHours(date2)).toBe(7);
		});
	});

	describe('subtractMinutes', () => {
		it('should subtract 1 minute with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMinutes(1);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:59:00.000Z');
			expect(date1.differenceInMinutes(date2)).toBe(1);
		});

		it('should subtract 7 minutes with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMinutes(7);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:53:00.000Z');
			expect(date1.differenceInMinutes(date2)).toBe(7);
		});
	});

	describe('subtractWeeks', () => {
		it('should subtract 1 week with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractWeeks(1);
			expect(date2.value().toISOString()).toBe('2019-12-25T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(7);
		});

		it('should subtract 7 weeks with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractWeeks(7);
			expect(date2.value().toISOString()).toBe('2019-11-13T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(49);
		});
	});

	describe('subtractYears', () => {
		it('should subtract 1 year with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractYears(1);
			expect(date2.value().toISOString()).toBe('2019-01-01T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(365);
		});

		it('should subtract 7 years with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractYears(7);
			expect(date2.value().toISOString()).toBe('2013-01-02T08:00:00.000Z');
			expect(date1.differenceInDays(date2)).toBe(2555);
		});
	});

	describe('differenceInHours', () => {
		it('should subtract 1 hour with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractHours(1);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:00:00.000Z');
			expect(date1.differenceInHours(date2)).toBe(1);
		});

		it('should subtract 7 hours with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractHours(7);
			expect(date2.value().toISOString()).toBe('2020-01-01T01:00:00.000Z');
			expect(date1.differenceInHours(date2)).toBe(7);
		});
	});

	describe('differenceInMinutes', () => {
		it('should subtract 1 minute with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMinutes(1);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:59:00.000Z');
			expect(date1.differenceInMinutes(date2)).toBe(1);
		});

		it('should subtract 7 minutes with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMinutes(7);
			expect(date2.value().toISOString()).toBe('2020-01-01T07:53:00.000Z');
			expect(date1.differenceInMinutes(date2)).toBe(7);
		});
	});

	describe('differenceInMonths', () => {
		it('should subtract 1 month with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMonths(1);
			expect(date2.value().toISOString()).toBe('2019-12-02T08:00:00.000Z');
			expect(date1.differenceInMonths(date2)).toBe(0.97);
		});

		it('should subtract 7 months with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractMonths(7);
			expect(date2.value().toISOString()).toBe('2019-06-05T08:00:00.000Z');
			expect(date1.differenceInMonths(date2)).toBe(6.77);
		});
	});

	describe('differenceInYears', () => {
		it('should subtract 1 year with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractYears(1);
			expect(date2.value().toISOString()).toBe('2019-01-01T08:00:00.000Z');
			expect(date1.differenceInYears(date2)).toBe(1);
		});

		it('should subtract 7 years with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractYears(7);
			expect(date2.value().toISOString()).toBe('2013-01-02T08:00:00.000Z');
			expect(date1.differenceInYears(date2)).toBe(6.98);
		});
	});

	describe('differenceInWeeks', () => {
		it('should subtract 1 week with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractWeeks(1);
			expect(date2.value().toISOString()).toBe('2019-12-25T08:00:00.000Z');
			expect(date1.differenceInWeeks(date2)).toBe(1);
		});

		it('should subtract 7 weeks with success', () => {
			const date1 = Dates.init(new Date('2020-01-01T08:00:00'));
			const date2 = date1.subtractWeeks(7);
			expect(date2.value().toISOString()).toBe('2019-11-13T08:00:00.000Z');
			expect(date1.differenceInWeeks(date2)).toBe(7);
		});
	});

	describe('validation', () => {
		it('should return true if is valid date', () => {
			const isValid = Dates.isValidProps(new Date());
			expect(isValid).toBeTruthy();
		});

		it('should return false if is valid date', () => {
			const isValid = Dates.isValid(new Date());
			expect(isValid).toBeTruthy();
		});

		it('should return false if is not valid date', () => {
			const isValid = Dates.isValid({} as any);
			expect(isValid).toBeFalsy();
		});

		it('should return false if is not valid date', () => {
			const isValid = Dates.isValidProps({} as any);
			expect(isValid).toBeFalsy();
		});
	});

	describe('weekend', () => {
		it('should return true if is weekend', () => {
			const date = new Date('2024-05-18T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekend();
			expect(isWeekend).toBeTruthy();
			expect(Dates.isWeekend(date));
		});

		it('should return true if is weekend', () => {
			const date = new Date('2024-05-19T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekend();
			expect(isWeekend).toBeTruthy();
			expect(Dates.isWeekend(date)).toBeTruthy();
		});

		it('should return false if is not weekend', () => {
			const date = new Date('2024-05-20T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekend();
			expect(isWeekend).toBeFalsy();
			expect(Dates.isWeekend(date)).toBeFalsy();
		});
	});

	describe('weekDay', () => {
		it('should return false if is weekend', () => {
			const date = new Date('2024-05-18T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekday();
			expect(isWeekend).toBeFalsy();
			expect(Dates.isWeekday(date)).toBeFalsy();
		});

		it('should return false if is weekend', () => {
			const date = new Date('2024-05-19T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekday();
			expect(isWeekend).toBeFalsy();
			expect(Dates.isWeekday(date)).toBeFalsy();
		});

		it('should return true if is not weekend', () => {
			const date = new Date('2024-05-20T00:00:00.000Z');
			const isWeekend = Dates.init(date).isWeekday();
			expect(isWeekend).toBeTruthy();
			expect(Dates.isWeekday(date)).toBeTruthy();
		});
	});

	describe('isAfter', () => {
		it('should return true if date2 is after date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			const date2 = date1.addDays(1);
			expect(date2.isAfter(date1)).toBeTruthy();
		});

		it('should return false if date2 is not after date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			const date2 = date1.subtractDays(1);
			expect(date2.isAfter(date1)).toBeFalsy();
		});
	});

	describe('isBefore', () => {
		it('should return true if date2 is before date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			const date2 = date1.addDays(1);
			expect(date2.isBefore(date1)).toBeFalsy();
		});

		it('should return false if date2 is not before date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			const date2 = date1.subtractDays(1);
			expect(date2.isBefore(date1)).toBeTruthy();
		});
	});

	describe('isEqualDate', () => {
		it('should return true if date2 is equal date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			expect(date1.isEqualDate(date1)).toBeTruthy();
		});

		it('should return false if date2 is not equal date1', () => {
			const date1 = Dates.init(new Date('2024-05-18T00:00:00.000Z'));
			const date2 = date1.subtractDays(1);
			expect(date2.isEqualDate(date1)).toBeFalsy();
		});
	});

	describe('format', () => {
		it('should format to DD-MM-YY', () => {
			const date = new Date('2024-01-01T00:00:00.000Z');
			const format = Dates.init(date).format('DD-MM-YY');
			expect(format).toBe('01-01-24');
		});

		it('should format to DD-MM-YY HH:mm:ss', () => {
			const date = new Date('2024-01-01T08:10:00.000Z');
			const format = Dates.init(date).format('DD-MM-YY HH:mm:ss');
			expect(format).toBe('01-01-24 08:10:00');
		});

		it('should format to DD-MM-YY hh:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD-MM-YY hh:mm:ss');
			expect(format).toBe('01-01-24 04:10:00 PM');
		});

		it('should format to DD-MM-YYYY', () => {
			const date = new Date('2024-01-01T00:00:00.000Z');
			const format = Dates.init(date).format('DD-MM-YYYY');
			expect(format).toBe('01-01-2024');
		});

		it('should format to DD-MM-YYYY HH:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD-MM-YYYY HH:mm:ss');
			expect(format).toBe('01-01-2024 16:10:00');
		});

		it('should format to DD-MM-YYYY HH:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD-MM-YYYY hh:mm:ss');
			expect(format).toBe('01-01-2024 04:10:00 PM');
		});

		it('should format to DD/MM/YY', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YY');
			expect(format).toBe('01/01/24');
		});

		it('should format to DD/MM/YY', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YY');
			expect(format).toBe('01/01/24');
		});

		it('should format to DD/MM/YY HH:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YY HH:mm:ss');
			expect(format).toBe('01/01/24 16:10:00');
		});

		it('should format to DD/MM/YY hh:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YY hh:mm:ss');
			expect(format).toBe('01/01/24 04:10:00 PM');
		});

		it('should format to DD/MM/YYYY', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YYYY');
			expect(format).toBe('01/01/2024');
		});

		it('should format to DD/MM/YYYY HH:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YYYY HH:mm:ss');
			expect(format).toBe('01/01/2024 16:10:00');
		});

		it('should format to DD/MM/YYYY hh:mm:ss', () => {
			const date = new Date('2024-01-01T16:10:00.000Z');
			const format = Dates.init(date).format('DD/MM/YYYY hh:mm:ss');
			expect(format).toBe('01/01/2024 04:10:00 PM');
		});

		it('should format to MM-DD-YY', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YY');
			expect(format).toBe('12-25-24');
		});

		it('should format to MM-DD-YY HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YY HH:mm:ss');
			expect(format).toBe('12-25-24 16:10:00');
		});

		it('should format to MM-DD-YY hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YY hh:mm:ss');
			expect(format).toBe('12-25-24 04:10:00 PM');
		});

		it('should format to MM-DD-YYYY', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YYYY');
			expect(format).toBe('12-25-2024');
		});

		it('should format to MM-DD-YYYY HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YYYY HH:mm:ss');
			expect(format).toBe('12-25-2024 16:10:00');
		});

		it('should format to MM-DD-YYYY hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM-DD-YYYY hh:mm:ss');
			expect(format).toBe('12-25-2024 04:10:00 PM');
		});

		it('should format to MM/DD/YY', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YY');
			expect(format).toBe('12/25/24');
		});

		it('should format to MM/DD/YY HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YY HH:mm:ss');
			expect(format).toBe('12/25/24 16:10:00');
		});

		it('should format to MM/DD/YY hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YY hh:mm:ss');
			expect(format).toBe('12/25/24 04:10:00 PM');
		});

		it('should format to MM/DD/YYYY', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YYYY');
			expect(format).toBe('12/25/2024');
		});

		it('should format to MM/DD/YYYY HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YYYY HH:mm:ss');
			expect(format).toBe('12/25/2024 16:10:00');
		});

		it('should format to MM/DD/YYYY hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('MM/DD/YYYY hh:mm:ss');
			expect(format).toBe('12/25/2024 04:10:00 PM');
		});

		it('should format to YYYY-DD-MM', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-DD-MM');
			expect(format).toBe('2024-25-12');
		});

		it('should format to YYYY-DD-MM HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-DD-MM HH:mm:ss');
			expect(format).toBe('2024-25-12 16:10:00');
		});

		it('should format to YYYY-DD-MM hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-DD-MM hh:mm:ss');
			expect(format).toBe('2024-25-12 04:10:00 PM');
		});

		it('should format to YYYY-MM-DD', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-MM-DD');
			expect(format).toBe('2024-12-25');
		});

		it('should format to YYYY-MM-DD HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-MM-DD HH:mm:ss');
			expect(format).toBe('2024-12-25 16:10:00');
		});

		it('should format to YYYY-MM-DD hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY-MM-DD hh:mm:ss');
			expect(format).toBe('2024-12-25 04:10:00 PM');
		});

		it('should format to YYYY/DD/MM', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY/DD/MM');
			expect(format).toBe('2024/25/12');
		});

		it('should format to YYYY/DD/MM HH:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY/DD/MM HH:mm:ss');
			expect(format).toBe('2024/25/12 16:10:00');
		});

		it('should format to YYYY/DD/MM hh:mm:ss', () => {
			const date = new Date('2024-12-25T16:10:00.000Z');
			const format = Dates.init(date).format('YYYY/DD/MM hh:mm:ss');
			expect(format).toBe('2024/25/12 04:10:00 PM');
		});
	});
});
