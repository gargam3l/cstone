import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPerson } from '@/shared/model/person.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PersonService from './person.service';

@Component
export default class Person extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('personService') private personService: () => PersonService;
  private removeId: number = null;

  public people: IPerson[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPersons();
  }

  public clear(): void {
    this.retrieveAllPersons();
  }

  public retrieveAllPersons(): void {
    this.isFetching = true;

    this.personService()
      .retrieve()
      .then(
        res => {
          this.people = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPerson): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePerson(): void {
    this.personService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cstoneApp.person.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllPersons();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
