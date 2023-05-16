<template>
  <v-card class="mx-auto">
    <v-card-text>
      <highcharts :options="chartOptions"></highcharts>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart } from "highcharts-vue";
export default {
  props: ["grades"],
  name: "StdGradesChart",
  data() {
    return {
      chartOptions: {
        title: {
          text: "Оценки ученика",
        },
        yAxis: {
          title: {
            text: "Оценка",
          },
        },
        xAxis: {
          type: "datetime",
          title: {
            text: "Дата оценки",
          },
        },
        series: this.grades.map((grade) => {
          return {
            ...grade,
            data: grade.data.sort(),
          };
        }),
      },
    };
  },
  components: {
    highcharts: Chart,
  },
};
</script>

<style></style>
