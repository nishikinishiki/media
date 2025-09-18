// グローバル変数 companyData に企業情報を格納
// ファイルが複数あっても、window.companyData に追記していく形
window.companyData = window.companyData || {};

window.companyData['jpreturns'] = {
    companyName: 'J.P.Returns株式会社',
    logoUrl: 'images/logos/jpreturns_logo.png',
    officialLink: 'https://chatbot.jpreturns.com/ebook_consultingsoudanB/',
    bannerUrl1: 'images/banners/jpreturns_banner_1.png',
    bannerUrl2: 'images/banners/jpreturns_banner_2.png',
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
        initialCost: { symbol: '△', text: '1万円~' },
        easeOfManagement: { symbol: '〇', text: 'アプリで完結' },
        supportSystem: { symbol: '◎', text: '24時間対応' },
        occupancyRate: { symbol: '◎', text: '99.5%' },
        propertyArea: { symbol: '◎', text: '都心' },
        interviewBonus: { symbol: '◎', text: 'あり' },
        companyScale: { symbol: '〇', text: '中規模' },
        trackRecord: { symbol: '◎', text: '20年' },
    },

    overallRating: 4.8,

    points: [
        { title: '年収500万以上の方必見!!手厚いサポートで手間なく運用できる', text: 'AIによる価値の高い物件選定や、専用アプリで物件の管理から確定申告までをサポートしてくれるため、普段忙しいサラリーマンや公務員、医師の方におすすめ※7' },
        { title: '入居率99.7%の賃貸管理サービス', text: '空室になる心配がほとんどない優良物件を厳選しているため、不動産投資の最大のリスクである空室リスクが低いのが魅力。' },
        { title: '面倒で不透明な契約手続きも 最短1週間・簡単でスムーズ', text: '不動産投資ローンの申込・審査手続きのオンライン完結を実現！最大98%の項目を自動で入力することが可能。' }
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
    notes: [
        '※1 東京商工リサーチによる不動産投資の売上実績（2025年3月調べ）',
        '※2 PayPayポイントはPayPayギフトカードで付与されます。出金と譲渡はできません、PayPay/PayPayカード公式ストアでも利用可能です。上限・条件あり。プレゼント適用条件は公式サイトでご確認ください。'
    ],

    displayOptions: {
        showBanner1: true,
        showReasons: true,
        showReviews: true,
        showBanner2: true
    }
};