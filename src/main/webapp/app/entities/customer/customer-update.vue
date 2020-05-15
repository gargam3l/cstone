<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="cstoneApp.customer.home.createOrEditLabel" v-text="$t('cstoneApp.customer.home.createOrEditLabel')">Create or edit a Customer</h2>
                <div>
                    <div class="form-group" v-if="customer.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="customer.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.customer.company')" for="customer-company">Company</label>
                        <input type="text" class="form-control" name="company" id="customer-company"
                            :class="{'valid': !$v.customer.company.$invalid, 'invalid': $v.customer.company.$invalid }" v-model="$v.customer.company.$model"  required/>
                        <div v-if="$v.customer.company.$anyDirty && $v.customer.company.$invalid">
                            <small class="form-text text-danger" v-if="!$v.customer.company.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.customer.address')" for="customer-address">Address</label>
                        <input type="text" class="form-control" name="address" id="customer-address"
                            :class="{'valid': !$v.customer.address.$invalid, 'invalid': $v.customer.address.$invalid }" v-model="$v.customer.address.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.customer.personId')" for="customer-personId">Person Id</label>
                        <select class="form-control" id="customer-personId" name="personId" v-model="customer.personId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="customer.personId && personOption.id === customer.personId.id ? customer.personId : personOption" v-for="personOption in personIds" :key="personOption.id">{{personOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.customer.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./customer-update.component.ts">
</script>
