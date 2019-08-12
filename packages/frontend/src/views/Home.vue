<template>
  <div class="home">
    <span class="md-title">Devices</span>
    <DeviceTable />
    <span class="md-title">Define Connection</span>
    <DefineConnection />
  </div>
</template>

<script>
// @ is an alias to /src
import DeviceTable from "@/components/DeviceTable.vue";
import DefineConnection from "@/components/DefineConnection.vue";

export default {
  name: "home",
  components: {
    DeviceTable,
    DefineConnection
  }
};
</script>
