function loadHTML(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(err => console.error(err));
}

// ページが読み込まれたら自動で挿入
document.addEventListener("DOMContentLoaded", function() {
    loadHTML("header", "/realestateinvestment/components/header.html");
    loadHTML("footer", "/realestateinvestment/components/footer.html");
});
