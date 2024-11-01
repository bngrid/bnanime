const A = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1
const B = (a1: number, a2: number) => 3 * a2 - 6 * a1
const C = (a1: number) => 3 * a1
function calcBezier(t: number, a1: number, a2: number) {
  return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t
}
function getSlope(t: number, a1: number, a2: number) {
  return 3 * A(a1, a2) * t ** 2 + 2 * B(a1, a2) * t + C(a1)
}
function binarySubdivide(x: number, a: number, b: number, x1: number, x2: number) {
  let X
  let T
  let i = 0
  do {
    T = a + 0.5 * (b - a)
    X = calcBezier(T, x1, x2) - x
    if (X > 0) {
      b = T
    } else {
      a = T
    }
  } while (Math.abs(X) > 0.0000001 && i++ < 10)
  return T
}
function newtonRaphsonIterate(x: number, t: number, x1: number, x2: number) {
  for (let i = 0; i < 4; i++) {
    const currentSlope = getSlope(t, x1, x2)
    if (currentSlope === 0) {
      return t
    }
    const currentX = calcBezier(t, x1, x2) - x
    t -= currentX / currentSlope
  }
  return t
}
export default (x1: number, y1: number, x2: number, y2: number) => {
  if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
    throw new Error('贝塞尔 x 值必须在 [0, 1] 范围内')
  }
  if (x1 === y1 && x2 === y2) {
    return (x: number) => x
  }
  const sampleValues = new Float32Array(11)
  for (let i = 0; i < 11; i++) {
    sampleValues[i] = calcBezier(0.1 * i, x1, x2)
  }
  function getTForX(x: number) {
    let intervalStart = 0
    let currentSample = 1
    while (currentSample !== 10 && sampleValues[currentSample] <= x) {
      intervalStart += 0.1
      currentSample++
    }
    currentSample--
    const dist =
      (x - sampleValues[currentSample]) /
      (sampleValues[currentSample + 1] - sampleValues[currentSample])
    const guessForT = intervalStart + 0.1 * dist
    const initialSlope = getSlope(guessForT, x1, x2)
    if (initialSlope >= 0.001) {
      return newtonRaphsonIterate(x, guessForT, x1, x2)
    } else if (initialSlope === 0) {
      return guessForT
    } else {
      return binarySubdivide(x, intervalStart, intervalStart + 0.1, x1, x2)
    }
  }
  return (x: number) => {
    if (x === 0 || x === 1) {
      return x
    }
    return calcBezier(getTForX(x), y1, y2)
  }
}
