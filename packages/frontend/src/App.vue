<template>
  <div id="app" class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Netstat RN</span>
        <div class="md-toolbar-section-end">
          <md-button @click="showDialog = true">Add Device</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer id="nav" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>

        <md-list>
          <md-list-item to="/">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>
          <md-list-item to="/settings">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Settings</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Device</md-dialog-title>

      <md-dialog-content>
        <form novalidate class="md-layout">
          <md-field>
            <label>Device Name</label>
            <md-input v-model="deviceName"></md-input>
          </md-field>
          <md-field>
            <label for="device_type">Device Type</label>
            <md-select v-model="deviceType" name="device_type" id="device_type">
              <md-option value="hub">Hub</md-option>
              <md-option value="switch">Switch</md-option>
              <md-option value="router">Router</md-option>
              <md-option value="modem">Modem</md-option>
              <md-option value="wap">WAP</md-option>
              <md-option value="wired-device">Wired Device</md-option>
            </md-select>
          </md-field>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="saveDevice">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    menuVisible: false,
    showDialog: false,
    deviceName: "",
    deviceType: ""
  }),
  methods: {
    ...mapMutations(["clearStore"]),
    ...mapActions(["addDevice", "fetchDevices"]),
    saveDevice() {
      this.showDialog = false;
      this.addDevice({
        name: this.deviceName,
        type: this.deviceType
      });
      this.deviceName = "";
      this.deviceType = "";
    }
  },
  created() {
    this.fetchDevices();
  }
};
</script>


<style lang="scss" scoped>
#app,
.md-app {
  height: 100vh;
  width: 100vw;
}

.md-dialog {
  max-width: 768px;
}
</style>
