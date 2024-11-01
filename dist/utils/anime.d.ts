type Option<Target> = {
    target: {
        [key in keyof Target]: number;
    };
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: number;
    autoplay?: boolean;
    duration?: number;
    delay?: number;
    round?: number;
    easing?: (x: number) => number;
    update?: (anim: Anim<{
        [key in keyof Target]: number;
    }>) => void;
    begin?: (anim: Anim<{
        [key in keyof Target]: number;
    }>) => void;
    complete?: (anim: Anim<{
        [key in keyof Target]: number;
    }>) => void;
} & {
    [key in keyof Target]: number | Result;
};
type Result = {
    value: number;
    duration?: number;
    delay?: number;
    round?: number;
    easing?: (x: number) => number;
};
type Anim<Target> = {
    target: {
        [key in keyof Target]: number;
    };
    progress: number;
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
    seek: (x: number) => void;
};
declare const _default: <Target>({ target, direction, loop, autoplay, duration, delay, round, easing, update, begin, complete, ...extra }: Option<Target>) => Anim<Target>;
export default _default;
