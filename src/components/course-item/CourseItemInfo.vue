<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="[getCourseByCode(Number($route.params.id))]"
        hide-default-footer
        item-key="code"
        class="elevation-3 mb-5"
      >
        <template v-slot:top>
          <v-toolbar dense>
            <v-toolbar-title>Курс №{{ $route.params.id }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="primary text-lg-button" @click="initData" x-small fab>
              <v-icon>mdi-reload</v-icon></v-btn
            >
          </v-toolbar>
        </template>
      </v-data-table>
      <v-data-table
        :headers="studentHeaders"
        :items="getStudentsByCourseId(Number($route.params.id))"
        :items-per-page="15"
        item-key="code"
        class="elevation-3"
      >
        <template v-slot:top>
          <v-toolbar dense>
            <v-toolbar-title
              >Таблица учеников курса №{{ $route.params.id }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              @click.prevent="openCourseDialog"
              class="primary text-lg-button mr-2"
              x-small
              fab
            >
              <v-icon>mdi-plus</v-icon></v-btn
            >
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="item">
          <v-btn @click.prevent="deleteItem(item.item)" icon
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn :to="'/students/' + item.item.student.code" icon
            ><v-icon>mdi-open-in-new</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="6">
      <course-grades-chart
        v-if="actualGrades.length > 0 && chartGrades.length > 0"
        :grades="chartGrades"
      ></course-grades-chart>
    </v-col>
    <v-col cols="6">
      <course-time-chart
        v-if="actualGrades.length > 0 && chartStudentCount > 0"
        :studentCount="chartStudentCount"
      ></course-time-chart>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CourseGradesChart from "./course-item-charts/CourseGradesChart";
import CourseTimeChart from "./course-item-charts/CourseTimeChart.vue";
export default {
  name: "CourseItemInfo",
  components: { CourseTimeChart, CourseGradesChart },
  data() {
    return {
      chartGrades: [],
      chartStudentCount: 0,
      headers: [
        { text: "Код", value: "code" },
        { text: "Курс", value: "name" },
        { text: "Дата начала", value: "formatDateStart" },
        { text: "Дата окончания", value: "formatDateEnd" },
      ],
      studentHeaders: [
        { text: "Код", value: "student.code" },
        { text: "ФИО", value: "student.fullName" },
        { text: "Дата начала", value: "formatDateStart" },
        { text: "Дата окончания", value: "formatDateEnd" },
        { text: "Дата последнего изменения", value: "formatDatetime" },
        {
          text: "Действия",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    ...mapMutations("course", ["openCourseDialog"]),
    ...mapActions("course", {
      loadCourses: "getCourses",
      loadCourseStudents: "getCourseStudents",
      deleteCourseStudent: "deleteCourseStudent",
    }),
    ...mapActions("grade", ["getGrades"]),
    ...mapActions("student", {
      loadStudents: "getStudents",
    }),
    async initData() {
      await this.loadCourses();
      await this.loadStudents();
      await this.loadCourseStudents(this.$route.params.id);
      await this.getGrades();

      this.studentsGradesToChart(
        this.getStudentsByCourseId(Number(this.$route.params.id))
      );

      this.studentCountToChart(
        this.getStudentsByCourseId(Number(this.$route.params.id))
      );
    },

    open(value) {
      this.currentNameValue = value;
    },

    deleteItem(courseStudent) {
      this.deleteCourseStudent(courseStudent);
    },

    studentsGradesToChart(students) {
      const result = [];
      students.map(async (student) => {
        const studentCourseGrades = await this.getStudentGradesByCourse(
          student.student.code,
          this.$route.params.id
        );
        const sumOfGrades = studentCourseGrades.reduce(
          (sum, grade) => sum + grade.grade,
          0
        );
        result.push([
          student.student.fullName.substr(
            0,
            student.student.fullName.lastIndexOf(" ")
          ),
          sumOfGrades,
        ]);
      });

      this.chartGrades = result;
    },

    studentCountToChart(students) {
      this.chartStudentCount = students.length;
    },
  },

  computed: {
    ...mapGetters("course", ["getCourseByCode"]),
    ...mapState(["isLoading"]),
    ...mapGetters("course", ["getStudentsByCourseId"]),
    ...mapGetters("grade", ["getStudentGradesByCourse"]),
    ...mapGetters("grade", ["actualGrades"]),
  },

  async created() {
    await this.initData();
  },

  watch: {
    "$route.params.id"() {
      this.initData();
    },
  },
};
</script>
