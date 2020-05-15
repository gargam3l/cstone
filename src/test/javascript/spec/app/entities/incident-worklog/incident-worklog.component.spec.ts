/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import IncidentWorklogComponent from '@/entities/incident-worklog/incident-worklog.vue';
import IncidentWorklogClass from '@/entities/incident-worklog/incident-worklog.component';
import IncidentWorklogService from '@/entities/incident-worklog/incident-worklog.service';

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
  describe('IncidentWorklog Management Component', () => {
    let wrapper: Wrapper<IncidentWorklogClass>;
    let comp: IncidentWorklogClass;
    let incidentWorklogServiceStub: SinonStubbedInstance<IncidentWorklogService>;

    beforeEach(() => {
      incidentWorklogServiceStub = sinon.createStubInstance<IncidentWorklogService>(IncidentWorklogService);
      incidentWorklogServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<IncidentWorklogClass>(IncidentWorklogComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          incidentWorklogService: () => incidentWorklogServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      incidentWorklogServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllIncidentWorklogs();
      await comp.$nextTick();

      // THEN
      expect(incidentWorklogServiceStub.retrieve.called).toBeTruthy();
      expect(comp.incidentWorklogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      incidentWorklogServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeIncidentWorklog();
      await comp.$nextTick();

      // THEN
      expect(incidentWorklogServiceStub.delete.called).toBeTruthy();
      expect(incidentWorklogServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
