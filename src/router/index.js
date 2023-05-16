import Vue from "vue";
import VueRouter from "vue-router";
import Grades from "@/views/Grades.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Grades",
    component: Grades,
  },
  {
    path: "/stats",
    name: "Stats",

    component: () => import("@/views/Statistics.vue"),
  },
  {
    path: "/courses",
    name: "Courses",

    component: () => import("@/views/Courses.vue"),
  },
  {
    path: "/courses/:id",
    name: "Course",

    component: () => import("@/views/Course.vue"),
  },
  {
    path: "/students",
    name: "Students",

    component: () => import("@/views/Students.vue"),
  },
  {
    path: "/students/:id",
    name: "Student",

    component: () => import("@/views/Student.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
