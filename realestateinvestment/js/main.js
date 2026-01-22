const App = {
    elements: {
        tableHead: document.getElementById('ranking-table-head'),
        tableBody: document.getElementById('ranking-table-body'),
        detailsContainer: document.getElementById('details-container'),
        columnsContainer: document.getElementById('columns-container'),
        heroCta: document.getElementById('hero-cta'),
        faqContainer: document.getElementById('faq-container'),
        featuredContainer: document.getElementById('featured-container'),
        headerPlaceholder: document.getElementById('header-placeholder'),
        footerPlaceholder: document.getElementById('footer-placeholder'),
    },

    data: window.appData,
    articlesDB: window.articlesDB,

    async init() {
        if (!this.data || !this.data.rankingOrder) {
            console.error('ランキング定義(rankingOrder)が見つかりません。');
            return;
        }
        try {
            await this.loadCompanyData();
            this.buildDisplayData();
            this.renderAllSections();
            this.setupEventListeners();
        } catch (error) {
            console.error('アプリケーションの初期化に失敗しました:', error);
        }
    },

    loadCompanyData() {
        // data.js と company-*.js の両方で companyId を使うので、重複をなくす
        const companyIds = [...new Set([this.data.featuredCompanyId, ...this.data.rankingOrder])].filter(Boolean);
        
        const promises = companyIds.map(companyId => {
            const path = `js/companies/${companyId}.js`;
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = path;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`${path}の読み込みに失敗しました。`));
                document.head.appendChild(script);
            });
        });
        return Promise.all(promises);
    },
    
    buildDisplayData() {
        this.data.rankingData = this.data.rankingOrder.map((id, index) => {
            if (!window.companyData || !window.companyData[id]) {
                throw new Error(`企業ID '${id}' のデータが見つかりません。`);
            }
            return {
                ...window.companyData[id],
                id: id,
                rank: index + 1,
                detailsLink: `#${id}`,
            };
        });
    },

    renderAllSections() {
        if (this.elements.featuredContainer) this.renderFeaturedSection();
        if (this.elements.tableHead) this.renderRankingTable();
        if (this.elements.detailsContainer) this.renderDetailsSection();
        if (this.elements.columnsContainer) this.renderColumnsSection();
    },

    setupEventListeners() {
        if (this.elements.heroCta) {
            this.elements.heroCta.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
        if (this.elements.faqContainer) {
            this.elements.faqContainer.addEventListener('click', (e) => {
                const question = e.target.closest('.faq-question');
                if (question) {
                    question.classList.toggle('open');
                }
            });
        }
    },

    helpers: {
        svgIcons: {
            'double-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>`,
            'circle': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`,
            'triangle': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>`,
            'cross': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        },
        getEvaluationHTML(evaluation) {
            if (!evaluation || typeof evaluation.symbol === 'undefined') return '<span>-</span>';
            const { symbol, text } = evaluation;
            const colorMap = { '◎': 'text-amber-600', '〇': 'text-amber-500', '△': 'text-gray-500', '×': 'text-gray-400' };
            const iconMap = { '◎': this.svgIcons['double-circle'], '〇': this.svgIcons['circle'], '△': this.svgIcons['triangle'], '×': this.svgIcons['cross'] };
            const iconHTML = iconMap[symbol] ? `<div class="${colorMap[symbol] || ''}">${iconMap[symbol]}</div>` : `<span>${symbol}</span>`;
            const textHTML = text ? `<span class="block text-xs text-gray-600 mt-1">${text}</span>` : '';
            return `<div class="flex flex-col items-center">${iconHTML}${textHTML}</div>`;
        },
        getStarRatingHTML(rating) {
            let starsHTML = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating));
            if (rating % 1 >= 0.5) starsHTML += '<i class="fas fa-star-half-alt"></i>';
            starsHTML += '<i class="far fa-star"></i>'.repeat(5 - Math.ceil(rating));
            const scoreHTML = `<span class="rating-score text-gray-700 font-bold text-sm">${rating.toFixed(1)}</span>`;
            const starsContainerHTML = `<span class="rating-stars text-xs">${starsHTML}</span>`;
            return `<div class="rating-wrapper">${scoreHTML}${starsContainerHTML}</div>`;
        },
        getRankHTML(rank) {
            // 1, 2, 3 はそのまま、4以上はすべて 'rank-4' を使用
            const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-4';
            
            return `
                <div class="rank-crown-container">
                    <i class="fas fa-crown rank-icon ${rankClass}"></i>
                    <span class="rank-number-in-crown">${rank}</span>
                </div>`;
        }
    },

    renderFeaturedSection() {
        const companyId = this.data.featuredCompanyId;
        if (!companyId || !window.companyData || !window.companyData[companyId]) {
             console.error(`今月のおすすめ企業(ID: ${companyId})のデータが見つかりません。`);
             return;
        }

        const company = window.companyData[companyId];
        if (!company.featured) {
             console.error(`今月のおすすめ企業(ID: ${companyId})のデータにfeaturedプロパティが見つかりません。`);
             return;
        }

        const currentMonth = new Date().getMonth() + 1;

        const featuredHTML = `
            <div class="featured-redesigned-card">
                <div class="featured-redesigned-header">
                    <span class="featured-redesigned-month">${currentMonth}月</span>
                    <h2 class="featured-redesigned-title">今月のピックアップ</h2>
                </div>
                <div class="featured-redesigned-body">
                    <div class="featured-redesigned-banner">
                        <img src="${company.featured.imageUrl}" alt="キャンペーンバナー" width="600" height="400" class="rounded-lg">
                    </div>
                    <div class="featured-redesigned-content">
                        <img src="${company.logoUrl}" alt="${company.companyName} ロゴ" width="150" height="40" class="featured-redesigned-logo">
                        <h3 class="featured-redesigned-point">${company.featured.tagline}</h3>
                        <p class="featured-redesigned-target">${company.featured.catchphrase}</p>
                        <div class="featured-redesigned-campaign">
                            <p class="featured-redesigned-campaign-text">${company.featured.campaign.text}</p>
                        </div>
                        <a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="cta-button featured-redesigned-cta">
                            公式サイトはこちら <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        this.elements.featuredContainer.innerHTML = featuredHTML;
    },

    renderRankingTable() {
        const { evaluationColumns, rankingData } = this.data;
        let headHTML = '<tr><th scope="col" class="sticky-col px-4 py-3 w-40 text-center">会社情報</th>';
        evaluationColumns.forEach(c => headHTML += `<th scope="col" class="px-6 py-3 text-center">${c.name}</th>`);
        headHTML += '<th scope="col" class="px-6 py-3 w-40 text-center">公式サイト</th></tr>';
        this.elements.tableHead.innerHTML = headHTML;

        const bodyHTML = rankingData.map((company, i) => `
            <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-amber-50">
                <td class="sticky-col px-4 py-4 font-medium text-gray-900 text-center align-middle">
                    ${this.helpers.getRankHTML(company.rank)}
                    <img src="${company.logoUrl}" alt="${company.logoName}ロゴ" width="120" height="40" class="mx-auto mb-2 h-10 object-contain">
                    <span class="block text-xs font-semibold">${company.companyName}</span>
                    <div class="company-rating">${this.helpers.getStarRatingHTML(company.overallRating)}</div>
                </td>
                ${evaluationColumns.map(c => `<td class="px-6 py-4 text-center align-middle">${this.helpers.getEvaluationHTML.call(this.helpers, company.evaluations[c.key])}</td>`).join('')}
                <td class="px-6 py-4 text-center align-middle"><a href="${company.detailsLink}" class="cta-button text-white font-bold py-2 px-4 rounded-full text-sm block whitespace-nowrap">詳しく見る↓</a></td>
            </tr>`
        ).join('');
        this.elements.tableBody.innerHTML = bodyHTML;
    },

    renderDetailsSection() {
        const detailsHTML = this.data.rankingData.map(company => `
            <article id="${company.id}" class="details-article bg-white p-6 sm:p-10 rounded-lg shadow-lg scroll-mt-20">
                <div class="max-w-4xl mx-auto">
                    <div class="flex justify-center items-center gap-4 mb-6">
                        <div class="details-rank text-3xl font-bold text-gray-700">${this.helpers.getRankHTML(company.rank)}</div>
                        <h3 class="details-company-name text-3xl font-bold text-gray-800">${company.companyName}</h3>
                    </div>
                    <img src="${company.logoUrl}" alt="${company.companyName} ロゴ" width="200" height="50" class="mx-auto h-16 mb-6 object-contain">
                    
                    ${company.displayOptions?.showBanner1 ? `<img src="${company.bannerUrl1}" alt="${company.companyName} バナー1" width="800" height="450" class="details-banner w-full rounded-lg mb-8 shadow">` : ''}
                    
                    <div class="text-center mb-10"><a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="details-cta cta-button inline-block text-white font-bold py-4 px-10 rounded-full text-xl whitespace-nowrap">公式サイトで無料相談 <i class="fas fa-external-link-alt ml-2"></i></a></div>
                    
                    <div class="details-content-wrapper">
                        <h4 class="details-section-title text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">おすすめポイント</h4>
                        <div class="space-y-8 mb-10">
                            ${(company.points || []).map((point, index) => `
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-amber-500 text-white font-bold text-lg mr-4">
                                        ${index + 1}
                                    </div>
                                    <div class="text-left">
                                        <h5 class="font-bold text-lg">${point.title}</h5>
                                        <p class="text-gray-600">${point.text}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="overflow-x-auto rounded-lg border mb-10"><table class="w-full text-sm"><tbody>${(company.detailsTable || []).map((r, i) => `<tr class="${i < (company.detailsTable || []).length-1 ? 'border-b':''}"><th class="bg-gray-100 p-4 w-1/3 md:w-1/4">${r.label}</th><td class="p-4">${r.value}</td></tr>`).join('')}</tbody></table></div>
                        
                        ${company.displayOptions?.showReasons ? `<h4 class="details-section-title text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">${company.companyName}が選ばれる理由</h4><div class="space-y-6 mb-10">${(company.reasons||[]).map(r=>`<div class="flex items-start"><div class="flex-shrink-0"><i class="fas fa-check-circle text-2xl text-green-500 mr-4 mt-1"></i></div><div><h5 class="font-bold text-lg">${r.title}</h5><p class="text-gray-600">${r.text}</p></div></div>`).join('')}</div>` : ''}
                        
                        ${company.displayOptions?.showReviews ? `<h4 class="details-section-title text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">口コミ</h4><div class="review-card-container">${(company.reviews||[]).map(r=>`<div class="review-card"><div class="flex items-center mb-4"><i class="fas fa-user-circle text-4xl text-gray-400 mr-3"></i><div><p class="font-bold">${r.author}</p></div></div><p class="text-gray-700 italic">「${r.quote}」</p>${r.source ? `<p class="text-right text-xs text-gray-500 mt-4">- ${r.source}より引用</p>`:''}</div>`).join('')}</div>` : ''}
                        
                        ${company.displayOptions?.showBanner2 ? `<img src="${company.bannerUrl2}" alt="${company.companyName} バナー2" width="800" height="450" class="details-banner w-full rounded-lg my-10 shadow">` : ''}
                        
                        <div class="text-center mt-10"><a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="details-cta cta-button inline-block text-white font-bold py-4 px-10 rounded-full text-xl whitespace-nowrap">公式サイトで詳細を見る <i class="fas fa-chevron-right ml-2"></i></a></div>
                        
                        ${(company.notes && company.notes.length > 0) ? `
                            <div class="mt-8 pt-6 border-t border-gray-200">
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    ${company.notes.join('<br>')}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </article>`
        ).join('');
        this.elements.detailsContainer.innerHTML = detailsHTML;
    },
    
    renderColumnsSection() {
        const articleIds = [
            'guide-for-beginners',
            'common-mistakes',
            'risks-and-countermeasures'
        ];

        const columnsHTML = articleIds.map(articleId => `
            <a href="articles/article.html?id=${articleId}" class="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-2 text-xs text-gray-500">
                        <span class="bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-full" id="category-${articleId}">カテゴリ</span>
                        <time id="date-${articleId}">2025/09/09</time>
                    </div>
                    <h4 class="font-bold text-lg text-gray-800 mb-2 leading-tight group-hover:text-amber-600 transition-colors" id="title-${articleId}">記事のタイトル</h4>
                    <p class="text-sm text-gray-600" id="desc-${articleId}">記事の説明</p>
                </div>
            </a>`
        ).join('');
        
        this.elements.columnsContainer.innerHTML = columnsHTML;
        
        // 各記事のメタデータを動的に埋める
        this.populateArticleMetadata(articleIds);
    },

    /**
     * 記事のメタデータをDOMに埋める
     */
    populateArticleMetadata(articleIds) {
        articleIds.forEach(articleId => {
            fetch(`/realestateinvestment/articles/data/${articleId}.json`)
                .then(res => res.ok ? res.json() : Promise.reject(`Failed to load ${articleId}`))
                .then(article => {
                    const categoryEl = document.getElementById(`category-${articleId}`);
                    const dateEl = document.getElementById(`date-${articleId}`);
                    const titleEl = document.getElementById(`title-${articleId}`);
                    const descEl = document.getElementById(`desc-${articleId}`);
                    
                    if (categoryEl) categoryEl.textContent = article.category;
                    if (dateEl) dateEl.textContent = article.date;
                    if (titleEl) titleEl.textContent = article.title;
                    if (descEl) descEl.textContent = article.description;
                })
                .catch(err => console.error(err));
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ranking-table-body')) {
        App.init();
    }
});

