const cos = Math.cos
const sin = Math.sin
const PI = Math.PI
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5
export default () => ({
  linear(x: number) {
    return x
  },
  easeInSine(x: number) {
    return 1 - cos(0.5 * x * PI)
  },
  easeOutSine(x: number) {
    return sin(0.5 * x * PI)
  },
  easeInOutSine(x: number) {
    return 0.5 - 0.5 * cos(PI * x)
  },
  easeInQuad(x: number) {
    return x ** 2
  },
  easeOutQuad(x: number) {
    return 1 - (1 - x) ** 2
  },
  easeInOutQuad(x: number) {
    return x < 0.5 ? 2 * x ** 2 : 1 - 0.5 * (-2 * x + 2) ** 2
  },
  easeInCubic(x: number) {
    return x ** 3
  },
  easeOutCubic(x: number) {
    return 1 - (1 - x) ** 3
  },
  easeInOutCubic(x: number) {
    return x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3
  },
  easeInQuart(x: number) {
    return x ** 4
  },
  easeOutQuart(x: number) {
    return 1 - (1 - x) ** 4
  },
  easeInOutQuart(x: number) {
    return x < 0.5 ? 8 * x ** 4 : 1 - 0.5 * (-2 * x + 2) ** 4
  },
  easeInQuint(x: number) {
    return x ** 5
  },
  easeOutQuint(x: number) {
    return 1 - (1 - x) ** 5
  },
  easeInOutQuint(x: number) {
    return x < 0.5 ? 16 * x ** 5 : 1 - 0.5 * (-2 * x + 2) ** 5
  },
  easeInExpo(x: number) {
    return x === 0 ? 0 : 2 ** (10 * x - 10)
  },
  easeOutExpo(x: number) {
    return x === 1 ? 1 : 1 - 2 ** (-10 * x)
  },
  easeInOutExpo(x: number) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? 0.5 * 2 ** (20 * x - 10)
      : 1 - 2 ** (-20 * x + 9)
  },
  easeInCirc(x: number) {
    return 1 - (1 - x ** 2) ** 0.5
  },
  easeOutCirc(x: number) {
    return (1 - (x - 1) ** 2) ** 0.5
  },
  easeInOutCirc(x: number) {
    return x < 0.5
      ? 0.5 * (1 - (1 - (2 * x) ** 2) ** 0.5)
      : 0.5 * ((1 - (-2 * x + 2) ** 2) ** 0.5 + 1)
  },
  easeInBack(x: number) {
    return c3 * x ** 3 - c1 * x ** 2
  },
  easeOutBack(x: number) {
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2
  },
  easeInOutBack(x: number) {
    return x < 0.5
      ? 0.5 * ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2))
      : 0.5 * ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2)
  },
  easeInElastic(x: number) {
    return x === 0 ? 0 : x === 1 ? 1 : -(2 ** (10 * x - 10)) * sin((x * 10 - 10.75) * c4)
  },
  easeOutElastic(x: number) {
    return x === 0 ? 0 : x === 1 ? 1 : 2 ** (-10 * x) * sin((x * 10 - 0.75) * c4) + 1
  },
  easeInOutElastic(x: number) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -0.5 * (2 ** (20 * x - 10) * sin((20 * x - 11.125) * c5))
      : 0.5 * (2 ** (-20 * x + 10) * sin((20 * x - 11.125) * c5)) + 1
  },
  easeInBounce(x: number) {
    return 1 - this.easeOutBounce(1 - x)
  },
  easeOutBounce(x: number) {
    const n1 = 7.5625
    const d1 = 2.75
    if (x < 1 / d1) {
      return n1 * x ** 2
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
  },
  easeInOutBounce(x: number) {
    return x < 0.5
      ? 0.5 * (1 - this.easeOutBounce(1 - 2 * x))
      : 0.5 * (1 + this.easeOutBounce(2 * x - 1))
  }
})
