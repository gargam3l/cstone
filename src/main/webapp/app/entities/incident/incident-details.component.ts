import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIncident } from '@/shared/model/incident.model';
import IncidentService from './incident.service';

@Component
export default class IncidentDetails extends Vue {
  @Inject('incidentService') private incidentService: () => IncidentService;
  public incident: IIncident = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.incidentId) {
        vm.retrieveIncident(to.params.incidentId);
      }
    });
  }

  public retrieveIncident(incidentId) {
    this.incidentService()
      .find(incidentId)
      .then(res => {
        this.incident = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
