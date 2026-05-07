// ui.js
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. テーブル展開 ---
    const wrapper = document.getElementById('tableExpandWrapper');
    const btn = document.getElementById('btnExpand');

    if (wrapper && btn) {
        btn.addEventListener('click', function() {
            // Write（DOM変更）のみなので、requestAnimationFrameで安全に処理
            requestAnimationFrame(() => {
                const isOpen = wrapper.classList.toggle('is-open');
                btn.textContent = isOpen ? '× 閉じる' : '＋ すべて見る';
            });
        });
    }

    // --- 3. 目次展開（article-toc） ---
    const tocWrapper = document.getElementById('tocExpandWrapper');
    const tocBtn = document.getElementById('btnTocExpand');

    if (tocWrapper && tocBtn) {
        tocBtn.addEventListener('click', function() {
            requestAnimationFrame(() => {
                const isOpen = tocWrapper.classList.toggle('is-open');
                tocBtn.textContent = isOpen ? '× 閉じる' : '＋ すべて見る';
            });
        });
    }

    // --- 2. 口コミスライダー ---
    const sliders = document.querySelectorAll('.review-slider');

    sliders.forEach(slider => {
        const track = slider.querySelector('.review-track');
        const items = slider.querySelectorAll('.review-item');
        const nextBtn = slider.querySelector('.next');
        const prevBtn = slider.querySelector('.prev');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        if (!track || items.length === 0) return;

        let currentIndex = 0;
        let resizeTimer; // リサイズ時の連続発火を防ぐためのタイマー

        function getVisibleCount() {
            return window.innerWidth >= 1024 ? 3 : 1;
        }

        // ドットを生成する関数（DOM操作のみ）
        function createDots(dotCount) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => { 
                    currentIndex = i; 
                    updateSlider(); 
                });
                dotsContainer.appendChild(dot);
            }
        }

        // スライダーの計算と描画を行うメイン関数
        function updateSlider(forceRebuildDots = false) {
            // ==========================================
            // 【STEP 1: READ (読み取りフェーズ)】
            // DOMを変更する「前」に、必要なサイズ情報をすべて取得する
            // ==========================================
            const visibleCount = getVisibleCount();
            const dotCount = Math.ceil(items.length / visibleCount);
            
            if (currentIndex >= dotCount) {
                currentIndex = Math.max(0, dotCount - 1);
            }

            // 強制リフローの原因だった箇所！ DOM変更前に読み取ることで遅延がゼロになります。
            const itemWidth = items[0].offsetWidth; 
            const gap = 16; // CSSで指定した1rem(16px)
            const moveDistance = (itemWidth + gap) * visibleCount;

            // ==========================================
            // 【STEP 2: WRITE (書き込みフェーズ)】
            // requestAnimationFrame内で一括でDOMを書き換える
            // ==========================================
            requestAnimationFrame(() => {
                // 必要であればドットを再構築
                if (forceRebuildDots) {
                    createDots(dotCount);
                }

                // スライダーを動かす
                track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
                
                // ドットのアクティブ状態を更新
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            });
        }

        // 初期化（初回はドットも生成する）
        updateSlider(true);

        // クリックイベント
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const dotCount = Math.ceil(items.length / getVisibleCount());
                currentIndex = (currentIndex + 1) % dotCount;
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const dotCount = Math.ceil(items.length / getVisibleCount());
                currentIndex = (currentIndex - 1 + dotCount) % dotCount;
                updateSlider();
            });
        }

        // リサイズイベント（Debounce処理で連続発火を防止）
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            // 画面幅の変更が終わってから100ms後に一度だけ処理を実行する
            resizeTimer = setTimeout(() => {
                updateSlider(true);
            }, 100);
        });
    });
});