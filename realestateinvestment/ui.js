// ui.js
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. テーブル展開 ---
    const wrapper = document.getElementById('tableExpandWrapper');
    const btn = document.getElementById('btnExpand');

    if (wrapper && btn) {
        btn.addEventListener('click', function() {
            wrapper.classList.toggle('is-open');
            
            if (wrapper.classList.contains('is-open')) {
                btn.textContent = '× 閉じる';
            } else {
                btn.textContent = '＋ すべて見る';
            }
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

        function getVisibleCount() {
            return window.innerWidth >= 1024 ? 3 : 1;
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            const dotCount = Math.ceil(items.length / getVisibleCount());
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => { currentIndex = i; updateSlider(); });
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const visibleCount = getVisibleCount();
            const dotCount = Math.ceil(items.length / visibleCount);
            if (currentIndex >= dotCount) currentIndex = dotCount - 1;

            // 💡 修正ポイント：paddingに依存せず、カード1枚の実際の幅を取得
            const itemWidth = items[0].offsetWidth; 
            const gap = 16; // CSSで指定した1rem(16px)
            
            // 移動距離 ＝ (カードの幅 + 隙間) × 移動枚数
            const moveDistance = (itemWidth + gap) * visibleCount;
            track.style.transform = `translateX(-${currentIndex * moveDistance}px)`;
            
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        nextBtn?.addEventListener('click', () => {
            const dotCount = Math.ceil(items.length / getVisibleCount());
            currentIndex = (currentIndex + 1) % dotCount;
            updateSlider();
        });

        prevBtn?.addEventListener('click', () => {
            const dotCount = Math.ceil(items.length / getVisibleCount());
            currentIndex = (currentIndex - 1 + dotCount) % dotCount;
            updateSlider();
        });

        createDots();
        // リサイズ時は計算し直す
        window.addEventListener('resize', () => {
            createDots();
            updateSlider();
        });
    });
});