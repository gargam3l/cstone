import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';
import IncidentWorklogService from './incident-worklog.service';

@Component
export default class IncidentWorklogDetails extends Vue {
  @Inject('incidentWorklogService') private incidentWorklogService: () => IncidentWorklogService;
  public incidentWorklog: IIncidentWorklog = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.incidentWorklogId) {
        vm.retrieveIncidentWorklog(to.params.incidentWorklogId);
      }
    });
  }

  public retrieveIncidentWorklog(incidentWorklogId) {
    this.incidentWorklogService()
      .find(incidentWorklogId)
      .then(res => {
        this.incidentWorklog = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
