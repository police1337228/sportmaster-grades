<template>
  <v-data-table
    :headers="headers"
    :items="actualGrades"
    :items-per-page="15"
    item-key="code"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar dense>
        <v-toolbar-title>Таблица грейдов</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="primary text-lg-button mr-2"
          @click="openGradeDialog"
          x-small
          fab
        >
          <v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn class="primary text-lg-button" @click="reInitData" x-small fab>
          <v-icon>mdi-reload</v-icon></v-btn
        >
      </v-toolbar>
    </template>

    <template v-slot:[`item.grade`]="editGrade">
      <v-edit-dialog
        :return-value.sync="editGrade.item.grade"
        @save="save(editGrade)"
        @open="open(editGrade.item.grade)"
      >
        {{ editGrade.item.grade }}

        <template v-slot:input>
          <v-text-field
            v-model="editGrade.item.grade"
            ref="grade"
            :rules="[rules.grade]"
            label="Грейд"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:[`item.actions`]="item">
      <v-icon @click="deleteItem(item.item)">mdi-delete</v-icon>
    </template>

    <template v-slot:no-data v-if="!isLoading">
      <v-btn small color="primary" @click="reInitData">
        Восстановить данные
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "GrdGrid",
  data() {
    return {
      headers: [
        { text: "Код", value: "code" },
        { text: "Курс", value: "course.name" },
        { text: "ФИО", value: "student.fullName" },
        { text: "Грейд", value: "grade" },
        { text: "Дата", value: "formatGradeDate", align: "center" },
        { text: "Удалить", value: "actions", align: "center", sortable: false },
      ],

      rules: {
        grade: (val) =>
          (val && !isNaN(val) && val >= 0 && val <= 25) || "число от 0 до 25",
      },

      currentGradeValue: null,
    };
  },

  methods: {
    ...mapActions("course", ["getCourses", "getCoursesStudents"]),
    ...mapActions("student", ["getStudents"]),
    ...mapActions("grade", [
      "getGrades",
      "deleteGrade",
      "initData",
      "putGrade",
    ]),
    ...mapMutations("grade", ["openGradeDialog"]),
    ...mapMutations(["setIsLoading"]),

    open(value) {
      this.currentGradeValue = value;
    },

    async save(edit) {
      if (!this.$refs.grade.valid) return;
      let isError = 1;

      try {
        edit.item.grade = Number(edit.item.grade);
        isError = (await this.putGrade(edit.item)).resultCode;
      } catch (error) {
        console.error(error);
      } finally {
        edit.item.grade = isError
          ? this.currentGradeValue
          : Number(edit.item.grade);
      }
    },

    deleteItem(grade) {
      this.deleteGrade(grade);
    },

    async initData() {
      await this.getCourses();
      await this.getStudents();
      await this.getGrades();
      await this.getCoursesStudents();
    },

    reInitData() {
      this.initData();
    },
  },

  computed: {
    ...mapGetters("grade", ["actualGrades"]),
    ...mapState(["isLoading"]),
  },

  async mounted() {
    await this.initData();
  },
};
</script>
