<template>
  <div class="Bug">
{{bugData.title}}
{{bugData.description}}

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
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>