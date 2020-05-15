import { IPerson } from '@/shared/model/person.model';

export interface ICustomer {
  id?: number;
  company?: string;
  address?: string;
  personId?: IPerson;
}

export class Customer implements ICustomer {
  constructor(public id?: number, public company?: string, public address?: string, public personId?: IPerson) {}
}
