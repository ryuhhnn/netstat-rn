<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{this.name}} ({{this.type}})</div>
      </md-card-header>

      <md-card-content>
        <h3 class="md-subheading">Status: {{this.status}}</h3>
        <div v-if="this.device.children.length > 0">
          <h3 class="md-subheading">Children:</h3>
          <md-list>
            <md-list-item v-for="child in this.device.children" :key="child.properties.id">
              <span class="md-list-item-text">{{child.properties.name}} ({{child.properties.type}})</span>
            </md-list-item>
          </md-list>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-accent" @click="toggleStatus('offline')">Power Off</md-button>
        <md-button @click="toggleStatus('online')">Power On</md-button>
      </md-card-actions>
    </md-card>
    <md-snackbar
      md-position="center"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{this.snackbarMessage}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "edit",
  data: () => ({
    name: "",
    type: "",
    status: "",
    children: [],
    showSnackbar: false,
    snackbarMessage: ""
  }),
  computed: {
    ...mapState(["device"])
  },
  methods: {
    ...mapActions(["fetchDevice", "toggleDeviceStatus"]),
    toggleStatus(status) {
      if (status === this.status) {
        // toggle the snackbar
        this.snackbarMessage = `Device is already ${status}!`;
        this.showSnackbar = true;
      } else {
        this.toggleDeviceStatus({ id: this.$route.params.id, status });
        this.snackbarMessage = `${this.name} is now ${status}`;
        this.showSnackbar = true;
        // this is hax, plus if there's a network error this will become out of sync
        this.status = status;
      }
    }
  },
  async created() {
    await this.fetchDevice(this.$route.params.id);
    this.name = this.device.node.properties.name;
    this.type = this.device.node.properties.type;
    this.status = this.device.node.properties.status;
  }
};
</script>

<style>
</style>