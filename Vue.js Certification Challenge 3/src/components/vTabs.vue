<template>
  <div class="tabs">
    <div class="tab-trigger-wrapper">
      <!--
        This should not be hardcoded but dynamic based on 
        the title of each of the <Tab> components based in the slot
      -->
      <button class="tab-trigger active">Vue</button>
      <button class="tab-trigger">React</button>
      <button class="tab-trigger">Svelte</button>
    </div>
    <div class="tab-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
