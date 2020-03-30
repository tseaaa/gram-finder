<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <button @click="start">Begin Search</button>
          <h1 class="title is-1">Anagram Grid Finder</h1>
          <h1 class="title">{{numAttempts}} of {{totalPossibilities}}</h1>
          <h1 class="title is-4">Current Candidate</h1>
          <div class="box flex">
            <WordGrid :grid="currentCandidate" />
          </div>
            <br><br><br>
            <h3 class="title">Winning Anagram Grids ({{numWinners}})</h3>
            <br>
            <ul>
              <li v-for="winner of winners" :key="winner.id">
                <div class="box flex">
                  <WordGrid :grid="winner.words" />
                </div>
                <br>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// The AnagramGridEngine is where all the work is done.
import { status } from '../shared/AnagramGridEngine';

export default {
  name: 'Status',
  data() {
    return {
      winners: [],
      currentCandidate: '',
      numAttempts: 0,
      numWinners: 0,
      totalPossibilities: 0,
    };
  },
  components: {
    // WordGrid is a generic component created to make displaying
    // candidates and winners more appealing
    WordGrid: () => import('./WordGrid.vue'),
  },
  created() {
  },
  methods: {
    // Every timer iteration, getWinners invokes another search attempt
    // and sets the local data variables for display above.
    getWinners() {
      const newStatus = status.tryNextCandidate();
      this.winners = newStatus.winners;
      this.currentCandidate = newStatus.currentCandidate;
      this.numAttempts = newStatus.numAttempts;
      this.numWinners = newStatus.numWinners;
      this.totalPossibilities = newStatus.totalPossibilities;
    },
    start() {
      // When the user clicks the Begin Search button the timer is launched.
      // at every interval another attempt is made.
      this.getWinners();
      this.timer = setInterval(this.getWinners, 1);
    },
  },
};
</script>
<style>
.box.flex {
  display: flex;
  justify-content: center;
}
.title {
  text-align: center;
}
</style>
