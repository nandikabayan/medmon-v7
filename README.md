# 🚀 Frontend Medmon v7

Frontend Medmon v7 adalah **aplikasi frontend enterprise-grade** yang dibangun menggunakan **Vue 3 + Vite** dengan pendekatan **feature-based modular architecture**. Proyek ini dirancang untuk mendukung pengembangan jangka panjang, mudah diperluas, konsisten, dan mudah dirawat oleh banyak developer.

Aplikasi ini berfungsi sebagai **dashboard monitoring & analytics** (Media Monitoring & NER Analytics) dengan dukungan **bilingual (EN/ID)**, **API abstraction**, serta **manajemen state dan autentikasi terpusat**.

---

## 🎯 Tujuan & Hasil yang Diharapkan

### Tujuan

* Menyediakan fondasi frontend yang **scalable** dan **maintainable**
* Memisahkan **UI, business logic, dan data layer** secara jelas
* Memudahkan penambahan fitur baru tanpa mengganggu fitur lain
* Menyediakan pola baku untuk tim frontend

### Hasil

* Struktur proyek yang konsisten dan terstandarisasi
* Setiap fitur berdiri sendiri (self-contained module)
* Performa tinggi dengan Vite & Vue 3
* Pengelolaan state dan API yang terpusat dan aman
* Dukungan multi-bahasa yang mudah diperluas

---

## 🧩 Lingkungan Pengembangan

| Tool    | Versi    |
| ------- | -------- |
| Node.js | v24.11.1 |
| npm     | v11.6.2  |
| Vue     | 3.x      |
| Vite    | 7.x      |

---

## 📁 Struktur Folder Proyek

```
src/
│
├── app/
│   ├── router/                  # Konfigurasi routing aplikasi
│   ├── store/                   # Global Pinia store
│   ├── layouts/                 # Layout utama (Header, Sidebar, Footer)
│   ├── providers/               # Global providers (auth, permission, guards)
│   ├── globals/                 # Global style, theme, icon, interface
│   │   └── i18n/                # Bahasa global (id.json, en.json)
│   └── assets/                  # Static assets
│
├── shared/
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Custom composables (useAuth, useDarkMode)
│   ├── utils/                   # Helper & utilities
│   ├── api/                     # HTTP & Axios abstraction
│   │   ├── interceptors/        # Token & auth interceptors
│   │   ├── mappers/             # API response mappers
│   │   ├── models/              # API models
│   │   └── axios.ts             # Axios instance
│   ├── models/                  # Global TypeScript interfaces
│   └── constants/               # Konstanta aplikasi
│
├── features/                    # Modul berbasis fitur
│   ├── dashboard/
│   │   ├── components/
│   │   ├── i18n/
│   │   ├── api.ts
│   │   ├── service.ts
│   │   ├── mapper.ts
│   │   └── model.ts
│   │
│   ├── analytics-ner/
│   │   ├── components/
│   │   ├── features/
│   │   ├── models/
│   │   ├── mappers/
│   │   ├── api/
│   │   └── i18n/
│
└── pages/                       # Page-level routing views
    ├── dashboard.vue
    └── analytics/
        ├── generals/
        │   ├── socmed-summary.vue
        │   └── conmed-summary.vue
        └── ner.vue
```

---

## 🛠️ Teknologi Utama

* **Vue 3 (Composition API)**
* **TypeScript**
* **Vite 7**
* **Pinia** – State Management
* **Vue Router** – Routing
* **Axios** – HTTP Client
* **Custom i18n Handler** – Multi bahasa

---

## ⚙️ Instalasi

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd frontend-medmon-v7
```

### 2️⃣ Install Dependencies

```bash
npm install
```

Jika terjadi konflik dependensi:

```bash
npm install --legacy-peer-deps
```

---

## ▶️ Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Akses melalui:

```
http://localhost:5173
```

### Build Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## 🌐 Internationalization (i18n)

* Mendukung **Bahasa Indonesia (ID)** dan **English (EN)**
* Global i18n di `app/globals/i18n`
* i18n per fitur di masing-masing folder `features/*/i18n`
* Mudah ditambahkan untuk bahasa baru

---

## 🔐 Manajemen API & Auth

* Axios instance terpusat
* Interceptor untuk:

  * Verifikasi token
  * Refresh token otomatis
* Mapping response API agar konsisten
* Pemisahan API, Service, dan Mapper

---

## 🧱 Konvensi Kode

### Struktur

* `components/` → UI-only
* `service.ts` → Business logic
* `api.ts` → HTTP call
* `mapper.ts` → Transform data
* `model.ts` → TypeScript interface

### Penamaan

* **kebab-case** → file `.vue`
* **PascalCase** → komponen
* **camelCase** → variabel & function

---

## 📦 Deployment

Hasil build berada di:

```
dist/
```

Deployment dapat menggunakan:

* Nginx / Apache
* Docker
* Static hosting (S3, Cloudflare Pages, dsb.)

---

## 👥 Kontribusi

1. Buat branch baru (`feature/nama-fitur`)
2. Lakukan perubahan
3. Pastikan `npm run build` sukses
4. Buat Pull Request

---

## 📄 Lisensi

Project ini bersifat **internal / proprietary** dan tidak diperkenankan untuk distribusi tanpa izin.
