<template>
  <div class="home container">
    <h1>Welcome, {{this.$auth.user.name}}</h1>

<!--CREATE BUG FORM-->
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Bug Name</label>
    <input  v-model='newBug.title' required type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='If this bug were an annoying child, what would you name it?'>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <input v-model='newBug.description' required type="text" class="form-control" id="exampleInputPassword1" placeholder="What's going on with this bug?">
  </div>
  <div class="form-check">
  </div>
  <button type="submit" @click="createBug()" class="btn btn-primary">Submit</button>
</form>
<br>

<!--BUGS LIST-->
    <div class='row'>
      <span class='col-3'><h5>Title</h5></span>
      <span class='col-3'><h5>Submitted By</h5></span>
      <span class='col-4'><h5>Last Modified</h5></span>
      <span class='col-2'><h5>Status</h5></span>
      </div>

      <Bug v-for="bug in bugs" :key="bug.id" :bugData="bug" @click='activeBug()'></Bug>
  </div>
</template>

<script>
import Bug from '../components/Bug.vue';
export default {
  name: "home",
  data() {
    return {
      newBug: {
        creatorEmail: this.$auth.user.email,
      }
    }
  },

  created() {
    this.$store.dispatch('getBugs')
    
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },

methods: {
createBug() {
  this.$store.dispatch('createBug', this.newBug)
  console.log(this.newBug);
},
activeBug() {
  console.log("doing it");
  
      // this.$router.push('bugs/' + bug._id)
    },
},

  components: {
    Bug
  }
};
</script>
