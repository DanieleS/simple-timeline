import * as d3 from "d3-interpolate";
import { IKeyframe } from "./models/keyframe";

export class Timeline {
    private fullKeyframes: IKeyframe[];

    constructor(
        private keyframes: IKeyframe[],
        private easingFunction: (x: number) => number = (x) => x) {
        this.keyframes.sort(this.keyframeComparer);
        this.fullKeyframes = this.getFullKeyframes();
    }

    public getAt(perc: number): IKeyframe {
        perc = this.boundPerc(perc);
        const [k1, k2] = this.getKeyframesCouple(perc);
        const finalPerc = this.normalizePerc(perc, k1.time, k2.time);
        return d3.interpolate(k1, k2)(this.easingFunction(finalPerc));
    }

    private keyframeComparer(k1: IKeyframe, k2: IKeyframe) {
        return k1.time - k2.time;
    }

    private getKeyframesCouple(perc: number) {
        const startKeyframeIndex = this.fullKeyframes
            .findIndex((keyframe, i, arr) => keyframe.time <= perc && arr[i + 1].time >= perc);
        return [this.fullKeyframes[startKeyframeIndex], this.fullKeyframes[startKeyframeIndex + 1]];
    }

    private boundPerc(p: number) {
        return p < 0 ? 0 : p > 1 ? 1 : p;
    }

    private normalizePerc(p: number, from: number, to: number) {
        return (p - from) * (1 / (to - from));
    }

    private getFullKeyframes() {
        const tempKeyframes = [...this.keyframes];
        const objValues = this.getAllValues(tempKeyframes);
        if (tempKeyframes[0].time !== 0) {
            tempKeyframes.unshift({ time: 0, value: {} });
        }
        if (tempKeyframes[tempKeyframes.length - 1].time !== 1) {
            tempKeyframes.push({ time: 1, value: {} });
        }
        return tempKeyframes.map((keyframe, i) => {
            const missingValues = this.getValuesDiff(Object.keys(keyframe.value), objValues);
            const nextValues = missingValues.map((v) => this.getNextFrameWithValue(v, i, tempKeyframes));
            const prevValues = missingValues.map((v) => this.getPrevFrameWithValue(v, i, tempKeyframes));
            for (let j = 0; j < missingValues.length; j++) {
                const value = missingValues[j];
                keyframe.value[value] =
                    this.interpolateValues(prevValues[j], nextValues[j], keyframe.time, value);
            }
            return keyframe;
        });
    }

    private getAllValues(keyframes: IKeyframe[]) {
        const fullValueObj = keyframes.reduce((acc, elem) => Object.assign({}, acc, elem.value), {});
        return Object.keys(fullValueObj);
    }

    private getValuesDiff(values: string[], target: string[]) {
        return target.filter((v) => values.indexOf(v) < 0);
    }

    private getNextFrameWithValue(value: string, startIndex: number, keyframes: IKeyframe[]): IKeyframe {
        for (let i = startIndex; i < keyframes.length; i++) {
            if (typeof keyframes[i].value[value] !== "undefined") {
                return keyframes[i];
            }
        }
        return this.getPrevFrameWithValue(value, startIndex, keyframes);
    }

    private getPrevFrameWithValue(value: string, startIndex: number, keyframes: IKeyframe[]): IKeyframe {
        for (let i = startIndex; i >= 0; i--) {
            if (typeof keyframes[i].value[value] !== "undefined") {
                return keyframes[i];
            }
        }
        return this.getNextFrameWithValue(value, startIndex, keyframes);
    }

    private interpolateValues(from: IKeyframe, to: IKeyframe, time: number, value: string): number | string {
        if (from.value[value] === to.value[value]) {
            return from.value[value];
        }
        return d3.interpolate(from.value[value], to.value[value])(this.normalizePerc(time, from.time, to.time));
    }
}
