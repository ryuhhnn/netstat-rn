<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Type</md-table-head>
        <md-table-head>Device ID</md-table-head>
      </md-table-row>

      <md-table-row v-for="device in this.devices" :key="device.id">
        <md-table-cell>{{device.name}}</md-table-cell>
        <md-table-cell>{{device.type}}</md-table-cell>
        <md-table-cell>{{device.id}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DeviceTable",
  computed: mapState(["devices"])
};
</script>

<style lang="scss" scoped>
</style>
