<template>
  <div>
    <section id="diary_monthly" class="diary_monthly">
      <div class="year_month">
        <div>
          <label class="this_year">{{ this.year }}</label>
          <label class="btn_year">
            <span @click="select_year = 1">↑</span>
            <span @click="select_year = -1">↓</span>
          </label>
        </div>
        <ul>
          <li
            v-for="(mon, i) in arr_months"
            :key="i"
            :id="'mon' + mon"
            @click="select_month = mon"
          >
            {{ mon }}
          </li>
        </ul>
      </div>
      <div class="dayDate">
        <div class="days">
          <label v-for="(d, i) in days" :key="i">{{ d }}</label>
        </div>
        <div class="date">
          <label
            v-for="(da, i) in arr_dates"
            :key="i"
            :class="'diary_' + da[3]"
            @click="write_diary(da)"
            >{{ da[0] }}</label
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const cal_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//나중에 윤달/평달 구분 할 것.
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
import dayjs from "dayjs"; // 날짜 형식 변경을 위해..
let today = new Date();
export default {
  name: "calendar-view",
  data() {
    return {
      year: "",
      month: "",
      arr_dates: [],
      today_date: "",
      today_day: "",
      days: ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"],
      arr_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      select_month: "",
      select_year: "",
    };
  },
  computed: {
    ...mapState(useListDataStore, ["diaryDay_arr"]),
  },
  mounted: function () {
    this.get_todays_calendars();
  },
  watch: {
    select_month: function () {
      this.getCalendars_by_selected_month();
    },
    select_year: function () {
      this.getCalendars_by_selected_year();
    },
  },
  methods: {
    ...mapActions(useListDataStore, ["writeDiary", "getList", "selectedData"]),
    getCalendars() {
      //캘린더 배열 만드는 함수
      this.arr_dates = [];
      let start_day = new Date(this.year + "-" + this.month + "-01").getDay(); //1일의 요일
      let last_date = cal_month[this.month - 1]; //해당 월의 마지막 일
      let none_date = ["", "", "", ""]; //빈 칸
      for (let i = 0; i < start_day; i++) {
        this.arr_dates.push(none_date);
      }
      for (let i = 0; i < last_date; i++) {
        // 일기 유무 확인 전 해당 월의 배열 만들기
        // [일,요일,날짜,일기유무(T/F),(id)]
        let date_day = new Date(
          this.year + "-" + this.month + "-" + i + 1
        ).getDay(); // 해당 일의 요일
        let date_format = dayjs(
          String(this.year + "-" + this.month + "-" + (i + 1))
        ).format("YYYY-MM-DD"); // yyyy-mm-dd
        let check_diary = false; // 일기 유무
        let diary_id = ""; // 다이어리 id
        // 일기 유무 확인.. 일기 유무 및 id값을 넣기..
        this.diaryDay_arr.map((val) => {
          if (val.writetime == date_format) {
            check_diary = true;
            diary_id = val.id;
          }
        });
        let date = [i + 1, date_day, date_format, check_diary, diary_id];
        this.arr_dates.push(date);
      }
      if (this.arr_dates.length < 42) {
        if (42 - this.arr_dates.length >= 7) {
          for (let i = this.arr_dates.length; i < 35; i++) {
            this.arr_dates.push(none_date);
          }
        } else {
          for (let i = this.arr_dates.length; i < 42; i++) {
            this.arr_dates.push(none_date);
          }
        }
      }
      console.log(this.arr_dates);
    },
    get_todays_calendars() {
      // 오늘 날짜 확인
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1;
      document.getElementById("mon" + this.month).className = "thisMonth"; // 해당 월 표시 classname 추가
      this.today_date = today.getDate();
      this.today_day = this.days[today.getDay()];
      console.log(
        today,
        this.year,
        this.month,
        this.today_date,
        this.today_day
      );
      // store에 DB 가져온 뒤 캘린더 배열 만드는 함수 호출
      this.getList().then(() => {
        this.getCalendars();
      });
    },
    getCalendars_by_selected_year() {
      this.year = Number(this.year + this.select_year);
      this.select_year = "";
      this.getCalendars();
    },
    getCalendars_by_selected_month() {
      document.getElementById("mon" + this.month).classList.remove("thisMonth");
      document.getElementById("mon" + this.select_month).className =
        "thisMonth";
      this.month = this.select_month;
      this.getCalendars();
    },
    write_diary(date) {
      if (date[2] && !date[3]) {
        //해당 날짜에 작성 된 일기가 없을 경우, store writeDiary에 선택 된 날짜를 보냄.(신규 작성)
        this.writeDiary(date[2]);
        this.$router.push({
          // editView로 이동..
          name: "edit-view",
        });
      } else if (date[2] && date[3]) {
        //해당 날짜에 작성 된 일기가 있을 경우, store selectedData에 선택 된 날짜의 id를 보냄.(기존 글)
        this.selectedData(date[4]); // id값
        this.$router.push({
          // editView로 이동..
          name: "diary-view",
        });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&display=swap");
/* font-family: 'Noto Sans KR', sans-serif; (100, 400, 700, 900) */
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

button,
input[type="button"],
input[type="submit"] {
  cursor: pointer;
}

img {
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
}
.diary_monthly {
  width: 900px;
  height: auto;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.year_month {
  width: 700px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.year_month > div {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.this_year {
  width: auto;
  height: auto;
  font-size: 30px;
}
.btn_year {
  width: 15px;
  height: auto;
  margin-left: 10px;
  cursor: pointer;
}
.btn_year > span {
  width: 15px;
  height: 15px;
  display: block;
}
.year_month > ul {
  width: 300px;
  height: 50px;
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  font-size: 9px;
  margin: 0;
  padding: 0;
}
.year_month > ul > li {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
.thisMonth {
  font-weight: bold;
  border-radius: 100%;
  background-color: violet;
  /* border: 1px solid violet; */
}
.dayDate {
  width: auto;
  height: auto;
  /* margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(13, 0, 255); */
}
.dayDate > div {
  width: 700px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.dayDate > div > label {
  width: 90px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.date > label {
  cursor: pointer;
  background-color: #edb6e7b3;
  margin-top: 10px;
}
.date > label:hover {
  background-color: #d1a1cbb3;
}
.diary_true {
  /* 
    text-decoration-style: wavy;
    font-weight: bold;
    text-decoration-thickness: 2px;
    text-decoration-color: darkmagenta;
    text-decoration-line: underline;
  */
  border-bottom: 1vh solid #db7093a3;
}
</style>