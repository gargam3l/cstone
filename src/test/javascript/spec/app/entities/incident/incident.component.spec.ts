/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import IncidentComponent from '@/entities/incident/incident.vue';
import IncidentClass from '@/entities/incident/incident.component';
import IncidentService from '@/entities/incident/incident.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {}
  }
};

describe('Component Tests', () => {
  describe('Incident Management Component', () => {
    let wrapper: Wrapper<IncidentClass>;
    let comp: IncidentClass;
    let incidentServiceStub: SinonStubbedInstance<IncidentService>;

    beforeEach(() => {
      incidentServiceStub = sinon.createStubInstance<IncidentService>(IncidentService);
      incidentServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<IncidentClass>(IncidentComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          incidentService: () => incidentServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      incidentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllIncidents();
      await comp.$nextTick();

      // THEN
      expect(incidentServiceStub.retrieve.called).toBeTruthy();
      expect(comp.incidents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      incidentServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeIncident();
      await comp.$nextTick();

      // THEN
      expect(incidentServiceStub.delete.called).toBeTruthy();
      expect(incidentServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
