import { defineStore } from 'pinia'

export const newsStore = defineStore('news', {
  state: () => ({
    allNews: [],
  }),

  actions: {
    addNews(news) {
      this.allNews = news

      // check if cookie exists
      if (document.cookie.indexOf('allNews') === -1) {
        console.log('No cookie found, caching news')
        this.cacheNews(news)
      } else {
        console.log('Cookie found, not caching news')
      }
    },

    cacheNews(news) {  
      // set a cookie that lasts 1 day
      document.cookie = 'allNews=1; max-age=86400'
      
      // add news to localStorage
      localStorage.setItem('allNews', JSON.stringify(news))
    },
  }
})
