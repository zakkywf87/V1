# ArticleScope Intelligence

## Deskripsi Proyek

ArticleScope Intelligence adalah program web yang mengimplementasikan teknik pembelajaran mesin dasar untuk memberikan rekomendasi artikel berdasarkan preferensi pengguna. Program ini dirancang dengan antarmuka modern yang menerapkan prinsip glassmorphism dan responsive design.

## Struktur File

```
project/
├── FP_AI.html          # File HTML utama dengan struktur antarmuka
├── script.js           # Logika JavaScript dan algoritma rekomendasi
├── style.css           # Styling CSS dengan desain modern
└── README.md           # Dokumentasi proyek
```

## Teknik Artificial Intelligence yang Diimplementasikan

### 1. Content-Based Filtering

Sistem ini menggunakan pendekatan Content-Based Filtering sebagai fondasi utama algoritma rekomendasi. Teknik ini bekerja dengan menganalisis karakteristik konten yang disukai pengguna untuk merekomendasikan item serupa.

**Implementasi dalam Kode:**
- Setiap artikel memiliki atribut `category` dan `keywords` yang berfungsi sebagai fitur konten
- Sistem membangun profil pengguna berdasarkan kategori dan kata kunci dari artikel yang disukai
- Algoritma menghitung skor relevansi dengan memberikan bobot berbeda untuk kategori (skor × 2) dan kata kunci (skor × 1)

```javascript
// Contoh struktur data artikel
const articles = [
    { 
        id: 1, 
        title: "Pengenalan JavaScript Modern", 
        category: "Pemrograman", 
        keywords: ["javascript", "web", "coding"] 
    }
];
```

### 2. User Profiling dan Preference Learning

Sistem mengimplementasikan teknik pembelajaran preferensi pengguna secara adaptif melalui explicit feedback mechanism.

**Komponen User Model:**
- `likedArticles`: Array yang menyimpan ID artikel yang disukai pengguna
- `categoryPreferences`: Object yang menghitung frekuensi preferensi kategori
- `keywordPreferences`: Object yang menghitung frekuensi preferensi kata kunci

**Mekanisme Pembelajaran:**
```javascript
// Update preferensi saat pengguna menyukai artikel
userModel.categoryPreferences[article.category]++;
article.keywords.forEach(keyword => {
    userModel.keywordPreferences[keyword]++;
});
```

### 3. Scoring Algorithm

Sistem menggunakan algoritma scoring berbasis weighted sum untuk menghitung relevansi artikel dengan preferensi pengguna.

**Formula Perhitungan Skor:**
```
Score = (Category_Weight × Category_Frequency) + Σ(Keyword_Weight × Keyword_Frequency)
```

**Implementasi:**
```javascript
let score = 0;
// Skor kategori dengan bobot 2x
if (userModel.categoryPreferences[article.category]) {
    score += userModel.categoryPreferences[article.category] * 2;
}
// Skor kata kunci dengan bobot 1x
article.keywords.forEach(keyword => {
    if (userModel.keywordPreferences[keyword]) {
        score += userModel.keywordPreferences[keyword];
    }
});
```

### 4. Cold Start Problem Solution

Sistem menangani masalah cold start (pengguna baru tanpa preferensi) dengan pendekatan graceful degradation:
- Menampilkan semua artikel tersedia ketika belum ada preferensi
- Memberikan pesan informatif untuk mendorong interaksi awal
- Secara bertahap membangun model preferensi berdasarkan feedback pengguna

### 5. Real-time Model Update

Sistem mengimplementasikan pembelajaran online dengan update model secara real-time setiap kali pengguna memberikan feedback:
- Model diperbarui langsung setelah aksi like/dislike
- Rekomendasi di-refresh otomatis berdasarkan model terbaru
- Akurasi model dihitung dinamis berdasarkan jumlah interaksi

## Fitur Utama Aplikasi

### Interface Pengguna
- **Daftar Artikel**: Menampilkan semua artikel dengan informasi kategori dan kata kunci
- **Preferensi Pengguna**: Visualisasi real-time dari preferensi yang dipelajari sistem
- **Rekomendasi**: Menampilkan top-3 artikel yang paling relevan dengan skor kepercayaan
- **Model Information**: Dashboard yang menunjukkan performa dan akurasi model

### Feedback Mechanism
- **Like Button**: Meningkatkan preferensi terhadap kategori dan kata kunci artikel
- **Dislike Button**: Mengurangi atau menghapus preferensi yang telah terbentuk
- **Reset Function**: Menghapus semua pembelajaran dan memulai dari awal

## Teknologi dan Framework

### Frontend Technologies
- **HTML5**: Struktur semantik dengan accessibility support
- **CSS3**: Styling modern dengan glassmorphism effects, animations, dan responsive design
- **Vanilla JavaScript**: Logika aplikasi tanpa ketergantungan framework eksternal

### Design Principles
- **Glassmorphism**: Efek transparansi dan blur untuk estetika modern
- **Responsive Design**: Kompatibilitas multi-device dengan breakpoint optimization
- **Progressive Enhancement**: Degradasi yang baik untuk browser dengan kemampuan terbatas

## Algoritma Evaluasi Model

### Accuracy Calculation
Sistem menghitung akurasi model berdasarkan formula:
```
Accuracy = min(100, (liked_articles_count / total_articles_count) * 100 + 30)
```

### Performance Metrics
- **Coverage**: Persentase artikel yang dapat direkomendasikan
- **Diversity**: Variasi kategori dalam rekomendasi
- **Relevance Score**: Tingkat kesesuaian rekomendasi dengan preferensi pengguna

## Instalasi dan Penggunaan

### Persyaratan Sistem
- Browser modern dengan dukungan ES6+ (Chrome 60+, Firefox 55+, Safari 12+)
- JavaScript enabled
- Koneksi internet untuk Google Fonts dan Tailwind CSS CDN

### Cara Menjalankan
1. Download semua file proyek ke dalam satu direktori
2. Buka file `FP_AI.html` menggunakan web browser
3. Mulai berinteraksi dengan sistem dengan memilih artikel yang disukai
4. Amati perubahan rekomendasi secara real-time

### Penggunaan Program
1. **Eksplorasi Artikel**: Baca daftar artikel yang tersedia dengan kategori dan kata kunci
2. **Berikan Feedback**: Klik tombol "Suka" pada artikel yang menarik
3. **Pantau Pembelajaran**: Lihat bagaimana sistem membangun profil preferensi
4. **Evaluasi Rekomendasi**: Periksa rekomendasi yang diberikan dengan skor relevansi
5. **Reset Jika Perlu**: Gunakan tombol reset untuk memulai pembelajaran dari awal

## Limitasi dan Pengembangan Selanjutnya

### Limitasi Saat Ini
- Dataset artikel terbatas (12 artikel untuk demonstrasi)
- Tidak ada persistensi data (preferensi hilang saat reload halaman)
- Algoritma sederhana tanpa advanced machine learning techniques
- Tidak ada collaborative filtering atau hybrid approach

### Potential Improvements
- Implementasi matrix factorization untuk collaborative filtering
- Integrasi dengan database untuk persistensi data pengguna
- Penambahan algoritma deep learning untuk feature extraction
- A/B testing framework untuk evaluasi performa rekomendasi
- Integration dengan real-time analytics dan user behavior tracking

## Kontribusi dan Pengembangan

Proyek ini dirancang sebagai foundation untuk pengembangan sistem rekomendasi yang lebih kompleks. Kontributor dapat memperluas fungsionalitas dengan menambahkan:
- Advanced filtering algorithms
- User authentication dan profiling
- Social recommendations
- Real-time content updates
- Machine learning model training pipeline

---

*ArticleScope Intelligence - Smart Content Discovery Through AI-Powered Learning*
