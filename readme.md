### Procés
####  Per executar en local
1. Obrir una terminal i anar a l'arrel del repositori i fer `pnpm install`. Aquest pas només és necessari el primer cop.
2. Des de l'arrel del repositori fer `pnpm dev`.
3. Obrir una nova terminal i anar a examples/full i executar `pnpm dev`.

#### Per executar des de Vercel
0. Tenir instal·lat Vercel CLI.
1. Anar a l'arrel del repositori i fer `pnpm install`, només cal fer aquest pas el primer cop.
2. Des de l'arrel del repositori fer `pnpm build`.
3. A continuació fer `vercel --prod`, i si no s'ha fet ja, vincular-ho amb el corresponent projecte de Vercel.
4. Veure els logs en el dashbord de Vercel, a la pestanya Deployments.