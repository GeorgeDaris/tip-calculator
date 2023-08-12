<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { Ref } from 'vue'

import NumberInput from './NumberInput.vue'

const tipAmounts = reactive([5, 10, 15, 25, 50])

let selectedAmount: Ref<number | undefined> = ref(0)
let customAmount: Ref<number | undefined> = ref()

let bill: Ref<number | undefined> = ref()
let people: Ref<number | undefined> = ref()

const showCustomLabel = computed(() => {
  return tipAmounts.some((tip) => selectedAmount.value === tip)
})

const totalPerPerson = computed(() => {
  return bill.value && people.value ? (bill.value / people.value).toFixed(2) : '0.00'
})

const tipPerPerson = computed(() => {
  return bill.value && people.value && selectedAmount.value
    ? ((bill.value / people.value / 100) * selectedAmount.value).toFixed(2)
    : '0.00'
})

const reset = () => {
  //setting them to undefined, to show the placeholder
  bill.value = undefined
  people.value = undefined
  selectedAmount.value = undefined
  customAmount.value = undefined
}
</script>

<template>
  <article
    class="bg-white-primary text-grayish-cyan rounded-2xl rounded-bl-none rounded-br-none md:rounded-2xl p-8 shadow-xl grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 md:gap-x-[5%] gap-y-[5%] max-w-5xl"
  >
    <h2 class="sr-only">Tip calculator</h2>
    <form>
      <label class="flex flex-col text-sm">
        Bill
        <NumberInput v-model="bill" :icon="`dollar`" :placeholder="`0`" />
      </label>
      <p class="mt-6 text-sm">Select Tip %</p>

      <ul class="mt-6 mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <li v-for="tip in tipAmounts" :key="tip">
          <label
            class="tip-label cursor-pointer py-1.5 px-2 rounded-md block text-center hover:bg-strong-cyan focus-within:ring-2 focus-within:ring-light-cyan transition-colors duration-300"
            :class="
              tip === selectedAmount
                ? ['bg-light-cyan', 'text-very-dark-cyan']
                : ['bg-very-dark-cyan', 'text-white-primary']
            "
          >
            <input
              type="radio"
              v-model="selectedAmount"
              :value="tip"
              class="appearance-none h-0 w-0"
            />
            {{ tip }}%
          </label>
        </li>
        <li>
          <label class="relative">
            <NumberInput
              class="-mt-0"
              v-model="customAmount"
              @input="selectedAmount = customAmount"
              :placeholder="`Custom`"
              :placeholderCenter="true"
              :placeholderBottom="true"
              :paddingY="1"
              :class="showCustomLabel ? '' : ['ring-2', 'ring-light-cyan', 'rounded-md']"
            />
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-dark-grayish-cyan sr-only"
            >
              Custom
            </span>
          </label>
        </li>
      </ul>
      <label class="flex flex-col text-sm">
        Number of People
        <NumberInput v-model="people" :icon="`person`" :placeholder="`0`" />
      </label>
    </form>
    <section
      class="px-6 py-8 bg-very-dark-cyan text-white-primary rounded-xl flex flex-col mb-8 md:mb-0"
    >
      <h2 class="sr-only">Result</h2>
      <div class="flex flex-row items-center">
        <p class="text-sm">
          Tip Amount <br />
          <span class="text-grayish-cyan">/ person</span>
        </p>
        <p class="ml-auto text-[2.25rem] text-strong-cyan">${{ tipPerPerson }}</p>
      </div>
      <div class="flex flex-row items-center my-6">
        <p class="text-sm">
          Total <br />
          <span class="text-grayish-cyan">/ person</span>
        </p>
        <p class="ml-auto text-[2.25rem] text-strong-cyan">${{ totalPerPerson }}</p>
      </div>
      <button
        class="uppercase text-very-dark-cyan p-2 mt-auto rounded-md hover:bg-light-cyan transition-colors duration-300"
        :class="
          people && selectedAmount && bill ? 'bg-strong-cyan' : [' opacity-20', ' bg-strong-cyan']
        "
        @click="reset"
      >
        Reset
      </button>
    </section>
  </article>
</template>

<style scoped>
/*.For debugging */
/* * {
  border: 1px solid red;
} */

.tip-label:active {
  background-color: color-mix(in srgb, #26c0ab, white);
  transition-duration: 0s;
}
</style>
