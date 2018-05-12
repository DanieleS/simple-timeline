import { IKeyframe } from "./models/keyframe";

export class Timeline {
    constructor(
        private keyframes: IKeyframe[],
        private easingFunction: (x: number) => number = (x) => x) { }
}
