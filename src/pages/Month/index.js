import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from 'lodash'
import DailyBill from "@/pages/Month/components/DayBill";

const Month = () => {
  //按月做数据的分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  console.log(monthGroup)
  // 控制日期弹窗的打开和关闭
  const [dateVisiable, setDateVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  const [currentMonthList, setMonthList] = useState([])
  const monthResult = useMemo(() => {
    // 支出  /  收入  / 结余
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }

  }, [currentMonthList])
  // 初始化的时候把当前月的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    // 边界值控制
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])
  const onConfirm = (date) => {
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)
    setMonthList(monthGroup[formatDate])
    // 关闭弹框
    setDateVisible(false)
  }

  // 当前月按照日来做分组
  const dayGroup = useMemo(() => {
    // return出去计算之后的值
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    }
  }, [currentMonthList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
            {currentDate + ''}月账单
            </span>
            {/* 控制箭头 */}
            <span className={classNames('arrow', dateVisiable && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisiable}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClear={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
          })
        }
      </div>
    </div>
  )
}

export default Month