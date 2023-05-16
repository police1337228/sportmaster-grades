import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import student from "@/store/modules/student";
import grade from "@/store/modules/grade";
import course from "@/store/modules/course";
import theme from "@/store/modules/theme";
import api from "@/store/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    isLoading: false,
  },

  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    setIsLoading(state, flag) {
      state.isLoading = flag;
    },
  },

  actions: {
    cancelLoading() {
      api.cancelLoading();
    },
  },

  modules: {
    auth,
    student,
    grade,
    course,
    theme,
  },
});
