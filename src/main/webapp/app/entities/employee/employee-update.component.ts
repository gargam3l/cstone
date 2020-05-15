import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import IncidentService from '../incident/incident.service';
import { IIncident } from '@/shared/model/incident.model';

import GroupService from '../group/group.service';
import { IGroup } from '@/shared/model/group.model';

import AlertService from '@/shared/alert/alert.service';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';

const validations: any = {
  employee: {
    username: {},
    passwordHash: {},
    role: {}
  }
};

@Component({
  validations
})
export default class EmployeeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  public employee: IEmployee = new Employee();

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];

  @Inject('incidentService') private incidentService: () => IncidentService;

  public incidents: IIncident[] = [];

  @Inject('groupService') private groupService: () => GroupService;

  public groups: IGroup[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.employee.groups = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.employee.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.employee.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
    this.incidentService()
      .retrieve()
      .then(res => {
        this.incidents = res.data;
      });
    this.incidentService()
      .retrieve()
      .then(res => {
        this.incidents = res.data;
      });
    this.groupService()
      .retrieve()
      .then(res => {
        this.groups = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
