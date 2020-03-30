<template>
  <div id="app">
    <main>
      <Status />
    </main>
  </div>
</template>

<script>
// App vue is the main container for Status and WordGrid(s)
export default {
  name: 'App',
  components: {
    Status: () => import('./components/Status.vue'),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
}
</style>
