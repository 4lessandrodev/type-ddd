import { User as UserAggregate } from './simple-user.aggregate';
import {
	IUseCase,
	DomainId,
	Result,
	UserNameValueObject,
	ChangesObserver,
	PasswordValueObject,
	EmailValueObject,
	BirthdayValueObject,
} from '@types-ddd';

export interface SignupDto {
	email: string;
	name: string;
	password: string;
	birthDay: Date;
}

export interface IUserRepo {
	exists: ({ email: string }) => Promise<boolean>;
	save: (user: UserAggregate) => Promise<void>;
}

export class SignupUseCase implements IUseCase<SignupDto, Result<void>> {
	constructor(private readonly userRepository: IUserRepo) {}

	async execute(dto: SignupDto): Promise<Result<void>> {
		try {
			const { name, password, email, birthDay } = dto;

			const userAlreadyExists = await this.userRepository.exists({
				email,
			});

			if (userAlreadyExists) {
				return Result.fail('User already exists', 'CONFLICT');
			}

			const observer = ChangesObserver.init();

			const nameOrError = UserNameValueObject.create(name);
			const passwordOrError = PasswordValueObject.create(password);
			const emailOrError = EmailValueObject.create(email);
			const birthDayOrError = BirthdayValueObject.create(birthDay);

			observer.add(nameOrError);
			observer.add(passwordOrError);
			observer.add(emailOrError);
			observer.add(birthDayOrError);

			const observerResult = observer.getResult();
			if (observerResult.isFailure) {
				const message = observerResult.errorValue();
				return Result.fail(message);
			}

			observer.reset();

			const userName = nameOrError.getResult();
			const userPassword = passwordOrError.getResult();
			const userEmail = emailOrError.getResult();
			const userBirthDay = birthDayOrError.getResult();

			userPassword.encrypt();
			
			const ID = DomainId.create();

			const userOrError = UserAggregate.create({
				ID,
				userName,
				userPassword,
				userEmail,
				userBirthDay,
			});

			if (userOrError.isFailure) {
				const message = userOrError.errorValue();
				return Result.fail(message);
			}

			const user = userOrError.getResult();

			await this.userRepository.save(user);

			return Result.success();
		} catch (err) {
			return Result.fail('Error on SignupUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}
