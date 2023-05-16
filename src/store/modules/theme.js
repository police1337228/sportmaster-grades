export default {
  namespaced: true,

  state: {
    theme: false, // light - false, dark - true
  },

  mutations: {
    setTheme(state, isDarkTheme) {
      state.theme = isDarkTheme;
    },
  },

  actions: {
    setTheme(context, isDarkTheme) {
      localStorage.setItem("theme", isDarkTheme);
      context.commit("setTheme", isDarkTheme);
    },
    getLocalTheme(context) {
      const localTheme = localStorage.getItem("theme") === "true";
      context.commit("setTheme", localTheme);
    },
  },
  getters: {
    getThemeColor(store) {
      if (store.theme === true) {
        return "dark";
      }
      return "";
    },
  },
};
