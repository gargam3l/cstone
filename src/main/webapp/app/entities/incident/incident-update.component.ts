import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import IncidentWorklogService from '../incident-worklog/incident-worklog.service';
import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';

import GroupService from '../group/group.service';
import { IGroup } from '@/shared/model/group.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { IIncident, Incident } from '@/shared/model/incident.model';
import IncidentService from './incident.service';

const validations: any = {
  incident: {
    status: {
      required
    },
    priority: {
      required
    },
    description: {},
    createdAt: {
      required,
      numeric
    },
    updatedAt: {
      required,
      numeric
    },
    closedAt: {}
  }
};

@Component({
  validations
})
export default class IncidentUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('incidentService') private incidentService: () => IncidentService;
  public incident: IIncident = new Incident();

  @Inject('incidentWorklogService') private incidentWorklogService: () => IncidentWorklogService;

  public incidentWorklogs: IIncidentWorklog[] = [];

  @Inject('groupService') private groupService: () => GroupService;

  public groups: IGroup[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.incidentId) {
        vm.retrieveIncident(to.params.incidentId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.incident.id) {
      this.incidentService()
        .update(this.incident)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.incident.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.incidentService()
        .create(this.incident)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.incident.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveIncident(incidentId): void {
    this.incidentService()
      .find(incidentId)
      .then(res => {
        this.incident = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.incidentWorklogService()
      .retrieve()
      .then(res => {
        this.incidentWorklogs = res.data;
      });
    this.groupService()
      .retrieve()
      .then(res => {
        this.groups = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
