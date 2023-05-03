<template>
    <div>
      <!-- 
        컴포넌츠에서 props로 받은 값은 v-model로 사용이 불가능~
        구조분해할당..등으로 별도의 데이터로 받는 과정이 필요..
        예) computed에서 임의의 함수에서 return할 수 있게 하기. (getdata()참고)
        예2) 자식창이 열릴 때 값을 따로.. 줄 수 있도록..
       -->
      <div class="mb-3 container-lg bg-secondary bg-opacity-25 rounded">
      <div class="row">
        <label class="col-10">게시글 수정</label>
        <button @click="clear_all()" class="btn btn-secondary btn-sm col-1">내용 삭제</button>
        <button @click="edit_save()" class="btn btn-warning btn-sm col-1">저장</button>
        <button @click="go_list()" class="btn btn-primary btn-sm col-1">목록</button>
        <button @click="del_data()" class="btn btn-danger btn-sm col-1">삭제</button>
      </div>
      <!-- DB data 형식
        {
          "id":8,
          "title":"999번째 항목입니다.",
          "content":"내용3 수정됨\nsaved",
          "workday":"2023-04-25T15:00:00.000Z",
          //"status":null,
          //"optionid":null,
          "creator":"오현주",
          "createdate":"2023-04-27T01:41:14.000Z",
          "updater":null,
          "updatedate":"2023-04-28T06:33:41.000Z"
        }
      -->
      <div class="row">
        <div class="col-2">
          <label class="form-label">id</label>
          <input v-model="select_data.id" class="form-control" readonly/>
        </div>
        <div class="col-3">
          <label class="form-label">등록일</label>
          <input type="date" v-model="select_data.workday" class="form-control" />
        </div>
      </div>
      <div class="row">
        <label class="form-label">제목</label>
        <input v-model="select_data.title" class="form-control" />
      </div>
      <div class="row">
        <label class="form-label">내용</label>
        <textarea v-model="select_data.content" class="form-control textarea-size"></textarea>
      </div>
      <div class="row">
        <div class="col-2">
          <label class="form-label">작성자</label>
          <input v-model="select_data.creator" class="form-control" readonly />
        </div>
        <div class="col-4">
          <label class="form-label">작성일</label>
          <input v-model="select_data.createdate" class="form-control" readonly />
        </div>
        <div class="col-2">
          <label class="form-label">수정자</label>
          <input v-model="select_data.updater" class="form-control" readonly />
        </div>
        <div class="col-4">
          <label class="form-label">수정일</label>
          <input v-model="select_data.updatedate" class="form-control" readonly />
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import { mapState,mapActions } from 'pinia'; //store사용 준비, state/actions를 사용.
  import { useListDataStore } from '../stores/listdata.js';
  import axios from 'axios';
  export default {
  name: "edit-view",
    data () {
        return {
        }
    },
    computed : {
      ...mapState(useListDataStore, ['select_data']),
        // getdata (){
        //     let data = {...this.editData};
        //     return data
        // }
    },
    mounted () {
    },
    methods : {
      ...mapActions(useListDataStore,['editData', 'getList', 'clearSelectData', 'selectedData']),
        async edit_save (){
          await axios.post('http://39.123.45.45:3002/savereport',{
            param : this.select_data
          }).then((response)=>{
            if(response.data.msg == 'Created'){// id를 안보낼 때 => 신규 id 반환.
              alert("추가 완료"+response.data.id);
            } else { //Updated 
              alert("수정 완료"+response.data.id);
            }
            this.getList(); //수정 또는 저장 이후, listview 리프레쉬.
            this.selectedData(response.data.id); //수정 또는 저장이 된 후, 수정 된 데이터를 리프레쉬.
          }).catch((e)=>{
            console.log(e)
          })
        },
        go_list (){
          // this.getList(); //list로 돌아갈 때 리스트 array refesh용인데.. listview에 mouted있어서 주석...
          this.$router.push({
            name : 'list-view'
          });
        },
        clear_all() {
          this.clearSelectData();
        },
        async del_data(){
          if(confirm("삭제할까요?")){
            await axios.post('http://39.123.45.45:3002/delreport',{
              param : {
                id : this.select_data.id
              }
            }).then((response)=>{
              if(response.data.msg == 'Deleted'){
                alert("삭제 완료!");
                this.clearSelectData(); // store의 수정 중 데이터 삭제
                this.$router.push({ // listview로 이동
                  name : 'list-view'
                });
              } else {
                alert('삭제 실패!');
              }
            }).catch((e)=>{
              console.log(e);
            });
          }
        }
    }
  }
  </script>
  
  <style>
  
  </style>