<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="incident">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.incident.detail.title')">Incident</span> {{incident.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.incident.status')">Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('cstoneApp.Status.' + incident.status)">{{incident.status}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.priority')">Priority</span>
                    </dt>
                    <dd>
                        <span v-text="$t('cstoneApp.Priority.' + incident.priority)">{{incident.priority}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{incident.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.createdAt')">Created At</span>
                    </dt>
                    <dd>
                        <span>{{incident.createdAt}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.updatedAt')">Updated At</span>
                    </dt>
                    <dd>
                        <span>{{incident.updatedAt}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.closedAt')">Closed At</span>
                    </dt>
                    <dd>
                        <span>{{incident.closedAt}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.group')">Group</span>
                    </dt>
                    <dd>
                        <div v-if="incident.group">
                            <router-link :to="{name: 'GroupView', params: {groupId: incident.group.id}}">{{incident.group.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.ownerId')">Owner Id</span>
                    </dt>
                    <dd>
                        <div v-if="incident.ownerId">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: incident.ownerId.id}}">{{incident.ownerId.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incident.submittedById')">Submitted By Id</span>
                    </dt>
                    <dd>
                        <div v-if="incident.submittedById">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: incident.submittedById.id}}">{{incident.submittedById.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="incident.id" :to="{name: 'IncidentEdit', params: {incidentId: incident.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./incident-details.component.ts">
</script>
