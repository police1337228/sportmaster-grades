import api from "@/store/api";

import Grade from "../../model/Grade";
import store from "@/store";

export default {
  namespaced: true,

  state: {
    grades: [],
    newGradeDialog: false,
  },

  mutations: {
    openGradeDialog(state) {
      state.newGradeDialog = true;
    },
    closeGradeDialog(state) {
      state.newGradeDialog = false;
    },
    setGrades(state, grades) {
      state.grades = grades.map((grade) => {
        const course = store.state.course.courses.find(
          (c) => c.code === grade.courseCode
        );
        const student = store.state.student.students.find(
          (s) => s.code === grade.studentCode
        );
        return new Grade(
          grade.code,
          course,
          student,
          grade.grade,
          grade.gradeDate,
          grade.isDelete
        );
      });
    },

    postGrade(state, grade) {
      const course = store.state.course.courses.find(
        (c) => c.code === grade.courseCode
      );
      const student = store.state.student.students.find(
        (s) => s.code === grade.studentCode
      );
      state.grades.push(
        new Grade(
          grade.code,
          course,
          student,
          grade.grade,
          grade.gradeDate,
          grade.isDelete
        )
      );
    },

    deleteGrade(state, grade) {
      const index = state.grades.indexOf(grade);

      grade.isDelete = 1;
      state.grades.splice(index, 1, grade);
    },
  },

  actions: {
    async getGrades(context) {
      context.commit("setGrades", await api.grade());
    },

    async postGrade(context, grade) {
      context.commit("postGrade", await api.postGrade(grade));
    },

    async putGrade(context, grade) {
      return await api.putGrade(grade.code, grade);
    },

    async deleteGrade(context, grade) {
      if (!(await api.deleteGrade(grade.code)).resultCode) {
        context.commit("deleteGrade", grade);
      }
    },

    async initData(context) {
      context.commit("setGrades", await api.initData());
    },
  },
  getters: {
    actualGrades(state) {
      return state.grades.filter((grade) => !grade.isDelete);
    },
    getStudentGrades: (state) => (studentCode) => {
      return state.grades.filter(
        (grade) => grade.student.code === Number(studentCode) && !grade.isDelete
      );
    },
    getStudentGradesByCourse: (state) => (studentCode, courseCode) => {
      return state.grades.filter(
        (grade) =>
          grade.student.code === Number(studentCode) &&
          !grade.isDelete &&
          grade.course.code === Number(courseCode)
      );
    },
  },
};
