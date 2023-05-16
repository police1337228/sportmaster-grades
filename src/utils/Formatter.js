/**
 * Пример класса для утилитарных методов.
 * методы:
 * @static formatDate
 * @static formatDateToUTC
 */
const dtFormatter = new Intl.DateTimeFormat("ru");

export default class Formatter {
  /**
   * Форматирует дату
   *
   * @param {string, number, Date} value дата для форматирования (Date или значение для конструктора Date)
   * @return {string} отформатированная дата
   */
  static formatDate(value) {
    if (!value) return "";
    if (!(value instanceof Date)) value = new Date(value);

    return dtFormatter.format(value);
  }

  /**
   * Форматирует дату в UTC секунды
   *
   * @param {string, number, Date} value дата для форматирования (Date или значение для конструктора Date)
   * @return {number} отформатированная дата в UTC
   */
  static formatDateToUTC(value) {
    if (!value) return "";
    if (!(value instanceof Date)) value = new Date(value);

    return value.getTime();
  }
}
