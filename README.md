# breakpoint-icon

A simple icon you can put in your Vue app that displays what breakpoint the browser is currently displaying.

## Installation

```
npm i breakpoint-icon --save-dev
```

or

```
yarn add breakpoint-icon --dev
```

### Local Registration

You can put it wherever you want, but I would recommend putting it
in one of your top-level components, such as App.vue. This way it will
show up throughout your app.

```html
<!-- App.vue -->
<template>
  <div id="app">
    <breakpoint-icon></breakpoint-icon>
  </div>
</template>

<script>
  import BreakpointIcon from "breakpoint-icon";

  export default {
    name: "App",
    compononents: { BreakpointIcon },
  };
</script>
```

### Global Registration

```javascript
// main.js
import Vue from "vue";
import BreakpointIcon from "breakpoint-icon";

Vue.component("breakpoint-icon", BreakpointIcon);
```

This allows you to add the icon anywhere in your Vue app:

```html
<!-- MyComponent.vue -->
<template>
  <breakpoint-icon></breakpoint-icon>
</template>
```

---

## Options

There are several params you can pass in to customize how the icon works

- The `breakpoints` prop is required, while the rest are for optional customization

### **Breakpoints - Required**

```
Name: breakpoints
Type: Array
Required: true
```

Specify your breakpoints

```html
<script>
  export default {
    data: function() {
      return {
        myBreakpoints: [
          {
            name: "m",
            pixels: 800,
          },
          {
            name: "l",
            pixels: 1000,
          },
          {
            name: "xl",
            pixels: 1300,
          },
        ],
      };
    },
  };
</script>
```

```html
<breakpoint-icon :breakpoints="myBreakpoints"></breakpoint-icon>
```

- `name` will display when the browser width is under the specified pixels

---

### Default Position

```
Name: defaultPosition
Type: Object
required: false
```

The icon is displayed in the bottom left corner by default

To change this, use the `defaultPosition` prop:

```javascript
export default {
  data: function() {
    return {
      myDefaultPosition: { y: "top", x: "right" },
    };
  },
};
```

```html
<breakpoint-icon :defaultPosition="myDefaultPosition"></breakpoint-icon>
```

---

### Sizes

```
Name: iconSize
Type: Number or String
required: false
```

```
Name: arrowSize
Type: Number or String
required: false
```

Specify the pixel size of the square icon and the arrow buttons

```javascript
export default {
  data: function() {
    return {
      myIconSize: 100,
      myArrowSize: 50,
    };
  },
};
```

```html
<breakpoint-icon :iconSize="myIconSize" :arrowSize="myArrowSize"></breakpoint-icon>
```

---

### Colors

```
Name: backgroundColor
Type: String
required: false
```

```
Name: textColor
Type: String
required: false
```

Specify the background and text colors of the icon

```javascript
export default {
  data: function() {
    return {
      myBgColor: "rgba(24, 69, 59, 100)",
      myTextColor: "white",
    };
  },
};
```

```html
<breakpoint-icon :backgroundColor="myBgColor" :textColor="myTextColor"></breakpoint-icon>
```

---

### Z-Index

```
Name: zIndex
Type: Number or String
required: false
```

The default z-index is 99, with the intention of being on top of all elements in the app.

To change this, use the `zIndex` prop:

```javascript
export default {
  data: function() {
    return {
      myZIndex: 9001,
    };
  },
};
```

```html
<breakpoint-icon :zIndex="myZIndex"></breakpoint-icon>
```
