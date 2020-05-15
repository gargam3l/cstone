import { IIncident } from '@/shared/model/incident.model';
import { IPerson } from '@/shared/model/person.model';

export const enum WorklogSource {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  EMAIL = 'EMAIL'
}

export interface IIncidentWorklog {
  id?: number;
  notes?: string;
  createdAt?: number;
  source?: WorklogSource;
  incident?: IIncident;
  submittedBy?: IPerson;
}

export class IncidentWorklog implements IIncidentWorklog {
  constructor(
    public id?: number,
    public notes?: string,
    public createdAt?: number,
    public source?: WorklogSource,
    public incident?: IIncident,
    public submittedBy?: IPerson
  ) {}
}
