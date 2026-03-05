// ui.js
document.addEventListener('DOMContentLoaded', function() {
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
});