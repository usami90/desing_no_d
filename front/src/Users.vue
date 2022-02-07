<template>
  <div>
    <div>検索：<input type="text" v-model="search"></div>
    <table>
      <thead>
        <tr>
          <th>社員名</th>
          <th>得意なスキル</th>
          <th>おススメの本</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in search_users" :key="index">
          <td v-html="highLight(user.name)"></td>
          <td>
            <li v-for="(skill, index) in user.skils" :key="index" v-html="highLight(skill)">
            </li>
          </td>
          <td>
            <li v-for="(book, index) in user.books" :key="index" v-html="highLight(book)">
            </li>
          </td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

  // Webページ上のデータや操作の埋込
  export default {
    // データの設定
    data(){
      return {
        users: null,
        search: ''
      }
    },

    // メソッド
    methods: {
      highLight(text){

          let searchWord = this.search.trim()

          if (searchWord === '') return text

          if (!text.includes(searchWord)) return text

          const re = new RegExp(searchWord, 'ig');
          return text.replace(re,function(search){
            return '<span style="background-color:yellow;font-weight:bold">'+ search + '</span>'})
        }
      },

    // 算出プロパティの設定
    computed: {
      search_users(){
        let searchWord = this.search.trim()
      if (searchWord === '') return this.users;
          return this.users.filter(user => {
              return user.name.includes(this.search) ||
              user.books.join(" ").includes(this.search) ||
              user.skils.join(" ").includes(this.search)
          })
      }
    },

    mounted() {
      axios.get('http://localhost:3000/users')
      .then(response => {
          this.users = response.data.data
          })
    }
  };
</script>

<style>
  table{
      border-collapse: collapse;
      width:100%
  }
  td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
  }
  th {
      color:white;
      background-color: #1E90FF;
  }
</style>
