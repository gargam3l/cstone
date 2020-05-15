<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="cstoneApp.person.home.createOrEditLabel" v-text="$t('cstoneApp.person.home.createOrEditLabel')">Create or edit a Person</h2>
                <div>
                    <div class="form-group" v-if="person.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="person.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.person.firstName')" for="person-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="person-firstName"
                            :class="{'valid': !$v.person.firstName.$invalid, 'invalid': $v.person.firstName.$invalid }" v-model="$v.person.firstName.$model"  required/>
                        <div v-if="$v.person.firstName.$anyDirty && $v.person.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.person.firstName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.person.lastName')" for="person-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="person-lastName"
                            :class="{'valid': !$v.person.lastName.$invalid, 'invalid': $v.person.lastName.$invalid }" v-model="$v.person.lastName.$model"  required/>
                        <div v-if="$v.person.lastName.$anyDirty && $v.person.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.person.lastName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.person.email')" for="person-email">Email</label>
                        <input type="text" class="form-control" name="email" id="person-email"
                            :class="{'valid': !$v.person.email.$invalid, 'invalid': $v.person.email.$invalid }" v-model="$v.person.email.$model"  required/>
                        <div v-if="$v.person.email.$anyDirty && $v.person.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.person.email.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.person.phone')" for="person-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="person-phone"
                            :class="{'valid': !$v.person.phone.$invalid, 'invalid': $v.person.phone.$invalid }" v-model="$v.person.phone.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.person.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./person-update.component.ts">
</script>
