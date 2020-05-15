/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import IncidentWorklogUpdateComponent from '@/entities/incident-worklog/incident-worklog-update.vue';
import IncidentWorklogClass from '@/entities/incident-worklog/incident-worklog-update.component';
import IncidentWorklogService from '@/entities/incident-worklog/incident-worklog.service';

import IncidentService from '@/entities/incident/incident.service';

import PersonService from '@/entities/person/person.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('IncidentWorklog Management Update Component', () => {
    let wrapper: Wrapper<IncidentWorklogClass>;
    let comp: IncidentWorklogClass;
    let incidentWorklogServiceStub: SinonStubbedInstance<IncidentWorklogService>;

    beforeEach(() => {
      incidentWorklogServiceStub = sinon.createStubInstance<IncidentWorklogService>(IncidentWorklogService);

      wrapper = shallowMount<IncidentWorklogClass>(IncidentWorklogUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          incidentWorklogService: () => incidentWorklogServiceStub,

          incidentService: () => new IncidentService(),

          personService: () => new PersonService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.incidentWorklog = entity;
        incidentWorklogServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(incidentWorklogServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.incidentWorklog = entity;
        incidentWorklogServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(incidentWorklogServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
