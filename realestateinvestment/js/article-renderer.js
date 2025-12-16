// このスクリプトが、各記事ページでタイトルなどを articles-db.js から自動で設定します。
document.addEventListener("DOMContentLoaded", () => {
    // 1. このページのIDを取得 (例: "guide-for-beginners")
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const articleId = filename.replace('.html', '');

    // 2. 記事データベースとDOM要素が存在するか確認
    const db = window.articlesDB;
    const titleEl = document.getElementById('article-title');
    const categoryEl = document.getElementById('article-category');
    const dateEl = document.getElementById('article-date');

    if (!db || !db[articleId]) {
        console.error(`記事ID "${articleId}" のデータがarticles-db.jsに見つかりません。`);
        if(titleEl) titleEl.textContent = "記事が見つかりません";
        return;
    }

    // 3. データベースから記事情報を取得
    const article = db[articleId];

    // 4. ページ内の要素に情報を設定
    if (titleEl) titleEl.textContent = article.title;
    if (categoryEl) categoryEl.textContent = article.category;
    if (dateEl) dateEl.textContent = article.date;

    // 5. ブラウザのタブに表示されるタイトルも設定
    document.title = `${article.title} | おすすめ不動産投資会社ランキング`;
});
