import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import vuetify from "@/plugins/vuetify";

import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";

Highcharts.setOptions({
  accessibility: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  lang: {
    shortMonths: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    weekdays: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
  },
});

//глобальные стили: иконки + шрифты
import "@/assets/css/materialdesignicons.min.css";
import "@/assets/fonts/roboto/roboto.css";

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
