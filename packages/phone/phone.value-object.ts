import { Result, ValueObject } from "rich-domain";
import MobilePhone from "./mobile.value-object";
import HomePhone from "./home.value-object";
import { ddd } from "./ddd.list";

export class Phone extends ValueObject<string> {
    protected static readonly MESSAGE: string = 'Invalid Phone Number';

    toCall: () => string;
    number: () => string;
    value: () => string;
    ddd: () => ddd;
    isMobile: () => boolean;
    isHome: () => boolean;
    uf: () => string;
    toPattern: () => string;

    /**
	 *
	 * @returns DDD only as number
	 * @example 11
	 */
	public static ddd(phone: string): ddd {
		const value = this.util.string(phone).removeSpecialChars();
		return parseInt(value.slice(0, 2)) as ddd;
	}

    public static removeSpecialChars(cell: string): string {
        const value = this.util.string(cell).removeSpecialChars();
        return this.util.string(value).removeSpaces();
    }

    public static addMask(cell: string): string {
        if (this.isMobile(cell)) return MobilePhone.addMask(cell);
        return HomePhone.addMask(cell);
    }

    public static isValid(phone: string): boolean {
        return this.isValidProps(phone);
    }

    public static isValidProps(phone: string): boolean {
        return this.isHome(phone) || this.isMobile(phone);
    }

    public static isMobile(phone: string): boolean {
        return MobilePhone.isValid(phone);
    };

    public static isHome(phone: string): boolean {
        return HomePhone.isValid(phone);
    };

    /**
     * 
     * @param value value as string
     * @returns instance of MobilePhone or HomePhone or throw an error
     */
    public static init(value: string): MobilePhone | HomePhone {
        const isValid = this.isValidProps(value);
        if (!isValid) throw new Error(this.MESSAGE);
        const isMobile = this.isMobile(value);
        if (isMobile) return MobilePhone.init(value);
        return HomePhone.init(value);
    }

    /**
     *
     * @param value Brazilian Mobile or Home phone number
     * @example (XX) 9XXXX-XXXX or (XX) 3XXX-XXXX
     * @returns Result of MobilePhone or HomePhone
     */
    public static create(value: string): Result<MobilePhone | HomePhone | null> {
        const isValid = this.isValidProps(value);
        if (!isValid) return Result.fail(this.MESSAGE);
        const isMobile = this.isMobile(value);
        if (isMobile) return MobilePhone.create(value);
        return HomePhone.create(value);
    }
}

export default Phone;
