<template>
  <v-card class="mx-auto">
    <v-card-text>
      <highcharts :options="chartOptions"></highcharts>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
export default {
  name: "StdCoursesChart",
  props: ["courses"],
  data() {
    return {
      chartOptions: {
        chart: {
          zoomType: "x",
        },
        title: {
          text: "Курсы ученика",
        },
        xAxis: {
          type: "datetime",
          title: {
            text: "Дата начала/конца",
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            enabled: false,
          },
        },
        legend: {
          enabled: true,
        },
        tooltip: {
          formatter: function() {
            return (
              "Курс: <b>" +
              this.series.name +
              "</b><br/>" +
              Highcharts.dateFormat("%A, %e %b %Y", new Date(this.x))
            );
          },
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        series: this.courses,
      },
    };
  },
  components: {
    highcharts: Chart,
  },

  mounted() {},
};
</script>

<style></style>
