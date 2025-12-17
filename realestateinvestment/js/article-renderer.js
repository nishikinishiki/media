function renderTopArticles(containerId, count = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;

    articles.slice(0, count).forEach(article => {
        const articleEl = document.createElement("div");
        articleEl.className = "article-card p-4 bg-white rounded-lg shadow mb-6";

        articleEl.innerHTML = `
            <a href="${article.file}">
                <img src="${article.thumbnail}" alt="${article.title}" class="mb-4 w-full h-48 object-cover rounded">
                <span class="text-sm text-amber-600 font-bold">${article.category}</span>
                <h2 class="text-xl font-bold mt-1">${article.title}</h2>
            </a>
        `;
        container.appendChild(articleEl);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderTopArticles("top-articles");
});
