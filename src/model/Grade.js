import Formatter from "@/utils/Formatter";

export default class Grade {
  code;
  course;
  student;
  grade;
  gradeDate;
  isDelete;

  constructor(code, course, student, grade, gradeDate, isDelete) {
    this.code = code;
    this.course = course;
    this.student = student;
    this.grade = grade;
    this.gradeDate = gradeDate;
    this.isDelete = isDelete;
  }

  get formatGradeDate() {
    return Formatter.formatDate(this.gradeDate);
  }
}
