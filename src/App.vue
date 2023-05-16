<template>
  <v-app>
    <app-loading-mask></app-loading-mask>

    <template v-if="$store.state.auth.session">
      <app-drawer></app-drawer>
      <app-bar></app-bar>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </template>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AppBar from "@/components/base/AppBar";
import AppDrawer from "@/components/base/AppDrawer";
import AppLoadingMask from "@/components/base/AppLoadingMask";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AppBar,
    AppDrawer,
    AppLoadingMask,
  },

  data: () => ({}),

  async created() {
    this.getLocalTheme();
    this.$vuetify.theme.dark = this.getThemeColor;

    // await this.$store.dispatch("auth/getSession"); //аутентификация
    // this.$store.dispatch("auth/getUser"); //получение текущего пользователя (AD login)
  },
  computed: {
    ...mapGetters("theme", ["getThemeColor"]),
  },
  watch: {
    getThemeColor(themeColor) {
      this.$vuetify.theme.dark = themeColor;
    },
  },
  methods: {
    ...mapActions("theme", ["getLocalTheme"]),
  },
};
</script>
