import { v4 as uuid } from 'uuid';
import { Identifier } from '.';

/**
 * @param id is optional as string.
 * If id is provided returns itself else generate a new uuid
 */
export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuid());
  }
}
