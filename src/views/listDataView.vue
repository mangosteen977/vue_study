<template>
  <div class="list_box">
    <button @click="getdata()" class="btn btn-sm col-1 btn-profile">
      Refresh
    </button>
    <table
      class="table container-lg zero-padding border border-secondary rounded list-table"
    >
      <thead>
        <tr>
          <!-- <th scope="col">id</th> -->
          <th scope="col">작성일</th>
          <th scope="col">기분</th>
          <th scope="col">제목</th>
          <!-- <th scope="col">내용</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data_arr" :key="item.id" @dblclick="edit_Data(item)">
          <!-- <td>{{ item.id }}</td> -->
          <td>{{ item.writetime }}</td>
          <td>{{ emotions_arr[item.emotion] }}</td>
          <td>{{ item.title }}</td>
          <!-- <td>{{ item.content }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
// import axios from 'axios';
export default {
  name: "list-view",
  data() {
    return {
      emotions_arr : ["😎 즐거워","🥰 행복해","😶 그냥그래","😭 너무슬퍼","😡 화가나"]
    };
  },
  computed: {
    ...mapState(useListDataStore, ["data_arr"]),
  },
  mounted() {
    this.getdata();
  },
  methods: {
    ...mapActions(useListDataStore, ["getList", "editData"]),
    getdata() {
      this.getList();
    },
    edit_Data(id) {
      this.editData(id);
      this.$router.push({
        // editView로 이동..
        // name : 'edit-view'
        name: "diary-view",
        // path : '/edit'
      });
    },
  },
};
</script>
  
<style>
  .list_box {
    width: 900px;
    height: auto;
    margin: 0 auto;
    margin-top: 50px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* justify-content: center; */
  }
  .btn-profile {
    width: auto;
    border: 1px solid rgb(192, 106, 192);
    border-radius: 3px;
    margin-right: 3px;
    margin-bottom: 10px;
    color: rgb(192, 106, 192);
    /* background-color: violet; */
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: rgb(192, 106, 192);
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: violet;
  }
  .list-table{
    text-align: center;
  }
  .list-table > thead > tr > th {
    background-color: #edb6e7b3;
    color: #fff;
  }
  .list-table > tbody > tr {
    cursor: pointer;
  }
  .list-table > tbody > tr:hover {
    background-color: #d1a1cbb3;
    color: #fff;
  }
</style>