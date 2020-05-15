/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import IncidentWorklogDetailComponent from '@/entities/incident-worklog/incident-worklog-details.vue';
import IncidentWorklogClass from '@/entities/incident-worklog/incident-worklog-details.component';
import IncidentWorklogService from '@/entities/incident-worklog/incident-worklog.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('IncidentWorklog Management Detail Component', () => {
    let wrapper: Wrapper<IncidentWorklogClass>;
    let comp: IncidentWorklogClass;
    let incidentWorklogServiceStub: SinonStubbedInstance<IncidentWorklogService>;

    beforeEach(() => {
      incidentWorklogServiceStub = sinon.createStubInstance<IncidentWorklogService>(IncidentWorklogService);

      wrapper = shallowMount<IncidentWorklogClass>(IncidentWorklogDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { incidentWorklogService: () => incidentWorklogServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundIncidentWorklog = { id: 123 };
        incidentWorklogServiceStub.find.resolves(foundIncidentWorklog);

        // WHEN
        comp.retrieveIncidentWorklog(123);
        await comp.$nextTick();

        // THEN
        expect(comp.incidentWorklog).toBe(foundIncidentWorklog);
      });
    });
  });
});
