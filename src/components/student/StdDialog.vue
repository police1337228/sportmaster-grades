<template>
  <v-row justify="center">
    <v-dialog v-model="newStudentDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Новый ученик</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newStudent.firstName"
                  :error="!!!newStudent.firstName"
                  label="Имя ученика"
                  prepend-icon="mdi-human"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newStudent.lastName"
                  :error="!!!newStudent.lastName"
                  label="Фамилия ученика"
                  prepend-icon="mdi-account-group"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="newStudent.secondName"
                  :error="!!!newStudent.secondName"
                  label="Отчество ученика"
                  prepend-icon="mdi-human-male-boy"
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

          <v-btn color="blue darken-1" text @click="saveNewStudent">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Student from "@/model/Student";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "StdDialog",

  data() {
    return {
      newStudent: new Student(null, null, null, null, null, null),
    };
  },
  mounted() {},
  methods: {
    ...mapMutations("student", ["closeStudentDialog"]),
    ...mapActions("student", ["postStudent"]),

    init() {
      this.newStudent.firstName = null;
      this.newStudent.lastName = null;
      this.newStudent.secondName = null;

      this.closeStudentDialog();
    },

    close() {
      this.init();
    },

    async saveNewStudent() {
      if (
        this.newStudent.firstName &&
        this.newStudent.lastName &&
        this.newStudent.secondName
      ) {
        await this.postStudent(this.newStudent);
        this.init();
      }
    },
  },
  computed: {
    ...mapState("student", ["newStudentDialog"]),
  },
  watch: {},
};
</script>
