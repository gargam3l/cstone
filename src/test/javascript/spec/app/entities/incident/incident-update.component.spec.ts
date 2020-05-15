/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import IncidentUpdateComponent from '@/entities/incident/incident-update.vue';
import IncidentClass from '@/entities/incident/incident-update.component';
import IncidentService from '@/entities/incident/incident.service';

import IncidentWorklogService from '@/entities/incident-worklog/incident-worklog.service';

import GroupService from '@/entities/group/group.service';

import EmployeeService from '@/entities/employee/employee.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Incident Management Update Component', () => {
    let wrapper: Wrapper<IncidentClass>;
    let comp: IncidentClass;
    let incidentServiceStub: SinonStubbedInstance<IncidentService>;

    beforeEach(() => {
      incidentServiceStub = sinon.createStubInstance<IncidentService>(IncidentService);

      wrapper = shallowMount<IncidentClass>(IncidentUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          incidentService: () => incidentServiceStub,

          incidentWorklogService: () => new IncidentWorklogService(),

          groupService: () => new GroupService(),

          employeeService: () => new EmployeeService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.incident = entity;
        incidentServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(incidentServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.incident = entity;
        incidentServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(incidentServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
