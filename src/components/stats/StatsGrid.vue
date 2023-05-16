<template>
  <v-row>
    <v-col cols="12">
      <stats-students-chart
        v-if="grades.length > 0"
        :grades="grades"
      ></stats-students-chart>
    </v-col>
  </v-row>
</template>

<script>
import StatsStudentsChart from "@/components/stats/stats-charts/StatsStudentsChart.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "StatsGrid",
  data() {
    return {
      grades: [],
    };
  },
  components: {
    StatsStudentsChart,
  },
  methods: {
    ...mapActions("course", {
      loadCourses: "getCourses",
    }),
    ...mapActions("grade", ["getGrades"]),
    ...mapActions("student", {
      loadStudents: "getStudents",
    }),

    async initData() {
      await this.loadCourses();
      await this.loadStudents();
      await this.getGrades();

      this.gradesToChart(this.actualGrades);
    },

    gradesToChart(grades) {
      const result = {};
      grades.forEach((grade) => {
        if (grade.isDelete) return;

        if (!result[grade.grade])
          result[grade.grade] = {
            name: grade.grade,
            y: 0,
            students: [],
          };

        result[grade.grade].y++;
        result[grade.grade].students.push(grade.student.fullName);
      });
      this.grades = Object.values(result);
    },
  },

  computed: {
    ...mapGetters("grade", ["actualGrades"]),
  },
  async created() {
    await this.initData();
  },
};
</script>
