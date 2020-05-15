import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import IncidentWorklogService from '../incident-worklog/incident-worklog.service';
import { IIncidentWorklog } from '@/shared/model/incident-worklog.model';

import AlertService from '@/shared/alert/alert.service';
import { IPerson, Person } from '@/shared/model/person.model';
import PersonService from './person.service';

const validations: any = {
  person: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required
    },
    phone: {}
  }
};

@Component({
  validations
})
export default class PersonUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('personService') private personService: () => PersonService;
  public person: IPerson = new Person();

  @Inject('incidentWorklogService') private incidentWorklogService: () => IncidentWorklogService;

  public incidentWorklogs: IIncidentWorklog[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.personId) {
        vm.retrievePerson(to.params.personId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.person.id) {
      this.personService()
        .update(this.person)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.person.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.personService()
        .create(this.person)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cstoneApp.person.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePerson(personId): void {
    this.personService()
      .find(personId)
      .then(res => {
        this.person = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.incidentWorklogService()
      .retrieve()
      .then(res => {
        this.incidentWorklogs = res.data;
      });
  }
}
