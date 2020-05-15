import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import IncidentService from '../incident/incident.service';
import { IIncident } from '@/shared/model/incident.model';

import PersonService from '../person/person.service';
import { IPerson } from '@/shared/model/person.model';

import AlertService from '@/shared/alert/alert.service';
import { IIncidentWorklog, IncidentWorklog } from '@/shared/model/incident-worklog.model';
import IncidentWorklogService from './incident-worklog.service';

const validations: any = {
  incidentWorklog: {
    notes: {
      required
    },
    createdAt: {
      required,
      numeric
    },
    source: {
      required
    }
  }
};

@Component({
  validations
})
export default class IncidentWorklogUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('incidentWorklogService') private incidentWorklogService: () => IncidentWorklogService;
  public incidentWorklog: IIncidentWorklog = new IncidentWorklog();

  @Inject('incidentService') private incidentService: () => IncidentService;

  public incidents: IIncident[] = [];

  @Inject('personService') private personService: () => PersonService;

  public people: IPerson[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.incidentWorklogId) {
        vm.retrieveIncidentWorklog(to.params.incidentWorklogId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.incidentWorklog.id) {
      this.incidentWorklogService()
        .update(this.incidentWorklog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.incidentWorklog.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.incidentWorklogService()
        .create(this.incidentWorklog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.incidentWorklog.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveIncidentWorklog(incidentWorklogId): void {
    this.incidentWorklogService()
      .find(incidentWorklogId)
      .then(res => {
        this.incidentWorklog = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.incidentService()
      .retrieve()
      .then(res => {
        this.incidents = res.data;
      });
    this.personService()
      .retrieve()
      .then(res => {
        this.people = res.data;
      });
  }
}
