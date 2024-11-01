export default ({ target, direction = 'normal', loop = 1, autoplay = true, duration = 300, delay = 0, round = 0, easing = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - 0.5 * (-2 * x + 2) ** 3), update, begin, complete, ...extra }) => {
    const origin = {
        ...target
    };
    const final = {
        ...target
    };
    const values = extra;
    for (let key in values) {
        const value = values[key];
        if (typeof value === 'number') {
            values[key] = {
                value,
                duration,
                delay,
                round,
                easing
            };
            final[key] = value;
        }
        else {
            values[key] = {
                duration,
                delay,
                round,
                easing,
                ...value
            };
            final[key] = value.value;
        }
    }
    function reset(finish) {
        const source = finish ? (normal ? final : origin) : normal ? origin : final;
        for (let key in source) {
            target[key] = source[key];
        }
    }
    function teleport(time) {
        update && update(anim);
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                const { value, duration, delay, round, easing } = values[key];
                const x = (time - delay) / duration;
                if (x < 0) {
                    target[key] = origin[key];
                    continue;
                }
                if (x > 1) {
                    target[key] = final[key];
                    continue;
                }
                const y = easing(x);
                target[key] =
                    Math.round((origin[key] + (value - origin[key]) * y) * 10 ** round) /
                        10 ** round;
            }
        }
    }
    function run() {
        const time = normal ? Date.now() - start : total - Date.now() + start;
        anim.progress = time / total;
        if (anim.progress > 1 || anim.progress < 0) {
            reset(true);
            update && update(anim);
            if (--times === 0) {
                cancelAnimationFrame(frame);
                motion = false;
                timestamp = 0;
                complete && complete(anim);
            }
            else {
                normal = direction === 'alternate' ? !normal : normal;
                start = Date.now();
                frame = requestAnimationFrame(run);
            }
            return;
        }
        teleport(time);
        frame = requestAnimationFrame(run);
    }
    let total = duration;
    for (let key in values) {
        total = Math.max(total, values[key].delay + values[key].duration);
    }
    let motion = false;
    let timestamp = 0;
    let start = Date.now();
    let times = loop;
    let normal = direction !== 'reverse';
    let frame = 0;
    reset();
    const anim = {
        target,
        progress: 0,
        play() {
            if (motion) {
                return;
            }
            motion = true;
            if (!timestamp) {
                start = Date.now();
                times = loop;
                normal = direction !== 'reverse';
                begin && begin(anim);
            }
            else {
                start += Date.now() - timestamp;
            }
            frame = requestAnimationFrame(run);
        },
        pause() {
            cancelAnimationFrame(frame);
            motion = false;
            timestamp = Date.now();
        },
        restart() {
            anim.pause();
            timestamp = 0;
            anim.play();
        },
        reverse() {
            normal = !normal;
            start = 2 * Date.now() - total - start;
        },
        seek(x) {
            if (motion || timestamp) {
                return;
            }
            requestAnimationFrame(() => {
                anim.progress = x;
                let time = x * total;
                teleport(time);
            });
        }
    };
    autoplay && anim.play();
    return anim;
};
