<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="incidentWorklog">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.incidentWorklog.detail.title')">IncidentWorklog</span> {{incidentWorklog.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.incidentWorklog.notes')">Notes</span>
                    </dt>
                    <dd>
                        <span>{{incidentWorklog.notes}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incidentWorklog.createdAt')">Created At</span>
                    </dt>
                    <dd>
                        <span>{{incidentWorklog.createdAt}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incidentWorklog.source')">Source</span>
                    </dt>
                    <dd>
                        <span v-text="$t('cstoneApp.WorklogSource.' + incidentWorklog.source)">{{incidentWorklog.source}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incidentWorklog.incident')">Incident</span>
                    </dt>
                    <dd>
                        <div v-if="incidentWorklog.incident">
                            <router-link :to="{name: 'IncidentView', params: {incidentId: incidentWorklog.incident.id}}">{{incidentWorklog.incident.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.incidentWorklog.submittedBy')">Submitted By</span>
                    </dt>
                    <dd>
                        <div v-if="incidentWorklog.submittedBy">
                            <router-link :to="{name: 'PersonView', params: {personId: incidentWorklog.submittedBy.id}}">{{incidentWorklog.submittedBy.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="incidentWorklog.id" :to="{name: 'IncidentWorklogEdit', params: {incidentWorklogId: incidentWorklog.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./incident-worklog-details.component.ts">
</script>
