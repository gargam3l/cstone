<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('cstoneApp.group.home.title')" id="group-heading">Groups</span>
            <router-link :to="{name: 'GroupCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-group">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('cstoneApp.group.home.createLabel')">
                    Create a new Group
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
        <div class="alert alert-warning" v-if="!isFetching && groups && groups.length === 0">
            <span v-text="$t('cstoneApp.group.home.notFound')">No groups found</span>
        </div>
        <div class="table-responsive" v-if="groups && groups.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('cstoneApp.group.name')">Name</span></th>
                    <th><span v-text="$t('cstoneApp.group.email')">Email</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="group in groups"
                    :key="group.id">
                    <td>
                        <router-link :to="{name: 'GroupView', params: {groupId: group.id}}">{{group.id}}</router-link>
                    </td>
                    <td>{{group.name}}</td>
                    <td>{{group.email}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'GroupView', params: {groupId: group.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'GroupEdit', params: {groupId: group.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(group)"
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
            <span slot="modal-title"><span id="cstoneApp.group.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-group-heading" v-text="$t('cstoneApp.group.delete.question', {'id': removeId})">Are you sure you want to delete this Group?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-group" v-text="$t('entity.action.delete')" v-on:click="removeGroup()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./group.component.ts">
</script>
