<template>
  <div class="list_box">
    <button @click="getdata()" class="btn btn-sm col-1 btn-profile">
      Refresh
    </button>
    <div>
      <div v-for="item in data_arr" :key="item.id" @dblclick="edit_Data(item)" class="rounded diary-list-box">
        <div class="diary-list-title">
          <label class="">{{ emotions_arr[item.emotion] }}</label>
          <div class="diary-list-top">
            <label class="">{{ item.writetime }}</label>
            <label class="">{{ item.title }}</label>
          </div>
        </div>
        <div class="diary-list-content">
          <label class="">{{ item.content }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapState, mapActions } from "pinia"; //store사용 준비, state/actions를 사용.
import { useListDataStore } from "../stores/listdata.js";
// import axios from 'axios';
export default {
  name: "list2-view",
  data() {
    return {
      emotions_arr : ["😎","🥰","😶","😭","😡"]
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
    edit_Data(item) {
      this.editData(item);
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
    width: 600px;
    height: auto;
    margin: 0 auto;
    margin-top: 50px;
  }
  .diary-list-box {
    border: 3px solid #edb6e7b3;
    /* background-color: #edb6e7b3; */
    /* padding: 20px; */
    margin-top: 15px;
  }
  .diary-list-box:hover {
    box-shadow: 6px 6px 5px rgba(0, 0, 0, 0.15);
    cursor:pointer
  }
  .diary-list-title {
    background-color: #edb6e7b3;
    width: 100%;
    height: auto;
    font-size: 1.3em;
    border-radius: 3px 3px 0px 0px;
    padding: 5px 15px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    margin-bottom: 5px;
  }
  .diary-list-content {
    border-radius: 5px;
    font-size: 1em;
  }
  .diary-list-content > label {
    width: 100%;
    height: auto;
    min-height: 120px;
    padding: 15px;
    font-size: 1.2em;
    background-color: #ffffffd3;
    border-radius: 5px;
  }
  .diary-list-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
    margin-left: 10px;
  }
  .diary-list-top > div > label {
    width: auto;
    height: 30px;
    line-height: 30px;
    font-size: 1.2em;
    margin-right: 10px;
  }
</style>