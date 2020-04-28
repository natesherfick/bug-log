<template>
  <div class="Bug row bg-light border" @click='activeBug(bugData)'>
<div class='col-3'>{{bugData.title}}</div>
<div class='col-3'>{{bugData.creatorEmail}}</div>
<div class='col-4'>{{bugData.updatedAt}}</div>

<div class='col-2 text-success' v-if='!bugData.closed'>Open</div>
<div class='col-2 text-danger' v-else>Closed</div>
  </div>
</template>


<script>
export default {
  name: 'Bug',
  props: ['bugData'],
  data(){
    return {}
  },
 
  computed:{},
  methods:{
    activeBug(bugData) {
      console.log(this.bugData);
      this.$router.push('bugs/' + bugData.id)
      
    }
  },
  components:{}
}
</script>


<style scoped>

</style>