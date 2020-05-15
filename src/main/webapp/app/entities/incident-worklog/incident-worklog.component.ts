import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import IncidentWorklogService from './incident-worklog.service';

@Component
export default class IncidentWorklog extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('incidentWorklogService') private incidentWorklogService: () => IncidentWorklogService;
  private removeId: number = null;

  public incidentWorklogs: IIncidentWorklog[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllIncidentWorklogs();
  }

  public clear(): void {
    this.retrieveAllIncidentWorklogs();
  }

  public retrieveAllIncidentWorklogs(): void {
    this.isFetching = true;

    this.incidentWorklogService()
      .retrieve()
      .then(
        res => {
          this.incidentWorklogs = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IIncidentWorklog): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeIncidentWorklog(): void {
    this.incidentWorklogService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cstoneApp.incidentWorklog.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllIncidentWorklogs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
