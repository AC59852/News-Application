<template>
  <header>
    <input type="search" name="q" @keyup.enter="search()" v-model="query">
    <nav>
      <ul>
        <li><router-link to="/">All</router-link></li>
        <li><router-link to="/">Country</router-link></li>
        <li><router-link to="/">Business</router-link></li>
        <li><router-link to="/">Technology</router-link></li>
        <li><router-link to="/">Entertainment</router-link></li>
        <li><router-link to="/">Health</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },

  methods: {
    search() {
      this.$router.push({ name: 'search', params: { query: this.query } })
    }
  }
}
</script>

<style>

</style>