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
  name: "CourseGradesChart",
  props: ["grades"],
  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "Сумма баллов учеников курса",
        },
        subtitle: {
          text: "За все время курса",
        },
        xAxis: {
          type: "category",
          labels: {
            rotation: -90,
            style: {
              fontSize: "11px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Оценка (в баллах)",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "Сумма баллов за курс: <b>{point.y} баллов</b>",
        },
        series: [
          {
            name: "Оценки",
            colorByPoint: true,
            groupPadding: 0,
            data: this.grades.sort((a, b) => b[1] - a[1]),
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: "#FFFFFF",
              align: "right",
              format: "{point.y}",
              y: 5,
              style: {
                fontSize: "11px",
                fontFamily: "Verdana, sans-serif",
              },
            },
          },
        ],
      },
    };
  },
  components: {
    highcharts: Chart,
  },
};
</script>

<style></style>
