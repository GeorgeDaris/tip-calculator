<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: 'amount'
  },
  icon: String,
  placeholder: {
    type: String,
    default: ''
  },
  placeholderCenter: {
    type: Boolean,
    default: false
  }
})

defineEmits(['changeAmount'])

let newAmount: Ref<number | undefined> = ref()

//Computed properties for styling purposes

const inputFilled = computed(() => {
  return newAmount.value !== 0 ? ' text-very-dark-cyan' : 'text-grayish-cyan'
})

const textCenter = computed(() => {
  return props.placeholderCenter ? 'placeholder:text-center' : ''
})

const warnText = computed(() => {
  return newAmount.value == 0 ? "Can't be 0" : ''
})

watch(
  () => props.amount,
  () => {
    //Resetting the values after the user clears the added information
    if (!props.amount) {
      newAmount.value = 0
    }
  }
)
</script>

<template>
  <span
    class="inline-block relative mt-1 after:content-[attr(warn)] after:absolute after:-top-7 after:right-0 after:text-[#c29485]"
    :class="[icon]"
    :warn="warnText"
  >
    <input
      type="number"
      :name="`${name}-${amount}`"
      :id="`${name}-${amount}`"
      v-model="newAmount"
      :placeholder="placeholder"
      pattern="[0-1000]+"
      @input="$emit('changeAmount', newAmount)"
      class="w-full rounded-md bg-very-light-grayish-cyan text-base font-spaceMono text-right font-bold p-2 accent-strong-cyan caret-strong-cyan focus-within:text-very-dark-cyan focus:ring-2 focus:ring-strong-cyan focus:outline-none invalid:ring-[#c29485] invalid:ring-2 focus:invalid:ring-[#c29485]"
      :class="[inputFilled, textCenter]"
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
