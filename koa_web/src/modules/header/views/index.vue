<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="nav-link logo" to="/">
      <img src="@/assets/nav-logo.png" alt="nav logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/article">文章</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  nav .logo {
    float: left;
    height: 56px;
    padding: 0;
    img {
      height: 100%;
    }
  }
</style>
