<template>
  <div class="range-slider-container">
    <v-slider
      v-model="internalMin"
      :min="min"
      :max="max"
      :step="stepValue"
      thumb-label
      label="MinTemp"
      class="slider slider-min"
    ></v-slider>
    <v-slider
      v-model="internalMax"
      :min="min"
      :max="max"
      :step="stepValue"
      thumb-label
      label="MaxTemp"  
      class="slider slider-max"
    ></v-slider>
    <span class="selected-range">Temperature range: {{ minValue }}° - {{ maxValue }}° </span>
  </div>
</template>

<script>
export default {
  name: "RangeSlider",
  props: {
      label: {
        type: String,
        required: true,
      },
      minValue: {
        type: Number,
        required: true,
      },
      maxValue: {
        type: Number,
        required: true,
      },
      stepValue: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      min:Number,
      max:Number,
    },
    data() {
      return {
        internalMin: this.minValue,
        internalMax: this.maxValue,
      };
    },
  
  watch: {
    minValue(newVal) {
      // Ensure that the minValue is less than or equal to the maxValue
      this.internalMin = Math.min(newVal, this.maxValue);
    },
    maxValue(newVal) {
      // Ensure that the maxValue is greater than or equal to the minValue
      this.internalMax = Math.max(newVal, this.minValue);
    },
    internalMax(newVal) {
        this.$emit("input_max", newVal);
    },
    internalMin(newVal) {
        this.$emit("input_min", newVal);
    },
    

  },
};
</script>

<style scoped>
.range-slider-container {
  position: relative;
  width: 300px; /* Adjust the width as needed */
  margin: 0 auto;
}

.slider {
  width: 100%;
  margin-bottom: 10px; /* Add some spacing between the sliders */
}

.selected-range {
  text-align: center;
}
</style>
