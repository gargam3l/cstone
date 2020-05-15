<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="person">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.person.detail.title')">Person</span> {{person.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.person.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{person.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.person.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{person.lastName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.person.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{person.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.person.phone')">Phone</span>
                    </dt>
                    <dd>
                        <span>{{person.phone}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="person.id" :to="{name: 'PersonEdit', params: {personId: person.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./person-details.component.ts">
</script>
