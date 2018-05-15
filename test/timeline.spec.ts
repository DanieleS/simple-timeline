import { Timeline } from "../src/index";

const keyframeCouple = [{
    time: 0, value: {
        n: 0
    }
}, {
    time: 1, value: {
        n: 1
    }
}];

const incompleteKeyframes = [{
    time: 0, value: {
        n: 0
    }
},
{
    time: 0.25, value: {
        k: 0
    }
},
{
    time: 0.75, value: {
        k: 1
    }
},
{
    time: 1, value: {
        n: 1,
    }
}];

const notFullKeyframes = [
    {
        time: 0.2,
        value: {
            n: 1
        }
    },
    {
        time: 0.8,
        value: {
            n: 0
        }
    }
];

const wrongOrderKeyframes = [
    {
        time: 1,
        value: {
            n: 1
        }
    },
    {
        time: 0,
        value: {
            n: 0
        }
    }
];

describe("Timeline", () => {
    describe("getAt", () => {
        test("should get the right interpolated keyframe at given time", () => {
            const timeline = new Timeline(keyframeCouple);

            expect(timeline.getAt(0)).toEqual({ time: 0, value: { n: 0 } });
            expect(timeline.getAt(1)).toEqual({ time: 1, value: { n: 1 } });
            expect(timeline.getAt(0.5)).toEqual({ time: 0.5, value: { n: 0.5 } });
        });

        test("should get the first keyframe if the time is lesser then it", () => {
            const timeline = new Timeline(keyframeCouple);

            expect(timeline.getAt(-1)).toEqual({ time: 0, value: { n: 0 } });
        });

        test("should get the last keyframe if the time is greater then it", () => {
            const timeline = new Timeline(keyframeCouple);

            expect(timeline.getAt(2)).toEqual({ time: 1, value: { n: 1 } });
        });

        test("should get the right keyframe using the provided easing function", () => {
            const mockEasing = jest.fn();
            mockEasing.mockReturnValue(1);
            const timeline = new Timeline(keyframeCouple, mockEasing);

            expect(timeline.getAt(0.5)).toEqual({ time: 1, value: { n: 1 } });
            expect(mockEasing).toHaveBeenCalledWith(0.5);
            expect(mockEasing).toHaveBeenCalledTimes(1);
        });

        test("should get the complete keyframe even if the provided ones misses some value", () => {
            const timeline = new Timeline(incompleteKeyframes);

            expect(timeline.getAt(0)).toEqual({ time: 0, value: { n: 0, k: 0 } });
            expect(timeline.getAt(0.5)).toEqual({ time: 0.5, value: { n: 0.5, k: 0.5 } });
        });

        test("should get the keyframe even if the privided ones don't cover the full range", () => {
            const timeline = new Timeline(notFullKeyframes);

            expect(timeline.getAt(0)).toEqual({ time: 0, value: { n: 1 } });
            expect(timeline.getAt(0.5)).toEqual({ time: 0.5, value: { n: 0.5 } });
            expect(timeline.getAt(1)).toEqual({ time: 1, value: { n: 0 } });
        });

        test("should get the keyframe in the right order", () => {
            const timeline = new Timeline(wrongOrderKeyframes);

            expect(timeline.getAt(0)).toEqual({ time: 0, value: { n: 0 } });
            expect(timeline.getAt(1)).toEqual({ time: 1, value: { n: 1 } });
        });
    });
});
