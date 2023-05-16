/**
 * Реализация HTTP-клиента (вместо axios).
 * методы: get, post, put, delete
 * @this baseUrl - базовый url - api/(rest rpc cursor)/schema/package/
 * @this loadingMask - флаг, вкл/выкл маску
 */
import store from "@/store";

const INIT = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

class RequestExecutor {
  constructor() {
    this.baseUrl = "";
    this.loadingMask = true; //отключать, если не требуется глобальная маска
    this.abortController = new AbortController();
    console.info("Request Executor Init!");
  }

  /**
   * GET
   *
   * @param {string} url Endpoint.
   * @param {number} code Код, если есть.
   * @return {Promise}
   */
  get(url, code) {
    this.abortController = new AbortController();
    return this.execute(code ? url + "/" + code : url, false, {
      signal: this.abortController.signal,
      ...INIT,
      method: "GET",
    });
  }

  /**
   * POST
   *
   * @param {string} url Endpoint.
   * @param {object} data Объект с данными. Будет помещён в тело запроса.
   * @return {Promise}
   */
  post(url, data) {
    this.abortController = new AbortController();
    return this.execute(
      url,
      false,
      { signal: this.abortController.signal, ...INIT, method: "POST" },
      data
    );
  }

  /**
   * PUT
   *
   * @param {string} url Endpoint.
   * @param {number} code Код.
   * @param {object} data Объект с данными. Будет помещён в тело запроса.
   * @return {Promise}
   */
  put(url, code, data) {
    this.abortController = new AbortController();
    return this.execute(
      url + "/" + code,
      false,
      { signal: this.abortController.signal, ...INIT, method: "PUT" },
      data
    );
  }

  /**
   * DELETE
   *
   * @param {string} url Endpoint.
   * @param {number} code Код.
   * @return {Promise}
   */
  delete(url, code) {
    this.abortController = new AbortController();
    return this.execute(url + "/" + code, false, {
      signal: this.abortController.signal,
      ...INIT,
      method: "DELETE",
    });
  }

  /**
   * EXECUTE
   *
   * @param {string} url Endpoint.
   * @param {boolean} exact не подставлять baseUrl
   * @param {object} init параметры запроса
   * @param {object} data тело запроса
   * @return {Promise}
   */
  async execute(url, exact, init, data) {
    if (this.loadingMask) {
      store.commit("setIsLoading", true);
    }

    try {
      if (data)
        init = {
          ...init,
          body: JSON.stringify(data),
        };
      const location = exact ? url : this.baseUrl + url;
      const response = await fetch(location, init);
      //if(!response.ok) throw new Error("Network error!");

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      store.commit("setIsLoading", false);
    }
  }

  cancel() {
    this.abortController.abort();
  }
}

export default new RequestExecutor();
