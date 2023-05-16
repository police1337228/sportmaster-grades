<template>
  <div>
    <std-grid></std-grid>
    <std-dialog></std-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import StdGrid from "@/components/student/StdGrid";
import StdDialog from "@/components/student/StdDialog.vue";

export default {
  name: "Students",

  components: {
    StdGrid,
    StdDialog,
  },
};
</script>
