import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  submittedWorklogs?: IIncidentWorklog[];
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phone?: string,
    public submittedWorklogs?: IIncidentWorklog[]
  ) {}
}
