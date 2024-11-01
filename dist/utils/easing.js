const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;
export default () => ({
    linear(x) {
        return x;
    },
    easeInSine(x) {
        return 1 - cos(0.5 * x * PI);
    },
    easeOutSine(x) {
        return sin(0.5 * x * PI);
    },
    easeInOutSine(x) {
        return 0.5 - 0.5 * cos(PI * x);
    },
    easeInQuad(x) {
        return x ** 2;
    },
    easeOutQuad(x) {
        return 1 - (1 - x) ** 2;
    },
    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x ** 2 : 1 - 0.5 * (-2 * x + 2) ** 2;
    },
    easeInCubic(x) {
        return x ** 3;
    },
    easeOutCubic(x) {
        return 1 - (1 - x) ** 3;
    },
    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3;
    },
    easeInQuart(x) {
        return x ** 4;
    },
    easeOutQuart(x) {
        return 1 - (1 - x) ** 4;
    },
    easeInOutQuart(x) {
        return x < 0.5 ? 8 * x ** 4 : 1 - 0.5 * (-2 * x + 2) ** 4;
    },
    easeInQuint(x) {
        return x ** 5;
    },
    easeOutQuint(x) {
        return 1 - (1 - x) ** 5;
    },
    easeInOutQuint(x) {
        return x < 0.5 ? 16 * x ** 5 : 1 - 0.5 * (-2 * x + 2) ** 5;
    },
    easeInExpo(x) {
        return x === 0 ? 0 : 2 ** (10 * x - 10);
    },
    easeOutExpo(x) {
        return x === 1 ? 1 : 1 - 2 ** (-10 * x);
    },
    easeInOutExpo(x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? 0.5 * 2 ** (20 * x - 10)
                    : 1 - 2 ** (-20 * x + 9);
    },
    easeInCirc(x) {
        return 1 - (1 - x ** 2) ** 0.5;
    },
    easeOutCirc(x) {
        return (1 - (x - 1) ** 2) ** 0.5;
    },
    easeInOutCirc(x) {
        return x < 0.5
            ? 0.5 * (1 - (1 - (2 * x) ** 2) ** 0.5)
            : 0.5 * ((1 - (-2 * x + 2) ** 2) ** 0.5 + 1);
    },
    easeInBack(x) {
        return c3 * x ** 3 - c1 * x ** 2;
    },
    easeOutBack(x) {
        return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
    },
    easeInOutBack(x) {
        return x < 0.5
            ? 0.5 * ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2))
            : 0.5 * ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2);
    },
    easeInElastic(x) {
        return x === 0 ? 0 : x === 1 ? 1 : -(2 ** (10 * x - 10)) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic(x) {
        return x === 0 ? 0 : x === 1 ? 1 : 2 ** (-10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic(x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -0.5 * (2 ** (20 * x - 10) * sin((20 * x - 11.125) * c5))
                    : 0.5 * (2 ** (-20 * x + 10) * sin((20 * x - 11.125) * c5)) + 1;
    },
    easeInBounce(x) {
        return 1 - this.easeOutBounce(1 - x);
    },
    easeOutBounce(x) {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x ** 2;
        }
        else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        }
        else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        }
        else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
    easeInOutBounce(x) {
        return x < 0.5
            ? 0.5 * (1 - this.easeOutBounce(1 - 2 * x))
            : 0.5 * (1 + this.easeOutBounce(2 * x - 1));
    }
});
