<template>
  <div class="body">
    <el-container class="header common">
      <el-header class="header_content common">
        
      </el-header>
    </el-container>
    <el-container class="body_container common">
      <el-aside class="navigator common">
        <homeNavigator></homeNavigator>
      </el-aside>
      <el-main class="content common">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-container class="footer common">
      <el-footer class="footer_content common">

      </el-footer>
    </el-container>
  </div>
  
</template>

<script  setup>
import homeNavigator from '@/components/homeNavigator.vue';
// import Header from '@/components/Header.vue'
</script>

<style>
/* common */
html, body, .body{
  height: 100%;
  margin:0px;
  padding:0px;
}
.common{
margin: 0px;
padding: 0px;
}
.box{
border:1px solid red;
}

/* header */
.header{
/* height: 100px; */
height: 100px;
background-color: #254956;
}
/* .header .header_content{
// height: 100%; 
} */

/* middle */
.body_container{
height: 90%;
border-top: 1px solid rgb(240, 240, 240);
border-bottom: 1px solid rgb(240, 240, 240);
}
.navigator{
height: 100%;
min-width: 200px;
width: 12%;
}
.content{
width: 82%;
height: 100%;
}


/* footer */
/* .footer{
// height: 5%;
} */
.footer .footer_content{
height: 100%;
}
</style>
