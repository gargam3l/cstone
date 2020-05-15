import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { IGroup, Group } from '@/shared/model/group.model';
import GroupService from './group.service';

const validations: any = {
  group: {
    name: {
      required
    },
    email: {
      required
    }
  }
};

@Component({
  validations
})
export default class GroupUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('groupService') private groupService: () => GroupService;
  public group: IGroup = new Group();

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.groupId) {
        vm.retrieveGroup(to.params.groupId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.group.id) {
      this.groupService()
        .update(this.group)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.group.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.groupService()
        .create(this.group)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.group.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveGroup(groupId): void {
    this.groupService()
      .find(groupId)
      .then(res => {
        this.group = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
