import Formatter from "@/utils/Formatter";
export default class StudentCourse {
  code;
  course;
  student;
  dateStart;
  dateEnd;
  datetime;

  constructor(code, course, student, dateStart, dateEnd, datetime) {
    this.code = code;
    this.course = course;
    this.student = student;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.datetime = datetime;
  }

  get formatDateStart() {
    return Formatter.formatDate(this.dateStart);
  }

  get formatDateEnd() {
    return Formatter.formatDate(this.dateEnd);
  }

  get formatDatetime() {
    return Formatter.formatDate(this.datetime);
  }
}
