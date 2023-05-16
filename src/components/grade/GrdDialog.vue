<template>
  <v-row justify="center">
    <v-dialog v-model="newGradeDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Новый грейд</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  :items="courses"
                  item-text="name"
                  item-value="code"
                  v-model="courseCode"
                  :error="!!!courseCode"
                  label="Курс*"
                  required
                  ref="courses"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-autocomplete
                  :items="getStudentsOnCourse(courseCode)"
                  item-text="fullName"
                  item-value="code"
                  v-model="studentCode"
                  :error="!!!studentCode"
                  label="Студент*"
                  required
                  ref="students"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newGrade.grade"
                  :rules="[rules.grade]"
                  :error="!!!newGrade.grade"
                  label="Грейд"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Закрыть
          </v-btn>

          <v-btn color="blue darken-1" text @click="saveNewGrade">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Grade from "@/model/Grade";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "GrdDialog",

  data() {
    return {
      courseCode: null,
      studentCode: null,
      newGrade: new Grade(null, null, null, null, null, 0),
      rules: {
        grade: (val) =>
          (val && !isNaN(val) && val >= 0 && val <= 25) || "число от 0 до 25",
      },
    };
  },

  methods: {
    ...mapMutations("grade", ["closeGradeDialog", "openGradeDialog"]),
    ...mapActions("grade", ["postGrade"]),
    init() {
      this.newGrade.course = null;
      this.newGrade.student = null;
      this.newGrade.grade = null;
      this.courseCode = null;
      this.studentCode = null;

      this.closeGradeDialog();
    },

    close() {
      this.init();
    },

    saveNewGrade() {
      const course = this.getCourseByCode(this.courseCode);
      const studentItem = this.getStudentByCode(this.studentCode);
      if (
        course &&
        studentItem &&
        this.rules.grade(this.newGrade.grade) === true
      ) {
        this.newGrade.course = course;
        this.newGrade.student = studentItem;
        this.newGrade.grade = Number(this.newGrade.grade);

        this.postGrade(this.newGrade);
        this.init();
      }
    },
  },
  computed: {
    ...mapState("grade", ["newGradeDialog"]),
    ...mapState("course", ["courses"]),
    ...mapGetters("student", ["getStudentsOnCourse"]),
    ...mapGetters("course", ["getCourseByCode"]),
    ...mapGetters("student", ["getStudentByCode"]),
  },

  watch: {},
};
</script>
