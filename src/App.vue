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
    class="font-spaceMono uppercase font-bold text-xl tracking-[0.4rem]"
    v-html="splitTitle(title, [0, 4])"
  ></header>
  <main>
    <TipCalculator />
  </main>
</template>

<style scoped></style>
