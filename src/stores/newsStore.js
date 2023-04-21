import { defineStore } from 'pinia'

export const newsStore = defineStore('news', {
  state: () => ({
    news: [],
  }),

  actions: {
    addNews(news) {
      this.news = news

      // check if cookie exists
      if (document.cookie.indexOf('news') === -1) {
        console.log('No cookie found, caching news')
        this.cacheNews(news)
      } else {
        console.log(document.cookie.indexOf('news'))
      }
    },

    cacheNews(news) {  
      // cache the news
      caches.open('news').then(cache => {
        cache.put('news', new Response(JSON.stringify(news)))

        // set a cookie that lasts 1 day
        document.cookie = 'news=1; max-age=86400'

        console.log('News cached')

        cache.match('news').then(response => {
          response.json().then(json => {
            console.log('Cached news:', json)
          })
        })
      })
    },
  }
})
