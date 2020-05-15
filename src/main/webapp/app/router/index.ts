import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Incident = () => import('../entities/incident/incident.vue');
// prettier-ignore
const IncidentUpdate = () => import('../entities/incident/incident-update.vue');
// prettier-ignore
const IncidentDetails = () => import('../entities/incident/incident-details.vue');
// prettier-ignore
const Group = () => import('../entities/group/group.vue');
// prettier-ignore
const GroupUpdate = () => import('../entities/group/group-update.vue');
// prettier-ignore
const GroupDetails = () => import('../entities/group/group-details.vue');
// prettier-ignore
const IncidentWorklog = () => import('../entities/incident-worklog/incident-worklog.vue');
// prettier-ignore
const IncidentWorklogUpdate = () => import('../entities/incident-worklog/incident-worklog-update.vue');
// prettier-ignore
const IncidentWorklogDetails = () => import('../entities/incident-worklog/incident-worklog-details.vue');
// prettier-ignore
const Employee = () => import('../entities/employee/employee.vue');
// prettier-ignore
const EmployeeUpdate = () => import('../entities/employee/employee-update.vue');
// prettier-ignore
const EmployeeDetails = () => import('../entities/employee/employee-details.vue');
// prettier-ignore
const Person = () => import('../entities/person/person.vue');
// prettier-ignore
const PersonUpdate = () => import('../entities/person/person-update.vue');
// prettier-ignore
const PersonDetails = () => import('../entities/person/person-details.vue');
// prettier-ignore
const Customer = () => import('../entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('../entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('../entities/customer/customer-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/incident',
      name: 'Incident',
      component: Incident,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident/new',
      name: 'IncidentCreate',
      component: IncidentUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident/:incidentId/edit',
      name: 'IncidentEdit',
      component: IncidentUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident/:incidentId/view',
      name: 'IncidentView',
      component: IncidentDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/group',
      name: 'Group',
      component: Group,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/group/new',
      name: 'GroupCreate',
      component: GroupUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/group/:groupId/edit',
      name: 'GroupEdit',
      component: GroupUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/group/:groupId/view',
      name: 'GroupView',
      component: GroupDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/incident-worklog',
      name: 'IncidentWorklog',
      component: IncidentWorklog,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident-worklog/new',
      name: 'IncidentWorklogCreate',
      component: IncidentWorklogUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident-worklog/:incidentWorklogId/edit',
      name: 'IncidentWorklogEdit',
      component: IncidentWorklogUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/incident-worklog/:incidentWorklogId/view',
      name: 'IncidentWorklogView',
      component: IncidentWorklogDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/employee',
      name: 'Employee',
      component: Employee,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/employee/new',
      name: 'EmployeeCreate',
      component: EmployeeUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/employee/:employeeId/edit',
      name: 'EmployeeEdit',
      component: EmployeeUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/employee/:employeeId/view',
      name: 'EmployeeView',
      component: EmployeeDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/person/new',
      name: 'PersonCreate',
      component: PersonUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/person/:personId/edit',
      name: 'PersonEdit',
      component: PersonUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/person/:personId/view',
      name: 'PersonView',
      component: PersonDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/new',
      name: 'CustomerCreate',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/edit',
      name: 'CustomerEdit',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/view',
      name: 'CustomerView',
      component: CustomerDetails,
      meta: { authorities: [Authority.USER] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
