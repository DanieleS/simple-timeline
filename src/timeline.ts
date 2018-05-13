import * as d3 from "d3-interpolate";
import { IKeyframe } from "./models/keyframe";

export class Timeline {
    constructor(
        private keyframes: IKeyframe[],
        private easingFunction: (x: number) => number = (x) => x) { }

    public getAt(perc: number): IKeyframe {
        perc = this.normalizePerc(perc);
        const [k1, k2] = this.getKeyframesCouple(perc);
        const finalPerc = (perc - k1.time) * (1 / (k2.time - k1.time));
        return d3.interpolate(k1, k2)(this.easingFunction(finalPerc));
    }

    private getKeyframesCouple(perc: number) {
        const startKeyframeIndex = this.keyframes
            .findIndex((keyframe, i, arr) => keyframe.time <= perc && arr[i + 1].time >= perc);
        return [this.keyframes[startKeyframeIndex], this.keyframes[startKeyframeIndex + 1]];
    }

    private normalizePerc(p: number) {
        return p < 0 ? 0 : p > 1 ? 1 : p;
    }
}
