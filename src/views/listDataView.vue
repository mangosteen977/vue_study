<template>
    <div>
      <button  @click="getdata()" class="btn btn-warning btn-sm col-1">Get Data</button>
      <table class="table container-lg zero-padding border border-secondary rounded">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">제목</th>
            <th scope="col">내용</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in data_arr" :key="item.id" @dblclick="edit_Data(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.workday }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'pinia'; //store사용 준비, state/actions를 사용.
  import { useListDataStore } from '../stores/listdata.js';
  // import axios from 'axios';
  export default {
  name: "list-view",
    data (){
        return {

        }
    },
    computed : {
      ...mapState(useListDataStore,["data_arr"])
    },
    mounted () {
      this.getdata();
    },
    methods : {
      ...mapActions(useListDataStore,['getList','editData']),
      getdata () {
        this.getList();
      },
      edit_Data (item){
        this.editData(item);
        this.$router.push({ // editView로 이동..
          name : 'edit-view'
          // path : '/edit'
        });
      }
    }
  }
  </script>
  
  <style>
  
  </style>