<template>
  <div align="center">
    <button
      style="width: 300px; padding: 20px; font-size: 180%"
      v-on:click="randomMember()"
    >
      本日の発表者
    </button>
    <p><font size="6" color="#ee0000">{{ this.pm }}</font></p>
  </div>
</template>

<script>
// Webページ上のデータや操作の埋込
export default {
  // データの設定
  data() {
    return {
      members: ["アリエル", "アリエッティ", "有江さん", "宇佐神さん", "陳さん", "白木さん"],
      pm: "",
    };
  },

  // メソッド
  methods: {
    randomMember() {
      var m = this.members[Math.floor(Math.random() * 6)];
      this.pm = "本日の発表者は、" + m + " です。";
      alert(this.pm);
    },
  },
};
</script>
