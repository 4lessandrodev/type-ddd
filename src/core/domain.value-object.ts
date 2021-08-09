function DomainValueObject(target: Function) {
    // save a reference to the original constructor
    const original = target;

    // a utility function to generate instances of a class
    function construct(constructor: any, args: any) {
        const c: any = function (this: any): any {
            return Object.assign(this, {...args})
        }
        c.prototype = constructor.prototype;
        return new c();
    }

    // the new constructor behavior
    const f: any = function (...args: any) {
        console.log(`New: ${original['name']} is created`);
        return construct(original, args);
    }

    // copy prototype so instance of operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
}

@DomainValueObject
class UserName {
     value!: string
}

let emp = new UserName();
console.log('emp instanceof UserName');
console.log(emp instanceof UserName);
