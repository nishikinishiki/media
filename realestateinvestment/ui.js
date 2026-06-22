// ui.js
document.addEventListener('DOMContentLoaded', function () {

    // --- 1 & 3. 展開処理の共通化（テーブル・目次） ---
    const setupExpand = (wrapperId, btnId) => {
        const wrapper = document.getElementById(wrapperId);
        const btn = document.getElementById(btnId);

        if (wrapper && btn) {
            btn.addEventListener('click', () => {
                requestAnimationFrame(() => {
                    const isOpen = wrapper.classList.toggle('is-open');
                    btn.textContent = isOpen ? '× 閉じる' : '＋ すべて見る';
                });
            });
        }
    };

    // 関数を呼び出すだけで複数のアコーディオンに対応可能
    setupExpand('tableExpandWrapper', 'btnExpand');
    setupExpand('tocExpandWrapper', 'btnTocExpand');

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

    // --- 4. 追従CTA & トップへ戻るボタンの表示制御 ---
    const floatingBanner = document.getElementById('floatingBanner');
    const triggerSection = document.querySelector('.hero-main-img'); // 目印となるセクション（ヒーロー画像）
    const btnFloatingClose = document.getElementById('btnFloatingClose');
    const pageTopBtn = document.getElementById('pageTopBtn'); // 🌟トップへ戻るボタンを取得
    let isFloatingClosedManually = false;

    // 🌟 どちらかのボタンが存在し、かつ監視対象があれば実行
    if ((floatingBanner || pageTopBtn) && triggerSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const isHidden = !entry.isIntersecting; // 目印が見えなくなったら true

                // フローティングバナーの表示切り替え（手動で閉じていない場合のみ）
                if (floatingBanner && !isFloatingClosedManually) {
                    floatingBanner.classList.toggle('is-visible', isHidden);
                }

                // 🌟 トップへ戻るボタンの表示切り替え（既存の .is-visible を使い回す）
                if (pageTopBtn) {
                    pageTopBtn.classList.toggle('is-visible', isHidden);
                }
            });
        }, {
            threshold: 0
        });

        observer.observe(triggerSection);
    }

    // ✕ボタンをクリックした時の処理
    if (floatingBanner && btnFloatingClose) {
        btnFloatingClose.addEventListener('click', () => {
            isFloatingClosedManually = true;
            floatingBanner.classList.remove('is-visible');
        });
    }

    // 🌟 トップへ戻るボタンをクリックした時の処理（スムーススクロール）
    if (pageTopBtn) {
        pageTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 指定した要素をクリックで中央へスムーススクロール（共通化） ---
    // 中央へスクロールさせる共通関数
    function smoothScrollTo(element) {
        if (element) {
            // スクロール位置を計算（要素のY座標 ＋ 現在のスクロール量 － 上部の余白）
            const offset = 80; // 上部に空けたい余白のピクセル数（好みで調整してください）
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const targetPosition = elementPosition - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // スクロールを発火させる要素と、スクロール対象要素の定義
    const scrollTriggers = [
        {
            selector: '.pickup-header',
            // pickup-headerの場合は、親の.pickup-card全体をスクロール対象にする
            getTarget: (el) => el.closest('.pickup-card')
        },
        {
            selector: '.section-title-band',
            getTarget: (el) => el
        }
    ];

    // 定義に基づいて一括でクリックイベントを登録
    scrollTriggers.forEach(({ selector, getTarget }) => {
        document.querySelectorAll(selector).forEach(trigger => {
            trigger.addEventListener('click', function () {
                smoothScrollTo(getTarget(this));
            });
        });
    });


    // --- タブ切り替え機能 ---
    const tabs = document.querySelectorAll('.ranking-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0 && tabContents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab-target');
                if (!targetId) return;

                // 1. 全てのタブとコンテンツの状態をリセット
                tabs.forEach(t => t.classList.remove('is-active'));
                tabContents.forEach(c => c.classList.remove('is-active'));

                // 2. 選択されたタブをアクティブ化
                tab.classList.add('is-active');

                // 3. 対象のコンテンツをアクティブ化して表示
                const targetContent = document.querySelector(`.tab-content[data-tab-content="${targetId}"]`);
                if (targetContent) {
                    targetContent.classList.add('is-active');
                }
            });
        });
    }
});