document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. テーブル展開コンポーネント ---
    const initTableExpand = () => {
        const wrapper = document.getElementById('tableExpandWrapper');
        const btn = document.getElementById('btnExpand');
        
        // 要素が存在しないページでは処理をスキップ（エラー防止）
        if (!wrapper || !btn) return;

        btn.addEventListener('click', () => {
            requestAnimationFrame(() => {
                const isOpen = wrapper.classList.toggle('is-open');
                // 状態に応じて高さを制御（CSSで max-height のトランジションをかける前提）
                wrapper.style.maxHeight = isOpen ? '2000px' : '550px';
                btn.textContent = isOpen ? '× 閉じる' : '＋ すべて見る';
            });
        });
    };

    // --- 2. 口コミスライダーコンポーネント ---
    const initSliders = () => {
        const sliders = document.querySelectorAll('.js-review-slider');
        if (sliders.length === 0) return;

        sliders.forEach(slider => {
            const track = slider.querySelector('.c-review-slider__track');
            const items = slider.querySelectorAll('.c-review-slider__item');
            const nextBtn = slider.querySelector('.c-review-slider__btn--next');
            const prevBtn = slider.querySelector('.c-review-slider__btn--prev');
            const dotsContainer = slider.querySelector('.js-slider-dots');
            
            if (!track || items.length === 0) return;

            let currentIndex = 0;
            let resizeTimer;

            const getVisibleCount = () => window.innerWidth >= 1024 ? 3 : 1;

            const createDots = (dotCount) => {
                if(!dotsContainer) return;
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
            };

            const updateSlider = (forceRebuildDots = false) => {
                const visibleCount = getVisibleCount();
                const dotCount = Math.ceil(items.length / visibleCount);
                
                if (currentIndex >= dotCount) currentIndex = Math.max(0, dotCount - 1);

                const itemWidth = items[0].offsetWidth; 
                const gap = 16; // 1rem
                const moveDistance = (itemWidth + gap) * visibleCount;

                requestAnimationFrame(() => {
                    if (forceRebuildDots) createDots(dotCount);
                    track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
                    
                    if(dotsContainer){
                        const dots = dotsContainer.querySelectorAll('.dot');
                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === currentIndex);
                        });
                    }
                });
            };

            updateSlider(true);

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

            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => { updateSlider(true); }, 100);
            });
        });
    };

    // 初期化関数の実行
    initTableExpand();
    initSliders();
});