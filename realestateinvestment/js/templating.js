document.addEventListener("DOMContentLoaded", () => {
    // 現在のページの階層を判断して、基準となるパスを決定します
    // (例：トップページなら '', 記事ページなら '../')
    const depth = window.location.pathname.includes('/articles/') ? '../' : '';

    const loadAndProcessHTML = async (selector, url) => {
        try {
            const response = await fetch(depth + url);
            if (!response.ok) throw new Error(`File not found: ${url}`);
            
            let data = await response.text();
            
            // 読み込んだHTML内のパスを、現在の階層に合わせて自動で置換します
            data = data.replace(/{{BASE_PATH}}/g, depth);

            const element = document.querySelector(selector);
            if (element) element.innerHTML = data;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    };

    loadAndProcessHTML("#header-placeholder", "_partials/header.html");
    loadAndProcessHTML("#footer-placeholder", "_partials/footer.html");
});

