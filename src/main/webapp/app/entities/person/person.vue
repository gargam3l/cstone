<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('cstoneApp.person.home.title')" id="person-heading">People</span>
            <router-link :to="{name: 'PersonCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-person">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('cstoneApp.person.home.createLabel')">
                    Create a new Person
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
        <div class="alert alert-warning" v-if="!isFetching && people && people.length === 0">
            <span v-text="$t('cstoneApp.person.home.notFound')">No people found</span>
        </div>
        <div class="table-responsive" v-if="people && people.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('cstoneApp.person.firstName')">First Name</span></th>
                    <th><span v-text="$t('cstoneApp.person.lastName')">Last Name</span></th>
                    <th><span v-text="$t('cstoneApp.person.email')">Email</span></th>
                    <th><span v-text="$t('cstoneApp.person.phone')">Phone</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="person in people"
                    :key="person.id">
                    <td>
                        <router-link :to="{name: 'PersonView', params: {personId: person.id}}">{{person.id}}</router-link>
                    </td>
                    <td>{{person.firstName}}</td>
                    <td>{{person.lastName}}</td>
                    <td>{{person.email}}</td>
                    <td>{{person.phone}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PersonView', params: {personId: person.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PersonEdit', params: {personId: person.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(person)"
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
            <span slot="modal-title"><span id="cstoneApp.person.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-person-heading" v-text="$t('cstoneApp.person.delete.question', {'id': removeId})">Are you sure you want to delete this Person?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-person" v-text="$t('entity.action.delete')" v-on:click="removePerson()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./person.component.ts">
</script>
