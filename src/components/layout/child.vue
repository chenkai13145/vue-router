<template>
  <div class="child">
      <a-row><topNav/></a-row>
      <a-row style="color:red">
           <router-view/>
      </a-row>
  </div>
</template>

<script>
import TopNav from '../nav/topNav'
export default {
  components:{
    TopNav
  }
}
</script>

<style>

</style>