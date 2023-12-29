<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link :to="crumb.to || '#'">{{ crumb.text }}</router-link>
        </li>
      </ol>
    </nav>
</template>

<script>
  export default {
    props: {
        breadcrumbs: {
            type: Array,
            required: true
        }
    }
  };
</script>

<style scoped>
  .breadcumb-item::after{
    content: '/';
    color: white; 
    margin: 0 5px; 
  }
</style>
  