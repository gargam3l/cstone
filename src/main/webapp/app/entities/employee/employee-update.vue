<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="cstoneApp.employee.home.createOrEditLabel" v-text="$t('cstoneApp.employee.home.createOrEditLabel')">Create or edit a Employee</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.employee.username')" for="employee-username">Username</label>
                        <input type="text" class="form-control" name="username" id="employee-username"
                            :class="{'valid': !$v.employee.username.$invalid, 'invalid': $v.employee.username.$invalid }" v-model="$v.employee.username.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.employee.passwordHash')" for="employee-passwordHash">Password Hash</label>
                        <input type="text" class="form-control" name="passwordHash" id="employee-passwordHash"
                            :class="{'valid': !$v.employee.passwordHash.$invalid, 'invalid': $v.employee.passwordHash.$invalid }" v-model="$v.employee.passwordHash.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.employee.role')" for="employee-role">Role</label>
                        <select class="form-control" name="role" :class="{'valid': !$v.employee.role.$invalid, 'invalid': $v.employee.role.$invalid }" v-model="$v.employee.role.$model" id="employee-role" >
                            <option value="USER" v-bind:label="$t('cstoneApp.Role.USER')">USER</option>
                            <option value="ADMIN" v-bind:label="$t('cstoneApp.Role.ADMIN')">ADMIN</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('cstoneApp.employee.personId')" for="employee-personId">Person Id</label>
                        <select class="form-control" id="employee-personId" name="personId" v-model="employee.personId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="employee.personId && personOption.id === employee.personId.id ? employee.personId : personOption" v-for="personOption in personIds" :key="personOption.id">{{personOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('cstoneApp.employee.group')" for="employee-group">Group</label>
                        <select class="form-control" id="employee-group" multiple name="group" v-model="employee.groups">
                            <option v-bind:value="getSelected(employee.groups, groupOption)" v-for="groupOption in groups" :key="groupOption.id">{{groupOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.employee.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
