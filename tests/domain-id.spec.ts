import DomainId from '../src/core/domain-id';

describe('domain-id', () => {
     it('should be defined', () => {
          const id = DomainId.create;
          expect(id).toBeDefined();
     });

     it('should create a new uuid as id', () => {
          const id = DomainId.create().id.toString();
          expect(id.length).toBeGreaterThan(10);
     });

     it('should accept a provided value as id', () => {
          const id = DomainId.create('provided_id').id.toString();
          expect(id).toBe('provided_id');
     });
});
