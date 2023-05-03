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
      <!-- https://getbootstrap.com/docs/5.3/components/dropdowns/ : navigation bar -->
      <!-- 드롭다운 메뉴 명 (영화 감상/맛집/독후감 )==> 하위 메뉴(쓰기/목록) 다이어리 ~ -->
      <!-- navigation part -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/calendar">Dear Diary</a>
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
                <router-link class="nav-link" aria-current="page" to="/calendar">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/list">List</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/edit">Editor</router-link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
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
import { RouterView } from 'vue-router';
</script>

<style>
</style>