<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('cstoneApp.employee.home.title')" id="employee-heading">Employees</span>
            <router-link :to="{name: 'EmployeeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-employee">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('cstoneApp.employee.home.createLabel')">
                    Create a new Employee
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && employees && employees.length === 0">
            <span v-text="$t('cstoneApp.employee.home.notFound')">No employees found</span>
        </div>
        <div class="table-responsive" v-if="employees && employees.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('cstoneApp.employee.username')">Username</span></th>
                    <th><span v-text="$t('cstoneApp.employee.passwordHash')">Password Hash</span></th>
                    <th><span v-text="$t('cstoneApp.employee.role')">Role</span></th>
                    <th><span v-text="$t('cstoneApp.employee.personId')">Person Id</span></th>
                    <th><span v-text="$t('cstoneApp.employee.group')">Group</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee in employees"
                    :key="employee.id">
                    <td>
                        <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}">{{employee.id}}</router-link>
                    </td>
                    <td>{{employee.username}}</td>
                    <td>{{employee.passwordHash}}</td>
                    <td v-text="$t('cstoneApp.Role.' + employee.role)">{{employee.role}}</td>
                    <td>
                        <div v-if="employee.personId">
                            <router-link :to="{name: 'PersonView', params: {personId: employee.personId.id}}">{{employee.personId.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <span v-for="(group, i) in employee.groups" :key="group.id">{{i > 0 ? ', ' : ''}}
                            <router-link class="form-control-static" :to="{name: 'GroupView', params: {groupId: group.id}}">{{group.id}}</router-link>
                        </span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(employee)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="cstoneApp.employee.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-employee-heading" v-text="$t('cstoneApp.employee.delete.question', {'id': removeId})">Are you sure you want to delete this Employee?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-employee" v-text="$t('entity.action.delete')" v-on:click="removeEmployee()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./employee.component.ts">
</script>
