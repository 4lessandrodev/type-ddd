import IsValidEmail, { GetCharCode, IsSpecialChar } from '../email.validator.util';

describe('email-validator', () => {
    it('should return 0 if is not string', () => {
        const code = GetCharCode(3 as any);
        expect(code).toBe(0);
    });

    it('should return true', () => {
        const is = IsSpecialChar('+');
        expect(is).toBeTruthy();
    });

    it('should to be false', () => {
        const invalid = 'invalid-log-email-value'.repeat(10);
        const long = invalid + '@gmail.com';
        expect(IsValidEmail(long)).toBeFalsy();
    });

    it('should to be false', () => {
        const invalid = 'invalid-log-email-value'.repeat(20);
        const long = invalid + '@gmail.com';
        expect(IsValidEmail(long)).toBeFalsy();
    });

    it('should to be false', () => {
        expect(IsValidEmail(0 as any)).toBeFalsy();
    });
});
