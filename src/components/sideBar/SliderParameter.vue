<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="10">
          <v-slider
            v-model="internalValue"
            :min="minValue"
            :max="maxValue"
            :step="stepValue"
            thumb-label
            @input="onSliderChange"
            :label="label"
          ></v-slider>
        </v-col>
        <v-col cols="2">
          <div class="value">{{ internalValue }}</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
  
  <script>
  export default {
    name: "SliderParameter",
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
    },
    data() {
      return {
        internalValue: this.value,
      };
    },
    watch: {
      value(newValue) {
        this.internalValue = newValue;
      },
      internalValue(newInternalValue) {
        this.$emit("input", newInternalValue);
      },
    },
    methods: {
      onSliderChange(value) {
        this.internalValue = value;
        // Emit the updated value to the parent component when the slider is changed
        this.$emit("input", value);
      },
    },
  };
  </script>
  
  <style scoped>
.value {
  text-align: center;
}
  </style>
  