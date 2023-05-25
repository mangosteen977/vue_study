<template>
  <div class="text-center profile-box">
    <section class="form-profile w-100 m-auto">
      <h1 class="h3 mb-5 fw-normal">profile</h1>
      <div>
        <label>ID : {{ profile_data.userid }}</label>
        <label>이름 : {{ profile_data.name }}</label>
        <div v-show="!ReSetTF">
          <button class="btn btn-sm btn-profile" @click="ReMove_PW()">
            비밀번호 재설정
          </button>
        </div>
        <div v-show="ReSetTF">
          <!-- re-setting pw -->
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              v-model="signInPW"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-sm btn-profile" @click="ReSet_PW()">
            비밀번호 변경
          </button>
        </div>
        <div>
          <button class="btn btn-sm btn-profile" @click="logOut()">
            로그아웃
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
export default {
  name: "profile-view",
  data() {
    return {
      signInPW: "",
      signUpName: "",
      ReSetTF: false,
    };
  },
  computed: {
    ...mapState(useListDataStore, ["profile_data"]), //mapState => store의 state 사용
  },
  methods: {
    ...mapActions(useListDataStore, ["ReMovePW", "ReSetPW"]), //store의 actions 사용 (로그인/회원가입)
    logOut() {
      // 로그인 쿠키값 삭제
      document.cookie = "userStatus=; expires=mon, 01 Jan 1997 00:00:01 GMT;"; // 쿠키 유효기간 과거로..;
      location.href = "/"; // 로그인 페이지로 새로고침
    },
    ReMove_PW() {
      // 초기화 완료 후 result 받고, 비밀번호 재설정
      if (confirm("비밀번호를 재설정 할까요?")) {
        this.ReMovePW(this.profile_data.id).then((result) => {
          if (result == true) {
            alert("true");
            this.ReSetTF = true;
          } else {
            alert("다시 시도..");
          }
        });
      }
    },
    ReSet_PW() {
      if (!this.signInPW) {
        alert("password를 입력하세요.");
        document.getElementById("floatingPassword").focus();
        return;
      }
      let data = {
        email: this.profile_data.id,
        name: this.profile_data.name,
        pw: this.signInPW,
      };
      console.log(data);
      this.ReSetPW(data).then((result) => {
        // 기존 id + 신규 pw + 기존 name
        if (result == true) {
          alert("비밀번호 재설정 완료");
        }
      });
      this.signInPW = "";
    },
  },
};
</script>

<style>
.profile-box {
  height: 100%;
  margin-top: 50px;
}
.form-profile {
  width: 100px;
  height: auto;
  max-width: 450px;
  padding: 15px;
  background-color: #edb6e7b3;
  border-radius: 3%;
}
.form-profile > h1 {
  text-align: left;
}
.form-profile > div {
  width: 100%;
  height: auto;
  min-height: 350px;
  padding: 0px 50px;
  background-color: #ffffff91;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.form-profile > div > div,
.form-profile > div > label {
  width: 100%;
  height: auto;
  min-height: 50px;
  line-height: 50px;
}
.form-profile > div > label {
  text-align: left;
  font-size: 1.2em;
}
.btn-profile {
  width: auto;
  border: 1px solid rgb(192, 106, 192);
  border-radius: 5px;
  margin: 0px;
  color: rgb(192, 106, 192);
  /* background-color: violet; */
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(192, 106, 192);
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: violet;
}
</style>
