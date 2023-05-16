import Formatter from "@/utils/Formatter";
import store from "@/store";

export default class Student {
  code;
  fullName;
  firstName;
  secondName;
  lastName;
  dateTime;

  constructor(code, fullName, firstName, secondName, lastName, dateTime) {
    this.code = code;
    this.fullName = fullName;
    this.firstName = firstName;
    this.secondName = secondName;
    this.lastName = lastName;
    this.dateTime = dateTime;
  }

  get code() {
    return this.code;
  }
  set code(code) {
    this.code = code;
  }

  get fullName() {
    return this.fullName;
  }
  set fullName(fullName) {
    this.fullName = fullName;
  }

  get dateTime() {
    return this.dateTime;
  }
  set dateTime(dateTime) {
    this.dateTime = dateTime;
  }

  get firstName() {
    return this.firstName;
  }
  set firstName(firstName) {
    this.firstName = firstName;
  }

  get secondName() {
    return this.secondName;
  }
  set secondName(secondName) {
    this.secondName = secondName;
  }

  get lastName() {
    return this.lastName;
  }
  set lastName(lastName) {
    this.lastName = lastName;
  }

  get formatDateTime() {
    return Formatter.formatDate(this.dateTime);
  }

  isOnCourse(courseId) {
    if (
      store.state.course.courseStudents.find(
        (student) =>
          student.student.code === this.code &&
          student.course.code === Number(courseId)
      )
    ) {
      return true;
    }
    return false;
  }
}
