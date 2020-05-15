<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.employee.detail.title')">Employee</span> {{employee.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.employee.username')">Username</span>
                    </dt>
                    <dd>
                        <span>{{employee.username}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.employee.passwordHash')">Password Hash</span>
                    </dt>
                    <dd>
                        <span>{{employee.passwordHash}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.employee.role')">Role</span>
                    </dt>
                    <dd>
                        <span v-text="$t('cstoneApp.Role.' + employee.role)">{{employee.role}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.employee.personId')">Person Id</span>
                    </dt>
                    <dd>
                        <div v-if="employee.personId">
                            <router-link :to="{name: 'PersonView', params: {personId: employee.personId.id}}">{{employee.personId.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.employee.group')">Group</span>
                    </dt>
                    <dd>
                        <span v-for="(group, i) in employee.groups" :key="group.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'GroupView', params: {groupId: group.id}}">{{group.id}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="employee.id" :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
