<template>
  <div>
    <div class="mb-3 container-lg rounded diary-box">
      <div class="diary-view-top">
        <div>
          <label class="">{{ select_data.writetime }}</label>
          <label class="">{{ emotions_arr[select_data.emotion] }}</label>
        </div>
        <div>
          <button @click="go_list()" class="btn btn-sm col-1 btn-edit">
            일기 목록
          </button>
          <button @click="edit_Data()" class="btn btn-sm col-1 btn-edit">
            일기 수정
          </button>
          <button @click="del_data()" class="btn btn-sm col-1 btn-edit">
            일기 삭제
          </button>
        </div>
      </div>
      <div class="row diary-view-title">
        <label class="">{{ select_data.title }}</label>
      </div>
      <div class="row diary-view-content">
        <label class="">{{ select_data.content }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
import axios from "axios";
export default {
  name: "diary-view",
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
  mounted() {},
  methods: {
    ...mapActions(useListDataStore, ["getList", "clearSelectData"]),
    go_list() {
      // this.getList(); //list로 돌아갈 때 리스트 array refesh용인데.. listview에 mouted있어서 주석...
      this.$router.push({
        name: "list-view",
      });
    },
    edit_Data() {
      // this.editData(item);
      this.$router.push({
        // editView로 이동..
        name: "edit-view",
        // path : '/edit'
      });
    },
    async del_data() {
      if (confirm("삭제할까요?")) {
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
.diary-box {
  background-color: #edb6e7b3;
  padding: 30px;
  margin-top: 50px;
}
.diary-view-title {
  border-radius: 5px;
  margin-bottom: 30px;
}
.diary-view-title > label {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 2em;
  background-color: #ffffff91;
  border-radius: 5px;
}
.diary-view-content {
  border-radius: 5px;
}
.diary-view-content > label {
  width: 100%;
  height: auto;
  min-height: 500px;
  padding: 15px;
  font-size: 1.2em;
  background-color: #ffffffd3;
  border-radius: 5px;
}
.diary-view-top {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.diary-view-top > div > label {
  width: auto;
  height: 30px;
  line-height: 30px;
  font-size: 1.2em;
  margin-right: 10px;
}
</style>
