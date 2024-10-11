import { Fragment, useState, useEffect } from 'react'
import classNames from 'classnames'

const Timer = ({ item, timerUpdate }) => {
  const [genTime, setGenTime] = useState(null)
  const [timerWork, setTimerWork] = useState(false)

  const { id, completed, time } = item

  useEffect(() => {
    const sumTime = Number(time.min) * 60 + Number(time.sec)
    setGenTime(sumTime)
  }, [])

  let timerId

  const timeConvert = (num) => {
    let m = 0
    let s = 0
    if (num / 60 >= 1) {
      m = Math.floor(num / 60)
    }
    s = num % 60
    while (s.toString().length < 2) {
      s = '0' + s
    }
    const res = `${m}:${s}`
    return num > -1 ? res : 'Время вышло'
  }

  const timeMinSecConvert = (num) => {
    let m = 0
    let s = 0
    if (num / 60 >= 1) {
      m = Math.floor(num / 60)
    }
    s = num % 60
    return [m, s]
  }

  useEffect(() => {
    if (timerWork) {
      timerId = setInterval(() => {
        setGenTime(genTime - 1)
      }, 1000)
      if (genTime < 0) {
        setTimerWork(false)
        clearInterval(timerId)
      }
      return () => {
        const time = timeMinSecConvert(genTime)
        timerUpdate(id, ...time)
        clearInterval(timerId)
      }
    }
  }, [genTime, timerWork])

  useEffect(() => {
    if (completed) {
      setTimerWork(false)
      clearInterval(timerId)
    }
  })

  const onTimerPlay = () => {
    if (!completed) {
      if (!timerWork) {
        setTimerWork(true)
      } else {
        setTimerWork(false)
      }
    }
  }

  const timerTaskStatus = classNames('timer-icon', {
    'icon-play': !timerWork,
    'icon-pause': timerWork,
  })

  return (
    <Fragment>
      <button className={timerTaskStatus} onClick={onTimerPlay} /> <div className="timer">{timeConvert(genTime)}</div>
    </Fragment>
  )
}

export default Timer
