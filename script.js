// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // スムーズスクロール機能
    initSmoothScroll();
    
    // スクロールアニメーション機能
    initScrollAnimations();
    
    // ヘッダーのスクロール効果
    initHeaderScroll();
    
});

/**
 * スムーズスクロール機能の初期化
 * ナビゲーションリンクをクリックした際に該当セクションへスムーズにスクロール
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * スクロールアニメーション機能の初期化
 * Intersection Observer APIを使用してパフォーマンスを最適化
 */
function initScrollAnimations() {
    // アニメーション対象の要素を取得
    const animationTargets = document.querySelectorAll(
        '.hero-content, .section-header, .about-content, .work-card, .experience-content, .contact-content'
    );
    
    // 各要素にfade-inクラスを追加
    animationTargets.forEach(target => {
        target.classList.add('fade-in');
    });
    
    // Intersection Observer のオプション設定
    const observerOptions = {
        threshold: 0.1, // 要素が10%見えたらトリガー
        rootMargin: '0px 0px -50px 0px' // 下から50px手前でトリガー
    };
    
    // Observer のコールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素がビューポートに入った時の処理
                entry.target.classList.add('visible');
                
                // 一度アニメーションが実行されたら監視を停止（パフォーマンス向上）
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Observer を作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 各要素を監視対象に追加
    animationTargets.forEach(target => {
        observer.observe(target);
    });
    
    // Work カードの個別アニメーション（少し遅延を加える）
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // タグクラウドの個別アニメーション
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.05}s`;
    });
}

/**
 * ヘッダーのスクロール効果
 * スクロール位置に応じてヘッダーの透明度を調整
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール位置に応じてヘッダーの背景透明度を調整
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * パフォーマンス最適化のためのスロットル関数
 * 高頻度で発生するイベント（スクロールなど）の処理頻度を制限
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * 追加のインタラクション効果
 * ページ読み込み完了後に実行される追加の効果
 */
window.addEventListener('load', function() {
    // ヒーローセクションの初期アニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // プロフィール画像のホバー効果を追加
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

/**
 * エラーハンドリング
 * 予期しないエラーをキャッチして適切に処理
 */
window.addEventListener('error', function(e) {
    console.warn('Portfolio site error:', e.error);
    // 本番環境では適切なエラー報告サービスに送信することを推奨
});

/**
 * アクセシビリティ向上のための機能
 * キーボードナビゲーションのサポート
 */
document.addEventListener('keydown', function(e) {
    // Tabキーでのフォーカス移動時の視覚的フィードバック向上
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// キーボードナビゲーション用のCSS（動的に追加）
const keyboardNavStyle = document.createElement('style');
keyboardNavStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color-1) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardNavStyle);