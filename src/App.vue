<script setup lang="ts">
import { ref } from 'vue'

import TipCalculator from './components/TipCalculator.vue'

const title = ref('splitter')

//Surely wasn't necessary, but wanted to practice typescript
const splitTitle = (word: string, splitAt: number[]) => {
  const first = word.slice(splitAt[0], splitAt[1])
  const last = word.slice(splitAt[1])
  return `${first} <br /> ${last}`
}
</script>

<template>
  <header
    class="font-spaceMono uppercase font-bold text-xl text-title-dark-cyan tracking-[0.4rem] text-center mb-12 mt-12 md:mt-0"
  >
    <h1 v-html="splitTitle(title, [0, 4])"></h1>
  </header>
  <main class="grid justify-items-center">
    <TipCalculator />
  </main>
</template>

<style scoped></style>
