<template>
  <div>
    <table class="table is-bordered">
      <tr>
        <td>{{grid[0][0]}}</td>
        <td>{{grid[0][1]}}</td>
        <td>{{grid[0][2]}}</td>
        <td>{{grid[0][3]}}</td>
      </tr>
      <tr>
        <td>{{grid[1][0]}}</td>
        <td>{{grid[1][1]}}</td>
        <td>{{grid[1][2]}}</td>
        <td>{{grid[1][3]}}</td>
      </tr>
      <tr>
        <td>{{grid[2][0]}}</td>
        <td>{{grid[2][1]}}</td>
        <td>{{grid[2][2]}}</td>
        <td>{{grid[2][3]}}</td>
      </tr>
      <tr>
        <td>{{grid[3][0]}}</td>
        <td>{{grid[3][1]}}</td>
        <td>{{grid[3][2]}}</td>
        <td>{{grid[3][3]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// An array of 4 letter words is passed in to be displayed
export default {
  name: 'WordGrid',
  props: {
    grid: {
      type: Array,
      default: () => [],
    },
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-size: 2em;
}
</style>
