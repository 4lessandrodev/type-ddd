import { ChangesObserver } from '../../src/core/changes-observer';
import Result from '../../src/core/result';

describe('changes-observer', () => {
	it('should be defined', ()=> {
		const observer = ChangesObserver;
		expect(observer).toBeDefined();
	})

	it('should not fail if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.getResult().isFailure).toBe(false);
	})

	it('should return success if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.getResult().isSuccess).toBe(true);
	})

	it('should has length 0 if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.getResultsQtd()).toBe(0);
	})

	it('should return ok if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.isAllResultsSuccess()).toBe(true);
	})

	it('should return undefined if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.removeFirst().getLastRemoved()).toBeUndefined();
	})

	it('should return undefined if empty', ()=> {
		const observer = ChangesObserver.init<string>();
		expect(observer.removeLast().getLastRemoved()).toBeUndefined();
	})

	it('should reset and keep quantity 0', ()=> {
		const observer = ChangesObserver.init<string>();
		observer.reset()
		expect(observer.getResultsQtd()).toBe(0);
	})

	it('should should add one and reset to 0', ()=> {
		const observer = ChangesObserver.init<string>();
		observer.add(Result.ok<string>("Hello"));
		expect(observer.getResultsQtd()).toBe(1);
		observer.reset()
		expect(observer.getResultsQtd()).toBe(0);
	})

	it('should add many results to state and result success', ()=> {
		const observer = ChangesObserver.init<string>();
		const isAllSuccess = observer
			.add(Result.ok<string>('1'))
			.add(Result.ok<string>('2'))
			.add(Result.ok<string>('3'))
			.add(Result.ok<string>('4'))
			.add(Result.ok<string>('5'))
			.add(Result.ok<string>('6'))
			.add(Result.ok<string>('7'))
			.isAllResultsSuccess();

		expect(isAllSuccess).toBe(true);
	})

	it('should add many results to state and result failure', ()=> {
		const observer = ChangesObserver.init<string>();
		const isAllSuccess = observer
			.add(Result.ok<string>('1'))
			.add(Result.ok<string>('2'))
			.add(Result.ok<string>('3'))
			.add(Result.ok<string>('4'))
			.add(Result.ok<string>('5'))
			.add(Result.fail<string>('fail'))
			.add(Result.ok<string>('7'))
			.isAllResultsSuccess();

		expect(isAllSuccess).toBe(false);
	})

	it('should add many results to state and result failure', ()=> {
		const observer = ChangesObserver.init<string>();
		const result = observer
			.add(Result.ok<string>('1'))
			.add(Result.ok<string>('2'))
			.add(Result.ok<string>('3'))
			.add(Result.ok<string>('4'))
			.add(Result.ok<string>('5'))
			.add(Result.fail<string>('fail'))
			.add(Result.ok<string>('7'))
			.getResult();

		expect(result.errorValue()).toBe('fail');
		expect(result.isFailure).toBe(true);
	})

	it('should set item to one result on state', ()=> {
		const observer = ChangesObserver.init<boolean>();
		expect(observer.getResultsQtd()).toBe(0);

		observer.add(Result.ok<boolean>(true))
		observer.add(Result.ok<boolean>(false))
		expect(observer.getLastAdded()?.getResult()).toBe(false);
		expect(observer.getResultsQtd()).toBe(2);
		observer.removeLast();
		expect(observer.getResultsQtd()).toBe(1);
		
		observer.reset([Result.fail<boolean>('This is error')])
		expect(observer.getResultsQtd()).toBe(1);
		expect(observer.getLastRemoved()).toBeUndefined();
		expect(observer.getLastAdded()).toBeUndefined();
		observer.removeFirst();
		expect(observer.getLastRemoved()?.errorValue()).toBe('This is error');
		expect(observer.getLastRemoved()).not.toBeUndefined();
	})
});