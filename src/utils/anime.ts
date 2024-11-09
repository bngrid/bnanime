export type Option<Object> = {
  object: { [key in keyof Object]: any }
  total?: number
  repeat?: number
  alternate?: boolean
  direction?: boolean
  autoplay?: boolean
  delay?: number
  duration?: number
  ease?: (x: number) => number
  round?: number
  begin?: (anim: Anim<Object>) => void
  update?: (anim: Anim<Object>) => void
  iterate?: (anim: Anim<Object>) => void
  complete?: (anim: Anim<Object>) => void
} & {
  [key in keyof Object]?: number | Value
}
export type Value = {
  value: number
  delay?: number
  duration?: number
  ease?: (x: number) => number
  round?: number
}
export type Anim<Object> = {
  object: Object
  active: boolean
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  progress: (x?: number) => number
  total: (x?: number) => number
  repeat: (x?: number) => number
  remove: (x: string) => void
  revert: (x: string) => void
}

export default <Object>({
  object,
  total = 0,
  repeat = 0,
  alternate = false,
  direction = true,
  autoplay = true,
  delay = 0,
  duration = 1000,
  ease = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3),
  round = 0,
  begin,
  update,
  iterate,
  complete,
  ...extra
}: Option<Object>) => {
  const initial = {
    ...object
  }
  const final = {
    ...object
  }
  const values = <{ [key in keyof Object]: Required<Value> }>(<unknown>extra)
  for (let key in values) {
    const value = <number | Value>values[key]
    if (typeof value === 'number') {
      values[key] = {
        value,
        delay,
        duration,
        ease,
        round
      }
      final[key] = value
    } else {
      values[key] = {
        delay,
        duration,
        ease,
        round,
        ...value
      }
      final[key] = value.value
    }
  }
  if (!total) {
    for (let key in values) {
      total = Math.max(total, values[key].delay + values[key].duration)
    }
  }
  function seek() {
    update && update(anim)
    for (let key in values) {
      const { value, delay, duration, ease, round } = values[key]
      if (ignore.includes(key)) {
        continue
      }
      if (time < delay) {
        object[key] = initial[key]
        continue
      }
      if (time > delay + duration) {
        object[key] = final[key]
        continue
      }
      const x = (time - delay) / duration
      const y = ease(x)
      object[key] =
        Math.round((initial[key] + (value - initial[key]) * y) * 10 ** round) /
        10 ** round
    }
  }
  function run() {
    time = direction ? Date.now() - start : total - Date.now() + start
    if (time > total || time < 0) {
      time = direction ? total : 0
      const value = direction ? final : initial
      for (let key in value) {
        object[key] = value[key]
      }
      update && update(anim)
      direction = alternate ? !direction : direction
      if (--loop === 0) {
        cancelAnimationFrame(frame)
        anim.active = false
        complete && complete(anim)
      } else {
        start = Date.now()
        iterate && iterate(anim)
        frame = requestAnimationFrame(run)
      }
      return
    }
    seek()
    frame = requestAnimationFrame(run)
  }
  let start = Date.now()
  let time = direction ? 0 : total
  let loop = repeat === -1 ? Infinity : repeat + 1
  let frame = 0
  let pause = false
  const ignore: string[] = []
  const value = direction ? initial : final
  for (let key in value) {
    object[key] = value[key]
  }
  const anim: Anim<Object> = {
    object,
    active: false,
    play: () => {
      if (anim.active) {
        return
      }
      anim.active = true
      if (pause) {
        start = direction ? Date.now() - time : time - total + Date.now()
      } else {
        start = Date.now()
        loop = repeat === -1 ? Infinity : repeat + 1
        begin && begin(anim)
      }
      pause = false
      frame = requestAnimationFrame(run)
    },
    pause: () => {
      cancelAnimationFrame(frame)
      anim.active = false
      pause = true
    },
    restart: () => {
      anim.pause()
      time = direction ? 0 : total
      pause = false
      anim.play()
    },
    reverse: () => {
      direction = !direction
      start = 2 * Date.now() - total - start
    },
    progress: x => {
      if (!anim.active && x !== undefined) {
        time = x
        seek()
      }
      return time
    },
    total: x => {
      if (x !== undefined) {
        total = x
      }
      return total
    },
    repeat: x => {
      if (x !== undefined) {
        repeat = x
        loop = repeat === -1 ? Infinity : repeat + 1
      }
      return repeat
    },
    remove: x => {
      if (!ignore.includes(x)) {
        ignore.push(x)
      }
    },
    revert: x => {
      if (ignore.includes(x)) {
        ignore.splice(ignore.indexOf(x), 1)
      }
    }
  }
  autoplay && anim.play()
  return anim
}
