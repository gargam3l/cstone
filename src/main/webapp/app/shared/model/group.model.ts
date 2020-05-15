import { IEmployee } from '@/shared/model/employee.model';

export interface IGroup {
  id?: number;
  name?: string;
  email?: string;
  groupPermissions?: IEmployee[];
}

export class Group implements IGroup {
  constructor(public id?: number, public name?: string, public email?: string, public groupPermissions?: IEmployee[]) {}
}
