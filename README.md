Simple Timeline
===============

Simple timeline is a library to interpolate through keyframes in a simple way. 
It can interpolate keyframes composed of strings and numbers. 
It use [d3-interpolate](https://github.com/d3/d3-interpolate) under the hood so you can use 
any value d3 support in your keyframes.

Usage
-----

To start using simple-timeline you can install it using `npm` or `yarn`

```
npm i -S simple-timeline
yarn add simple-timeline
```

You must import the `Timeline` class from the `simple-timeline` package

```javascript
import { Timeline } from 'simple-timeline';
```

Then you have to instantiate it with an array of keyframes.

```javascript
const keyframes = [
    { 
        time: 0, 
        value: { k: 0 }
    }, 
    { 
        time: 1, 
        value: { k: 100 }
    }
];
const timeline = new Timeline(keyframes);
```

The keyframe object is composed of a `time` that represents the percentage of the position of the keyframe in the timeline. It must be a value between 0 and 1. The keyframe includes a `value` key that is an object that contains the values that must be interpolated.

To get the interpolated values at a given time you can use the `getAt` function.

```javascript
timeline.getAt(0.5); // { time: 0.5, value: { k: 50 }}
```

Example
-------

Let's say we have an HTML object that must be animated in the time. We must animate his opacity and top position in this way.

```
opacity  |------|
         0      1
top      |-------------------------|
         0                        100
```

We have 3 keyframes:
1. At the beginning both top and opacity are set to 0
2. At a given point (let's say 20% of the animation) opacity fade to 1
3. At the end of the animation the top is set to 100

We must then define this 3 keyframes

```javascript
const keyframes = [
    { 
        time: 0, 
        value: { opacity: 0, top: 0 }
    }, 
    { 
        time: 0.2, 
        value: { opacity: 1 }
    },
    { 
        time: 1, 
        value: { top: 100 }
    }
];
const timeline = new Timeline(keyframes);
```

And to retrive the values we use `getAt`

```javascript
timeline.getAt(0.1); // { time: 0.1, value: { opacity: 0.5, top: 10 }}
timeline.getAt(0.5); // { time: 0.5, value: { opacity: 1, top: 50 }}
timeline.getAt(1);   // { time: 1, value: { opacity: 1, top: 100 }}
```

As you can see we doesn't have to give to every keyframe the complete object of values but when we do `getAt` it always return an object containing every key.

API
---

The Simple Timeline API is very simple (😁).

### constructor
The constructor take 2 params: an array with keyframes and an optional easing function.

The keyframes are objects that implements the next Typescript interface:

```typescript
interface IKeyframe {
    time: number;
    value: IKeyframeValue;
}

interface IKeyframeValue {
    [index: string]: string | number;
}
```
As you can see there are two mandatory properties, `time` and `value`. Value can be composed as you prefer using numbers and strings.

The easing function have this signature:

```typescript
(n: number) => number
```

It takes a number between 0 and 1 and mast return a number between 0 and 1. The default implementation is a linear function:

```javascript
(x) => x
```

You can use it to modify the way kayframes are interpolated, for example if you want your animation to start slow, then accelerate, then slow down at the end you can use a cubic function and so on.

### addKeyframe
The method `addKeyframe` add a keyframe in the right position in the timeline.

Example:
```javascript
const keyframes = [
    { 
        time: 0, 
        value: { k: 0 }
    },
    { 
        time: 1, 
        value: { k: 0 }
    }
];
const timeline = new Timeline(keyframes);

timeline.addKeyFrame({ time: 0.5, value: { k: 50 }});

timeline.getAt(0.5) // { time: 0.5, value: { k: 50 }}
```

### removeKeyframe
The method `removeKeyframe` remove a keyframe at a specified time.

Example:
```javascript
const keyframes = [
    { 
        time: 0, 
        value: { k: 0 }
    },
    { 
        time: 0.5, 
        value: { k: 200 }
    },
    { 
        time: 1, 
        value: { k: 100 }
    }
];
const timeline = new Timeline(keyframes);

timeline.removeKeyFrame(0.5);

timeline.getAt(0.5) // { time: 0.5, value: { k: 50 }}
```

License
-------

This work is released under [The MIT License](https://opensource.org/licenses/MIT)
