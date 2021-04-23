import IUseCase from '../src/core/use-case.interface';

describe('use-case', () => {
     //
     class UseCase implements IUseCase<string, string> {
          async execute(request: string): Promise<string> {
               const response = request;
               return response;
          }
     }

     it('should be defined', () => {
          const useCase = new UseCase();
          expect(useCase).toBeDefined();
     });

     it('should call usecase', async () => {
          const useCase = await new UseCase().execute('Request');
          expect(useCase).toBe('Request');
     });
});
