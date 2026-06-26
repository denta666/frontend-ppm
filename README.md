# Warkop Semesta Bahagia — Panduan Instalasi

Proyek web profil kafe dengan admin panel. Terdiri dari **Frontend** (Next.js) dan **Backend** (Express + Prisma + Supabase PostgreSQL).

---

## Prasyarat

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org) v18+
- npm v9+
- Akun [Supabase](https://supabase.com) (untuk database & storage)

---

## 1. Clone / Download Project

```bash
git clone <url-repo>
cd webprofil-cafe-warkop-semesta-bahagia
```

---

## 2. Setup Backend

### Masuk ke folder backend
```bash
cd backend
```

### Install dependencies
```bash
npm install
```

### Buat file `.env`
Buat file `.env` di folder `backend/` dengan isi:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=warkop-semesta-bahagia-secret-key
```

> Ganti `[PROJECT-REF]` dan `[PASSWORD]` dengan kredensial dari Supabase → Settings → Database.

### Generate Prisma Client
```bash
npx prisma generate
```

### Push schema ke database
```bash
npx prisma db push
```

### Seed data awal (admin + testimoni)
```bash
npx prisma db seed
```

> Login admin default: **username:** `admin` | **password:** `admin123`

### Jalankan backend
```bash
npm run dev
```

Backend berjalan di `http://localhost:5000`

---

## 3. Setup Frontend

### Masuk ke folder frontend
```bash
cd ../frontend
```

### Install dependencies
```bash
npm install
```

### Buat file `.env`
Buat file `.env` di folder `frontend/` dengan isi:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=6289999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/warkopsemesta
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON-KEY]
```

> `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` didapat dari Supabase → Settings → API.

### Jalankan frontend
```bash
npm run dev
```

Frontend berjalan di `http://localhost:3000`

---

## 4. Setup Supabase Storage

1. Buka project Supabase → **Storage**
2. Buat bucket baru: `menu-image` (centang **Public bucket**)
3. Tambahkan policy di bucket `menu-image`:
   - **SELECT** → role: `anon` → definition: `true`
   - **INSERT** → role: `anon` → definition: `true`

---

## 5. Akses Aplikasi

| Halaman | URL |
|---|---|
| Website publik | http://localhost:3000 |
| Admin panel | http://localhost:3000/admin/login |
| API backend | http://localhost:5000/api |

---

## Struktur Folder

```
webprofil-cafe-warkop-semesta-bahagia/
├── backend/                  # Express + Prisma
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validations/
│   │   └── server.ts
│   └── .env
└── frontend/                 # Next.js
    ├── src/
    │   ├── app/
    │   │   ├── admin/        # Admin panel
    │   │   └── ...           # Halaman publik
    │   ├── components/
    │   ├── services/
    │   ├── hooks/
    │   └── middleware.ts
    └── .env
```

---

## Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Frontend | Next.js 15, Tailwind CSS, Framer Motion |
| Backend | Express.js, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL (Supabase) |
| Storage | Supabase Storage |
| Auth | JWT |
