<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="[...getStudentByCode(this.$route.params.id)]"
        :items-per-page="15"
        item-key="code"
        class="elevation-3"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar dense>
            <v-toolbar-title>Ученик №{{ $route.params.id }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="primary text-lg-button" @click="initData" x-small fab>
              <v-icon>mdi-reload</v-icon></v-btn
            >
          </v-toolbar>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="6">
      <std-courses-chart
        v-if="courses.length > 0 && courseDates.length > 0"
        :courses="courseDates"
      ></std-courses-chart>
    </v-col>
    <v-col cols="6">
      <std-grades-chart
        v-if="courses.length > 0 && grades.length > 0"
        :grades="grades"
      ></std-grades-chart>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Formatter from "@/utils/Formatter";
import StdCoursesChart from "./student-item-charts/StdCoursesChart.vue";
import StdGradesChart from "./student-item-charts/StdGradesChart.vue";
export default {
  components: { StdCoursesChart, StdGradesChart },
  name: "StdItemGrid",

  data() {
    return {
      grades: [],
      courseDates: [],
      headers: [
        { text: "Код", value: "code" },
        { text: "Имя", value: "firstName" },
        { text: "Фамилия", value: "lastName" },
        { text: "Отчество", value: "secondName" },
        { text: "Дата последнего изменения", value: "formatDateTime" },
      ],
    };
  },
  methods: {
    ...mapActions("student", ["getStudents"]),
    ...mapActions("grade", ["getGrades"]),
    ...mapActions("course", ["getCourses", "getCoursesStudents"]),
    ...mapMutations(["setIsLoading"]),
    ...mapMutations("student", ["openStudentDialog"]),

    async initData() {
      await this.getStudents();
      await this.getCourses();
      await this.getCoursesStudents();
      await this.getGrades();
      this.gradesToChart(this.getStudentGrades(this.$route.params.id));
      this.coursesToChart(
        this.courses,
        this.getStudentByCode(this.$route.params.id)
      );
    },

    gradesToChart(grades) {
      const result = {};
      grades.forEach((grade) => {
        if (grade.isDelete) return;
        if (!result[grade.course.code])
          result[grade.course.code] = {
            name: grade.course.name,
            data: [],
          };

        result[grade.course.code].data.push([
          Formatter.formatDateToUTC(grade.gradeDate),
          grade.grade,
        ]);
      });
      this.grades = Object.values(result);
    },

    coursesToChart(courses, student) {
      const result = [];
      courses.forEach((course) => {
        if (!student.isOnCourse(course.code)) return;

        result.push({
          type: "area",
          name: course.name,
          data: [
            [Formatter.formatDateToUTC(course.dateStart), 1],
            [Formatter.formatDateToUTC(course.dateEnd), 0],
          ],
        });
      });
      this.courseDates = result;
    },
  },
  computed: {
    ...mapGetters("student", ["getStudentByCode"]),
    ...mapGetters("course", { courses: "getCourses" }),
    ...mapGetters("grade", ["getStudentGrades"]),
  },
  async created() {
    this.initData();
  },

  watch: {
    "$route.params.id"() {
      this.initData();
    },
  },
};
</script>
