<template>
  <!-- 
    npm install vue-router
    npm install bootstrap
    router 이동
    data db : http://39.123.45.45:3002/getreport
    npm install pinia (store 활용)
    npm install axios (api)
    npm install dayjs // 날짜 포멧용 라이브러리..
   -->
  <div>
    <header>
      <!-- navigation part -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/calendar">일기장</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/calendar"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/list">List</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/list2">List2</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/edit">Write</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/profile"
                  >Profile</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
</style>