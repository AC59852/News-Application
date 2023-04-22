<template>
  <main>
    <article v-for="news in store.allNews" :key="news">
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
    // check localstorage for news
    if(localStorage.getItem('allNews') && document.cookie.includes('allNews')) {
      console.log(localStorage.getItem('allNews'))
      
      this.store.addNews(JSON.parse(localStorage.getItem('allNews')))
    } else {
      console.log('news from api')
      this.getNews()
    }
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
