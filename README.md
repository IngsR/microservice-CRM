# Fullstack CRM Monorepo (NestJS + Next.js)

Selamat datang di repository project **Fullstack CRM/ERP**. Project ini adalah aplikasi web modern yang dibangun menggunakan arsitektur **Monorepo** untuk menggabungkan kekuatan **NestJS** (Backend) dan **Next.js** (Frontend) dalam satu workflow pengembangan yang efisien.

Project ini dirancang sebagai demonstrasi kemampuan teknis dalam membangun aplikasi skala menengah-besar dengan praktik _Software Engineering_ yang baik.

## 🚀 Tech Stack

### Core

- **Monorepo Manager**: [Turborepo](https://turbo.build/) (High-performance build system)
- **Package Manager**: NPM Workspaces

### Backend (`apps/backend`)

- **Framework**: [NestJS](https://nestjs.com/) (Node.js framework yang modular & scalable)
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **API Documentation**: Swagger / OpenAPI
- **Authentication**: JWT (JSON Web Token) & Passport

### Frontend (`apps/frontend`)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: Server Components & Fetch API

---

## 📂 Struktur Project

Struktur folder menggunakan konsep Monorepo untuk memisahkan tanggung jawab namun tetap memudahkan integrasi.

```text
.
├── apps/
│   ├── backend/       # Server-side logic, REST API, Database ORM
│   └── frontend/      # Client-side UI, SSR, Interactivity
├── packages/          # Shared libraries (DTOs, configs, utilities) - *Coming Soon*
├── package.json       # Root configuration untuk Workspace
└── turbo.json         # Konfigurasi pipeline build Turborepo
```

---

## 🛠️ Cara Menjalankan (Getting Started)

Ikuti langkah-langkah ini untuk menjalankan project di komputer lokal Anda.

### Prasyarat

- [Node.js](https://nodejs.org/) (Versi 18 atau terbaru)
- [PostgreSQL](https://www.postgresql.org/) (Pastikan database sudah berjalan)

### 1. Instalasi Dependencies

Jalankan perintah ini di root folder untuk menginstall dependencies bagi Backend dan Frontend sekaligus.

```bash
npm install
```

### 2. Konfigurasi Environment

- **Backend**: Masuk ke `apps/backend`, copy `.env.example` (jika ada) atau buat `.env` baru sesuai konfigurasi database Anda.
- **Frontend**: Masuk ke `apps/frontend`, sesuaikan `.env.local` jika diperlukan.

### 3. Menjalankan Mode Development

Perintah ini akan menjalankan **kedua aplikasi** (Backend & Frontend) secara paralel menggunakan Turborepo.

```bash
npm run dev
```

- **Backend API**: Berjalan di [http://localhost:3000](http://localhost:3000)
- **Swagger Docs**: [http://localhost:3000/api](http://localhost:3000/api)
- **Frontend UI**: Berjalan di [http://localhost:3001](http://localhost:3001) (Port mungkin berbeda jika 3000 terpakai)

### 4. Build untuk Production

Untuk memastikan tidak ada error TypeScript dan membuat build production:

```bash
npm run build
```

---

## 📚 Dokumentasi Detail

- [**Backend Documentation**](./apps/backend/README.md): Penjelasan detail tentang API, Database, dan Auth.
- [**Frontend Documentation**](./apps/frontend/README.md): Penjelasan tentang struktur UI dan Routing.
- [**Architecture & Strategy**](./PROJECT_STRATEGY.md): Penjelasan mendalam tentang keputusan teknis dan desain sistem.

---

**Author**: Ings
_Project ini dibuat untuk tujuan pembelajaran dan portofolio._
