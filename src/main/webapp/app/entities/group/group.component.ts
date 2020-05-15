import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IGroup } from '@/shared/model/group.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import GroupService from './group.service';

@Component
export default class Group extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('groupService') private groupService: () => GroupService;
  private removeId: number = null;

  public groups: IGroup[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllGroups();
  }

  public clear(): void {
    this.retrieveAllGroups();
  }

  public retrieveAllGroups(): void {
    this.isFetching = true;

    this.groupService()
      .retrieve()
      .then(
        res => {
          this.groups = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IGroup): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeGroup(): void {
    this.groupService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cstoneApp.group.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllGroups();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
