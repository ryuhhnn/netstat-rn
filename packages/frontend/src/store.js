import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "*/*"
  }
});

const initialState = {
  devices: []
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    deviceAdd(state, device) {
      Array.isArray(device)
        ? state.devices.push(...device)
        : state.devices.push(device);
    },
    connectionAdd(state, payload) {
      console.log(state, payload);
    }
  },
  actions: {
    async fetchDevices({ commit }) {
      let devices;
      try {
        devices = await api.get("/device/list");
        commit("deviceAdd", devices.data);
      } catch (e) {
        console.error(e);
      }
    },
    async addDevice({ commit }, payload) {
      let response;
      try {
        response = await api.post("/device/add", payload);
        commit("deviceAdd", response.data);
      } catch (e) {
        console.error(e);
      }
    },
    async addConnection({ commit }, payload) {
      let response;
      try {
        response = await api.post("/device/connect", payload);
        commit("connectionAdd", response.data);
      } catch (e) {
        console.error(e);
      }
    }
  }
});
