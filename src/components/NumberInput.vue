<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number
  },
  icon: String,
  paddingY: Number,
  placeholder: {
    type: String,
    default: ''
  },
  placeholderCenter: {
    type: Boolean,
    default: false
  },
  placeholderBottom: Boolean
})

// defineEmits(['changeAmount'])
const emit = defineEmits(['update:modelValue'])

//Computed properties for styling purposes

const inputFilled = computed(() => {
  return props.modelValue !== 0 ? ' text-very-dark-cyan' : 'text-grayish-cyan'
})

const textCenter = computed(() => {
  return props.placeholderCenter ? 'placeholder:text-center' : ''
})

const paddingY = computed(() => {
  return props.paddingY ? `p-${props.paddingY}` : ''
})

const warnPosition = computed(() => {
  return props.placeholderBottom ? 'after:-bottom-7 md:after:-left-6' : 'after:-top-7'
})

const warnText = computed(() => {
  return props.modelValue == 0 ? "Can't be 0" : ''
})

const amountValue = computed({
  get: () => props.modelValue,
  set: (newVal) => emit('update:modelValue', newVal)
})
</script>

<template>
  <span
    class="inline-block relative mt-1 after:content-[attr(data-warn)] after:absolute after:right-0 after:text-[#c29485]"
    :class="[icon, warnPosition]"
    :data-warn="warnText"
  >
    <input
      type="number"
      :placeholder="placeholder"
      v-model="amountValue"
      class="w-full rounded-md bg-very-light-grayish-cyan text-lg font-spaceMono text-right font-bold p-2 accent-strong-cyan caret-strong-cyan focus-within:text-very-dark-cyan focus:ring-2 focus:ring-strong-cyan focus:outline-none invalid:ring-[#c29485] invalid:ring-2 focus:invalid:ring-[#c29485]"
      :class="[inputFilled, textCenter, paddingY]"
    />
  </span>
</template>

<style scoped>
/* Taken form CSSTricks to hide the number input's arrows, to match it with the design */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.dollar::before {
  content: '';
  background-image: url(../assets/icon-dollar.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* background-image: url('v-bind(iconSrc)'); */
}

.person::before {
  content: '';
  background-image: url(../assets/icon-person.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
