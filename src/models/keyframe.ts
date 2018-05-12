export type IKeyframeValue = object | number;

export interface IKeyframe {
    time: number;
    value: IKeyframeValue;
}
