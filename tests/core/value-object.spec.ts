import ValueObject from '../../src/core/value-object';
import Result from '../../src/core/result';

describe('value-object', () => {
     //-------------------------------------------------------------------
     interface NameProp {
          value: string;
     }
     //-------------------------------------------------------------------
     // Name Value Object
     class NameValueObject extends ValueObject<NameProp> {
          private constructor(prop: NameProp) {
               super(prop);
          }

          get value(): string {
               return this.props.value;
          }

          public static create(name: string): Result<NameValueObject> {
               // must have less than 120 character
               if (name.length > 120) {
                    return Result.fail<NameValueObject>('Name too long');
               }

               return Result.ok<NameValueObject>(
                    new NameValueObject({ value: name }),
               );
          }
     }

     it('should fail if provide an invalid value', () => {
          const obj = NameValueObject.create(String('invalid').repeat(130));
          expect(obj.isFailure).toBe(true);
     });

     it('should compare with function', () => {
          const obj1 = NameValueObject.create('valid1');
          const obj2 = NameValueObject.create('valid2');
          expect(obj1.isSuccess).toBe(true);
          const isEqual = obj1.getResult().equals(obj2.getResult());
          expect(isEqual).toBe(false);
     });

     it('should compare with function', () => {
          const obj1 = NameValueObject.create('valid1');
          const obj2 = NameValueObject.create('valid1');
          expect(obj1.isSuccess).toBe(true);
          const isEqual = obj1.getResult().equals(obj2.getResult());
          expect(isEqual).toBe(true);
     });
});
