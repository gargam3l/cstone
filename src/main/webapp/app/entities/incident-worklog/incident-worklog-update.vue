<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="cstoneApp.incidentWorklog.home.createOrEditLabel" v-text="$t('cstoneApp.incidentWorklog.home.createOrEditLabel')">Create or edit a IncidentWorklog</h2>
                <div>
                    <div class="form-group" v-if="incidentWorklog.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="incidentWorklog.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incidentWorklog.notes')" for="incident-worklog-notes">Notes</label>
                        <input type="text" class="form-control" name="notes" id="incident-worklog-notes"
                            :class="{'valid': !$v.incidentWorklog.notes.$invalid, 'invalid': $v.incidentWorklog.notes.$invalid }" v-model="$v.incidentWorklog.notes.$model"  required/>
                        <div v-if="$v.incidentWorklog.notes.$anyDirty && $v.incidentWorklog.notes.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incidentWorklog.notes.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incidentWorklog.createdAt')" for="incident-worklog-createdAt">Created At</label>
                        <input type="number" class="form-control" name="createdAt" id="incident-worklog-createdAt"
                            :class="{'valid': !$v.incidentWorklog.createdAt.$invalid, 'invalid': $v.incidentWorklog.createdAt.$invalid }" v-model.number="$v.incidentWorklog.createdAt.$model"  required/>
                        <div v-if="$v.incidentWorklog.createdAt.$anyDirty && $v.incidentWorklog.createdAt.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incidentWorklog.createdAt.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.incidentWorklog.createdAt.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incidentWorklog.source')" for="incident-worklog-source">Source</label>
                        <select class="form-control" name="source" :class="{'valid': !$v.incidentWorklog.source.$invalid, 'invalid': $v.incidentWorklog.source.$invalid }" v-model="$v.incidentWorklog.source.$model" id="incident-worklog-source"  required>
                            <option value="SYSTEM" v-bind:label="$t('cstoneApp.WorklogSource.SYSTEM')">SYSTEM</option>
                            <option value="USER" v-bind:label="$t('cstoneApp.WorklogSource.USER')">USER</option>
                            <option value="EMAIL" v-bind:label="$t('cstoneApp.WorklogSource.EMAIL')">EMAIL</option>
                        </select>
                        <div v-if="$v.incidentWorklog.source.$anyDirty && $v.incidentWorklog.source.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incidentWorklog.source.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incidentWorklog.incident')" for="incident-worklog-incident">Incident</label>
                        <select class="form-control" id="incident-worklog-incident" name="incident" v-model="incidentWorklog.incident">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="incidentWorklog.incident && incidentOption.id === incidentWorklog.incident.id ? incidentWorklog.incident : incidentOption" v-for="incidentOption in incidents" :key="incidentOption.id">{{incidentOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incidentWorklog.submittedBy')" for="incident-worklog-submittedBy">Submitted By</label>
                        <select class="form-control" id="incident-worklog-submittedBy" name="submittedBy" v-model="incidentWorklog.submittedBy">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="incidentWorklog.submittedBy && personOption.id === incidentWorklog.submittedBy.id ? incidentWorklog.submittedBy : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.incidentWorklog.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./incident-worklog-update.component.ts">
</script>
