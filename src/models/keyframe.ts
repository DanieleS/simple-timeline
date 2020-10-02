export interface IKeyframeValue<T extends string | number> {
    [index: string]: T;
}
export interface IKeyframe<T extends string | number> {
    time: number;
    value: IKeyframeValue<T>;
}
