import { Phone } from '../phone.value-object';

describe('phone', () => {
    it('should create a valid phone', () => {
        const phone = Phone.init('(11) 99488-2885');
        expect(phone.isMobile()).toBeTruthy();
        expect(phone.isHome()).toBeFalsy();
        expect(Phone.isMobile('(11) 99488-2885')).toBeTruthy();
        expect(Phone.isHome('(11) 99488-2885')).toBeFalsy();
    });

    it('should throw error if provide invalid value', () => {
        const build = () => Phone.init('(52) 99488-2885');
        expect(build).toThrowError();
    });

    it('should create a valid phone', () => {
        const phone = Phone.init('(11) 3404-2885');
        expect(phone.isHome()).toBeTruthy();
        expect(phone.isMobile()).toBeFalsy();
        expect(Phone.isMobile('(11) 3404-2885')).toBeFalsy();
        expect(Phone.isHome('(11) 3404-2885')).toBeTruthy();
    });

    it('should return false', () => {
        const isValid = Phone.isValid('(11) 3404-288500');
        expect(isValid).toBeFalsy();
    });

    it('should create a valid phone', () => {
        const phone = Phone.create('(11) 3404-2885').value();
        expect(phone.isHome()).toBeTruthy();
        expect(phone.isMobile()).toBeFalsy();
    });

    it('should create a valid phone', () => {
        const phone = Phone.create('(11) 99488-2885').value();
        expect(phone.isHome()).toBeFalsy();
        expect(phone.isMobile()).toBeTruthy();
    });

    it('should return fail', () => {
        const result = Phone.create('(11) 99488-28850');
        expect(result.isFail()).toBeTruthy();
    });

    it('should add mask', () => {
        const phone = Phone.addMask('11994885487');
        expect(phone).toBe('(11) 99488-5487')
    });

    it('should add mask', () => {
        const phone = Phone.addMask('1134048956');
        expect(phone).toBe('(11) 3404-8956')
    });

    it('should remove mask', () => {
        const phone = Phone.removeSpecialChars('(11) 3404-8956');
        expect(phone).toBe('1134048956')
    });

    it('should get ddd', () => {
        const ddd = Phone.ddd('(11) 3404-8956');
        expect(ddd).toBe(11);
    });
});
