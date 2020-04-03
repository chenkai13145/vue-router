<template>
  <div class="index">
      <a-row>
      <a-col :span="3" style="background-color: #000c17;  height:100vh">
          <!-- 左部 -->
        <indexNav/>
      </a-col>
       <a-col :span="21">
           <!-- 有部 -->
         <router-view/> 
      </a-col>
       </a-row>
  </div>
</template>

<script>
import indexNav from '../nav/indexnav'
export default {
components:{
    indexNav
}
}
</script>

<style>
.kk{
    
}
</style>