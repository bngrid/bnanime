# bnanime

一个由数值对象驱动的 JavaScript 动画引擎。

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
  top: 0
}

const animation = animes({
  // 所有属性的值类型均为number的Javascript对象（必需）
  target: position,
  // 动画参数：方向（类型：'normal' | 'reverse' | 'alternate'，默认：'normal'）
  direction: 'alternate',
  // 动画参数：迭代次数（类型：number，默认值：1）
  loop: 2,
  // 动画参数：自动播放（类型：boolean，默认值：true）
  autoplay: false,
  // 属性参数：持续时间（类型：number，单位：毫秒，默认值：300）
  duration: 2000,
  // 属性参数：延迟（类型：number，单位：毫秒，默认值：0）
  delay: 0,
  // 属性参数：四舍五入到小数点后的位数（类型：number，默认值：0）
  round: 1,
  // 属性参数：缓动函数（类型：(x: number) => number，默认值：(x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3)）
  easing: (x: number) => x,
  // 对象属性参数：上述Javascript对象中的属性（类型：number，必需）
  left: 300,
  // 对象属性参数：上述Javascript对象中的属性，还可以使用对象作为值来定义动画每个属性的具体参数。对象中未指定的其他属性将从主动画继承。（类型：{ value: number; duration?: number; delay?: number; round?: number; easing?: (x: number) => number }，必需）
  top: {
    value: 300,
    duration: 2000,
    delay: 1000,
    round: 0,
    easing: (x: number) => sin(0.5 * x * Math.PI)
  },
  // 回调函数：动画开始播放时，触发一次
  begin(anim) {
    console.log('动画开始')
  },
  // 回调函数：动画完成时，触发一次
  complete(anim) {
    console.log('动画结束')
  },
  // 回调函数：动画开始播放时每帧都会触发
  update(anim) {
    console.log(`动画进度：${anim.progress}`)
  }
})

// 动画控件
// animation和上述回调函数中的anim类型均为：{ target: { [key in keyof Target]: number }; progress: number; play: () => void; pause: () => void; restart: () => void; reverse: () => void; seek: (x: number) => void }
// 播放：play()（播放暂停的动画）
// 暂停：pause()（暂停正在运行的动画）
// 重启：restart()（从初始值重新启动动画）
// 反转：reverse()（反转动画的方向）
// 跳转到特定进度：play(0.5)（进度在0到1之间，必须在动画停止时才能调用）
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

animes({
  target: position,
  left: 300,
  top: 300,
  easing: easing().linear
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

animes({
  target: position,
  left: 300,
  top: 300,
  easing: bezier(0.25, 0.1, 0.25, 1.0)
})
```
