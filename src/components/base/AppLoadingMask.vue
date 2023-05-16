<template>
  <v-dialog v-model="isLoading" persistent overlay-opacity="0.15" width="20%">
    <v-progress-linear indeterminate color="light-blue"></v-progress-linear>
    <v-btn @click.prevent="cancelLoading">Отменить</v-btn>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AppLoadingMask",
  methods: {
    ...mapActions(["cancelLoading"]),
  },
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>
