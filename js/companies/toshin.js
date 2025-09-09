// グローバル変数 companyData に企業情報を格納
// ファイルが複数あっても、window.companyData に追記していく形
window.companyData = window.companyData || {};

window.companyData['toshin'] = {
    companyName: 'トーシンパートナーズ',
    logoUrl: 'images/logos/toshin_logo.jpg',
    officialLink: '#',
    bannerUrl1: 'https://placehold.co/800x250/FBE9D7/4A2E05?text=Banner+1+(訴求バナー)',
    bannerUrl2: 'https://placehold.co/800x250/D7FBEA/054A2E?text=Banner+2+(訴求バナー)',
    reasons: [
        {
            title: '理由1：業界トップクラスの実績',
            text: '長年の経験と豊富な取引実績があり、初心者でも安心して任せることができます。'
        },
        {
            title: '理由2：手厚いサポート体制',
            text: '購入前から購入後まで、専門のスタッフが一人ひとりを徹底的にサポートします。'
        },
        {
            title: '理由3：厳選された優良物件',
            text: '独自の基準で選び抜かれた、将来性の高い都心の物件のみを取り扱っています。'
        }
    ],
    reviews: [
        {
            author: '40代・会社員 男性',
            quote: '初めての不動産投資で不安でしたが、担当の方が親身に相談に乗ってくれて心強かったです。',
            source: '公式サイト'
        },
        {
            author: '30代・公務員 女性',
            quote: '管理の手間がほとんどかからないのが良いですね。安定した副収入になっています。',
            source: '自社アンケート'
        },
        {
            author: '50代・医師 男性',
            quote: '提案された物件の立地が素晴らしく、すぐに満室になりました。さすがプロの目利きだと感じました。',
            source: null
        }
    ],

    evaluations: {
        initialCost: { symbol: '◎', text: '1万円~' },
        easeOfManagement: { symbol: '〇', text: 'アプリで完結' },
        supportSystem: { symbol: '◎', text: '24時間対応' },
        occupancyRate: { symbol: '◎', text: '99.5%' },
    },

    overallRating: 3.8,

    points: [
        { icon: 'fa-building-shield', title: '業界最高水準の入居率', text: '独自の管理システムで高い入居率を維持。' },
        { icon: 'fa-hand-holding-dollar', title: '少額から始められる', text: '自己資金10万円からでもスタート可能。' },
        { icon: 'fa-headset', title: '充実のサポート体制', text: '購入後も安心のオーナーサポートを提供。' }
    ],
    detailsTable: [
        { label: '所有物件エリア', value: '東京都心、横浜、川崎' },
        { label: '対象物件', value: '中古ワンルームマンション' },
        { label: '入居率', value: '99.5%' },
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
