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

	public static create(props: Props): Result<Player> {
		/*
		 Business Logic Validations Here
		*/
		return Result.ok<Player>(new Player(props));
	}
}
