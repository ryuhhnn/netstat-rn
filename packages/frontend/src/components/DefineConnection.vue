<template>
  <div>
    <form novalidate class="md-layout">
      <md-field>
        <label>Node:</label>
        <md-select v-model="parentNode">
          <md-option v-for="device in devices" :key="device.id" :value="device.id">{{device.name}}</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Connects To:</label>
        <md-select v-model="childNode">
          <md-option v-for="device in devices" :key="device.id" :value="device.id">{{device.name}}</md-option>
        </md-select>
      </md-field>
    </form>

    <md-button class="md-raised md-primary" @click="createConnection">Create</md-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DeviceTable",
  data: () => ({
    parentNode: "",
    childNode: ""
  }),
  computed: {
    ...mapState(["devices"])
  },
  methods: {
    ...mapActions(["addConnection"]),
    createConnection() {
      this.addConnection({
        parentId: this.parentNode,
        childId: this.childNode
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
