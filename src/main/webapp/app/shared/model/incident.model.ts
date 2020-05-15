import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';
import { IGroup } from '@/shared/model/group.model';
import { IEmployee } from '@/shared/model/employee.model';

export const enum Status {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'
}

export const enum Priority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface IIncident {
  id?: number;
  status?: Status;
  priority?: Priority;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  closedAt?: number;
  incidentWorklogs?: IIncidentWorklog[];
  group?: IGroup;
  ownerId?: IEmployee;
  submittedById?: IEmployee;
}

export class Incident implements IIncident {
  constructor(
    public id?: number,
    public status?: Status,
    public priority?: Priority,
    public description?: string,
    public createdAt?: number,
    public updatedAt?: number,
    public closedAt?: number,
    public incidentWorklogs?: IIncidentWorklog[],
    public group?: IGroup,
    public ownerId?: IEmployee,
    public submittedById?: IEmployee
  ) {}
}
