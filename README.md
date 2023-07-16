# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![](./src/assets/Screenshot%202023-07-14%20at%2020-45-12%20Frontend%20Mentor%20Tip%20calculator%20app.png)

### Links

- Solution URL: [Github](https://github.com/GeorgeDaris/tip-calculator)
- Live Site URL: [Netlify app](https://tip-caclulator-frontendmentor-george.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- Vue 3 (Composition API)
- Typescript
- Tailwind CSS

### What I learned

I used this project to learn Typescript, which I had been meaning to learn for a while. As someone who has some experience with typed languages, it was interesting to bring the safety it offers to a web project. This app isn't complex enough to _need_ this kind of safety, but I was surprised to see how much more readable it made the code.

Take this as an example:

```ts
const splitTitle = (word: string, splitAt: number[]) => {
  const first = word.slice(splitAt[0], splitAt[1])
  const last = word.slice(splitAt[1])
  return `${first} <br /> ${last}`
}

splitTitle('Splitter', [0, 4])
// returns:
//spli
//tter
```

This function splits a word into two parts based on the specified place, and prints it out in two lines. Using Typescript we can declare the types of the parameters, making the function easier to understand.

Types can be specified through inference, meaning that this variable will have a type of `Array` without having to be explicitly declared: `const tipAmounts = reactive([5, 10, 15, 25, 50])`.

#### Vue with Typescript

When using Vue with Typescript, I had difficulty working with otherwise simple functionality at first. One has to be more explicit when declaring props, since types obviously matter. A variable of type `number` can't be used as an input's name, since it is a number. To use it properly, string interpolation can be used to pass the value as a string:

```html
<input
    type="number"
    :name="`${amount}`"
    :id="`amount-${amount}` />
```

Another thing I learned is that it is better to [use strings as the first part of an id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) when working with inputs.

The object syntax is also useful for declaring props with types and default values, as opposed to the simpler array syntax I had been using in the past:

```ts
defineProps({
  amount: {
    type: Number,
    default: 0
  }
})
```

#### Accessibility

Despite the simplicity of this project, I found many solutions which had accessibility issues due to a lack of semantic markup and missing label and input attributes. It should be noted that the design itself isn't accessible to users with vision impairment, as a quick look at the accessibility tab of the dev tools will show that certain text leafs don't have sufficient contrast.

While creating the `NumberInput` component I made use of semantic markup and learned some best practices along the way to make it reusable and accessible. The input can access a name and an id based on props to bind it with the label, and an optional placeholder can also be specified.

#### From design to code

It was interesting to create something based on an existing design again while making sure to keep it responsive and as close as possible to the original design. I used the colours provided by the design file to extend the Tailwind theme and use them across the app. Flexbox and Grid were also used to layout the contents of the app.

### Continued development

Now that I have gotten down the basics of Typescript, I would like to focus on a more complex project where union types and interfaces could be used, among more advanced concepts.

### Useful resources

- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) - For learning the basics.
- [Typescript with Composition API](https://vuejs.org/guide/typescript/composition-api.html) - For learning how to use Typescript with Vue's Composition API.
- [Customizing Tailwind](https://tailwindcss.com/docs/adding-custom-styles) - Helped me learn some new things about Tailwind which made my code cleaner.

## Author

- Github - [George Daris](https://github.com/GeorgeDaris)
- Frontend Mentor - [@GeorgeDaris](https://www.frontendmentor.io/profile/GeorgeDaris)

## Acknowledgments

I would like to thank the folks over at the VueLand Discord server, who were kind enough to help me out with questions regarding Typescript with Vue.
