<template>
  <!-- 
    npm install vue-router
    npm install bootstrap
    router 이동
    data db : http://39.123.45.45:3002/getreport
    npm install pinia (store 활용)
    npm install axios (api)
    npm install dayjs // 날짜 포멧용 라이브러리..
   -->
  <div>
    <header>
      <!-- navigation part -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">일기장</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="logined">
                <router-link class="nav-link" aria-current="page" to="/"
                  >Home</router-link
                >
              </li>
              <li class="nav-item" v-if="logined">
                <router-link class="nav-link" to="/list">List</router-link>
              </li>
              <li class="nav-item" v-if="logined">
                <router-link class="nav-link" to="/list2">List2</router-link>
              </li>
              <li class="nav-item" v-if="logined">
                <router-link class="nav-link" to="/edit">Write</router-link>
              </li>
              <li class="nav-item" v-if="logined">
                <router-link class="nav-link" to="/profile"
                  >Profile</router-link
                >
              </li>
              <li class="nav-item" v-if="logined" @click="loginOut()">
                <div class="nav-link" role="button">로그아웃</div>
              </li>
              <li class="nav-item" v-else @click="goToLoginView()">
                <div class="nav-link" role="button">로그인</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "./stores/listdata.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useListDataStore, ["logined"]),
  },
  created() {
    // this.getCookie()
    this.getConfirm();
  },
  methods: {
    ...mapActions(useListDataStore, ["getConfirm"]), //store의 actions 사용 (로그인/회원가입)
    getCookie() {
      //로그인으로 저장 된 쿠키 값 체크..
      let getCookie = document.cookie;
      if (getCookie.indexOf("userStatus") != -1) {
        //로그인 정보 쿠키 있는 지 확인
        // let cookie = getCookie.split("userStatus=")[1].split(";")[0]; //userStatus= 에서 ; 사이 값.
        // console.log("cookie", cookie);
        return true;
      }
      return false;
    },
    goToLoginView() {
      this.$router.push({
        name: "signIn-view", //로그인 페이지로
      });
    },
    loginOut() {
      // 로그인 쿠키값 삭제
      let cookie = this.getCookie(); //cookie 확인
      if (cookie) {
        this.$cookies.remove("userStatus");
        this.getConfirm();
      }
    },
  },
};
</script>

<script setup>
import { RouterView } from "vue-router";
</script>

<style></style>
