<template>
  <div class="mb-3 container-lg bg-opacity-25 rounded diary-edit-box">
    <div class="row row-flex-right">
      <button @click="go_list()" class="btn btn-sm col-1 btn-edit">
        일기 목록
      </button>
      <button @click="edit_save()" class="btn btn-sm col-1 btn-edit">
        일기 저장
      </button>
      <button @click="clear_all()" class="btn btn-sm col-1 btn-edit">
        모든 내용 지우기
      </button>
      <button @click="del_data()" class="btn btn-sm col-1 btn-edit">
        일기 삭제
      </button>
    </div>
    <div class="row">
      <div class="col-3">
        <label class="form-label">등록일</label>
        <input
          type="date"
          v-model="select_data.writetime"
          class="form-control"
        />
      </div>
      <div class="col-2">
        <label class="form-label">기분</label>
        <select
          class="form-select form-select-sm"
          aria-label="오늘의 기분 선택"
          v-model="select_data.emotion"
        >
          <option selected value="">오늘의 기분</option>
          <option
            v-for="(item, index) in emotions_arr"
            :key="index"
            :value="index"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <label class="form-label">제목</label>
      <input v-model="select_data.title" class="form-control" />
    </div>
    <div class="row">
      <label class="form-label">내용</label>
      <textarea
        v-model="select_data.content"
        class="form-control textarea-size"
        rows="20"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
import axios from "axios";
export default {
  name: "edit-view",
  data() {
    return {
      emotions_arr: [
        "😎 즐거워",
        "🥰 행복해",
        "😶 그냥그래",
        "😭 너무슬퍼",
        "😡 화가나",
      ],
    };
  },
  computed: {
    ...mapState(useListDataStore, ["select_data"]),
    // getdata (){
    //     let data = {...this.editData};
    //     return data
    // }
  },
  mounted() {
    console.log("editview_data확인", this.select_data);
  },
  methods: {
    ...mapActions(useListDataStore, [
      "editData",
      "getList",
      "clearSelectData",
      "selectedData",
    ]),
    async edit_save() {
      console.log(this.select_data, "이모션 확인용");
      // console.log('editSave!!', this.select_data)
      await axios
        .post("/api/saveDiaryItem", {
          param: this.select_data,
        })
        .then((response) => {
          if (response.data.msg == "Created") {
            // id를 안보낼 때 => 신규 id 반환.
            alert("추가 완료" + response.data.id);
          } else {
            //Updated
            alert("수정 완료" + response.data.id);
          }
          this.getList(); //수정 또는 저장 이후, listview 리프레쉬.
          this.selectedData(response.data.id); //수정 또는 저장이 된 후, 수정 된 데이터를 리프레쉬.
        })
        .catch((e) => {
          console.log(e);
        });
    },
    go_list() {
      // this.getList(); //list로 돌아갈 때 리스트 array refesh용인데.. listview에 mouted있어서 주석...
      this.$router.push({
        name: "list-view",
      });
    },
    clear_all() {
      this.clearSelectData();
    },
    async del_data() {
      if (confirm("삭제할까요?")) {
        console.log(this.select_data.id);
        await axios
          .post("/api/deleteDiaryItem", {
            param: {
              id: this.select_data.id,
            },
          })
          .then((response) => {
            if (response.data.msg == "Deleted") {
              alert("삭제 완료!");
              this.clearSelectData(); // store의 수정 중 데이터 삭제
              this.$router.push({
                // listview로 이동
                name: "list-view",
              });
            } else {
              alert("삭제 실패!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style>
.diary-edit-box {
  background-color: #edb6e7b3;
  margin-top: 50px;
}

.btn-edit {
  width: auto;
  border: 1px solid rgb(192, 106, 192);
  border-radius: 3px;
  margin-right: 3px;
  color: rgb(192, 106, 192);
  /* background-color: violet; */
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(192, 106, 192);
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: violet;
}

.row-flex-right {
  justify-content: right;
}
</style>
