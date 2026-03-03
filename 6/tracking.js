// tracking.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. URLからGoogle広告のクリックID（gclid）を取得
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');

    // 2. LocalStorageに保存（別日に再訪問してCVした際にも追跡するため）
    if (gclid) {
        localStorage.setItem('ads_gclid', gclid);
    }

    // 保存されているgclidを呼び出す
    const savedGclid = localStorage.getItem('ads_gclid');

    // 3. アフィリエイトリンクの書き換え処理
    if (savedGclid) {
        // 比較表のボタン（.btn-table）と、詳細エリアのCTAボタン（.btn-cta）の両方を取得
        const affiliateLinks = document.querySelectorAll('.btn-table, .btn-cta');

        affiliateLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            if (!originalHref) return;

            let paramName = '';

            // 各ASPのドメインごとに付与するパラメータ名を判定
            if (originalHref.includes('a8.net')) {
                paramName = 's1'; 
            } else if (originalHref.includes('afi-b.com')) {
                paramName = 'ext'; 
            } else if (originalHref.includes('accesstrade.net')) {
                paramName = 'ext'; 
            }

            // URLにまだそのパラメータが付与されておらず、かつASPのリンクである場合に追加する
            if (paramName && !originalHref.includes(`${paramName}=`)) {
                // すでに「?」が含まれている場合は「&」で、そうでない場合は「?」で繋ぐ
                const separator = originalHref.includes('?') ? '&' : '?';
                const newHref = `${originalHref}${separator}${paramName}=${savedGclid}`;
                
                // リンクを上書き
                link.setAttribute('href', newHref);
            }
        });
    }
});