<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="group">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.group.detail.title')">Group</span> {{group.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.group.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{group.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.group.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{group.email}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="group.id" :to="{name: 'GroupEdit', params: {groupId: group.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./group-details.component.ts">
</script>
