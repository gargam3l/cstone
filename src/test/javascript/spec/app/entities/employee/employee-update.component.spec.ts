/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EmployeeUpdateComponent from '@/entities/employee/employee-update.vue';
import EmployeeClass from '@/entities/employee/employee-update.component';
import EmployeeService from '@/entities/employee/employee.service';

import PersonService from '@/entities/person/person.service';

import IncidentService from '@/entities/incident/incident.service';

import GroupService from '@/entities/group/group.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Employee Management Update Component', () => {
    let wrapper: Wrapper<EmployeeClass>;
    let comp: EmployeeClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeService>(EmployeeService);

      wrapper = shallowMount<EmployeeClass>(EmployeeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          employeeService: () => employeeServiceStub,

          personService: () => new PersonService(),

          incidentService: () => new IncidentService(),

          groupService: () => new GroupService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.employee = entity;
        employeeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.employee = entity;
        employeeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
