# Frontend Implementation Plan (Next.js + Tailwind)

Tujuan: Membangun antarmuka CRM yang modern, modular, dan mudah dikelola, terintegrasi dengan Backend NestJS.

## 1. Modular Architecture & Folder Structure

Kita akan menggunakan struktur yang memisahkan **UI Components**, **Features**, dan **Services**.

```text
apps/frontend/src/
├── app/                  # Next.js App Router (Pages)
│   ├── (auth)/           # Route Group: Login page
│   ├── (dashboard)/      # Route Group: Protected pages (Layout with Sidebar)
│   │   ├── page.tsx      # Dashboard Home
│   │   ├── customers/    # Customers CRUD
│   │   ├── companies/    # Companies CRUD
│   │   └── deals/        # Deals Kanban/List
│   └── layout.tsx        # Root Layout
├── components/
│   ├── ui/               # Reusable atomic components (Button, Input, Card)
│   ├── layout/           # Sidebar, Header, PageWrapper
│   └── features/         # Feature-specific components (CustomerTable, DealCard)
├── lib/
│   ├── api.ts            # Axios/Fetch wrapper dengan Interceptor (Auto-inject Token)
│   └── utils.ts          # Helper functions (cn for Tailwind)
├── services/             # API Calls definition
│   ├── auth.service.ts
│   ├── customers.service.ts
│   └── ...
└── types/                # TypeScript interfaces (Shared with backend ideally)
```

## 2. UI/UX Design Strategy

- **Theme**: Clean & Professional (White/Gray background, Primary Color: Blue/Indigo).
- **Layout**: Sidebar Navigation (Kiri), Header (Atas), Content Area (Tengah).
- **Interactivity**:
    - Loading States (Skeleton UI).
    - Toast Notifications untuk sukses/gagal.
    - Modal/Dialog untuk Form Create/Edit (agar tidak pindah halaman).

## 3. Development Steps

### Phase 1: Foundation & Auth

1.  **Setup UI Library**: Install `lucide-react` (Icons) dan `clsx/tailwind-merge` (Utility).
2.  **API Client**: Buat `lib/api.ts` untuk handle request ke Backend.
3.  **Auth Page**: Halaman Login yang fungsional (simpan token di Cookie).

### Phase 2: Core Layout & Dashboard

1.  **Sidebar Component**: Navigasi menu (Dashboard, Customers, Companies, Deals).
2.  **Dashboard Layout**: Wrapper untuk halaman yang butuh login.

### Phase 3: Feature Modules (CRUD)

1.  **Customers Page**: Tabel list customer + Search + Modal Add/Edit.
2.  **Companies Page**: Tabel list company.
3.  **Deals Page**: Tampilan list atau Kanban board sederhana.

## 4. Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form**: React Hook Form (Optional, start simple first)
- **Data Fetching**: `useEffect` + `fetch` (Simple start) or `SWR`.

---

**Action Plan**:
Saya akan mulai dengan **Phase 1: Foundation**.

1.  Install dependencies tambahan.
2.  Setup `lib/api.ts`.
3.  Buat halaman Login.
