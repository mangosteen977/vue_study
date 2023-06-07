import { defineStore } from "pinia";
import axios from "axios";
import dayjs from "dayjs"; // 날짜 형식 변경을 위해..
import router from "@/router/index.js";
export const useListDataStore = defineStore("listdata", {
  state: () => ({
    //vue data 부분, vue에서 사용/저장 가능.
    data_arr: [],
    select_data: {},
    diaryDay_arr: [],
    profile_data: {},
    logined: false,
  }),
  getters: {},
  actions: {
    // vue methods 부분
    // sotre의 데이터는 뷰에서 사용은 불가, 수정은 여기 actions에서.
    async getConfirm() {
      //cookie가 없으면 undefined, cookie가 있으면 userStatus 반환
      // /api : vue.config.js 참고, proxy로 DB서버 url 맞춰주는 용도..
      await axios.get("/api/auth", { withCredentials: true }).then((res) => {
        if (res.data.userStatus) {
          // 새로고침 시 로그인 상태 확인
          console.log("get confirm", res.data.userStatus);
          this.logined = true;
          this.profile_data = res.data.userStatus;
        } else {
          // 새로고침 시 로그아웃 상태 확인
          this.logined = false;
          this.profile_data = {};
          //로그인 안되어 있으면 로그인 페이지로..
          router.push({
            name: "signIn-view", //로그인 페이지로
          });
        }
      });
    },
    async signInDiary(data) {
      // npm install vue-cookies
      // 확인해서 로그인 결과 login-view에 return 하기
      // console.log(data);
      let result;
      await axios
        .post(
          "/api/login",
          {
            param: data,
          },
          { withCredentials: true }
        )
        .then((res) => {
          result = res.data;
          if (result.msg == "Logined" && result.userStatus) {
            this.logined = true;
            return true;
          } else {
            alert("로그인 실패");
          }
        });
      //,{ withCredentials:true }
      return result;
    },
    async signUpDiary(data) {
      // 확인해서 회원가입 결과 login-view에 return 하기
      console.log(data);
      let result = await axios.post("/api/signin", {
        param: data,
      });
      console.log(result);
      return true;
    },
    async ReMovePW(id) {
      // profile view에서 id 보내면 패스워드 초기화 후 result 반환 (이후 다시 패스워드 설정할 수 있도록..)
      console.log(id);
      // let result = await axios.post('/api/signin',{
      //     param : data
      // });
      return true;
    },
    async ReSetPW(data) {
      // profile view에서 패스워드 재설정, 결과 값 리턴할 것.
      console.log(data);
      return true;
    },
    writeDiary(date) {
      //date : calendarView에서 선택한 날짜의 값
      //없을 경우(nav에서 write메뉴 선택 => 새로 작성) 오늘 날짜 값
      let newDate = date ? date : dayjs(new Date()).format("YYYY-MM-DD");
      // console.log("newDate", newDate);
      this.select_data = {
        writetime: newDate,
      };
    },
    // addData(data) {
    //   //addDataView를 위한 페이지.. 사용 안함.
    //   // console.log("store ",data);
    //   this.data_arr.push(data);
    //   // console.log("store ",this.data_arr);
    // },
    async editData(item) {
      // listView에서 선택 된 게시글의 배열
      // console.log("확인~~",item.id)
      let result = await axios.post("/api/getDiaryItem", {
        param: { id: item.id },
      });
      // console.log(result)
      let data = result.data[0];
      // console.log(data)
      data.writetime = data.writetime
        ? dayjs(data.writetime).format("YYYY-MM-DD")
        : null;
      data.createtime = data.createtime
        ? dayjs(data.createtime).format("YYYY-MM-DD HH:mm:ss")
        : null;
      data.updatetime = data.updatetime
        ? dayjs(data.updatetime).format("YYYY-MM-DD HH:mm:ss")
        : null;
      this.select_data = data;
    },
    async getList() {
      // db에서 저장된 배열 값 가져오기.. 전체 List ... 로그인 아이디(id고유값)으로 가져올 것..
      let result = await axios.get("/api/diaryList"); //getReport => diaryList 대체함, 전체 모든 데이터
      // console.log("체크 : ", this.profile_data.id);
      console.log("체크 : ", result);
      // let result2 = await axios.post("/api/diaryList", {
      //   param: { writerid: this.profile_data.id },
      // });
      // console.log("result2", result2);
      //axios get = axios.get('URL'); // params
      //axios post = axios.post('URL',data); // body

      // 일기가 있는 날짜 확인용 배열(diaryDay_arr)생성.
      let diaryDay_arr = [];
      result.data.map((item) => {
        item.writetime = item.writetime
          ? dayjs(item.writetime).format("YYYY-MM-DD")
          : null;
        item.createtime = item.createtime
          ? dayjs(item.createtime).format("YYYY-MM-DD HH:mm:ss")
          : null;
        item.updatetime = item.updatetime
          ? dayjs(item.updatetime).format("YYYY-MM-DD HH:mm:ss")
          : null;

        // diaryDay_arr (일기용 배열)
        diaryDay_arr.push({
          id: item.id,
          writetime: item.writetime,
          emotion: item.emotion,
          title: item.title,
        });
      });
      this.data_arr = result.data;
      this.diaryDay_arr = diaryDay_arr;
      console.log(this.data_arr);
      // console.log("여긴 store 확인",this.diaryDay_arr);
    },
    clearSelectData() {
      // listView에서 선택 했던 배열을 초기화용
      this.select_data = {};
    },
    async selectedData(id) {
      // editView에서 수정 또는 저장이 된 후, 해당 페이지에 수정 된 데이터를 id값으로 불러와 리프레쉬..
      let result = await axios.post("/api/getDiaryItem", {
        param: { id: id },
      });
      let data = result.data[0];
      data.writetime = data.writetime
        ? dayjs(data.writetime).format("YYYY-MM-DD")
        : null;
      data.createtime = data.createtime
        ? dayjs(data.createtime).format("YYYY-MM-DD HH:mm:ss")
        : null;
      data.updatetime = data.updatetime
        ? dayjs(data.updatetime).format("YYYY-MM-DD HH:mm:ss")
        : null;
      data.writerid = this.profile_data.id;
      this.select_data = data;
    },
  },
});

// state : ()=>({

// }),
// getters : {

// },
// actions : {

// }
