<template>
  <div class="home">
    <h1>Welcome, {{this.$auth.user.name}}</h1>
      <Bug v-for="bug in bugs" :key="bug.id" :bugData="bug"></Bug>
  </div>
</template>

<script>
import Bug from '../components/Bug.vue';
export default {
  name: "home",

  created() {
    this.$store.dispatch('getBugs')
    
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  components: {
    Bug
  }
};
</script>
