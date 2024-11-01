type Option<Target> = {
  target: { [key in keyof Target]: number }
  direction?: 'normal' | 'reverse' | 'alternate'
  loop?: number
  autoplay?: boolean
  duration?: number
  delay?: number
  round?: number
  easing?: (x: number) => number
  update?: (anim: Anim<{ [key in keyof Target]: number }>) => void
  begin?: (anim: Anim<{ [key in keyof Target]: number }>) => void
  complete?: (anim: Anim<{ [key in keyof Target]: number }>) => void
} & {
  [key in keyof Target]: number | Result
}
type Result = {
  value: number
  duration?: number
  delay?: number
  round?: number
  easing?: (x: number) => number
}
type Anim<Target> = {
  target: { [key in keyof Target]: number }
  progress: number
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  seek: (x: number) => void
}
export default <Target>({
  target,
  direction = 'normal',
  loop = 1,
  autoplay = true,
  duration = 300,
  delay = 0,
  round = 0,
  easing = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3),
  update,
  begin,
  complete,
  ...extra
}: Option<Target>) => {
  const origin: { [key in keyof Target]: number } = {
    ...target
  }
  const final: { [key in keyof Target]: number } = {
    ...target
  }
  const values = <{ [key in keyof Target]: Required<Result> }>(<unknown>extra)
  for (let key in values) {
    const value: number | Result = values[key]
    if (typeof value === 'number') {
      values[key] = {
        value,
        duration,
        delay,
        round,
        easing
      }
      final[key] = value
    } else {
      values[key] = {
        duration,
        delay,
        round,
        easing,
        ...value
      }
      final[key] = value.value
    }
  }
  function reset(finish?: boolean) {
    const source = finish ? (normal ? final : origin) : normal ? origin : final
    for (let key in source) {
      target[key] = source[key]
    }
  }
  function teleport(time: number) {
    update && update(anim)
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        const { value, duration, delay, round, easing } = values[key]
        const x = (time - delay) / duration
        if (x < 0) {
          target[key] = origin[key]
          continue
        }
        if (x > 1) {
          target[key] = final[key]
          continue
        }
        const y = easing(x)
        target[key] =
          Math.round((origin[key] + (value - origin[key]) * y) * 10 ** round) /
          10 ** round
      }
    }
  }
  function run() {
    const time = normal ? Date.now() - start : total - Date.now() + start
    anim.progress = time / total
    if (anim.progress > 1 || anim.progress < 0) {
      reset(true)
      update && update(anim)
      if (--times === 0) {
        cancelAnimationFrame(frame)
        motion = false
        timestamp = 0
        complete && complete(anim)
      } else {
        normal = direction === 'alternate' ? !normal : normal
        start = Date.now()
        frame = requestAnimationFrame(run)
      }
      return
    }
    teleport(time)
    frame = requestAnimationFrame(run)
  }
  let total = duration
  for (let key in values) {
    total = Math.max(total, values[key].delay + values[key].duration)
  }
  let motion = false
  let timestamp = 0
  let start = Date.now()
  let times = loop
  let normal = direction !== 'reverse'
  let frame = 0
  reset()
  const anim: Anim<Target> = {
    target,
    progress: 0,
    play() {
      if (motion) {
        return
      }
      motion = true
      if (!timestamp) {
        start = Date.now()
        times = loop
        normal = direction !== 'reverse'
        begin && begin(anim)
      } else {
        start += Date.now() - timestamp
      }
      frame = requestAnimationFrame(run)
    },
    pause() {
      cancelAnimationFrame(frame)
      motion = false
      timestamp = Date.now()
    },
    restart() {
      anim.pause()
      timestamp = 0
      anim.play()
    },
    reverse() {
      normal = !normal
      start = 2 * Date.now() - total - start
    },
    seek(x: number) {
      if (motion || timestamp) {
        return
      }
      requestAnimationFrame(() => {
        anim.progress = x
        let time = x * total
        teleport(time)
      })
    }
  }
  autoplay && anim.play()
  return anim
}
