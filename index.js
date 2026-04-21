/**
 * 首页 JavaScript - Index Page Scripts
 * 用于 SEO/GEO 优化，从 HTML 中分离出来
 */

// 语言切换下拉菜单
function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('langBtn');
    
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
        btn.classList.add('active');
    } else {
        dropdown.style.display = 'none';
        btn.classList.remove('active');
    }
}

function switchLanguage(lang) {
    // 保存到 localStorage
    localStorage.setItem('userLanguage', lang);
    
    // 更新按钮显示文本
    const langText = lang === 'zh' ? '中文' : 'English';
    document.getElementById('currentLangText').textContent = langText;
    
    // 关闭下拉菜单
    document.getElementById('langDropdown').style.display = 'none';
    document.getElementById('langBtn').classList.remove('active');
    
    // 更新选中状态
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('selected');
    
    // 发送到后端设置 Cookie
    fetch('/api/set-language', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({language: lang})
    }).then(() => {
        // 等待一小段时间确保 Cookie 已设置，然后刷新页面
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }).catch(err => {
        console.error('Failed to set language:', err);
        // 即使 API 调用失败，也刷新页面
        setTimeout(() => {
            window.location.reload();
        }, 100);
    });
}

// 点击外部关闭下拉菜单
document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.lang-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.getElementById('langDropdown').style.display = 'none';
        document.getElementById('langBtn').classList.remove('active');
    }
});

// 页面加载时检查 localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('userLanguage');
    const currentLang = document.documentElement.lang || 'zh';
    if (savedLang && savedLang !== currentLang) {
        // 如果 localStorage 与当前语言不一致,自动切换
        switchLanguage(savedLang);
    }
});

// 显示邮箱地址
function revealEmail() {
    const btn = document.getElementById('emailBtn');
    const link = document.getElementById('emailLink');
    btn.style.display = 'none';
    link.style.display = 'inline';
}

// 显示电话号码
function revealPhone() {
    const btn = document.getElementById('phoneBtn');
    const link = document.getElementById('phoneLink');
    btn.style.display = 'none';
    link.style.display = 'inline';
}
