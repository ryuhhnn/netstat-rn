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
        <md-button class="md-accent">Power Off</md-button>
        <md-button>Power On</md-button>
      </md-card-actions>
    </md-card>
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
    children: []
  }),
  computed: {
    ...mapState(["device"])
  },
  methods: {
    ...mapActions(["fetchDevice"])
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