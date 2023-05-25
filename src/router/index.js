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

// 각 페이지 이동 사이 로그인 확인(store getConfirm이용..)
function confirm_login(to, from, next) {
  //from : 현재 라우터 페이지, to : 클릭한 라우터 페이지, next : 이동할 라우터 페이지
  // const useList = useListDataStore();
  if (VueCookies.get("userStatus")) {
    //login이다. corfirm으로 다시 확인 필요..;
    next();
  } else {
    // useList.logOut(); 나중에 store logout 만들기.;
    alert("로그인 하세요.");
    next("/signIn");
  }
}

const routes = [
  {
    path: "/signIn",
    name: "signIn-view",
    //로그인 일 때 딴데 가게..
    component: signInView,
  },
  {
    path: "/",
    name: "calendar-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: calendarView,
  },
  {
    path: "/edit",
    name: "edit-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: editDataView,
  },
  {
    path: "/list",
    name: "list-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: listDataView,
  },
  {
    path: "/list2",
    name: "list2-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: listView,
  },
  {
    path: "/diary",
    name: "diary-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: diaryView,
  },
  {
    path: "/profile",
    name: "profile-view",
    beforeEnter: [confirm_login], // 해당 path 진입 전 ["함수"] 확인
    component: profileView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
