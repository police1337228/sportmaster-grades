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
  name: "StatsStudentsChart",
  props: ["grades"],
  data() {
    return {
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Распределение оценок среди учеников",
        },
        tooltip: {
          formatter: function() {
            let students = "";
            this.point.students.forEach((student) => {
              students += student + "<br>";
            });
            return (
              "<b>" +
              this.y +
              " студентов</b> с <b>оценкой " +
              this.point.name +
              ":</b><br>" +
              students
            );
          },
          shared: true,
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b> балла/ов: {point.y}",
            },
          },
        },
        series: [
          {
            name: "Кол-во оценок",
            colorByPoint: true,
            data: this.grades.sort((a, b) => a[2] - b[2]),
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
