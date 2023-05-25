<template>
  <div class="text-center signIn-box">
    <section class="form-signin w-100 m-auto">
      <h1 class="h3 mb-3 fw-normal">sign in</h1>
      <!-- id -->
      <div class="form-floating">
        <input
          type="text"
          id="floatingInput"
          class="form-control"
          v-model="signInID"
          v-on:keyup.enter="keyEnter()"
        />
        <label for="floatingInput">ID</label>
      </div>
      <!-- name : only signUp -->
      <div class="form-floating">
        <input
          v-show="signUP"
          type="text"
          class="form-control"
          id="floatingName"
          v-model="signUpName"
          v-on:keyup.enter="keyEnter()"
        />
        <label for="floatingName">name</label>
      </div>
      <!-- pw -->
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          v-model="signInPW"
          v-on:keyup.enter="keyEnter()"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <button
        v-show="!signUP"
        class="w-100 mb-2 btn btn-lg btn-signIn"
        @click="signIn()"
      >
        Sign in
      </button>
      <label
        v-show="signUP"
        class="w-100 mb-2 btn btn-lg btn-signUp"
        @click="signUp()"
        >Sign Up</label
      >
      <span
        v-show="!signUP"
        class="h6 fw-light text-decoration-underline"
        role="button"
        @click="signUP = true"
        >sign Up</span
      >
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
// import axios from 'axios'
export default {
  name: "signIn-view",
  data() {
    return {
      signInID: "",
      signInPW: "",
      signUpName: "",
      signUP: false,
    };
  },
  created() {
    this.getConfirm().then(() => {
      if (this.logined) {
        //로그인 상태(true) 확인 후 로그인 상태면 캘린더로 이동.
        this.$router.push({
          name: "calendar-view",
        });
      }
    });
  },
  computed: {
    ...mapState(useListDataStore, ["logined"]), //mapState => store의 state 사용
  },
  methods: {
    ...mapActions(useListDataStore, [
      "signInDiary",
      "signUpDiary",
      "getConfirm",
    ]), //store의 actions 사용 (로그인/회원가입)
    keyEnter() {
      this.signUP == true ? this.signUp() : this.signIn();
    },
    async signIn() {
      if (!this.signInID) {
        alert("ID를 입력하세요.");
        document.getElementById("floatingInput").focus();
        return;
      }
      if (!this.signInPW) {
        alert("password를 입력하세요.");
        document.getElementById("floatingPassword").focus();
        return;
      }
      let data = {
        email: this.signInID,
        pw: this.signInPW,
      };
      let check = this.signInDiary(data);
      this.signInID = "";
      this.signInPW = "";
      if (check) {
        //로그인 성공일 경우만 캘랜더 뷰로 이동
        // 로그인 여부에 따라 페이지 접근 권한 막기..
        // this.$router.push({
        //   name: "calendar-view", //캘린더 페이지로
        // });
        location.href = "/"; //캘린더 페이지로 새로고침 이동(created), 로그인으로 가져온 profile 데이터 재로드
        alert("Logined");
        //세션/로컬 스토리지에 로그인 아이디/이름/로그인T값 저장
      }
    },
    signUp() {
      if (!this.signInID) {
        alert("ID를 입력하세요.");
        document.getElementById("floatingInput").focus();
        return;
      }
      if (!this.signUpName) {
        alert("이름을 입력하세요.");
        document.getElementById("floatingName").focus();
        return;
      }
      if (!this.signInPW) {
        alert("password를 입력하세요.");
        document.getElementById("floatingPassword").focus();
        return;
      }
      let data = {
        email: this.signInID,
        name: this.signUpName,
        pw: this.signInPW,
      };
      let check = this.signUpDiary(data);
      this.signInID = "";
      this.signInPW = "";
      this.signUpName = "";
      if (check) {
        this.signUP = false;
        this.$router.push({
          name: "signIn-view", //로그인 페이지로
        });
        alert("회원가입 완료");
      }
    },
  },
};
</script>

<style>
.signIn-box {
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  background-color: #edb6e7b3;
  border-radius: 3%;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-radius: 0;
}

.form-signin input[type="password"] {
  border-radius: 0;
  margin-bottom: 10px;
}

.btn-signUp {
  color: #fff;
  background-color: plum;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(192, 106, 192);
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: plum;
}

.btn-signIn {
  color: #fff;
  background-color: palevioletred;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(168, 88, 115);
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: palevioletred;
}
</style>
