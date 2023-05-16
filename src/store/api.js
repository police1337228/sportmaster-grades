import ReqExec from "@/services/RequestExecutor";
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api2/";
ReqExec.loadingMask = true;

const endpoints = {
  init: "init_data",
  course: "course",
  student: "student",
  grade: "grade",
  courseStudent: "student_course",
};

export default {
  course: () => ReqExec.get(endpoints.course),
  getCourse: (code) => ReqExec.get(endpoints.course, code),
  postCourse: (course) => ReqExec.post(endpoints.course, course),
  deleteCourse: (code) => ReqExec.delete(endpoints.course, code),
  putCourse: (code, course) => ReqExec.put(endpoints.course, code, course),

  coursesStudents: () => ReqExec.get(endpoints.courseStudent),
  getCourseStudents: (code) => ReqExec.get(endpoints.courseStudent, code),
  postCourseStudent: (student) =>
    ReqExec.post(endpoints.courseStudent, student),
  deleteCourseStudent: (code) => ReqExec.delete(endpoints.courseStudent, code),

  student: () => ReqExec.get(endpoints.student),
  getStudent: (code) => ReqExec.get(endpoints.student, code),
  postStudent: (student) => ReqExec.post(endpoints.student, student),
  deleteStudent: (code) => ReqExec.delete(endpoints.student, code),
  putStudent: (code, student) => ReqExec.put(endpoints.student, code, student),

  grade: () => ReqExec.get(endpoints.grade), // оценки по всем курсам
  getGrade: (code) => ReqExec.get(endpoints.grade, code), // оценки отдельного курса по его коду.
  postGrade: (grade) => ReqExec.post(endpoints.grade, grade),
  putGrade: (code, grade) => ReqExec.put(endpoints.grade, code, grade),
  deleteGrade: (code) => ReqExec.delete(endpoints.grade, code),

  initData: () => ReqExec.get(endpoints.init),

  cancelLoading: () => ReqExec.cancel(),
  //аутентификация, не изменять
  auth: {
    getSession: () => ReqExec.execute("api/auth/getSession", true),
    getUser: () => ReqExec.execute("api/auth/getUser", true),
  },
};
