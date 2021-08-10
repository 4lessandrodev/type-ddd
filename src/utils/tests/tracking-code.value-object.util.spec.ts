import { TrackingCodeValueObject } from '../tracking-code.value-object';

describe('tracking.value-object', () => {
	it('should be defined', ()=>{
		const track = TrackingCodeValueObject.create;
		expect(track).toBeDefined()
	})

	it('should generate a new track if not provide value', ()=>{
		const track = TrackingCodeValueObject.create();
		expect(track.isSuccess).toBeTruthy()
	})

	it('should fail if provide an invalid value', ()=>{
		const track = TrackingCodeValueObject.create('XAB-AS909-055');
		expect(track.isFailure).toBe(true)
	})

	it('should create with provided value', ()=>{
		const track = TrackingCodeValueObject.create('B4V-X17423-3710');
		expect(track.isSuccess).toBeTruthy()
	})

	it('should generate a random code', ()=>{
		const track = TrackingCodeValueObject.generate();
		expect(track).toHaveLength(15);
	})
});
