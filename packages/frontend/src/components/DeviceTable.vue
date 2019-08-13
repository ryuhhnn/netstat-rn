<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Type</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>Device ID</md-table-head>
        <md-table-head>Edit</md-table-head>
      </md-table-row>

      <md-table-row v-for="device in this.devices" :key="device.properties.id">
        <md-table-cell>{{device.properties.name}}</md-table-cell>
        <md-table-cell>{{device.properties.type}}</md-table-cell>
        <md-table-cell>
          <md-icon v-if="device.properties.status === 'online'">signal_cellular_4_bar</md-icon>
          <md-icon v-if="device.properties.status === 'offline'">signal_cellular_null</md-icon>
          {{device.properties.status}}
        </md-table-cell>
        <md-table-cell>{{device.properties.id}}</md-table-cell>
        <md-table-cell>
          <md-button :to="'/edit/' + device.properties.id">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
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
