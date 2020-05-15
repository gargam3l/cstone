/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import GroupComponent from '@/entities/group/group.vue';
import GroupClass from '@/entities/group/group.component';
import GroupService from '@/entities/group/group.service';

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
  describe('Group Management Component', () => {
    let wrapper: Wrapper<GroupClass>;
    let comp: GroupClass;
    let groupServiceStub: SinonStubbedInstance<GroupService>;

    beforeEach(() => {
      groupServiceStub = sinon.createStubInstance<GroupService>(GroupService);
      groupServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<GroupClass>(GroupComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          groupService: () => groupServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      groupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllGroups();
      await comp.$nextTick();

      // THEN
      expect(groupServiceStub.retrieve.called).toBeTruthy();
      expect(comp.groups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      groupServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeGroup();
      await comp.$nextTick();

      // THEN
      expect(groupServiceStub.delete.called).toBeTruthy();
      expect(groupServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
