"use strict";

// =================== scroll animation ===================
const checkAnimation = (els) => {
    els.forEach((el) => {
        if (el.isIntersecting) {
            el.target.classList.add("is-animated");
        }
    });
};
const anmOpt = { rootMargin: "0% 0% -5%", threshold: 0 };
const anmObserver = new IntersectionObserver(checkAnimation, anmOpt);

window.addEventListener("load", () => {
    document.querySelectorAll(".slideUp, .fadeIn").forEach((el) => {
        anmObserver.observe(el);
    });
});

// =================== dialog (進呈条件) ===================
const dialog = document.querySelector("dialog");

if (dialog) {
    document.querySelectorAll(".dialog_open, .js-dialog-open").forEach((opener) => {
        opener.addEventListener("click", function (e) {
            e.preventDefault();
            dialog.showModal();
            dialog.classList.add("show");
        });
    });

    const closeBtn = document.querySelector(".dialog_close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeDialog);
    }

    dialog.addEventListener("click", (event) => {
        if (!event.target.closest(".dialog_inner")) {
            closeDialog();
        }
    });
}

function closeDialog() {
    if (!dialog) return;
    dialog.classList.remove("show");
    setTimeout(() => dialog.close(), 500);
}

// =================== parameter pass-through ===================
document.addEventListener("DOMContentLoaded", function () {
    const param = window.location.search;
    const lpParam = "?lp=ebook_no1";

    document.querySelectorAll(".p-parameter-link").forEach(function (el) {
        const link = el.getAttribute("href");
        if (!link) return;
        el.setAttribute(
            "href",
            param ? link + lpParam + param.replace("?", "&") : link + lpParam
        );
    });
});

// =================== chatbot ===================
document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.querySelector(".js-chatbot");
    const closeBtn = document.querySelector(".js-chatbot-close-btn");
    const iframe = document.getElementById("ctaIframe");

    // iframe src をセット (クエリパラメータ引き継ぎ)
    if (iframe) {
        const base = "https://chatbot.jpreturns.com/ebook_no1/";
        const query = window.location.search;
        iframe.src = query ? base + "?" + query.substring(1) : base;
    }

    if (chatbot && closeBtn) {
        closeBtn.addEventListener("click", function () {
            chatbot.classList.remove("is-open");
            chatbot.classList.add("is-close");
        });
    }

    // CTA リンクのクリック: PCはチャットボット popup 起動、SPは通常遷移
    document.querySelectorAll(".js-chatbot-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            if (link.classList.contains("js-dialog-open")) return;
            if (window.innerWidth > 768 && chatbot) {
                e.preventDefault();
                chatbot.classList.remove("is-close");
                chatbot.classList.add("is-open");
            }
        });
    });
});

// =================== PC floating CTA 表示/非表示 ===================
const floatingBtn = document.querySelector(".js-cta-floating");
const footerEl = document.getElementById("footer");

document.addEventListener("scroll", () => {
    if (!floatingBtn) return;

    const scrollY = window.scrollY;
    const footerTop = footerEl
        ? footerEl.getBoundingClientRect().top + scrollY - 600
        : Infinity;

    if (scrollY > 450) {
        if (scrollY > footerTop) {
            floatingBtn.classList.remove("is-visible");
            floatingBtn.classList.add("is-hidden");
        } else {
            floatingBtn.classList.remove("is-hidden");
            floatingBtn.classList.add("is-visible");
        }
    } else {
        floatingBtn.classList.remove("is-visible", "is-hidden");
    }
});

// =================== 追従ナビ: FVスクロール後にフェードイン / セクションハイライト / フッター付近で非表示 ===================
document.addEventListener("DOMContentLoaded", () => {
    const gnav = document.getElementById("gnav");
    if (!gnav) return;

    const gnavLinks = gnav.querySelectorAll(".gnav_link[data-section]");

    // FV が viewport から外れたら gnav を表示 (下からフェードイン)
    const fvEl = document.getElementById("fv");
    if (fvEl) {
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        gnav.classList.add("is-visible");
                    } else {
                        gnav.classList.remove("is-visible");
                    }
                });
            },
            { threshold: 0 }
        ).observe(fvEl);
    }

    // セクションが viewport に入ったらリンクをアクティブに
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    gnavLinks.forEach((link) => {
                        link.classList.toggle("is-active", link.dataset.section === id);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((s) => {
        sectionObserver.observe(s);
    });

    // フッターが見えたら gnav を強制非表示
    if (footerEl) {
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    gnav.classList.toggle("is-hidden", entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        ).observe(footerEl);
    }
});

// =================== SP fixed CTA 表示/非表示 ===================
document.addEventListener("DOMContentLoaded", () => {
    const spFixedCta = document.querySelector(".sp_fixed_cta");
    if (!spFixedCta) return;

    let fvCtaGone = false;
    let footerShown = false;

    const syncSpCta = () => {
        if (fvCtaGone && !footerShown) {
            spFixedCta.classList.add("is-visible");
        } else {
            spFixedCta.classList.remove("is-visible");
        }
    };

    const fvCtaEl = document.querySelector(".fv_cta");
    if (fvCtaEl) {
        new IntersectionObserver(
            (entries) => {
                fvCtaGone = !entries[0].isIntersecting;
                syncSpCta();
            },
            { threshold: 0 }
        ).observe(fvCtaEl);
    }

    if (footerEl) {
        new IntersectionObserver(
            (entries) => {
                footerShown = entries[0].isIntersecting;
                syncSpCta();
            },
            { threshold: 0 }
        ).observe(footerEl);
    }
});

// =================== YouTube autoplay on scroll ===================
document.addEventListener("DOMContentLoaded", () => {
    const videoContainers = document.querySelectorAll(".js-youtube-auto");
    if (!videoContainers.length) return;

    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const container = entry.target;
                const videoId = container.dataset.videoId;
                if (!videoId || container.querySelector("iframe")) return;

                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1`;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowFullscreen = true;

                const thumb = container.querySelector(".what_video_thumb");
                if (thumb) thumb.remove();
                container.appendChild(iframe);

                videoObserver.unobserve(container);
            });
        },
        { threshold: 0.5 }
    );

    videoContainers.forEach((el) => videoObserver.observe(el));
});
