<template>
  <div class="max-h-full flex-col overflow-scroll">
    <Navbar
      class="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white py-4"
    />
    <slot class="flex-grow overflow-y-auto mt-[100px]" />
    <Footer class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4" />
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
</script>

<style lang="scss" scoped></style>
