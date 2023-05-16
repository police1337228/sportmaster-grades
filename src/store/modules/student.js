import api from "@/store/api";
import Student from "../../model/Student";

export default {
  namespaced: true,

  state: {
    students: [],
    newStudentDialog: false,
  },

  mutations: {
    setStudents(state, students) {
      state.students = students.map((student) => {
        return new Student(
          student.code,
          student.fullName,
          student.firstName,
          student.secondName,
          student.lastName,
          student.datetime
        );
      });
    },
    postStudent(state, student) {
      state.students.push(
        new Student(
          student.code,
          student.fullName,
          student.firstName,
          student.secondName,
          student.lastName,
          Number(student.datetime)
        )
      );
    },
    deleteStudent(state, student) {
      const index = state.students.indexOf(student);
      state.students.splice(index, 1);
    },
    openStudentDialog(state) {
      state.newStudentDialog = true;
    },
    closeStudentDialog(state) {
      state.newStudentDialog = false;
    },
  },
  actions: {
    async getStudent(context, code) {
      context.commit("setStudents", await api.getStudent(code));
    },
    async getStudents(context) {
      context.commit("setStudents", await api.student());
    },
    async postStudent(context, student) {
      context.commit("postStudent", await api.postStudent(student));
    },
    async deleteStudent(context, student) {
      if (!(await api.deleteStudent(student.code)).resultCode) {
        context.commit("deleteStudent", student);
      }
    },
    async putStudent(context, student) {
      return await api.putStudent(student.code, student);
    },
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
    getStudentByCode: (state) => (code) => {
      return state.students.find((student) => student.code === Number(code));
    },
    getStudentsOnCourse: (state) => (id) => {
      return state.students.filter((student) => student.isOnCourse(Number(id)));
    },
    getStudentsNotOnCourse: (state) => (id) => {
      return state.students.filter(
        (student) => !student.isOnCourse(Number(id))
      );
    },
  },
};
