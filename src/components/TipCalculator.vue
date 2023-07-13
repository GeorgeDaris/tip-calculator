<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
// import type { Ref } from 'vue'

import NumberInput from './NumberInput.vue'

const tipAmounts = reactive([5, 10, 15, 25, 50])

let selectedAmount = ref(0)
let customAmount = ref(0)

let bill = ref(0)
let people = ref(0)

const setAmount = (amount: { value: number }, newAmount: number) => {
  amount.value = newAmount
}

const handleAmount = (type: string, newValue: number) => {
  if (type === 'bill') {
    setAmount(bill, newValue)
  } else if (type == 'people') {
    setAmount(people, newValue)
  }
}

const showCustomLabel = computed(() => {
  // shows the label only when the user changes the value of the tip amount to one that doesn't exist already
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
  bill.value = 0
  people.value = 0
  selectedAmount.value = 0
  customAmount.value = 0
}

// const selectTipAmount = (tip: number) => {
//   selectedAmount.value = tip
//   activeState.value = 'bg-strong-cyan'
// }
</script>

<template>
  <article
    class="bg-white-primary text-grayish-cyan rounded-lg p-6 shadow-lg grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 md:gap-x-[5%] gap-y-[5%]"
  >
    <form action="">
      <!-- {{ bill }} -->
      <label :for="`bill-${bill}`" class="flex flex-col">
        Bill
        <NumberInput
          :amount="bill"
          :name="`bill`"
          :icon="`dollar`"
          :placeholder="`0`"
          @changeAmount="(e) => handleAmount('bill', e)"
        />
      </label>
      <p class="mt-2">Select Tip %</p>

      <ul class="mt-4 mb-2 grid grid-cols-2 md:grid-cols-3 gap-4">
        <li v-for="tip in tipAmounts" :key="tip">
          <label
            :for="`tip-${tip}`"
            class="tip-label cursor-pointer p-2 rounded-md block text-center hover:bg-strong-cyan focus-within:ring-2 focus-within:ring-light-cyan transition-colors duration-300"
            :class="
              tip === selectedAmount
                ? ['bg-light-cyan', 'text-very-dark-cyan']
                : ['bg-very-dark-cyan', 'text-white-primary']
            "
          >
            <input
              type="radio"
              name="`tip-${tip}`"
              :id="`tip-${tip}`"
              v-model="selectedAmount"
              :value="tip"
              class="appearance-none h-0 w-0"
            />
            {{ tip }}%
          </label>
        </li>
        <li>
          <label :for="`custom-${customAmount}`" class="relative">
            <NumberInput
              class="mt-0"
              :amount="customAmount"
              :name="`custom`"
              :placeholder="`Custom`"
              :placeholderCenter="true"
              :class="showCustomLabel ? '' : ['ring-2', 'ring-light-cyan', 'rounded-md']"
              @changeAmount="(e) => ((selectedAmount = e), (customAmount = e))"
            />
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-dark-grayish-cyan sr-only"
            >
              Custom
            </span>
            <!-- <span
              v-if="showCustomLabel"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-dark-grayish-cyan"
            >
              Custom
            </span> -->
          </label>
        </li>
      </ul>
      <!-- {{ selectedAmount }} -->

      <label :for="`people-${people}`" class="flex flex-col">
        Number of People
        <NumberInput
          :amount="bill"
          :name="`people`"
          :icon="`person`"
          :placeholder="`0`"
          @changeAmount="(e) => handleAmount('people', e)"
        />
      </label>
      <!-- {{ people }} -->
    </form>
    <section
      class="px-6 py-8 bg-very-dark-cyan text-white-primary rounded-lg flex flex-col mb-8 md:mb-0"
    >
      <div class="flex flex-row items-center">
        <p>
          Tip Amount <br />
          <span class="text-sm text-grayish-cyan">/ person</span>
        </p>
        <p class="ml-auto text-[2rem] text-strong-cyan">${{ tipPerPerson }}</p>
      </div>
      <div class="flex flex-row items-center my-6">
        <p>
          Total <br />
          <span class="text-sm text-grayish-cyan">/ person</span>
        </p>
        <p class="ml-auto text-[2rem] text-strong-cyan">${{ totalPerPerson }}</p>
      </div>
      <button
        class="uppercase text-very-dark-cyan p-2 mt-auto rounded-md hover:bg-light-cyan transition-colors duration-300"
        :class="
          people && selectedAmount && bill ? 'bg-strong-cyan' : [' opacity-40', ' bg-strong-cyan']
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
