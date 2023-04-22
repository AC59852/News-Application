<template>
  <main>
    <article v-for="news in store.news" :key="news">
      <img v-if="news.urlToImage" :src="news.urlToImage" :alt="news.title">
      <div>
        <h2>{{ news.title }}</h2>
        <p>{{ news.description }}</p>
      </div>
    </article>
  </main>
</template>
<script>
import { newsStore } from '@/stores/newsStore';
export default {
  name: 'Home',

  setup() {
    const store = newsStore();

    return {
      store,
    };
  },

  mounted() {
    caches.keys().then(keys => {
      console.log('Cache keys:', keys)

      if(keys.includes('news') && document.cookie.includes('news')) {
        caches.open('news').then(cache => {
          cache.match('news')
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
        })
      } else {
        this.getNews()
      }
    })
  },

  methods: {
    async getNews() {
      try{
        await fetch('https://newsapi.org/v2/top-headlines?pageSize=100&language=en&apiKey=5e5c3a03810e4817977a0cf9c08da8e8')
          .then((response) => response.json())
          .then((data) => {
            this.store.addNews(data.articles)
          });
      } catch (error) {
          console.log(error)
      }
    },
  }
}
</script>
