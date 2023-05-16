<template>
  <div>
    <course-item-info></course-item-info>
    <course-item-dialog></course-item-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseItemDialog from "@/components/course-item/CourseItemDialog.vue";
import CourseItemInfo from "@/components/course-item/CourseItemInfo.vue";

export default {
  name: "Courses",
  components: {
    CourseItemInfo,
    CourseItemDialog,
  },
};
</script>
