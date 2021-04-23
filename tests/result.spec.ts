import Result from '../src/core/result';

describe('result', () => {
     it('methods should be defined', () => {
          expect(Result.combine).toBeDefined();
          expect(Result.ok).toBeDefined();
          expect(Result.fail).toBeDefined();
     });

     it('error should be defined', () => {
          const error = Result.fail<any>('Error defined');
          expect(error.isFailure).toBe(true);
          expect(error.isSuccess).toBe(false);
          expect(error.error).toBe('Error defined');
     });

     it('success should be defined', () => {
          const success = Result.ok<string>('Success');
          expect(success.isFailure).toBe(false);
          expect(success.isSuccess).toBe(true);
          expect(success.getResult()).toBe('Success');
     });

     it('validations should be defined', () => {
          const success = Result.ok<string>('Success');
          const error = Result.fail<any>('Error defined');
          const validation = Result.combine([success, error]);

          expect(validation.isFailure).toBe(true);
          expect(validation.isSuccess).toBe(false);
     });

     it('validations should be defined', () => {
          const errorA = Result.fail<any>('Error defined');
          const errorB = Result.fail<any>('Error defined');
          const validation = Result.combine([errorA, errorB]);

          expect(validation.isFailure).toBe(true);
          expect(validation.isSuccess).toBe(false);
     });

     it('validations should be defined', () => {
          const successA = Result.ok<any>('Success');
          const successB = Result.ok<any>('Success');
          const validation = Result.combine([successA, successB]);

          expect(validation.isFailure).toBe(false);
          expect(validation.isSuccess).toBe(true);
     });
});
