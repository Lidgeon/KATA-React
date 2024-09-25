import { Component, Fragment } from 'react'
import classNames from 'classnames'

export default class Timer extends Component {
  state = {
    genTime: null,
    timerNotWork: false,
  }

  componentDidMount() {
    this.setState(() => {
      const time = Number(this.props.item.min) * 60 + Number(this.props.item.sec)
      return {
        genTime: time,
      }
    })
  }

  componentDidUpdate(pr) {
    if (this.props.item.completed !== pr.item.completed) {
      this.setState(() => ({
        timerNotWork: false,
      }))
      clearInterval(this.timerID)
    }
  }

  componentWillUnmount() {
    const time = this.timeMinSecConvert(this.state.genTime)
    this.props.timerUpdate(this.props.item.id, ...time)
    clearInterval(this.timerID)
  }

  timeConvert = (num) => {
    let m = 0
    let s = 0
    if (num / 60 >= 1) {
      m = Math.floor(num / 60)
    }
    s = num % 60
    while (s.toString().length < 2) {
      s = '0' + s
    }
    if (num < 0) {
      clearInterval(this.timerID)
    }
    const res = `${m}:${s}`
    return num > -1 ? res : 'Время вышло'
  }

  timeMinSecConvert = (num) => {
    let m = 0
    let s = 0
    if (num / 60 >= 1) {
      m = Math.floor(num / 60)
    }
    s = num % 60
    return [m, s]
  }

  timer = () => {
    this.setState(({ genTime }) => ({
      genTime: genTime - 1,
    }))
  }

  timerOn = () => {
    this.setState(({ timerNotWork }) => ({
      timerNotWork: !timerNotWork,
    }))
    if (!this.state.timerNotWork) {
      this.timerID = setInterval(() => this.timer(), 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  onTimerPlay = () => {
    if (!this.props.item.completed) {
      this.timerOn()
    } else {
      clearInterval(this.timerID)
      this.setState(() => ({
        timerNotWork: false,
      }))
    }
  }

  render() {
    const timerTaskStatus = classNames('timer-icon', {
      'icon-play': !this.state.timerNotWork,
      'icon-pause': this.state.timerNotWork,
    })

    return (
      <Fragment>
        <button className={timerTaskStatus} onClick={this.onTimerPlay} />{' '}
        <div className="timer">{this.timeConvert(this.state.genTime)}</div>
      </Fragment>
    )
  }
}
