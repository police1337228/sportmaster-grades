<template>
  <v-data-table
    :headers="headers"
    :items="getStudents"
    :items-per-page="15"
    item-key="code"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar dense>
        <v-toolbar-title>Таблица учеников</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="primary text-lg-button mr-2"
          @click="openStudentDialog"
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

    <template v-slot:[`item.firstName`]="editFirstName">
      <v-edit-dialog
        :return-value.sync="editFirstName.item.name"
        @save="save(editFirstName)"
        @open="open(editFirstName.item.firstName)"
      >
        {{ editFirstName.item.firstName }}

        <template v-slot:input>
          <v-text-field
            ref="firstName"
            v-model="editFirstName.item.firstName"
            :rules="[rules.name]"
            label="Имя ученика"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:[`item.lastName`]="editLastName">
      <v-edit-dialog
        :return-value.sync="editLastName.item.name"
        @save="save(editLastName)"
        @open="open(editLastName.item.lastName)"
      >
        {{ editLastName.item.lastName }}

        <template v-slot:input>
          <v-text-field
            ref="lastName"
            v-model="editLastName.item.lastName"
            :rules="[rules.name]"
            label="Фамилия ученика"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:[`item.secondName`]="editSecondName">
      <v-edit-dialog
        :return-value.sync="editSecondName.item.name"
        @save="save(editSecondName)"
        @open="open(editSecondName.item.secondName)"
      >
        {{ editSecondName.item.secondName }}

        <template v-slot:input>
          <v-text-field
            ref="secondName"
            v-model="editSecondName.item.secondName"
            :rules="[rules.name]"
            label="Отчество ученика"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:[`item.actions`]="item">
      <v-btn @click.prevent="deleteItem(item.item)" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      >
      <v-btn :to="'/students/' + item.item.code" icon
        ><v-icon>mdi-open-in-new</v-icon></v-btn
      >
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "StdGrid",

  data() {
    return {
      headers: [
        { text: "Код", value: "code" },
        { text: "Имя", value: "firstName" },
        { text: "Фамилия", value: "lastName" },
        { text: "Отчество", value: "secondName" },
        { text: "Дата последнего изменения", value: "formatDateTime" },
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
    ...mapMutations("student", ["openStudentDialog"]),
    ...mapActions("student", {
      loadStudents: "getStudents",
      deleteStudent: "deleteStudent",
      putStudent: "putStudent",
    }),

    async initData() {
      await this.loadStudents();
    },

    open(value) {
      this.currentNameValue = value;
    },

    async save(edit) {
      if (this.$refs.firstName) if (!this.$refs.firstName.valid) return;
      if (this.$refs.lastName) if (!this.$refs.lastName.valid) return;
      if (this.$refs.secondName) if (!this.$refs.secondName.valid) return;

      try {
        await this.putStudent(edit.item);
      } catch (error) {
        console.error(error);
      }
    },

    deleteItem(student) {
      this.deleteStudent(student);
    },
  },

  computed: {
    ...mapGetters("student", ["getStudents"]),
  },

  async created() {
    this.initData();
  },
};
</script>
