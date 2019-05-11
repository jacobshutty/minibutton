<template>
  <div
    class="breakpoint-icon"
    @mouseover="showArrows = true"
    @mouseout="showArrows = false"
    :class="position"
    :style="[iconStyles, colorStyles]"
  >
    <span
      v-for="(breakpoint, index) in sortedBreakpoints"
      :class="[breakpoint.name, 'breakpoint']"
      :style="[
        { display: browserWidth > breakpoint.pixels ? 'block' : 'none', zIndex: index },
        colorStyles,
      ]"
      :key="`${breakpoint.name} - ${breakpoint.pixels}`"
      >{{ breakpoint.name }}</span
    >

    <div
      class="button-arrow top"
      v-show="showArrows"
      @click="moveY('top')"
      :style="[{ height: positiveArrowSize, top: negativeArrowSize }, colorStyles]"
    >
      <arrow :color="textColor"></arrow>
    </div>
    <div
      class="button-arrow bottom"
      v-show="showArrows"
      @click="moveY('bottom')"
      :style="[{ height: positiveArrowSize, bottom: negativeArrowSize }, colorStyles]"
    >
      <arrow :color="textColor"></arrow>
    </div>
    <div
      class="button-arrow left"
      v-show="showArrows"
      @click="moveX('left')"
      :style="[{ width: positiveArrowSize, left: negativeArrowSize }, colorStyles]"
    >
      <arrow :color="textColor"></arrow>
    </div>
    <div
      class="button-arrow right"
      v-show="showArrows"
      @click="moveX('right')"
      :style="[{ width: positiveArrowSize, right: negativeArrowSize }, colorStyles]"
    >
      <arrow :color="textColor"></arrow>
    </div>
  </div>
</template>

<script>
import Arrow from "./components/Arrow";

export default {
  name: "BreakpointIcon",
  components: { Arrow },
  props: {
    breakpoints: {
      type: Array,
      required: false,
      default: function() {
        return [
          {
            name: "xs",
            pixels: 450,
          },
          {
            name: "s",
            pixels: 600,
          },
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
        ];
      },
    },
    defaultPosition: {
      type: Object,
      required: false,
      default: function() {
        return { y: "bottom", x: "left" };
      },
    },
    iconSize: {
      type: [Number, String],
      required: false,
      default: 40,
    },
    arrowSize: {
      type: [Number, String],
      required: false,
      default: 30,
    },
    zIndex: {
      type: [Number, String],
      required: false,
      default: 99,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#42b883",
    },
    textColor: {
      type: String,
      required: false,
      default: "#fff",
    },
  },
  data: function() {
    return {
      showArrows: false,
      browserWidth: null,
      sortedBreakpoints: null,
      currentBreakpoint: null,
      positionArgs: { y: "bottom", x: "left" },
    };
  },
  methods: {
    moveY(direction) {
      this.showArrows = false;
      this.positionArgs.y = direction;
    },
    moveX(direction) {
      this.showArrows = false;
      this.positionArgs.x = direction;
    },
    setBrowserWidth() {
      this.browserWidth = window.innerWidth;
    },
  },
  computed: {
    position() {
      return this.positionArgs.y + " " + this.positionArgs.x;
    },
    iconStyles() {
      return {
        width: `${parseInt(this.iconSize)}px`,
        height: `${parseInt(this.iconSize)}px`,
        zIndex: parseInt(this.zIndex),
      };
    },
    colorStyles() {
      return { backgroundColor: this.backgroundColor, color: this.textColor };
    },
    positiveArrowSize() {
      return `${parseInt(this.arrowSize)}px`;
    },
    negativeArrowSize() {
      return `-${parseInt(this.arrowSize)}px`;
    },
  },
  mounted() {
    this.browserWidth = window.innerWidth;
    window.addEventListener("resize", this.setBrowserWidth);

    let sorted = this.breakpoints;
    sorted.sort((a, b) => a.pixels - b.pixels);
    sorted = [{ pixels: 0, name: sorted[0].name }, ...sorted]; // Add in a zero pixel breakpoint in order for the display logic to work
    this.sortedBreakpoints = sorted;

    this.positionArgs = this.defaultPosition;
  },
};
</script>

<style scoped lang="scss">
.breakpoint-icon {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Arial", "Helvetica", sans-serif;
  &.top {
    top: 0;
    bottom: auto;
  }
  &.left {
    left: 0;
    right: auto;
  }
  &.right {
    right: 0;
    left: auto;
  }
  &.bottom {
    bottom: 0;
    top: auto;
  }
}

.button-arrow {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.top,
  &.bottom {
    width: 100%;
  }
  &.left,
  &.right {
    height: 100%;
  }
}

.breakpoint {
  position: absolute;
  display: none;
  width: 100%;
  text-align: center;
  cursor: default;
  margin: 0;
  padding: 0;
}
</style>
