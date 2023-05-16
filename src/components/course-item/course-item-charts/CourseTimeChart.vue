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
import hcMore from "highcharts/highcharts-more";

hcMore(Highcharts);
export default {
  name: "CourseTimeChart",
  props: { studentCount: Number },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "52.13%",
        },

        title: {
          text: "Количество учеников курса",
        },

        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },

        yAxis: {
          min: 0,
          max: 45,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: 15,
              color: "#55BF3B",
              thickness: 20,
            },
            {
              from: 15,
              to: 30,
              color: "#DDDF0D",
              thickness: 20,
            },
            {
              from: 30,
              to: 45,
              color: "#DF5353",
              thickness: 20,
            },
          ],
        },

        series: [
          {
            name: "Количество учеников",
            data: [this.studentCount],
            tooltip: {
              valueSuffix: " чел.",
            },
            dataLabels: {
              format: "{y} человек",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
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
