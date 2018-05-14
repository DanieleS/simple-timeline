export interface IKeyframeValue {
    [index: string]: string | number;
}
export interface IKeyframe {
    time: number;
    value: IKeyframeValue;
}
