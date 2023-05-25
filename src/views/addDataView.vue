<template>
  <div>
    <!-- <h1>create vue _ add</h1>
    <div class="container-lg bg-light rounded">
      <div class="mb-3 row">
        <label class="col-11">게시글 등록</label>
        <button @click="addDatas"  class="btn btn-success btn-sm col-1">
          저장
        </button>
      </div>
      <div class="row">
        <label class="form-label">제목</label>
        <input v-model="title" id="title" class="form-control" />
      </div>
      <div class="row">
        <label class="form-label">내용</label>
        <textarea v-model="content" id="content" class="form-control textarea-size"></textarea>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { mapState, mapActions } from 'pinia'; //store사용 준비, state/actions를 사용.
// import { useListDataStore } from '../stores/listdata.js';
// export default {
//   name: "add-view",
//  data () {
//     return {
//         title : "",
//         content : "",
//         data_obj: {},
//         editing_data: {}
//     }
//  },
//  computed : {
//   ...mapState(useListDataStore, ["data_arr"]) //store의 state 사용
//  },
//  methods : {
//   ...mapActions(useListDataStore, ["addData"]), //store의 actions 사용
//     emitdata (){
//       if (!this.title) {
//         alert("제목을 입력하세요.");
//         document.getElementById("title").focus();
//         return;
//       }
//       if (!this.content) {
//         alert("내용을 입력하세요.");
//         document.getElementById("content").focus();
//         return;
//       }
//         let data = {
//             title : this.title,
//             content : this.content
//         }
//         this.$emit("addDatas",data);
//         this.title = "";
//         this.content = "";
//     },//app.vue꺼.
//     addDatas (){ //addDataView에서 가져 온 title/content의 값
//       let data = {
//             title : this.title,
//             content : this.content
//         }
//       // this.data_arr.push(data);
//       this.addData(data); // store의 action인 addData로 data값 보냄.
//       console.log(this.data_arr);
//     },
//     editData (data){//listData에서 가져 온 선택 된 index/title/content의 값
//       this.editing_data = data;
//       this.editing = true;
//     },
//     del_index (index){ //listDataView에서 삭제 선택 시 가져온 index 값
//       this.data_arr.splice(index,1);
//     },
//     e_data (e_data) {//EditData에서 가져 온 수정 된 index/title/content의 값
//       this.data_arr[e_data.index].title = e_data.title;
//       this.data_arr[e_data.index].content = e_data.content;
//       this.editing_data = {}; //수정을 위해 보냈던 {}를 수정 데이터를 받고 난 후 다시 리셋해줌.
//       this.editing = false;
//     },
//     e_close(val) { //EditData에서 닫기 버튼을 누름(받아오는 값 false)
//       this.editing = val;
//     }
//  }
// }
</script>

<style></style>
