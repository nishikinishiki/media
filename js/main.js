const App = {
    elements: {
        tableHead: document.getElementById('ranking-table-head'),
        tableBody: document.getElementById('ranking-table-body'),
        detailsContainer: document.getElementById('details-container'),
        columnsContainer: document.getElementById('columns-container'),
        heroCta: document.getElementById('hero-cta'),
        faqContainer: document.getElementById('faq-container'),
        featuredContainer: document.getElementById('featured-container'),
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
        this.data.columnsData = (this.data.displayColumns || []).map(id => {
            if (!this.articlesDB || !this.articlesDB[id]) {
                console.error(`記事ID '${id}' のデータがarticles-db.jsに見つかりません。`);
                return null;
            }
            return this.articlesDB[id];
        }).filter(Boolean);
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
            const scoreHTML = `<span class="block text-gray-700 font-bold text-sm">${rating.toFixed(1)}</span>`;
            const starsContainerHTML = `<div class="text-xs">${starsHTML}</div>`;
            return `${scoreHTML}${starsContainerHTML}`;
        },
        getRankHTML(rank) {
            const map = { 1: 'rank-1', 2: 'rank-2', 3: 'rank-3' };
            if (rank <= 3) return `<div class="rank-crown-container"><i class="fas fa-crown rank-icon ${map[rank] || ''}"></i><span class="rank-number-in-crown">${rank}位</span></div>`;
            return `<div class="rank-text-only">${rank}位</div>`;
        },
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
            <div class="featured-box max-w-2xl mx-auto">
                <div class="featured-title-container">
                    <span class="month-badge">${currentMonth}月</span>
                    <h2 class="featured-title">おすすめ不動産会社</h2>
                </div>
                <p class="featured-tagline">${company.featured.tagline}</p>
                <div class="featured-content-box">
                    <div class="featured-highlight">${company.featured.highlight}</div>
                    <img src="${company.logoUrl}" alt="${company.companyName} ロゴ" class="mx-auto my-6 h-16 object-contain">
                    <div class="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <img src="${company.featured.imageUrl}" alt="キャンペーン" class="w-full rounded-lg shadow-md">
                        </div>
                        <div class="text-left space-y-3">
                            <h3 class="text-xl font-bold">${company.featured.catchphrase}</h3>
                            <p class="text-lg">入居率 <strong class="text-red-500 text-3xl font-bold">${company.evaluations.occupancyRate.text}</strong></p>
                            <div class="campaign-box">
                                <h4 class="font-bold text-amber-800">${company.featured.campaign.title}</h4>
                                <p class="text-sm">${company.featured.campaign.text}</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-8">
                        <a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="cta-button-featured">公式サイトはこちら</a>
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
        headHTML += '<th scope="col" class="px-6 py-3 w-48 text-center">公式サイト</th></tr>';
        this.elements.tableHead.innerHTML = headHTML;

        const bodyHTML = rankingData.map((company, i) => `
            <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-amber-50">
                <td class="sticky-col px-4 py-4 font-medium text-gray-900 text-center align-middle">
                    ${this.helpers.getRankHTML(company.rank)}
                    <img src="${company.logoUrl}" alt="${company.companyName}ロゴ" class="mx-auto my-2 h-10 object-contain">
                    <span class="block text-xs font-semibold">${company.companyName}</span>
                    <div class="mt-1 text-amber-500">${this.helpers.getStarRatingHTML(company.overallRating)}</div>
                </td>
                ${evaluationColumns.map(c => `<td class="px-6 py-4 text-center align-middle">${this.helpers.getEvaluationHTML.call(this.helpers, company.evaluations[c.key])}</td>`).join('')}
                <td class="px-6 py-4 text-center align-middle"><a href="${company.detailsLink}" class="cta-button text-white font-bold py-2 px-4 rounded-full text-sm block">公式サイトで詳細を見る</a></td>
            </tr>`
        ).join('');
        this.elements.tableBody.innerHTML = bodyHTML;
    },

    renderDetailsSection() {
        const detailsHTML = this.data.rankingData.map(company => `
            <article id="${company.id}" class="bg-white p-6 sm:p-10 rounded-lg shadow-lg scroll-mt-20">
                <div class="flex justify-center items-center gap-4 mb-6">
                    <div class="text-3xl font-bold text-gray-700">${this.helpers.getRankHTML(company.rank)}</div>
                    <h3 class="text-3xl font-bold text-gray-800">${company.companyName}</h3>
                </div>
                <img src="${company.logoUrl}" alt="${company.companyName} ロゴ" class="mx-auto h-16 mb-6">
                ${company.displayOptions?.showBanner1 ? `<img src="${company.bannerUrl1}" alt="${company.companyName} バナー1" class="w-full rounded-lg mb-8 shadow">` : ''}
                <div class="text-center mb-10"><a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="cta-button inline-block text-white font-bold py-4 px-10 rounded-full text-xl">公式サイトで無料相談 <i class="fas fa-external-link-alt ml-2"></i></a></div>
                <h4 class="text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">おすすめポイント</h4>
                <div class="grid md:grid-cols-3 gap-6 text-center mb-10">${(company.points || []).map(p=>`<div class="bg-gray-50 p-6 rounded-lg"><i class="fas ${p.icon} text-4xl text-amber-500 mb-3"></i><h5 class="font-bold text-lg mb-2">${p.title}</h5><p class="text-sm text-gray-600">${p.text}</p></div>`).join('')}</div>
                <div class="overflow-x-auto rounded-lg border mb-10"><table class="w-full text-sm"><tbody>${(company.detailsTable || []).map((r, i) => `<tr class="${i < (company.detailsTable || []).length-1 ? 'border-b':''}"><th class="bg-gray-100 p-4 w-1/3 md:w-1/4">${r.label}</th><td class="p-4">${r.value}</td></tr>`).join('')}</tbody></table></div>
                ${company.displayOptions?.showReasons ? `<h4 class="text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">${company.companyName}が選ばれる理由</h4><div class="space-y-6 mb-10">${(company.reasons||[]).map(r=>`<div class="flex items-start"><div class="flex-shrink-0"><i class="fas fa-check-circle text-2xl text-green-500 mr-4 mt-1"></i></div><div><h5 class="font-bold text-lg">${r.title}</h5><p class="text-gray-600">${r.text}</p></div></div>`).join('')}</div>` : ''}
                ${company.displayOptions?.showReviews ? `<h4 class="text-2xl font-bold text-center mb-6 border-b-2 border-amber-500 pb-2">口コミ</h4><div class="flex overflow-x-auto space-x-6 pb-4 mb-10">${(company.reviews||[]).map(r=>`<div class="flex-none w-80 bg-gray-50 p-6 rounded-lg shadow"><div class="flex items-center mb-4"><i class="fas fa-user-circle text-4xl text-gray-400 mr-3"></i><div><p class="font-bold">${r.author}</p></div></div><p class="text-gray-700 italic">「${r.quote}」</p>${r.source ? `<p class="text-right text-xs text-gray-500 mt-4">- ${r.source}より引用</p>`:''}</div>`).join('')}</div>` : ''}
                ${company.displayOptions?.showBanner2 ? `<img src="${company.bannerUrl2}" alt="${company.companyName} バナー2" class="w-full rounded-lg mb-10 shadow">` : ''}
                <div class="text-center mt-10"><a href="${company.officialLink}" target="_blank" rel="noopener noreferrer" class="cta-button inline-block text-white font-bold py-4 px-10 rounded-full text-xl">公式サイトで詳細を見る <i class="fas fa-chevron-right ml-2"></i></a></div>
            </article>`
        ).join('');
        this.elements.detailsContainer.innerHTML = detailsHTML;
    },
    
    renderColumnsSection() {
        const columnsHTML = (this.data.columnsData || []).map(article => `
            <a href="${article.link}" class="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-2 text-xs text-gray-500">
                        <span class="bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-full">${article.category}</span>
                        <time>${article.date}</time>
                    </div>
                    <h4 class="font-bold text-lg text-gray-800 mb-2 leading-tight group-hover:text-amber-600 transition-colors">${article.title}</h4>
                    <p class="text-sm text-gray-600">${article.description}</p>
                </div>
            </a>`
        ).join('');
        this.elements.columnsContainer.innerHTML = columnsHTML;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ranking-table-body')) {
        App.init();
    }
});

