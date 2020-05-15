import { IPerson } from '@/shared/model/person.model';
import { IIncident } from '@/shared/model/incident.model';
import { IGroup } from '@/shared/model/group.model';

export const enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface IEmployee {
  id?: number;
  username?: string;
  passwordHash?: string;
  role?: Role;
  personId?: IPerson;
  ownedIncidents?: IIncident[];
  submittedIncidents?: IIncident[];
  groups?: IGroup[];
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public username?: string,
    public passwordHash?: string,
    public role?: Role,
    public personId?: IPerson,
    public ownedIncidents?: IIncident[],
    public submittedIncidents?: IIncident[],
    public groups?: IGroup[]
  ) {}
}
