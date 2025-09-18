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
        { title: '理由1：業界No.1(※)だから初めてでも安心！', text: '投資用不動産の売上実績/買取実績No.1のRENOSYには、不動産を「買いたい」人が多く集まり、だからこそ「売りたい」人も多く集まります。 幅広い選択肢から物件を選ぶことができ、売却時もニーズが集まるので売れやすい。それが、RENOSYが選ばれる理由です。※東京商工リサーチによる投資用不動産の売上実績（2025年3月調べ）及び投資用不動産会社の売上原価調査（2024年10月調べ）' },
        { title: '理由2：充実の賃貸管理サービスで管理が楽ちん！', text: 'RENOSY※1では、忙しいオーナーに代わって入居者募集から家賃集金送金、クレーム対応※2まで、全面サポート。お客様の資産状況や、リスクに対する許容度に応じて多彩な管理プランをご用意しています。物件購入後は購入後もアプリやマイページでらくらく管理※3！所有物件の契約情報や入居状況、毎月の送金内容の確認はもちろん、困ったときの相談や毎年の確定申告も専用のアプリとマイページでサポート。はじめての不動産投資でも、カンタンに所有物件の管理ができます。' },
        { title: '理由3：売却益も狙える！満足度の高い売却体験', text: 'RENOSYは日本国内だけではなく、海外にも展開しているため、国内外の投資家への売却が可能です。また、スマホひとつでオーナー希望価格で売り出しができる「かんたんネット売却」も選択でき、忙しい方でも手軽に売却活動をはじめられます。売却ご検討の際も安心してお手続きいただけるよう、RENOSYが責任を持って最後までサポートいたします。' }
    ],
    reviews: [
        { author: '30代・年収1200万円台・会社員 男性', quote: '今後の年金を増やすために、不動産投資を検討していました。不動産の知識が限られていて、たくさん部件がある中で、どの物件を選んだら良いか迷います。 信頼する友達からrenosyのを紹介いただきました。AIモデルで利回りが高い物件を選んでくれることは最強です。 また、担当営業の冷雪様がとても親切でいつも迅速に希望も部件とシミュレーションを送ってくれました。おかけ様で、数ヶ月で好きな物件を購入することができました。今後もぜひ引き続き気に入りの部件をrenosyで探したいと思います。', source: '公式サイト' },
        { author: '40代・年収1000万円台・公務員 女性', quote: '将来の安定した収入源を確保するため、不動産投資を始めました。 家賃収入による資産形成や節税効果が期待でき、将来的な不安への備えとしても魅力的です。 与信を活用することで多くの効果を得ることができると思います。', source: '自社アンケート' },
        { author: '30代・年収1000万円台・医師 男性', quote: '漠然と資産形成をしたいと思っていた中で、たまたま広告を見て面談をした。 不動産投資のメリット・デメリットをしっかり説明してくれて、かつ対応がスピード感があり、安心して決断することができた。 日常的に自分で手を動かすことが苦手な人に向いている資産形成だと思う。', source: null }
    ],
    evaluations: {
        initialCost: { symbol: '◎', text: '1万円~' },
        easeOfManagement: { symbol: '〇', text: 'アプリで完結' },
        supportSystem: { symbol: '◎', text: '24時間対応' },
        occupancyRate: { symbol: '◎', text: '99.7%' },
        propertyArea: { symbol: '◎', text: '都心' },
        interviewBonus: { symbol: '◎', text: 'あり' },
        companyScale: { symbol: '◎', text: '大手' },
        trackRecord: { symbol: '◎', text: 'GA technologies' },
    },
    overallRating: 4.0,
    points: [
        { title: '年収500万以上の方必見!!手厚いサポートで手間なく運用できる', text: 'AIによる価値の高い物件選定や、専用アプリで物件の管理から確定申告までをサポートしてくれるため、普段忙しいサラリーマンや公務員、医師の方におすすめ※7' },
        { title: '入居率99.7%の賃貸管理サービス', text: '空室になる心配がほとんどない優良物件を厳選しているため、不動産投資の最大のリスクである空室リスクが低いのが魅力。' },
        { title: '面倒で不透明な契約手続きも 最短1週間・簡単でスムーズ', text: '不動産投資ローンの申込・審査手続きのオンライン完結を実現！最大98%の項目を自動で入力することが可能。' }
    ],
    detailsTable: [
        { label: '所有物件エリア', value: '東京23区/川崎/横浜/大阪/神戸/京都/福岡/海外' },
        { label: '対象物件', value: '区分新築・中古マンション、一棟新築・中古マンション、オフィス、戸建て' },
        { label: '入居率', value: '99.7%' },
        { label: '投資額', value: '10万円〜' },
        { label: '資本金', value: '73億7,296万6,541円' },
        { label: '従業員数', value: '1,487名' },
        { label: 'セミナー・個別相談', value: 'オンライン・各支店・個別面談' },
        { label: '実績', value: '不動産投資売上NO.1' }
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

