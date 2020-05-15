import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IIncident } from '@/shared/model/incident.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import IncidentService from './incident.service';

@Component
export default class Incident extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('incidentService') private incidentService: () => IncidentService;
  private removeId: number = null;

  public incidents: IIncident[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllIncidents();
  }

  public clear(): void {
    this.retrieveAllIncidents();
  }

  public retrieveAllIncidents(): void {
    this.isFetching = true;

    this.incidentService()
      .retrieve()
      .then(
        res => {
          this.incidents = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IIncident): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeIncident(): void {
    this.incidentService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cstoneApp.incident.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllIncidents();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
