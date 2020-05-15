<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('cstoneApp.incident.home.title')" id="incident-heading">Incidents</span>
            <router-link :to="{name: 'IncidentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-incident">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('cstoneApp.incident.home.createLabel')">
                    Create a new Incident
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
        <div class="alert alert-warning" v-if="!isFetching && incidents && incidents.length === 0">
            <span v-text="$t('cstoneApp.incident.home.notFound')">No incidents found</span>
        </div>
        <div class="table-responsive" v-if="incidents && incidents.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('cstoneApp.incident.status')">Status</span></th>
                    <th><span v-text="$t('cstoneApp.incident.priority')">Priority</span></th>
                    <th><span v-text="$t('cstoneApp.incident.description')">Description</span></th>
                    <th><span v-text="$t('cstoneApp.incident.createdAt')">Created At</span></th>
                    <th><span v-text="$t('cstoneApp.incident.updatedAt')">Updated At</span></th>
                    <th><span v-text="$t('cstoneApp.incident.closedAt')">Closed At</span></th>
                    <th><span v-text="$t('cstoneApp.incident.group')">Group</span></th>
                    <th><span v-text="$t('cstoneApp.incident.ownerId')">Owner Id</span></th>
                    <th><span v-text="$t('cstoneApp.incident.submittedById')">Submitted By Id</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="incident in incidents"
                    :key="incident.id">
                    <td>
                        <router-link :to="{name: 'IncidentView', params: {incidentId: incident.id}}">{{incident.id}}</router-link>
                    </td>
                    <td v-text="$t('cstoneApp.Status.' + incident.status)">{{incident.status}}</td>
                    <td v-text="$t('cstoneApp.Priority.' + incident.priority)">{{incident.priority}}</td>
                    <td>{{incident.description}}</td>
                    <td>{{incident.createdAt}}</td>
                    <td>{{incident.updatedAt}}</td>
                    <td>{{incident.closedAt}}</td>
                    <td>
                        <div v-if="incident.group">
                            <router-link :to="{name: 'GroupView', params: {groupId: incident.group.id}}">{{incident.group.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="incident.ownerId">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: incident.ownerId.id}}">{{incident.ownerId.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="incident.submittedById">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: incident.submittedById.id}}">{{incident.submittedById.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'IncidentView', params: {incidentId: incident.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'IncidentEdit', params: {incidentId: incident.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(incident)"
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
            <span slot="modal-title"><span id="cstoneApp.incident.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-incident-heading" v-text="$t('cstoneApp.incident.delete.question', {'id': removeId})">Are you sure you want to delete this Incident?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-incident" v-text="$t('entity.action.delete')" v-on:click="removeIncident()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./incident.component.ts">
</script>
