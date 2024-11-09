# bnanime

一个由对象驱动的 JavaScript 动画引擎。

代码和文档中若有不严谨的地方，请通过邮箱<bngrid@outlook.com>联系我批评指正，谢谢。

## 安装

```bush
npm i bnanime
```

## anime

```js
import { anime } from 'bnanime'

const position = {
  left: 0,
  top: 0，
  other: 'ignore'
}

const animation = anime({
  // Javascript对象，只有类型为number的字段可以进行动画（必需）
  object: position,
  // 动画参数：总时长（类型：number，单位：毫秒，默认值：自动计算，可以获取和修改）
  total: true,
  // 动画参数：重复次数（类型：number，默认值：0，可以获取和修改）
  repeat: 2,
  // 动画参数：方向是否自动切换（类型：boolean，默认值：false，无法获取和修改）
  alternate: true,
  // 动画参数：方向是否为正向（类型：boolean，默认值：true，无法修改）
  direction: true,
  // 动画参数：自动播放（类型：boolean，默认值：true，无法获取和修改）
  autoplay: false,
  // 属性参数：延迟（类型：number，单位：毫秒，默认值：0）
  delay: 0,
  // 属性参数：持续时间（类型：number，单位：毫秒，默认值：1000）
  duration: 2000,
  // 属性参数：缓动函数（类型：(x: number) => number，默认值：(x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3)）
  ease: (x: number) => x,
  // 属性参数：四舍五入到小数点后的位数（类型：number，默认值：0）
  round: 1,
  // 对象属性参数：上述Javascript对象中的属性（类型：number，必需）
  left: 300,
  // 对象属性参数：上述Javascript对象中的数值属性，还可以使用对象作为值来定义动画每个属性的具体参数。对象中未指定的其他属性将从主动画继承。（类型：{
  //   value: number
  //   delay?: number
  //   duration?: number
  //   ease?: (x: number) => number
  //   round?: number
  // } ，必需）
  top: {
    value: 300,
    duration: 2000,
    delay: 1000,
    round: 0,
    ease: (x: number) => sin(0.5 * x * Math.PI)
  },
  // 回调函数：动画从头开始播放时，触发一次
  begin(anim) {
    console.log('动画开始')
  },
  // 回调函数：动画开始播放时每帧都会触发
  update(anim) {
    console.log(`动画进度：${anim.progress}`)
  }
  // 回调函数：动画每完成一次，触发一次
  iterate(anim) {
    console.log('动画结束')
  },
  // 回调函数：动画全部完成时，触发一次
  complete(anim) {
    console.log('动画结束')
  }
})

// 动画控件
// animation和上述回调函数中的anim类型均为：{
//   object: Object
//   active: boolean
//   play: () => void
//   pause: () => void
//   restart: () => void
//   reverse: () => void
//   progress: (x?: number) => number
//   total: (x?: number) => number
//   repeat: (x?: number) => number
//   remove: (x: string) => void
//   revert: (x: string) => void
// }
// 播放：play()（播放暂停的动画）
// 暂停：pause()（暂停正在运行的动画）
// 重启：restart()（从初始值重新启动动画）
// 反转：reverse()（反转动画的方向）
// 跳转到特定进度：progress(1000)（进度在0到动画总时长之间，必须在active为false时才能调用，返回当前进度）
// 修改动画总时长：total(3000)（可以用于截断动画，或者延长下一次重复动画的开始时间，返回当前总时长）
// 修改重复次数：repeat(3)（修改后会将播放次数拉满，返回当前重复次数）
// 移除一个字段的动画效果：remove('top')（移除后这个字段的动画将会被跳过）
// 恢复一个字段的动画效果：revert('top')（恢复后这个字段的动画将会根据时间总线继续进行）
```

## easing

内置提供了线性函数 linear 和[Penner 缓动函数](https://easings.net/zh-cn)

| In            | Out            | In-Out           |
| ------------- | -------------- | ---------------- |
| easeInSine    | easeOutSine    | easeInOutSine    |
| easeInQuad    | easeOutQuad    | easeInOutQuad    |
| easeInCubic   | easeOutCubic   | easeInOutCubic   |
| easeInQuart   | easeOutQuart   | easeInOutQuart   |
| easeInQuint   | easeOutQuint   | easeInOutQuint   |
| easeInExpo    | easeOutExpo    | easeInOutExpo    |
| easeInCirc    | easeOutCirc    | easeInOutCirc    |
| easeInBack    | easeOutBack    | easeInOutBack    |
| easeInElastic | easeOutElastic | easeInOutElastic |
| easeInBounce  | easeOutBounce  | easeInOutBounce  |

```js
import { anime, easing } from 'bnanime'

const position = {
  left: 0,
  top: 0
}

anime({
  object: position,
  left: 300,
  top: 300,
  ease: easing().linear
})
```

## bezier

内置提供了[三次贝塞尔曲线函数](https://cubic-bezier.tupulin.com/)

```js
import { anime, bezier } from 'bnanime'

const position = {
  left: 0,
  top: 0
}

anime({
  object: position,
  left: 300,
  top: 300,
  ease: bezier(0.25, 0.1, 0.25, 1.0)
})
```

## steps

内置提供了跳动缓动函数

```js
import { anime, steps } from 'bnanime'

const position = {
  left: 0,
  top: 0
}

anime({
  object: position,
  left: 300,
  top: 300,
  ease: steps(5) // 定义动画到达最终值所需的跳跃次数，默认值：10，最小值：1
})
```
