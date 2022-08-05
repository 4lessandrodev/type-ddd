import {
	AvailableOrderStatusType,
	OrderStatusValueObject,
} from '../../lib/utils/order-status.value-object';

describe('order-status.value-object', () => {
	it('should be defined', () => {
		const status = OrderStatusValueObject.create;
		expect(status).toBeDefined();
	});

	it('should create a valid status', () => {
		const status = OrderStatusValueObject.create('IN_PREPARATION');
		expect(status.isSuccess()).toBe(true);
		expect(status.value().value()).toBe('IN_PREPARATION');
	});

	it('should check if is on status', () => {
		const status = OrderStatusValueObject.create('IN_PREPARATION').value();
		expect(status.isOnStatus('IN_PREPARATION')).toBe(true);
		expect(status.isOnStatus('DECLINED')).toBe(false);
	});

	it('should fail if try create an invalid status', () => {
		const status = OrderStatusValueObject.create(
			'INVALID' as AvailableOrderStatusType
		);
		expect(status.isSuccess()).toBe(false);
	});

	it('should validate an status', () => {
		const isValid = OrderStatusValueObject.isValidProps(
			'INVALID' as AvailableOrderStatusType
		);
		expect(isValid).toBe(false);
	});
});
