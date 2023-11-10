import {Outlet} from "react-router-dom";
import {Button} from "antd-mobile";

const Layout = () => {
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