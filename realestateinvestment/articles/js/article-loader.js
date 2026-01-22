(function() {
    'use strict';

    class ArticleLoader {
        /**
         * URLパラメータから記事IDを取得
         */
        getArticleId() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (!id) {
                console.error('記事IDが指定されていません。URL: articles/article.html?id=article-id');
                return null;
            }
            return id;
        }

        /**
         * JSONファイルから記事データを取得
         */
        async fetchArticle(articleId) {
            const url = `/realestateinvestment/articles/data/${articleId}.json`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${url} が見つかりません`);
                }
                return await response.json();
            } catch (error) {
                console.error(`記事の読み込みに失敗しました:`, error);
                this.showErrorMessage();
                return null;
            }
        }

        /**
         * 取得した記事データをDOMに注入
         */
        injectArticleToDOM(article) {
            const categoryEl = document.getElementById('article-category');
            const titleEl = document.getElementById('article-title');
            const dateEl = document.getElementById('article-date');
            const contentEl = document.getElementById('article-content');

            if (categoryEl) categoryEl.textContent = article.category;
            if (titleEl) titleEl.textContent = article.title;
            if (dateEl) dateEl.textContent = article.date;
            if (contentEl) contentEl.innerHTML = article.content;

            // ページタイトルを更新（SEO対応）
            document.title = `${article.title} | おすすめ不動産投資会社ランキング`;

            // メタディスクリプションを更新
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = article.description;
        }

        /**
         * エラーメッセージを表示
         */
        showErrorMessage() {
            const contentEl = document.getElementById('article-content');
            if (contentEl) {
                contentEl.innerHTML = `
                    <div style="padding: 20px; background-color: #fee; border: 1px solid #fcc; border-radius: 4px;">
                        <p>申し訳ありません。記事が見つかりませんでした。</p>
                    </div>
                `;
            }
        }

        /**
         * 初期化処理
         */
        async init() {
            const articleId = this.getArticleId();
            if (!articleId) return;

            const article = await this.fetchArticle(articleId);
            if (article) {
                this.injectArticleToDOM(article);
            }
        }
    }

    // ページロード時に実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ArticleLoader().init();
        });
    } else {
        new ArticleLoader().init();
    }
})();