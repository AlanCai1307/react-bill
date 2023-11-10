// 账单列表相关store
import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    //同步修改
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

//解构出创建的action对象函数
const {setBillList} = billStore.actions
//编写异步请求
const getBillList = ()=>{
  return async (dispatch)=>{
    const res = await axios.get('http://localhost:8888/ka')
    //触发同步reducer
    dispatch(setBillList(res.data))
  }
}
//获取reducer函数
const billListReducer = billStore.reducer
export {getBillList}
export default billListReducer
