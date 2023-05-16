<template>
  <div>
    <course-grid></course-grid>
    <course-dialog></course-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseGrid from "@/components/course/CourseGrid.vue";
import CourseDialog from "@/components/course/CourseDialog.vue";

export default {
  name: "Courses",

  components: {
    CourseGrid,
    CourseDialog,
  },
};
</script>
