<template>
  <v-data-table
    :headers="headers"
    :items="getCourses"
    :items-per-page="15"
    item-key="code"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar dense>
        <v-toolbar-title>Таблица курсов</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="primary text-lg-button mr-2"
          @click="openCourseDialog"
          x-small
          fab
        >
          <v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn class="primary text-lg-button" @click="initData" x-small fab>
          <v-icon>mdi-reload</v-icon></v-btn
        >
      </v-toolbar>
    </template>

    <template v-slot:[`item.name`]="editName">
      <v-edit-dialog
        :return-value.sync="editName.item.name"
        @save="save(editName)"
        @open="open(editName.item.name)"
      >
        {{ editName.item.name }}

        <template v-slot:input>
          <v-text-field
            ref="courseName"
            v-model="editName.item.name"
            :rules="[rules.name]"
            label="Название курса"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:[`item.actions`]="item">
      <v-btn @click.prevent="deleteItem(item.item)" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      >
      <v-btn :to="'/courses/' + item.item.code" icon
        ><v-icon>mdi-open-in-new</v-icon></v-btn
      >
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "CourseGrid",

  data() {
    return {
      headers: [
        { text: "Код", value: "code" },
        { text: "Курс", value: "name" },
        { text: "Дата начала", value: "formatDateStart" },
        { text: "Дата окончания", value: "formatDateEnd" },
        {
          text: "Действия",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      rules: {
        name: (val) =>
          (val && val.length >= 0 && val.length <= 40) || "строка от 0 до 40",
      },
      currentNameValue: null,
    };
  },

  methods: {
    ...mapMutations("course", ["openCourseDialog"]),
    ...mapActions("course", {
      loadCourses: "getCourses",
      deleteCourse: "deleteCourse",
      putCourse: "putCourse",
    }),

    async initData() {
      await this.loadCourses();
    },

    open(value) {
      this.currentNameValue = value;
    },

    async save(edit) {
      if (!this.$refs.courseName.valid) return;
      let isError = 1;

      try {
        isError = (await this.putCourse(edit.item)).resultCode;
      } catch (error) {
        console.error(error);
      } finally {
        edit.item.name = isError ? this.currentNameValue : edit.item.name;
      }
    },

    deleteItem(course) {
      this.deleteCourse(course);
    },
  },

  computed: {
    ...mapGetters("course", ["getCourses"]),
    ...mapState(["isLoading"]),
  },

  async created() {
    this.initData();
  },
};
</script>
