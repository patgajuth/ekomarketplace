# EkoMarketPlace – rynek produktów ekologicznych

Aplikacja typu marketplace prezentująca produkty i marki proekologiczne. Zbudowana na **Next.js 15** z wykorzystaniem **Prisma** i **PostgreSQL** (instancja natywna – bez Dockera). UI korzysta z **Tailwind CSS 4** i nowej, zielonej palety barw.

## Wymagania wstępne

- Node.js 18+
- Dostępna instancja PostgreSQL (lokalna lub zewnętrzna) – brak kontenera Dockera
- Uprawnienia do tworzenia bazy/schema zgodnie z danymi w `.env`

## Zmienne środowiskowe

Skopiuj plik `.env.example` do `.env` i uzupełnij:

- `DATABASE_URL` – pełny connection string do bazy (np. `postgresql://user:pass@localhost:5432/ekomarketplace?schema=public`)
- `DIRECT_URL` – adres bezpośredni do bazy (zwykle taki sam jak `DATABASE_URL`)
- `NEXTAUTH_SECRET` – losowy, długi sekret dla NextAuth
- `NEXTAUTH_URL` – publiczny URL aplikacji (np. `http://localhost:3000`)
- `DATABASE_USER` / `DATABASE_PASSWORD` / `DATABASE_NAME` – dane pomocnicze dla admina bazy

## Uruchomienie krok po kroku (bez Dockera)

1. `npm install`
2. `npm run postinstall` – generacja klienta Prisma (uruchamia się również po instalacji)
3. `npx prisma migrate dev --name init` – utwórz migrację i strukturę bazy
4. `npx prisma db seed` – załaduj przykładowe dane EkoMarketPlace
5. `npm run dev` – start środowiska deweloperskiego

## Zastosowane technologie

- **Next.js** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Prisma ORM** + **PostgreSQL**
- **NextAuth.js** (credentials) do logowania