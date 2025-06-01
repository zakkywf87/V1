// Data artikel yang tersedia
const articles = [
    { id: 1, title: "Pengenalan JavaScript Modern", category: "Pemrograman", keywords: ["javascript", "web", "coding"] },
    { id: 2, title: "Machine Learning untuk Pemula", category: "Data Science", keywords: ["AI", "ML", "algorithm", "data"] },
    { id: 3, title: "Tips Fotografi Landscape", category: "Fotografi", keywords: ["photo", "nature", "camera"] },
    { id: 4, title: "Membuat Website Responsif", category: "Web Development", keywords: ["css", "html", "web", "responsive"] },
    { id: 5, title: "Strategi Digital Marketing", category: "Marketing", keywords: ["digital", "marketing", "social media"] },
    { id: 6, title: "Pemrograman Python Dasar", category: "Pemrograman", keywords: ["python", "coding", "algorithm"] },
    { id: 7, title: "Deep Learning dan Neural Networks", category: "Data Science", keywords: ["AI", "ML", "neural", "algorithm"] },
    { id: 8, title: "Fotografi Potret", category: "Fotografi", keywords: ["photo", "portrait", "camera"] },
    { id: 9, title: "HTML dan CSS untuk Pemula", category: "Web Development", keywords: ["css", "html", "web"] },
    { id: 10, title: "Content Marketing Strategy", category: "Marketing", keywords: ["content", "marketing", "strategy"] },
    { id: 11, title: "Pemrograman Mobile dengan React Native", category: "Pemrograman", keywords: ["react", "mobile", "coding"] },
    { id: 12, title: "Analisis Data dengan Python", category: "Data Science", keywords: ["python", "data", "analysis"] }
];

// Model preferensi pengguna
let userModel = {
    likedArticles: [],
    categoryPreferences: {},
    keywordPreferences: {}
};

// Inisialisasi komponen UI
window.onload = function() {
    renderArticles();
    updateModelAccuracy();
};

// Render daftar artikel dengan layout yang enhanced
function renderArticles() {
    const contentList = document.getElementById('content-list');
    contentList.innerHTML = '';
    
    articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const isLiked = userModel.likedArticles.includes(article.id);
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-meta">
                    <div class="card-category">${article.category}</div>
                </div>
                <div class="card-title">${article.title}</div>
                <div class="card-keywords">Keywords: ${article.keywords.join(', ')}</div>
            </div>
            <div class="card-actions">
                <button class="btn ${isLiked ? 'btn-secondary' : ''}" onclick="likeArticle(${article.id})">
                    ${isLiked ? 'Disukai' : 'Suka'}
                </button>
                <button class="btn btn-secondary" onclick="dislikeArticle(${article.id})">
                    ${isLiked ? 'Hapus' : 'Tidak Suka'}
                </button>
            </div>
        `;
        
        contentList.appendChild(card);
    });
}

// Menangani aksi "suka" pada artikel
function likeArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    // Menambahkan artikel ke daftar yang disukai jika belum ada
    if (!userModel.likedArticles.includes(articleId)) {
        userModel.likedArticles.push(articleId);
        
        // Memperbarui preferensi kategori
        if (!userModel.categoryPreferences[article.category]) {
            userModel.categoryPreferences[article.category] = 1;
        } else {
            userModel.categoryPreferences[article.category]++;
        }
        
        // Memperbarui preferensi keyword
        article.keywords.forEach(keyword => {
            if (!userModel.keywordPreferences[keyword]) {
                userModel.keywordPreferences[keyword] = 1;
            } else {
                userModel.keywordPreferences[keyword]++;
            }
        });
        
        // Memperbarui tampilan preferensi dan rekomendasi
        updateUserPreferences();
        updateRecommendations();
        updateModelAccuracy();
        renderArticles(); // Re-render untuk update button state
    }
}

// Menangani aksi "tidak suka" pada artikel
function dislikeArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    // Menghapus artikel dari daftar yang disukai jika ada
    const index = userModel.likedArticles.indexOf(articleId);
    if (index !== -1) {
        userModel.likedArticles.splice(index, 1);
        
        // Mengurangi preferensi kategori
        if (userModel.categoryPreferences[article.category]) {
            userModel.categoryPreferences[article.category]--;
            if (userModel.categoryPreferences[article.category] <= 0) {
                delete userModel.categoryPreferences[article.category];
            }
        }
        
        // Mengurangi preferensi keyword
        article.keywords.forEach(keyword => {
            if (userModel.keywordPreferences[keyword]) {
                userModel.keywordPreferences[keyword]--;
                if (userModel.keywordPreferences[keyword] <= 0) {
                    delete userModel.keywordPreferences[keyword];
                }
            }
        });
        
        // Memperbarui tampilan preferensi dan rekomendasi
        updateUserPreferences();
        updateRecommendations();
        updateModelAccuracy();
        renderArticles(); // Re-render untuk update button state
    }
}

// Memperbarui tampilan preferensi pengguna
function updateUserPreferences() {
    const preferencesContainer = document.getElementById('userPreferences');
    
    if (userModel.likedArticles.length === 0) {
        preferencesContainer.innerHTML = '<p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Belum ada preferensi. Silakan pilih beberapa artikel yang Anda sukai.</p>';
        return;
    }
    
    preferencesContainer.innerHTML = '';
    
    // Menampilkan kategori yang disukai
    Object.keys(userModel.categoryPreferences).forEach(category => {
        const tag = document.createElement('div');
        tag.classList.add('preference-tag');
        tag.textContent = `${category} (${userModel.categoryPreferences[category]})`;
        preferencesContainer.appendChild(tag);
    });
    
    // Menampilkan keyword yang disukai
    Object.keys(userModel.keywordPreferences).forEach(keyword => {
        if (userModel.keywordPreferences[keyword] > 1) {
            const tag = document.createElement('div');
            tag.classList.add('preference-tag');
            tag.style.background = 'linear-gradient(135deg, #16a085 0%, #138d75 100%)';
            tag.textContent = `${keyword} (${userModel.keywordPreferences[keyword]})`;
            preferencesContainer.appendChild(tag);
        }
    });
}

// Memperbarui rekomendasi artikel
function updateRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations');
    
    if (userModel.likedArticles.length === 0) {
        recommendationsContainer.innerHTML = `
            <h2>Rekomendasi untuk Anda</h2>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Pilih beberapa artikel yang Anda sukai untuk mendapatkan rekomendasi.</p>
        `;
        return;
    }
    
    // Menghitung skor untuk setiap artikel yang belum disukai
    const articleScores = articles
        .filter(article => !userModel.likedArticles.includes(article.id))
        .map(article => {
            let score = 0;
            
            // Skor berdasarkan kategori
            if (userModel.categoryPreferences[article.category]) {
                score += userModel.categoryPreferences[article.category] * 2;
            }
            
            // Skor berdasarkan keyword
            article.keywords.forEach(keyword => {
                if (userModel.keywordPreferences[keyword]) {
                    score += userModel.keywordPreferences[keyword];
                }
            });
            
            return { article, score };
        })
        .sort((a, b) => b.score - a.score); // Urutkan berdasarkan skor tertinggi
    
    // Menampilkan hasil rekomendasi
    recommendationsContainer.innerHTML = '<h2>Rekomendasi untuk Anda</h2>';
    
    if (articleScores.length === 0) {
        recommendationsContainer.innerHTML += '<p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Anda telah menyukai semua artikel yang tersedia.</p>';
        return;
    }
    
    // Menampilkan 3 rekomendasi teratas
    const topRecommendations = articleScores.slice(0, 3);
    
    topRecommendations.forEach(({ article, score }) => {
        const relevancePercentage = Math.min(100, Math.floor((score / 10) * 100));
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-meta">
                    <div class="card-category">${article.category}</div>
                </div>
                <div class="card-title">${article.title}</div>
                <div class="card-keywords">Keywords: ${article.keywords.join(', ')}</div>
                <div style="margin-top: 0.75rem;">
                    <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 0.5rem;">
                        Relevansi: ${relevancePercentage}%
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${relevancePercentage}%"></div>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn" onclick="likeArticle(${article.id})">Suka</button>
            </div>
        `;
        
        recommendationsContainer.appendChild(card);
    });
    
    // Menampilkan penjelasan tentang rekomendasi
    const explanation = document.createElement('div');
    explanation.style.marginTop = '1rem';
    explanation.style.fontSize = '0.85rem';
    explanation.style.color = 'rgba(255, 255, 255, 0.8)';
    explanation.innerHTML = `
        <p><strong>Dasar rekomendasi:</strong> Sistem menganalisis ${userModel.likedArticles.length} artikel yang Anda sukai 
        untuk mengidentifikasi kategori dan kata kunci yang relevan dengan minat Anda.</p>
    `;
    recommendationsContainer.appendChild(explanation);
}

// Memperbarui tampilan akurasi model
function updateModelAccuracy() {
    const progressBar = document.querySelector('.model-info .progress-bar');
    const modelDetails = document.getElementById('modelDetails');
    
    let accuracy = 0;
    
    if (userModel.likedArticles.length > 0) {
        // Hitung akurasi berdasarkan jumlah artikel yang disukai
        accuracy = Math.min(100, Math.floor((userModel.likedArticles.length / articles.length) * 100) + 30);
        
        progressBar.style.width = `${accuracy}%`;
        progressBar.textContent = `${accuracy}%`;
        
        modelDetails.innerHTML = `
            <div style="font-size: 0.8rem; line-height: 1.4;">
                <p>Model telah belajar dari ${userModel.likedArticles.length} interaksi.</p>
                <p>Kategori teratas: ${getTopCategories()}</p>
                <p>Keyword teratas: ${getTopKeywords()}</p>
            </div>
        `;
    } else {
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
        modelDetails.innerHTML = '<p style="font-size: 0.8rem;">Tidak ada data pembelajaran yang cukup.</p>';
    }
}

// Mendapatkan kategori teratas
function getTopCategories() {
    return Object.entries(userModel.categoryPreferences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([category, count]) => `${category} (${count})`)
        .join(', ') || 'Belum ada';
}

// Mendapatkan keyword teratas
function getTopKeywords() {
    return Object.entries(userModel.keywordPreferences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([keyword, count]) => `${keyword} (${count})`)
        .join(', ') || 'Belum ada';
}

// Reset preferensi pengguna
function resetPreferences() {
    userModel = {
        likedArticles: [],
        categoryPreferences: {},
        keywordPreferences: {}
    };
    
    updateUserPreferences();
    updateRecommendations();
    updateModelAccuracy();
    renderArticles(); // Re-render untuk reset button states
}