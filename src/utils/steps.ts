export default (steps = 10) => {
  return (x: number) =>
    Math.ceil(Math.min(Math.max(x, 0.000001), 1) * steps) * (1 / steps)
}
