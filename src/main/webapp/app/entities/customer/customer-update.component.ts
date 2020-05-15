import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import AlertService from '@/shared/alert/alert.service';
import { ICustomer, Customer } from '@/shared/model/customer.model';
import CustomerService from './customer.service';

const validations: any = {
  customer: {
    company: {
      required
    },
    address: {}
  }
};

@Component({
  validations
})
export default class CustomerUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('customerService') private customerService: () => CustomerService;
  public customer: ICustomer = new Customer();

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerId) {
        vm.retrieveCustomer(to.params.customerId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.customer.id) {
      this.customerService()
        .update(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.customer.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.customerService()
        .create(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.customer.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCustomer(customerId): void {
    this.customerService()
      .find(customerId)
      .then(res => {
        this.customer = res;
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
  }
}
