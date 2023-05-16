<template>
  <v-row justify="center">
    <v-dialog v-model="newCourseDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Новый ученик на курс</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  :items="newStudents($route.params.id)"
                  item-text="fullName"
                  item-value="code"
                  v-model="studentCode"
                  :error="!!!studentCode"
                  label="Студент*"
                  required
                  prepend-icon="mdi-human"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-menu
                  ref="dateStartMenu"
                  v-model="dateStartMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newCourseStudent.dateStart"
                      :error="!!!newCourseStudent.dateStart"
                      label="Дата начала*"
                      persistent-hint
                      prepend-icon="mdi-calendar-start"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newCourseStudent.dateStart"
                    scrollable
                    no-title
                    @input="dateStartMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12">
                <v-menu
                  ref="dateEndMenu"
                  v-model="dateEndMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newCourseStudent.dateEnd"
                      label="Дата конца"
                      persistent-hint
                      readonly
                      prepend-icon="mdi-calendar-end"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newCourseStudent.dateEnd"
                    scrollable
                    no-title
                    @input="dateEndMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Закрыть
          </v-btn>

          <v-btn color="blue darken-1" text @click="saveNewCourseStudent">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import StudentCourse from "@/model/StudentCourse";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CourseItemDialog",

  data() {
    return {
      dateStartMenu: false,
      dateEndMenu: false,
      courseCode: Number(this.$route.params.id),
      studentCode: null,
      newCourseStudent: new StudentCourse(
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ),
    };
  },
  mounted() {},
  methods: {
    ...mapActions("course", ["postCourseStudent"]),
    ...mapMutations("course", ["closeCourseDialog"]),
    ...mapGetters("student", ["getStudentsNotOnCourse"]),

    init() {
      this.newCourseStudent.student = null;
      this.newCourseStudent.dateStart = null;
      this.newCourseStudent.dateEnd = null;

      this.closeCourseDialog();
    },

    close() {
      this.init();
    },

    async saveNewCourseStudent() {
      const course = this.getCourseByCode(this.courseCode);
      const studentItem = this.getStudentByCode(this.studentCode);
      if (course && studentItem && this.newCourseStudent.dateStart) {
        this.newCourseStudent.course = course;
        this.newCourseStudent.student = studentItem;
        await this.postCourseStudent(this.newCourseStudent);
        this.init();
      }
    },
  },
  computed: {
    ...mapGetters("course", ["getCourseByCode"]),
    ...mapGetters("student", ["getStudentByCode"]),
    ...mapState("course", ["newCourseDialog"]),

    newStudents(id) {
      return this.getStudentsNotOnCourse(id);
    },
  },
  watch: {},
};
</script>
