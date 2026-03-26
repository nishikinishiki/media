window.appData = {
    /**
     * @type {string} featuredCompanyId - 「今月のおすすめ」セクションに表示する企業のIDを指定します。
     */
    featuredCompanyId: 'renosy',

    /**
     * @type {Array<Object>} evaluationColumns - ランキング表の評価項目を定義します。
     */
    evaluationColumns: [
        { key: 'initialCost', name: '初期費用' },
        { key: 'easeOfManagement', name: '管理のしやすさ' },
        { key: 'supportSystem', name: 'サポート体制' },
        { key: 'occupancyRate', name: '入居率' },
        { key: 'propertyArea', name: '物件エリア' },
        { key: 'interviewBonus', name: '面談特典' },
        { key: 'companyScale', name: '会社規模' },
        { key: 'trackRecord', name: '実績' },
    ],

    /**
     * @type {Array<string>} rankingOrder - 表示したい企業のIDをランキング順に並べます。
     */
    rankingOrder: [
        'renosy',
        'jpreturns',
        'toshin',
        'shinoken'
    ],
    
    /**
     * @type {Array<string>} displayColumns - トップページに表示したいコラム記事のIDをリストアップします。
     */
    displayColumns: [
        'guide-for-beginners',
        'common-mistakes',
        'risks-and-countermeasures'
    ]
};

