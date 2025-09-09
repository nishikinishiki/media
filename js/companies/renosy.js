// グローバル変数 companyData に企業情報を格納
// ファイルが複数あっても、window.companyData に追記していく形
window.companyData = window.companyData || {};

window.companyData['renosy'] = {
    companyName: 'リノシー',
    logoUrl: 'images/logos/renosy_logo.png',
    officialLink: 'https://inquiry.renosy.com/special/asset22_pp/?utm_source=aa_canny&utm_medium=af&utm_campaign=cpa&affnmsid=8850e891772d2488c312936018cfc63d2334a2ad',
    
    // おすすめセクション用のデータ
    featured: {
        tagline: 'AIによる資産価値の高い物件選定',
        highlight: '不動産投資売上No.1',
        imageUrl: 'images/banners/renosy_banner_1.jpg',
        catchphrase: '年収500万以上の方必見!!',
        campaign: {
            title: 'キャンペーン実施中！',
            text: '初回無料WEB面談参加でPayPayポイント5万円分もらえる!!'
        }
    },

    bannerUrl1: 'images/banners/renosy_banner_1.jpg',
    bannerUrl2: 'images/banners/renosy_banner_2.jpg',
    reasons: [
        { title: '理由1：業界トップクラスの実績', text: '長年の経験と豊富な取引実績があり、初心者でも安心して任せることができます。' },
        { title: '理由2：手厚いサポート体制', text: '購入前から購入後まで、専門のスタッフが一人ひとりを徹底的にサポートします。' },
        { title: '理由3：厳選された優良物件', text: '独自の基準で選び抜かれた、将来性の高い都心の物件のみを取り扱っています。' }
    ],
    reviews: [
        { author: '40代・会社員 男性', quote: '初めての不動産投資で不安でしたが、担当の方が親身に相談に乗ってくれて心強かったです。', source: '公式サイト' },
        { author: '30代・公務員 女性', quote: '管理の手間がほとんどかからないのが良いですね。安定した副収入になっています。', source: '自社アンケート' },
        { author: '50代・医師 男性', quote: '提案された物件の立地が素晴らしく、すぐに満室になりました。さすがプロの目利きだと感じました。', source: null }
    ],
    evaluations: {
        initialCost: { symbol: '◎', text: '1万円~' },
        easeOfManagement: { symbol: '〇', text: 'アプリで完結' },
        supportSystem: { symbol: '◎', text: '24時間対応' },
        occupancyRate: { symbol: '◎', text: '99.7%' },
    },
    overallRating: 4.8,
    points: [
        { icon: 'fa-building-shield', title: '業界最高水準の入居率', text: '独自の管理システムで高い入居率を維持。' },
        { icon: 'fa-hand-holding-dollar', title: '少額から始められる', text: '自己資金10万円からでもスタート可能。' },
        { icon: 'fa-headset', title: '充実のサポート体制', text: '購入後も安心のオーナーサポートを提供。' }
    ],
    detailsTable: [
        { label: '所有物件エリア', value: '東京都心、横浜、川崎' },
        { label: '対象物件', value: '中古ワンルームマンション' },
        { label: '入居率', value: '99.7%' },
        { label: '投資額', value: '100万円〜' },
        { label: '資本金', value: '1億円' },
        { label: '従業員数', value: '150名' },
        { label: 'セミナー・個別相談', value: 'オンライン・対面で随時開催' },
        { label: '実績', value: '創業20年、取引実績5,000件以上' }
    ],
    displayOptions: {
        showBanner1: true,
        showReasons: true,
        showReviews: true,
        showBanner2: true
    }
};

