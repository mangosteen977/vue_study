import { defineStore } from "pinia";
import axios from 'axios';
import dayjs from 'dayjs'; // 날짜 형식 변경을 위해..
export const useListDataStore = defineStore("listdata",{
    state : ()=>({
        //vue data 부분, vue에서 사용/저장 가능.
        data_arr : [],
        select_data : {},
        diaryDay_arr : []
    }),
    getters : {

    },
    actions : {
        // vue methods 부분
        // sotre의 데이터는 뷰에서 사용은 불가, 수정은 여기 actions에서.
        writeDiary (date) { //calendarView에서 선택한 날짜의 값을 가져옴.
            this.select_data = {
                workday : date
            };
        },
        addData (data){ //addDataView를 위한 페이지.. 사용 안함.
            console.log("store ",data);
            this.data_arr.push(data);
            console.log("store ",this.data_arr);

        },
        editData (item) { // listView에서 선택 된 게시글의 배열
            this.select_data = item;
        },
        async getList() { // db에서 저장된 배열 값 가져오기.. 전체 List 및 일기가 있는 날짜 확인용 배열(diaryDay_arr)생성.
            let result = await axios.get('http://39.123.45.45:3002/getreport');
            //axios get = axios.get('URL'); // params 
            //axios post = axios.post('URL',data); // body
            let diaryDay_arr = [];
            result.data.map((item)=>{
                item.workday = item.workday ? dayjs(item.workday).format('YYYY-MM-DD'):null;
                item.createdate = item.createdate ? dayjs(item.createdate).format('YYYY-MM-DD HH:mm:ss'):null;
                item.updatedate = item.updatedate ? dayjs(item.updatedate).format('YYYY-MM-DD HH:mm:ss'):null;

                // diaryDay_arr (일기용 배열)
                diaryDay_arr.push({
                    id : item.id,
                    workday : item.workday
                })
            })
            this.data_arr = result.data;
            this.diaryDay_arr = diaryDay_arr;
            // console.log(this.data_arr);
            console.log("여긴 store",this.diaryDay_arr);
        },
        clearSelectData (){ // listView에서 선택 했던 배열을 초기화용
            this.select_data = {};
        },
        async selectedData (id) { // editView에서 수정 또는 저장이 된 후, 해당 페이지에 수정 된 데이터를 id값으로 불러와 리프레쉬..
            let result = await axios.post('http://39.123.45.45:3002/getdetail',{
                param : [id]
            });
            let data = result.data[0];
            data.workday = data.workday ? dayjs(data.workday).format('YYYY-MM-DD'):null;
            data.createdate = data.createdate ? dayjs(data.createdate).format('YYYY-MM-DD HH:mm:ss'):null;
            data.updatedate = data.updatedate ? dayjs(data.updatedate).format('YYYY-MM-DD HH:mm:ss'):null;
            this.select_data = data
        },
    }
});

// state : ()=>({

// }),
// getters : {

// },
// actions : {

// }