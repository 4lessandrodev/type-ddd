import SpecificationComposite from '../../src/patterns/specification/specification.composite';

type User = {
    name: string
    age: number
    permission: 'ADMIN' | 'CLIENT' | 'OWNER'
}

class AdultSpecification extends SpecificationComposite<User>{
    isSatisfiedBy(user: User): boolean {
        return user.age > 18;
    }
}

class AdminSpecification extends SpecificationComposite<User>{
    isSatisfiedBy(user: User): boolean {
        return user.permission === 'ADMIN';
    }
}

class CanAccessSpecification extends SpecificationComposite<User>{
    isSatisfiedBy(user: User): boolean {
         return user.permission === 'OWNER'
    }
}

describe('specification', ()=>{

    it('should be defined', ()=>{
        const specification = SpecificationComposite;
        expect(specification).toBeDefined()
    })

    it('should be adult', ()=>{
        const IsAdult = new AdultSpecification().isSatisfiedBy({
            age: 20,
            name: 'john stuart',
            permission: 'ADMIN'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should be admin', ()=>{
        const IsAdult = new AdminSpecification().isSatisfiedBy({
            age: 20,
            name: 'john stuart',
            permission: 'ADMIN'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should be can access OWNER', ()=>{
        const IsAdult = new CanAccessSpecification().isSatisfiedBy({
            age: 20,
            name: 'john stuart',
            permission: 'OWNER'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should be defined 15 yrs old & OWNER', ()=>{
        const IsAdult = new CanAccessSpecification().isSatisfiedBy({
            age: 15,
            name: 'john stuart',
            permission: 'OWNER'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should be can access +18 & !ADMIN', ()=>{
        const IsAdult = new CanAccessSpecification().isSatisfiedBy({
            age: 20,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeFalsy()
    })

    it('should not to have access -18 & !ADMIN', ()=>{
        const IsAdult = new CanAccessSpecification().isSatisfiedBy({
            age: 12,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeFalsy()
    })

    it('should be NOT to be not be adult and not have access', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdultSpecification())
        .isSatisfiedBy({
            age: 12,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeFalsy()
    })

    it('should be adult cause OR', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdultSpecification())
        .isSatisfiedBy({
            age: 21,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should be have access ADMIN cause OR', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdminSpecification())
        .isSatisfiedBy({
            age: 12,
            name: 'john stuart',
            permission: 'ADMIN'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should have access cause AND adult or ADMIN', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdminSpecification())
        .and(new AdultSpecification())
        .isSatisfiedBy({
            age: 25,
            name: 'john stuart',
            permission: 'ADMIN'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should NOT have access cause AND is not adult', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdminSpecification())
        .and(new AdultSpecification())
        .isSatisfiedBy({
            age: 11,
            name: 'john stuart',
            permission: 'ADMIN'
        });
        expect(IsAdult).toBeFalsy()
    })

    it('should have access cause not Adult', ()=>{
        const IsAdult = new CanAccessSpecification()
        .andNot(new AdultSpecification())
        .or(new AdminSpecification())
        .isSatisfiedBy({
            age: 11,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should invert condition', ()=>{
        const IsAdult = new CanAccessSpecification()
        .or(new AdminSpecification())
        .not()
        .isSatisfiedBy({
            age: 11,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeTruthy()
    })

    it('should have access cause orNot adult', ()=>{
        const IsAdult = new CanAccessSpecification()
        .orNot(new AdultSpecification())
        .isSatisfiedBy({
            age: 11,
            name: 'john stuart',
            permission: 'CLIENT'
        });
        expect(IsAdult).toBeTruthy()
    })
})
