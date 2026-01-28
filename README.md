# 🚀 Frontend Medmon v7

Frontend Medmon v7 adalah **aplikasi frontend enterprise-grade** yang dibangun menggunakan **Vue 3 + Vite** dengan pendekatan **Clean Architecture**. Proyek ini dirancang untuk mendukung pengembangan jangka panjang, mudah diperluas, konsisten, dan mudah dirawat oleh banyak developer.

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
* Setiap fitur berdiri sendiri (*self-contained module*)
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
├── app/                                      # Application layer (entry point & orchestration)
│   ├── router/                               # Konfigurasi routing global (Vue Router)
│   ├── hooks/                                # Facade hooks untuk UI (penghubung UI → UseCase)
│   ├── init/                                 # Inisialisasi awal app (i18n, auth, permission, dsb)
│   ├── store/                                # Global Pinia store (auth, user, app state)
│   ├── assets/                               # Static assets global (logo, image, font)
│   └── usecase/                              # Application UseCase (business flow utama)
│       └── auth/
│           └── login.usecase.ts              # UseCase login (alur bisnis autentikasi)
│
├── shared/                                   # Shared / common layer (tanpa business logic)
│   ├── hooks/                                # Reusable composables murni (non-domain)
│   ├── utils/                                # Helper function (format, encrypt, parser)
│   ├── api/                                  # Infrastruktur HTTP & networking
│   │   ├── interceptors/                     # Axios interceptor (auth, error, refresh token)
│   │   │   ├── auth.interceptor.ts           # Inject & validate auth token
│   │   │   ├── error.interceptor.ts          # Global error handling
│   │   │   └── refresh-token.interceptor.ts  # Auto refresh token handler
│   │   ├── http.ts                           # HTTP abstraction (get, post, put, delete)
│   │   ├── index.ts                          # Barrel export API module
│   │   ├── types.ts                          # HTTP & API related types
│   │   └── axios.ts                          # Axios instance terkonfigurasi
│   └── constants/                            # Konstanta global aplikasi
│
├── domain/                                   # Domain / UI feature layer
│   ├── login/                                # Domain login
│   │   ├── i18n/                             # Translation login (id/en)
│   │   └── ui/                               # UI component login (form, layout)
│   ├── dashboard/                            # Domain dashboard
│   │   ├── i18n/                             # Translation dashboard
│   │   └── ui/                               # UI component dashboard
│   └── analytics-ner/                        # Domain analytics NER
│       ├── i18n/                             # Translation analytics NER
│       └── ui/                               # UI component analytics NER
│
└── pages/                                    # Page-level routing views (route entry)
    ├── login.vue                             # Entry page login
    └── analytics/
        ├── generals/
        │   ├── socmed-summary.vue            # Page ringkasan social media
        │   └── conmed-summary.vue            # Page ringkasan conventional media
        └── ner.vue                           # Page analytics NER
```

---

## 🧱 Clean Architecture Flow (Wajib Diikuti)

### 🔄 Alur Utama Data & Logic

```
UI (Domain Layer)
   ↓
App Hook (Facade)
   ↓
App UseCase
   ↓
Service-Data (API)
   ↓
Shared (Utils / Helper)
```

> **Catatan Penting**
> Alur ini bersifat **satu arah (unidirectional)**. Setiap layer **tidak boleh melompati layer di bawahnya**.

---

## 🧩 Peran & Tanggung Jawab Tiap Layer

### 1️⃣ UI (Domain Layer)

**Lokasi:** `domain/*/ui`

Tanggung jawab:

* Mengelola tampilan dan interaksi user
* Menampilkan data dan menangani event UI
* **Hanya memanggil App Hook**

Larangan:

* ❌ Tidak boleh import `usecase`
* ❌ Tidak boleh import API / service

---

### 2️⃣ App Hook (Facade Layer)

**Lokasi:** `app/hooks/*/`

Tanggung jawab:

* Pintu masuk utama dari UI ke App
* Menyediakan API yang stabil untuk UI
* Menyederhanakan interaksi UI dengan business logic
* Menghubungkan UI ke UseCase

Contoh peran:

* `useDashboard()`
* `useAuth()`

---

### 3️⃣ App UseCase (Application Layer)

**Lokasi:** `app/usecase/*/`

Tanggung jawab:

* Menjalankan alur bisnis
* Mengelola state (Pinia) dan side-effect
* Mengorkestrasi data dari Service-Data

Karakteristik:

* Tidak mengetahui UI
* Fokus pada *what to do*, bukan *how to render*

---

### 4️⃣ Service-Data (Infrastructure Layer)

**Lokasi:** `service-data/*/services/api.ts`

Tanggung jawab:

* Komunikasi dengan backend (API)
* HTTP request / response
* Tidak mengandung business logic

---

### 5️⃣ Shared (Common / Utility Layer)

**Lokasi:** `shared/`

Tanggung jawab:

* Utility murni (helper, encrypt, formatter)
* Type global & konstanta
* Axios instance & interceptor

Karakteristik:

* Tidak bergantung ke layer lain
* Bisa digunakan oleh semua layer

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

## 🌐 Internationalization (i18n)

* Mendukung **Bahasa Indonesia (ID)** dan **English (EN)**
* Global i18n di `app/globals/i18n`
* i18n per domain di masing-masing folder `domain/*/i18n`
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

### Struktur File

* `ui/` → UI-only
* `i18n/` → File JSON i18n

### Penamaan

* **kebab-case** → file `.vue`
* **PascalCase** → Komponen
* **camelCase** → Variabel & function

---

## 📦 Deployment

Hasil build berada di:

```
dist/
```

Deployment dapat menggunakan:

* Nginx / Apache
* Docker
* Static hosting (S3, Cloudflare Pages, dll)

---

## 👥 Kontribusi

1. Buat branch baru (`tiket-jira`)
2. Lakukan perubahan
3. Pastikan `npm run build` sukses
4. Buat Pull Request

---

## 📄 Lisensi

Project ini bersifat **internal / proprietary** dan tidak diperkenankan untuk distribusi tanpa izin.
