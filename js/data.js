// このファイルでトップページに表示する内容（ランキング順位、表示するコラムなど）をすべて管理します。
window.appData = {
    /**
     * @type {string} featuredCompanyId - 「今月のおすすめ」セクションに表示する企業のIDを指定します。
     */
    featuredCompanyId: 'renosy',

    /**
     * @type {Array<Object>} evaluationColumns - ランキング表の評価項目を定義します。
     * 表示したい項目の順番で並べてください。
     */
    evaluationColumns: [
        { key: 'initialCost', name: '初期費用' },
        { key: 'easeOfManagement', name: '管理のしやすさ' },
        { key: 'supportSystem', name: 'サポート体制' },
        { key: 'occupancyRate', name: '入居率' },
    ],

    /**
     * @type {Array<string>} rankingOrder - 表示したい企業のIDをランキング順に並べます。
     * この配列の順番がそのままLPのランキングになります。
     */
    rankingOrder: [
        'jpreturns',
        'renosy',
        'toshin',
        'shinoken'
    ],
    
    /**
     * @type {Array<string>} displayColumns - トップページに表示したいコラム記事のIDをリストアップします。
     * 記事の詳細は articles-db.js から自動で読み込まれます。
     */
    displayColumns: [
        'guide-for-beginners',
        'common-mistakes',
        'risks-and-countermeasures'
    ]
};

