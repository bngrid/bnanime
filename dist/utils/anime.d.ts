export type Option<Object> = {
    object: {
        [key in keyof Object]: any;
    };
    total?: number;
    repeat?: number;
    alternate?: boolean;
    direction?: boolean;
    autoplay?: boolean;
    delay?: number;
    duration?: number;
    ease?: (x: number) => number;
    round?: number;
    begin?: (anim: Anim<Object>) => void;
    update?: (anim: Anim<Object>) => void;
    iterate?: (anim: Anim<Object>) => void;
    complete?: (anim: Anim<Object>) => void;
} & {
    [key in keyof Object]?: number | Value;
};
export type Value = {
    value: number;
    delay?: number;
    duration?: number;
    ease?: (x: number) => number;
    round?: number;
};
export type Anim<Object> = {
    object: Object;
    active: boolean;
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
    progress: (x?: number) => number;
    total: (x?: number) => number;
    repeat: (x?: number) => number;
    remove: (x: string) => void;
    revert: (x: string) => void;
};
declare const _default: <Object>({ object, total, repeat, alternate, direction, autoplay, delay, duration, ease, round, begin, update, iterate, complete, ...extra }: Option<Object>) => Anim<Object>;
export default _default;
