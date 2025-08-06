// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // スムーズスクロール機能
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer APIを使用したスクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 監視対象の要素を設定
    const animatedElements = document.querySelectorAll('.section, .work-card, .experience-tag');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ワークカードの個別アニメーション
    const workCards = document.querySelectorAll('.work-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 順次表示のための遅延
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    // ワークカードの初期状態設定と監視開始
    workCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // エクスペリエンスタグのアニメーション
    const experienceTags = document.querySelectorAll('.experience-tag');
    
    const tagObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50); // より短い間隔で順次表示
            }
        });
    }, {
        threshold: 0.1
    });
    
    // エクスペリエンスタグの初期状態設定と監視開始
    experienceTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.9)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        tagObserver.observe(tag);
    });
    
    // ヘッダーのスクロール時の透明度変更
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // パフォーマンス最適化：スクロールイベントのスロットリング
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーの背景透明度調整
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // 初期表示時のヒーローセクションアニメーション
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-catchcopy, .hero-name, .profile-image');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
    
    // ヒーローセクション要素の初期状態設定
    const heroElements = document.querySelectorAll('.hero-catchcopy, .hero-name, .profile-image');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});
