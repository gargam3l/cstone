/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PersonUpdateComponent from '@/entities/person/person-update.vue';
import PersonClass from '@/entities/person/person-update.component';
import PersonService from '@/entities/person/person.service';

import IncidentWorklogService from '@/entities/incident-worklog/incident-worklog.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Person Management Update Component', () => {
    let wrapper: Wrapper<PersonClass>;
    let comp: PersonClass;
    let personServiceStub: SinonStubbedInstance<PersonService>;

    beforeEach(() => {
      personServiceStub = sinon.createStubInstance<PersonService>(PersonService);

      wrapper = shallowMount<PersonClass>(PersonUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          personService: () => personServiceStub,

          incidentWorklogService: () => new IncidentWorklogService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.person = entity;
        personServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(personServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.person = entity;
        personServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(personServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
