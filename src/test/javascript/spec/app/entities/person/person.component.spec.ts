/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PersonComponent from '@/entities/person/person.vue';
import PersonClass from '@/entities/person/person.component';
import PersonService from '@/entities/person/person.service';

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
  describe('Person Management Component', () => {
    let wrapper: Wrapper<PersonClass>;
    let comp: PersonClass;
    let personServiceStub: SinonStubbedInstance<PersonService>;

    beforeEach(() => {
      personServiceStub = sinon.createStubInstance<PersonService>(PersonService);
      personServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PersonClass>(PersonComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          personService: () => personServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      personServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPersons();
      await comp.$nextTick();

      // THEN
      expect(personServiceStub.retrieve.called).toBeTruthy();
      expect(comp.people[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      personServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePerson();
      await comp.$nextTick();

      // THEN
      expect(personServiceStub.delete.called).toBeTruthy();
      expect(personServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
