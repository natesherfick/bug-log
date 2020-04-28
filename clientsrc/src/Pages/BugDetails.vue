<template>
  <div class="Bugs container">

<form v-if="edit">
  <div class="form-group">
    <label for="exampleInputEmail1">Bug Name</label>
    <input  v-model='activeBug.title' required type="text" class="form-control">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <input v-model='activeBug.description' required type="text" class="form-control">
  </div>
  <div class="form-check">
  </div>
  <button type="submit" @click="editBug()" class="btn btn-primary">Submit</button>
</form>



    <div class='row'>
      <span class='col-3'><h5>Title</h5></span>
      <span class='col-3'><h5>Submitted By</h5></span>
      <span class='col-4'><h5>Last Modified</h5></span>
      <span class='col-2'><h5>Status</h5></span>
      </div>
    <div class="Bug row bg-light border">
<div class='col-3'>{{activeBug.title}}</div>
<div class='col-3'>{{activeBug.creatorEmail}}</div>
<div class='col-4'>{{activeBug.updatedAt}}</div>

<div class='col-2 text-success' v-if='!activeBug.closed'>Open</div>
<div class='col-2 text-danger' v-else>Closed</div>
<br><br>
<h5>Description</h5>
<div class='col-12'>{{activeBug.description}}</div>

<button v-if='this.$auth.user.email == activeBug.creatorEmail && !activeBug.closed' class='btn btn-warning' @click='edit = true'>Edit</button>

<button v-if='this.$auth.user.email == activeBug.creatorEmail && !activeBug.closed' class='btn btn-danger' @click='closeBug(activeBug)'>Close</button>

  </div>
  </div>
</template>

<script>
export default {
  name: "Bugs",
  props: ['bugData'],
  data() {
    return {
      edit: false
    }
  },
  created() {
    this.$store.dispatch('getActiveBug', this.$route.params.bugId)
    console.log(this.$route.params.bugId);
  },
  computed: {
    activeBug() {
      return this.$store.state.activeBug
    },
  },
  methods: {
    closeBug(activeBug) {
      if (window.confirm("Are you sure you want to close this bug? This cannot be undone!")){
        console.log("confirmed!");

        this.activeBug.closed = true
        this.$store.dispatch('editBug', this.activeBug)
      }
    },
    editBug(activeBug) {
      this.$store.dispatch('editBug', this.activeBug)
      this.editing = false
    },
  }
};
</script>
