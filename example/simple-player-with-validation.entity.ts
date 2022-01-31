import {
	BaseDomainEntity,
	DomainId,
	Entity,
	HEXColorValueObject,
	Result,
	BirthdayValueObject,
} from '@types-ddd';

// Important extends to BaseDomainEntity
interface Props extends BaseDomainEntity {
	userId: DomainId;
	teamColor: HEXColorValueObject;
	age?: BirthdayValueObject;
}

export class Player extends Entity<Props> {
	private constructor(prop: Props) {
		super(prop, Player.name);
	}

	get userId(): DomainId {
		return this.props.userId;
	}

	get teamColor(): HEXColorValueObject {
		return this.props.teamColor;
	}

	get age(): BirthdayValueObject | undefined {
		return this.props.age;
	}

	changeColor(newColor: HEXColorValueObject): void {
		this.props.teamColor = newColor;
		this.props.updatedAt = new Date();
	}

	private isRequiredPropsDefined(): boolean {
		return !this.checkProps(['userId', 'teamColor']).isSome('undefined');
	}

	public static create(props: Props): Result<Player> {
		/*
		 Business Logic Validations Here
		*/
		const player = new Player(props);
		const isPropsDefined = player.isRequiredPropsDefined();

		if (!isPropsDefined) {
			return Result.fail('userId and teamColor is required');
		}

		return Result.ok<Player>(player);
	}
}
