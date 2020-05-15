<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="cstoneApp.incident.home.createOrEditLabel" v-text="$t('cstoneApp.incident.home.createOrEditLabel')">Create or edit a Incident</h2>
                <div>
                    <div class="form-group" v-if="incident.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="incident.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.status')" for="incident-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.incident.status.$invalid, 'invalid': $v.incident.status.$invalid }" v-model="$v.incident.status.$model" id="incident-status"  required>
                            <option value="NEW" v-bind:label="$t('cstoneApp.Status.NEW')">NEW</option>
                            <option value="ASSIGNED" v-bind:label="$t('cstoneApp.Status.ASSIGNED')">ASSIGNED</option>
                            <option value="IN_PROGRESS" v-bind:label="$t('cstoneApp.Status.IN_PROGRESS')">IN_PROGRESS</option>
                            <option value="SUSPENDED" v-bind:label="$t('cstoneApp.Status.SUSPENDED')">SUSPENDED</option>
                            <option value="CLOSED" v-bind:label="$t('cstoneApp.Status.CLOSED')">CLOSED</option>
                        </select>
                        <div v-if="$v.incident.status.$anyDirty && $v.incident.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incident.status.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.priority')" for="incident-priority">Priority</label>
                        <select class="form-control" name="priority" :class="{'valid': !$v.incident.priority.$invalid, 'invalid': $v.incident.priority.$invalid }" v-model="$v.incident.priority.$model" id="incident-priority"  required>
                            <option value="CRITICAL" v-bind:label="$t('cstoneApp.Priority.CRITICAL')">CRITICAL</option>
                            <option value="HIGH" v-bind:label="$t('cstoneApp.Priority.HIGH')">HIGH</option>
                            <option value="MEDIUM" v-bind:label="$t('cstoneApp.Priority.MEDIUM')">MEDIUM</option>
                            <option value="LOW" v-bind:label="$t('cstoneApp.Priority.LOW')">LOW</option>
                        </select>
                        <div v-if="$v.incident.priority.$anyDirty && $v.incident.priority.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incident.priority.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.description')" for="incident-description">Description</label>
                        <input type="text" class="form-control" name="description" id="incident-description"
                            :class="{'valid': !$v.incident.description.$invalid, 'invalid': $v.incident.description.$invalid }" v-model="$v.incident.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.createdAt')" for="incident-createdAt">Created At</label>
                        <input type="number" class="form-control" name="createdAt" id="incident-createdAt"
                            :class="{'valid': !$v.incident.createdAt.$invalid, 'invalid': $v.incident.createdAt.$invalid }" v-model.number="$v.incident.createdAt.$model"  required/>
                        <div v-if="$v.incident.createdAt.$anyDirty && $v.incident.createdAt.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incident.createdAt.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.incident.createdAt.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.updatedAt')" for="incident-updatedAt">Updated At</label>
                        <input type="number" class="form-control" name="updatedAt" id="incident-updatedAt"
                            :class="{'valid': !$v.incident.updatedAt.$invalid, 'invalid': $v.incident.updatedAt.$invalid }" v-model.number="$v.incident.updatedAt.$model"  required/>
                        <div v-if="$v.incident.updatedAt.$anyDirty && $v.incident.updatedAt.$invalid">
                            <small class="form-text text-danger" v-if="!$v.incident.updatedAt.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.incident.updatedAt.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.closedAt')" for="incident-closedAt">Closed At</label>
                        <input type="number" class="form-control" name="closedAt" id="incident-closedAt"
                            :class="{'valid': !$v.incident.closedAt.$invalid, 'invalid': $v.incident.closedAt.$invalid }" v-model.number="$v.incident.closedAt.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.group')" for="incident-group">Group</label>
                        <select class="form-control" id="incident-group" name="group" v-model="incident.group">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="incident.group && groupOption.id === incident.group.id ? incident.group : groupOption" v-for="groupOption in groups" :key="groupOption.id">{{groupOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.ownerId')" for="incident-ownerId">Owner Id</label>
                        <select class="form-control" id="incident-ownerId" name="ownerId" v-model="incident.ownerId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="incident.ownerId && employeeOption.id === incident.ownerId.id ? incident.ownerId : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.incident.submittedById')" for="incident-submittedById">Submitted By Id</label>
                        <select class="form-control" id="incident-submittedById" name="submittedById" v-model="incident.submittedById">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="incident.submittedById && employeeOption.id === incident.submittedById.id ? incident.submittedById : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.incident.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./incident-update.component.ts">
</script>
