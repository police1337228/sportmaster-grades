<template>
  <v-row justify="center">
    <v-dialog v-model="newCourseDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Новый курс</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newCourse.name"
                  label="Название курса"
                  prepend-icon="mdi-alphabetical"
                  :error="!!!newCourse.name"
                ></v-text-field>
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
                      v-model="newCourse.dateStart"
                      :error="!!!newCourse.dateStart"
                      label="Дата начала"
                      persistent-hint
                      prepend-icon="mdi-calendar-start"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newCourse.dateStart"
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
                      v-model="newCourse.dateEnd"
                      :error="!!!newCourse.dateEnd"
                      label="Дата конца"
                      persistent-hint
                      readonly
                      prepend-icon="mdi-calendar-end"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newCourse.dateEnd"
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

          <v-btn color="blue darken-1" text @click="saveNewCourse">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Course from "@/model/Course";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "CourseDialog",

  data() {
    return {
      dateStartMenu: false,
      dateEndMenu: false,
      newCourse: new Course(null, null, null, null),
    };
  },
  mounted() {},
  methods: {
    ...mapMutations("course", ["closeCourseDialog"]),
    ...mapActions("course", ["postCourse"]),

    init() {
      this.newCourse.name = null;
      this.newCourse.dateStart = null;
      this.newCourse.dateEnd = null;

      this.closeCourseDialog();
    },

    close() {
      this.init();
    },

    async saveNewCourse() {
      if (
        this.newCourse.name &&
        this.newCourse.dateStart &&
        this.newCourse.dateEnd
      ) {
        await this.postCourse(this.newCourse);
        this.init();
      }
    },
  },
  computed: {
    ...mapState("course", ["newCourseDialog"]),
  },
  watch: {},
};
</script>
