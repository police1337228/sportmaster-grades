<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="setTheme(!theme)">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "AppBar",

  data() {
    return {
      title: "КубГУ",
    };
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    ...mapActions("theme", ["setTheme"]),
  },
  computed: {
    ...mapState("theme", ["theme"]),
  },
};
</script>
