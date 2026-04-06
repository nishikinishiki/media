document.addEventListener('DOMContentLoaded', () => {
    const ENABLE_ASP_GCLID_EXPORT = false;
    const targetCompany = 'jpreturns'; 

    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');

    if (gclid) {
        localStorage.setItem('ads_gclid', gclid);
    }
    const savedGclid = localStorage.getItem('ads_gclid');

    // クラス名をリファクタリング後のものに変更 (.c-btn-table, .c-btn-cta)
    if (ENABLE_ASP_GCLID_EXPORT && savedGclid) {
        const affiliateLinks = document.querySelectorAll('.c-btn-table, .c-btn-cta');

        affiliateLinks.forEach(link => {
            if (link.getAttribute('data-company') === targetCompany) return;

            const originalHref = link.getAttribute('href');
            if (!originalHref) return;

            let paramName = '';
            if (originalHref.includes('a8.net')) paramName = 's1'; 
            else if (originalHref.includes('afi-b.com') || originalHref.includes('accesstrade.net')) paramName = 'ext'; 

            if (paramName && !originalHref.includes(`${paramName}=`)) {
                const separator = originalHref.includes('?') ? '&' : '?';
                link.setAttribute('href', `${originalHref}${separator}${paramName}=${savedGclid}`);
            }
        });
    }

    const ownCompanyLinks = document.querySelectorAll(`a[data-company="${targetCompany}"]`);
    ownCompanyLinks.forEach(link => {
        try {
            let linkUrl = new URL(link.href);
            let hasAppended = false;

            if (window.location.search) {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.forEach((value, key) => linkUrl.searchParams.set(key, value));
                hasAppended = true;
            }

            if (!window.location.search && savedGclid && !linkUrl.searchParams.has('gclid')) {
                linkUrl.searchParams.set('gclid', savedGclid);
                hasAppended = true;
            }

            if (hasAppended) link.href = linkUrl.toString();

        } catch (error) {
            console.error('自社LPへのURL書き換えに失敗:', error, link.href);
        }
    });
});