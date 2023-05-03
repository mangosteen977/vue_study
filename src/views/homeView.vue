<template>
  <h2>home</h2>
  <!-- 게시글 등록 :  -->
  <!-- <addDataView @addDatas="addDatas($event)"></addDataView> -->
    <!-- 
      emit
      @emit 자식 => 부모
      자식 : this.$emit("이름", 값);
      부모 : 해당 자식 컨포넨츠에서 @이름 = "함수명($event)" => methods에서 함수명 (데이터) {}
    -->
    <!-- 게시글 리스트 -->
    <!-- <listDataView v-if="!editing" :listdata="data_arr" @editData="editData($event)" @del_index="del_index($event)"></listDataView> -->
    <!-- 
      props
      <컴포넌츠 :이름="뷰의 데이터값"></컴포넨츠>
      <컴포넌츠 이름="값"></컴포넨츠>
    -->
    <!-- add에서 추가 된 값을 배열로 listdataview로 넘김 (모->자)-->
    <!-- list에서 수정하기로 선택 된 배열을 editdataview을 받음 (자->모) -->
    <!-- 게시글 수정 -->
    <!-- <editDataView v-if="editing" :editData="editing_data" @e_data="e_data($event)" @e_close="e_close($event)"></editDataView> -->
    <!-- list에서 수정하기로 선택 된 배열을 editdataview로 넘김 (모->자)-->
</template>

<script>
// import addDataView from './views/addDataView.vue'; //게시글 등록
// import listDataView from './views/listDataView.vue'; //게시글 리스트
// import editDataView from './views/editDataView.vue'; //게시글 수정
export default {
  name: "HomeView",
  // components: {
  //   addDataView,
  //   listDataView,
  //   editDataView
  // },
  data() {
    return {
      // editing: false,
      // data_arr: [],
      // editing_data: {}
    };
  },
  methods: {
    // addDatas (data){ //addDataView에서 가져 온 title/content의 값
    //   this.data_arr.push(data);
    // },
    // editData (data){//listData에서 가져 온 선택 된 index/title/content의 값
    //   this.editing_data = data;
    //   this.editing = true;
    // },
    // del_index (index){ //listDataView에서 삭제 선택 시 가져온 index 값
    //   this.data_arr.splice(index,1);
    // },
    // e_data (e_data) {//EditData에서 가져 온 수정 된 index/title/content의 값
    //   this.data_arr[e_data.index].title = e_data.title;
    //   this.data_arr[e_data.index].content = e_data.content;
    //   this.editing_data = {}; //수정을 위해 보냈던 {}를 수정 데이터를 받고 난 후 다시 리셋해줌.
    //   this.editing = false;
    // },
    // e_close(val) { //EditData에서 닫기 버튼을 누름(받아오는 값 false)
    //   this.editing = val;
    // }
  },
};
</script>

<style>
.zero-margin {
  margin: 0;
}
.zero-padding {
  padding: 0;
}
.textarea-size {
  height: 150px;
  resize: none;
}
</style>