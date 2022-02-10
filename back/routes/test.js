const data = {
    name: "田中太郎",
    skills: ["アジャイル", "Github"],
    books: [
      {
        title: "アジャイルについて",
        comment: " 初心者向け",
      },
      {
        title: "Githubについて",
        comment: "初心者向け",
      },
    ],
  };

  user_add_sql = "instert into library.user (name,books,skills) values\
  ('"+data.name+"',\
  '"+data.books.map(book =>book.title+":"+book.comment).join(",")+"',\
  '"+data.skills.join(",")+"');";

console.log(user_add_sql);