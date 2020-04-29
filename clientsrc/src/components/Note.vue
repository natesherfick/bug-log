<template>
  <div class="Note row bg-light border">
<div class='col-4'>{{noteData.creatorEmail}}</div>
<div class='col-6'>{{noteData.content}}</div>
<div class='col-2'>
  <button @click='deleteNote()'>Delete</button>
</div>



  </div>
</template>


<script>
export default {
  name: 'Note',
  props: ['noteData'],
  data(){
    return {}
  },
 
  computed:{},
  methods:{
  deleteNote() {
    window.confirm('ARE YOU NOT ENTERTAINED?!')
  }
    },
  
  components:{}
}
</script>


<style scoped>

</style>