import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICustomer } from '@/shared/model/customer.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CustomerService from './customer.service';

@Component
export default class Customer extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('customerService') private customerService: () => CustomerService;
  private removeId: number = null;

  public customers: ICustomer[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCustomers();
  }

  public clear(): void {
    this.retrieveAllCustomers();
  }

  public retrieveAllCustomers(): void {
    this.isFetching = true;

    this.customerService()
      .retrieve()
      .then(
        res => {
          this.customers = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICustomer): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCustomer(): void {
    this.customerService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cstoneApp.customer.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllCustomers();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
