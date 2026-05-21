// tracking.js
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ⚙️ 設定エリア
    // ==========================================
    // ① 将来、他社ASPからオフラインCVデータをもらえるようになったら true に変更する
    const ENABLE_ASP_GCLID_EXPORT = false;

    // ② 自社の data-company の値を指定してください（例: 'my_estate'）
    const targetCompany = 'jpreturns'; 


    // --- 1. gclidの取得と保存（常に実行: 自社LPの別日訪問対策のため） ---
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');

    if (gclid) {
        localStorage.setItem('ads_gclid', gclid);
    }
    const savedGclid = localStorage.getItem('ads_gclid');


    // --- 2. 他社ASPリンクへのgclid付与（設定が true の場合のみ実行） ---
    if (ENABLE_ASP_GCLID_EXPORT && savedGclid) {
        const affiliateLinks = document.querySelectorAll('.btn-table, .btn-cta');

        affiliateLinks.forEach(link => {
            // 自社LPへのリンクは下のStep3で処理するため除外
            if (link.getAttribute('data-company') === targetCompany) return;

            const originalHref = link.getAttribute('href');
            if (!originalHref) return;

            let paramName = '';
            if (originalHref.includes('a8.net')) {
                paramName = 's1'; 
            } else if (originalHref.includes('afi-b.com')) {
                paramName = 'ext'; 
            } else if (originalHref.includes('accesstrade.net')) {
                paramName = 'ext'; 
            }

            if (paramName && !originalHref.includes(`${paramName}=`)) {
                const separator = originalHref.includes('?') ? '&' : '?';
                const newHref = `${originalHref}${separator}${paramName}=${savedGclid}`;
                link.setAttribute('href', newHref);
            }
        });
    }


    // --- 3. 自社LPへのパラメータ引継ぎ（常に実行） ---
    const ownCompanyLinks = document.querySelectorAll(`a[data-company="${targetCompany}"]`);

    ownCompanyLinks.forEach(link => {
        try {
            let linkUrl = new URL(link.href);
            let hasAppended = false;

            // パターンA: 現在のURLにパラメータがあれば、すべて自社LPへ引き継ぐ
            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.forEach((value, key) => {
                    linkUrl.searchParams.set(key, value);
                });
                hasAppended = true;
            }

            // パターンB: URLパラメータが空でも、LocalStorageにgclidがあれば引き継ぐ
            if (!window.location.search && savedGclid && !linkUrl.searchParams.has('gclid')) {
                linkUrl.searchParams.set('gclid', savedGclid);
                hasAppended = true;
            }

            // URLを書き換えた場合のみ上書き
            if (hasAppended) {
                link.href = linkUrl.toString();
            }

        } catch (error) {
            console.error('自社LPへのURL書き換えに失敗しました:', error, link.href);
        }
    });
});