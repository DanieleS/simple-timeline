import { Timeline } from "../src/index";

const keyframes = [{
    time: 0, value: {
        n: 0
    }
}, {
    time: 1, value: {
        n: 1
    }
}];

describe("Timeline", () => {
    describe("getAt", () => {
        test("should get the right interpolated keyframe at given time", () => {
            const timeline = new Timeline(keyframes);

            expect(timeline.getAt(0)).toEqual({ time: 0, value: { n: 0 } });
            expect(timeline.getAt(1)).toEqual({ time: 1, value: { n: 1 } });
            expect(timeline.getAt(0.5)).toEqual({ time: 0.5, value: { n: 0.5 } });
        });

        test("should get the first keyframe if the time is lesser then it", () => {
            const timeline = new Timeline(keyframes);

            expect(timeline.getAt(-1)).toEqual({ time: 0, value: { n: 0 } });
        });

        test("should get the last keyframe if the time is greater then it", () => {
            const timeline = new Timeline(keyframes);

            expect(timeline.getAt(2)).toEqual({ time: 1, value: { n: 1 } });
        });

        test("should get the right keyframe using the provided easing function", () => {
            const mockEasing = jest.fn();
            mockEasing.mockReturnValue(1);
            const timeline = new Timeline(keyframes, mockEasing);

            expect(timeline.getAt(0.5)).toEqual({ time: 1, value: { n: 1 } });
            expect(mockEasing).toHaveBeenCalledWith(0.5);
            expect(mockEasing).toHaveBeenCalledTimes(1);
        });
    });
});
