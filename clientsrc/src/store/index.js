import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug;
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getBugs({commit, dispatch}) {
      try {
        let res = await api.get('bugs')
        console.log(res.data);
        commit('setBugs', res.data)
        
      } catch (error) {
        console.error(error)
      }
    },

    async getNotesByBugId({commit, dispatch}, bugId) {
      try {
        let res = await api.get('bugs/' + bugId + '/notes')
        console.log("got it", res.data);
        commit('setNotes', res.data)
        
      } catch (error) {
        console.error(error)
      }
    },

    async getActiveBug({commit, dispatch}, bugId) {
      try{
      let res = await api.get('bugs/' + bugId)
      commit('setActiveBug', res.data)
    } catch (error) {
      console.error(error)
    }
    },

    async createBug({commit, dispatch}, newBug) {
      try {
        let res = await api.post('bugs', newBug)
        router.push('bugs/' + res.data.id)        
      } catch (error) {
        console.error(error)
      }
    },

    async editBug({commit, dispatch}, activeBug) {
      try {
        let res = await api.put('bugs/' + activeBug.id, activeBug);
        commit('setActiveBug', res.data)
      } catch (error) {
        console.error(error)
      }
    },
  }
});
