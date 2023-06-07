import { createRouter, createWebHistory } from "vue-router";
// import { mapActions, mapState } from "pinia"; //store사용, state/actions를 사용.
// import { useListDataStore } from "../stores/listdata.js";
import VueCookies from "vue-cookies"; //cookie
import signInView from "../views/signInView.vue";
import calendarView from "../views/calendarView.vue";
import editDataView from "../views/editDataView.vue";
import listDataView from "../views/listDataView.vue";
import listView from "../views/listView.vue";
import diaryView from "../views/diaryView.vue";
import profileView from "../views/profileView.vue";

// 각 페이지 이동 사이 로그인 여부 확인(store getConfirm)
function confirm_login(to, from, next) {
  // 해당 path 진입 전 ["함수"] 확인
  //from : 현재 라우터 페이지, to : 클릭한 라우터 페이지, next : 이동할 라우터 페이지
  // const useList = useListDataStore();
  if (VueCookies.get("userStatus")) {
    next();
  } else {
    alert("로그인 하세요.");
    next("/signIn");
  }
}
function confirm_logout(to, from, next) {
  if (VueCookies.get("userStatus")) {
    next("/");
  } else {
    next();
  }
}
const routes = [
  {
    path: "/signIn",
    name: "signIn-view",
    beforeEnter: [confirm_logout],
    component: signInView,
  },
  {
    path: "/",
    name: "calendar-view",
    beforeEnter: [confirm_login],
    component: calendarView,
  },
  {
    path: "/edit",
    name: "edit-view",
    beforeEnter: [confirm_login],
    component: editDataView,
  },
  {
    path: "/list",
    name: "list-view",
    beforeEnter: [confirm_login],
    component: listDataView,
  },
  {
    path: "/list2",
    name: "list2-view",
    beforeEnter: [confirm_login],
    component: listView,
  },
  {
    path: "/diary",
    name: "diary-view",
    beforeEnter: [confirm_login],
    component: diaryView,
  },
  {
    path: "/profile",
    name: "profile-view",
    beforeEnter: [confirm_login],
    component: profileView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
