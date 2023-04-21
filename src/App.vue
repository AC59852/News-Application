<template>
  <header>
    <div class="wrapper">
      <NavigationComponent />
    </div>
  </header>

  <RouterView />
</template>
<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
export default {
  name: 'App',

  components: {
    NavigationComponent,
  },
}
</script>
<style>
html {
  background-color: #202124;
}
</style>
