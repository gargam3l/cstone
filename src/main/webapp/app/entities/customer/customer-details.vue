<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="customer">
                <h2 class="jh-entity-heading"><span v-text="$t('cstoneApp.customer.detail.title')">Customer</span> {{customer.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('cstoneApp.customer.company')">Company</span>
                    </dt>
                    <dd>
                        <span>{{customer.company}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.customer.address')">Address</span>
                    </dt>
                    <dd>
                        <span>{{customer.address}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('cstoneApp.customer.personId')">Person Id</span>
                    </dt>
                    <dd>
                        <div v-if="customer.personId">
                            <router-link :to="{name: 'PersonView', params: {personId: customer.personId.id}}">{{customer.personId.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="customer.id" :to="{name: 'CustomerEdit', params: {customerId: customer.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./customer-details.component.ts">
</script>
