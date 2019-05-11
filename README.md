# breakpoint-icon

A simple icon you can put in your Vue app that displays what breakpoint you're currently at.

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
in one of your top-level components, such as App.vue.

```html
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
