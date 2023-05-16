import api from "@/store/api";
import store from "@/store";
import Course from "../../model/Course";
import StudentCourse from "../../model/StudentCourse";

export default {
  namespaced: true,

  state: {
    courses: [],
    courseStudents: [],
    newCourseDialog: false,
  },

  mutations: {
    setCourses(state, courses) {
      state.courses = courses.map((course) => {
        return new Course(
          course.code,
          course.name,
          course.dateStart,
          course.dateEnd
        );
      });
    },
    setCourseStudents(state, studentsCourseLink) {
      state.courseStudents = studentsCourseLink.map((studentCourseLink) => {
        const course = store.state.course.courses.find(
          (c) => c.code === studentCourseLink.courseCode
        );
        const student = store.state.student.students.find(
          (s) => s.code === studentCourseLink.studentCode
        );
        return new StudentCourse(
          studentCourseLink.code,
          course,
          student,
          studentCourseLink.dateStart,
          studentCourseLink.dateEnd,
          studentCourseLink.datetime
        );
      });
    },
    postCourse(state, course) {
      state.courses.push(
        new Course(
          course.code,
          course.name,
          Number(course.dateStart),
          Number(course.dateEnd)
        )
      );
    },
    postCourseStudent(state, studentCourseLink) {
      const course = store.state.course.courses.find(
        (c) => c.code === studentCourseLink.courseCode
      );
      const student = store.state.student.students.find(
        (s) => s.code === studentCourseLink.studentCode
      );
      state.courseStudents.push(
        new StudentCourse(
          studentCourseLink.code,
          course,
          student,
          studentCourseLink.dateStart,
          studentCourseLink.dateEnd,
          studentCourseLink.datetime
        )
      );
    },
    deleteCourse(state, course) {
      const index = state.courses.indexOf(course);
      state.courses.splice(index, 1);
    },
    deleteCourseStudent(state, student) {
      const index = state.courseStudents.indexOf(student);
      state.courseStudents.splice(index, 1);
    },
    openCourseDialog(state) {
      state.newCourseDialog = true;
    },
    closeCourseDialog(state) {
      state.newCourseDialog = false;
    },
  },

  actions: {
    async getCourses(context) {
      context.commit("setCourses", await api.course());
    },
    async getCourse(context, code) {
      context.commit("setCourses", await api.getCourse(code));
    },
    async getCourseStudents(context, code) {
      context.commit("setCourseStudents", await api.getCourseStudents(code));
    },
    async getCoursesStudents(context, code) {
      context.commit("setCourseStudents", await api.coursesStudents(code));
    },
    async postCourse(context, course) {
      context.commit("postCourse", await api.postCourse(course));
    },
    async postCourseStudent(context, student) {
      context.commit("postCourseStudent", await api.postCourseStudent(student));
    },
    async deleteCourse(context, course) {
      if (!(await api.deleteCourse(course.code)).resultCode) {
        context.commit("deleteCourse", course);
      }
    },
    async deleteCourseStudent(context, student) {
      if (!(await api.deleteCourseStudent(student.code)).resultCode) {
        context.commit("deleteCourseStudent", student);
      }
    },
    async putCourse(context, course) {
      return await api.putCourse(course.code, course);
    },
  },
  getters: {
    getCourses(state) {
      return state.courses;
    },
    getCourse(state) {
      return state.courses[state.courses.length - 1];
    },
    getCourseByCode: (state) => (code) => {
      return state.courses.find((c) => c.code === Number(code));
    },
    getStudentsByCourseId: (state) => (id) => {
      return state.courseStudents.filter(
        (student) => student.course.code === Number(id)
      );
    },
  },
};
