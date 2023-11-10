import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet/>
      我是Layout
    </div>
  )
}

export default Layout