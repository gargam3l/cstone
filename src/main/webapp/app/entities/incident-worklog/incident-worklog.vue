<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('cstoneApp.incidentWorklog.home.title')" id="incident-worklog-heading">Incident Worklogs</span>
            <router-link :to="{name: 'IncidentWorklogCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-incident-worklog">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('cstoneApp.incidentWorklog.home.createLabel')">
                    Create a new Incident Worklog
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
        <div class="alert alert-warning" v-if="!isFetching && incidentWorklogs && incidentWorklogs.length === 0">
            <span v-text="$t('cstoneApp.incidentWorklog.home.notFound')">No incidentWorklogs found</span>
        </div>
        <div class="table-responsive" v-if="incidentWorklogs && incidentWorklogs.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('cstoneApp.incidentWorklog.notes')">Notes</span></th>
                    <th><span v-text="$t('cstoneApp.incidentWorklog.createdAt')">Created At</span></th>
                    <th><span v-text="$t('cstoneApp.incidentWorklog.source')">Source</span></th>
                    <th><span v-text="$t('cstoneApp.incidentWorklog.incident')">Incident</span></th>
                    <th><span v-text="$t('cstoneApp.incidentWorklog.submittedBy')">Submitted By</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="incidentWorklog in incidentWorklogs"
                    :key="incidentWorklog.id">
                    <td>
                        <router-link :to="{name: 'IncidentWorklogView', params: {incidentWorklogId: incidentWorklog.id}}">{{incidentWorklog.id}}</router-link>
                    </td>
                    <td>{{incidentWorklog.notes}}</td>
                    <td>{{incidentWorklog.createdAt}}</td>
                    <td v-text="$t('cstoneApp.WorklogSource.' + incidentWorklog.source)">{{incidentWorklog.source}}</td>
                    <td>
                        <div v-if="incidentWorklog.incident">
                            <router-link :to="{name: 'IncidentView', params: {incidentId: incidentWorklog.incident.id}}">{{incidentWorklog.incident.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="incidentWorklog.submittedBy">
                            <router-link :to="{name: 'PersonView', params: {personId: incidentWorklog.submittedBy.id}}">{{incidentWorklog.submittedBy.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'IncidentWorklogView', params: {incidentWorklogId: incidentWorklog.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'IncidentWorklogEdit', params: {incidentWorklogId: incidentWorklog.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(incidentWorklog)"
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
            <span slot="modal-title"><span id="cstoneApp.incidentWorklog.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-incidentWorklog-heading" v-text="$t('cstoneApp.incidentWorklog.delete.question', {'id': removeId})">Are you sure you want to delete this Incident Worklog?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-incidentWorklog" v-text="$t('entity.action.delete')" v-on:click="removeIncidentWorklog()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./incident-worklog.component.ts">
</script>
