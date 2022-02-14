<template>
  <div>
      <div>スキル検索：
        <select v-model="skillSearch">
          <option> </option>
          <option v-for="(skill, index) in allSkills" :key="index">{{skill.name}}</option>
        </select>
      </div>
    <div>全文検索：<input type="text" v-model="search"></div>  
    <table>
      <thead>
        <tr>
          <th>社員名</th>
          <th>得意なスキル</th>
          <th>おススメの本</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in search_users" :key="index">
          <td v-html="highLight(user.name)"></td>
          <td>
            <p v-html="highLight(user.skills.join(','))">
            </p>
          </td>
          <td>
          <div style="margin-bottom:15px" v-for="(book, index) in user.books" :key="index" >
            <span>📕『</span>
            <span v-html="highLight(book.title)"></span>
            <span>』</span><br/>
            <div style="margin-left:20px">
            <span style="background-color:#EDF7FF; text-indent:1em "> {{book.comment}}
            </span>
            </div>
           </div> 
          </td>
          <td><button v-on:click="deleteUser(user.userid, user.name)">削除</button></td>
        </tr>
      </tbody>
    </table>
    <!-- 登録フォーム -->
    <br><br>
    <div>
      ユーザー登録フォーム
      <table>
        <tr>
          <td style="background-color:#EDF7FF">社員名*</td>
          <td><input type="text" v-model="userName" placeholder="社員名"></td>
        </tr>
        <tr>
          <td style="background-color:#EDF7FF">得意なスキル</td>
          <td>
            <div v-for="(skill, index) in allSkills" :key="index" style="display: inline-block">
              <input 
              :id="skill + index"
              type="checkbox"
              :value="skill.name"
              v-model="userSkills">
              <label :for="skill.name">{{skill.name}}&nbsp;&nbsp;</label>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#EDF7FF">おススメの本１</td>
          <td>
            <p><input type="text" v-model="userBook1Title" placeholder="本のタイトル"></p>
            <textarea rows="5" cols="80" v-model="userBook1Comment" placeholder="本のコメント、可能なら難易度や社内にその本があるかどうかの情報も記載"/>
          </td>
        </tr>
        <tr>
          <td style="background-color:#EDF7FF">おススメの本２</td>
          <td>
            <p><input type="text" v-model="userBook2Title" placeholder="本のタイトル"></p>
            <textarea rows="5" cols="80" v-model="userBook2Comment" placeholder="本のコメント、可能なら難易度や社内にその本があるかどうかの情報も記載"/>
          </td>
        </tr>
        <tr>
          <td style="background-color:#EDF7FF">おススメの本３</td>
          <td>
            <p><input type="text" v-model="userBook3Title" placeholder="本のタイトル"></p>
            <textarea rows="5" cols="80" v-model="userBook3Comment" placeholder="本のコメント、可能なら難易度や社内にその本があるかどうかの情報も記載"/>
          </td>
        </tr>
      </table>
      <br>
      <div style="background-color:#ffc0cb; margin-bottom:30px" v-if="this.errorMessage!==null">{{this.errorMessage}}</div>
      <div align="right"><button v-on:click="addUser" align="right">登録</button></div>
    </div>

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
        search: '',
        allSkills: null,
        skillSearch: '',
        userName: '',
        userSkills: [],
        userBook1Title: '',
        userBook1Comment: '',
        userBook2Title: '',
        userBook2Comment: '',
        userBook3Title: '',
        userBook3Comment: '',
        errorMessage:''
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
        },
      addUser: function() {
        var books = [
          {
            title: this.userBook1Title,
            comment: this.userBook1Comment
          },
          {
            title: this.userBook2Title,
            comment: this.userBook2Comment
          },
          {
            title: this.userBook3Title,
            comment: this.userBook3Comment
          }
        ]
        axios.post('http://localhost:3000/user',{
          name: this.userName,
          skills: this.userSkills,
          books: books
        }).then(response => {
          this.users = response.data.data.users;
          this.allSkills = response.data.data.skills;
          this.errorMessage = response.data.error.message;
          if(this.errorMessage == null || this.errorMessage == ""){
            alert('ユーザ情報が登録されました。');
            this.userName = '';
            this.userSkills = [];
            this.userBook1Title = '';
            this.userBook1Comment = '';
            this.userBook2Title = '';
            this.userBook2Comment = '';
            this.userBook3Title = '';
            this.userBook3Comment = '';
          }
        })

      },
        deleteUser: function(id, name){
          if (window.confirm(name + "のデータを削除します。よろしいですか？")){
            // 削除処理を実行する。
            axios.delete('http://localhost:3000/user',{
                data:{ 
                  id: id }
            }).then(response => {
              if(this.errorMessage == null || this.errorMessage == ""){
                this.users = response.data.data.users;
                this.allSkills = response.data.data.skills;
                this.errorMessage = response.data.error.message;
                alert(name + 'のユーザ削除が成功ました。');
              }
            })
          } else {
            // キャンセル時は何も行わない。
          }
      }
    },

    // 算出プロパティの設定
    computed: {
      search_users(){
        let searchWord = this.search.trim()
        let searchSkillWord = this.skillSearch.trim()
        if (searchSkillWord === ''){
          // スキル検索が空の場合
          if (searchWord === '') return this.users;
          return this.users.filter(user => {
              return user.name.includes(this.search) ||
              user.books.map(book => book.title).join(" ").includes(this.search) ||
              user.skills.join(" ").includes(this.search)
          })
        }  else {
          // スキル検索が入力されている場合
          if (searchWord === '') {
            return this.users.filter(user => {
              return user.skills.join(" ").includes(searchSkillWord)
          })
            }
          return this.users.filter(user => {
              return (user.name.includes(this.search) ||
              user.books.map(book => book.title).join(" ").includes(this.search) ||
              user.skills.join(" ").includes(this.search)) &&
              user.skills.join(" ").includes(searchSkillWord)
          })
        }
      }
    },

    mounted() {
      axios.get('http://localhost:3000')
      .then(response => {
          this.users = response.data.data.users;
          this.allSkills = response.data.data.skills;
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
