import {Outlet} from "react-router-dom";
import {Button} from "antd-mobile";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getBillList} from "@/store/modules/billStore";

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  },[dispatch])
  return (
    <div>
      <Outlet/>
      我是Layout
      <Button color='primary'>全局按钮</Button>
      <div className='puple'>
        <Button color='primary'>局部按钮</Button>
      </div>

    </div>
  )
}

export default Layout