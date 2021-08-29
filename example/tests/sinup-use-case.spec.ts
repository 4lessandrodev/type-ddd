import { IUserRepo, SignupUseCase, SignupDto } from '../signup.use-case';

describe('signup.use-case', () => {
	const date = new Date();
	date.setFullYear(2020);
	let userRepository: IUserRepo;

	beforeEach(() => {
		userRepository = {
			exists: jest.fn(),
			save: jest.fn(),
		};
	});

	it('should be defined', () => {
		const useCase = new SignupUseCase(userRepository);
		expect(useCase).toBeDefined();
	});

	it('should fail if provide an already registered email', async () => {
		const dto: SignupDto = {
			birthDay: date,
			email: 'already_registered_email@omain.com',
			name: 'valid name',
			password: 'valid_pass',
		};

		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);

		const useCase = new SignupUseCase(userRepository);
		const result = await useCase.execute(dto);
		expect(result.isFailure).toBeTruthy();
		expect(result.errorValue()).toBe('User already exists');
		expect(result.statusCode).toBe('CONFLICT');
	});

	it('should fail if provide an invalid email', async () => {
		const dto: SignupDto = {
			birthDay: date,
			email: 'invalid_email',
			name: 'valid name',
			password: 'valid_pass',
		};

		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

		const useCase = new SignupUseCase(userRepository);
		const result = await useCase.execute(dto);
		expect(result.isFailure).toBeTruthy();
		expect(result.errorValue()).toBe('Invalid email');
		expect(result.statusCode).toBe('UNPROCESSABLE_ENTITY');
	});

	it('should return success', async () => {
		const dto: SignupDto = {
			birthDay: date,
			email: 'valid_email@omain.com',
			name: 'valid name',
			password: 'valid_pass',
		};

		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

		const useCase = new SignupUseCase(userRepository);
		const result = await useCase.execute(dto);
		expect(result.isSuccess).toBeTruthy();
		expect(result.statusCode).toBe('OK');
	});
});
