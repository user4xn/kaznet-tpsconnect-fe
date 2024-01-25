import { createRouter, createWebHistory } from 'vue-router'

// Auth Default Routes
const authChildRoutes = (prefix) => [
  {
    path: '/',
    name: prefix + '.login',
    meta: { auth: false, name: 'Login' },
    component: () => import('@/views/auth/default/SignIn.vue')
  },
]

// Dashboard routes
const dashboardRoutes = (prefix) => [
  {
    path: '',
    name: prefix + '.dashboard',
    meta: { 
      auth: true, 
      name: 'Home', 
      isBanner: false,
      pageTitle: 'Dashboard', 
      breadcrumbs: [
        { text: 'Selamat datang di Kaznet, Kang Zaman Volunteer Network'},
      ],
    },
    component: () => import('@/views/dashboards/IndexPage.vue')
  }
]

// Default routes
const defaultChildRoutes = (prefix) => [
  // DASHBOARD
  {
    path: '',
    name: prefix + '.dashboard',
    meta: { 
      auth: true, 
      name: 'Home', 
      isBanner: true,
      pageTitle: 'Dashboard', 
      breadcrumbs: [
        { text: 'Selamat datang di Kaznet, Kang Zaman Volunteer Network'},
      ],
  },
    component: () => import('@/views/dashboards/IndexPage.vue')
  },
  // CORE
  {
    path: '/input-pemilih',
    name: prefix + '.input-pemilih',
    meta: { 
      auth: true, 
      name: 'Input Pemilih', 
      isBanner: true,
      pageTitle: 'Input Pemilih', 
      breadcrumbs: [
        { text: 'Utama'},
        { text: 'Data Pemilih' },
        { text: 'Input Pemilih' },
      ],
     },
    component: () => import('@/views/utama/InputPemilih.vue')
  },
  {
    path: '/daftar-pemilih',
    name: prefix + '.daftar-pemilih',
    meta: { 
      auth: true, 
      name: 'Daftar Pemilih', 
      isBanner: true,
      pageTitle: 'Daftar Pemilih',
      breadcrumbs: [
        { text: 'Utama' },
        { text: 'Data Pemilih' },
        { text: 'Daftar Pemilih' },
      ],
    },
    component: () => import('@/views/utama/DaftarPemilih.vue')
  },
  {
    path: '/rekap-pemilih',
    name: prefix + '.rekap-pemilih',
    meta: { 
      auth: true, 
      name: 'Rekap Pemilih', 
      isBanner: true,
      pageTitle: 'Rekap Pemilih',
      breadcrumbs: [
        { text: 'Utama' },
        { text: 'Data Pemilih' },
        { text: 'Rekap Pemilih' },
      ],
    },
    component: () => import('@/views/utama/DaftarRekapPemilih.vue')
  },
  {
    path: '/tambah-rekap-pemilih',
    name: prefix + '.tambah-rekap-pemilih',
    meta: { 
      auth: true, 
      name: 'Tambah Rekap Pemilih', 
      isBanner: true,
      pageTitle: 'Tambah Rekap Pemilih',
      breadcrumbs: [
        { text: 'Utama' },
        { text: 'Data Pemilih' },
        { text: 'Rekap Pemilih', to: 'rekap-pemilih' },
        { text: 'Tambah Rekap Pemilih' },
      ],
    },
    component: () => import('@/views/utama/TambahRekapPemilih.vue')
  },
  {
    path: '/daftar-dpt',
    name: prefix + '.daftar-dpt',
    meta: { 
      auth: true, 
      name: 'Daftar DPT', 
      isBanner: true,
      pageTitle: 'Daftar DPT',
      breadcrumbs: [
        { text: 'Master Data' },
        { text: 'Data DPT' },
      ],
    },
    component: () => import('@/views/master-data/DaftarDPT.vue')
  },
  {
    path: '/daftar-pengguna',
    name: prefix + '.daftar-pengguna',
    meta: { 
      auth: true, 
      name: 'Daftar Pengguna', 
      isBanner: true,
      pageTitle: 'Daftar Pengguna',
      breadcrumbs: [
        { text: 'Master Data' },
        { text: 'Data Pengguna' },
      ],
   },
    component: () => import('@/views/pengguna/DaftarPengguna.vue')
  },
  {
    path: '/daftar-kabupaten',
    name: prefix + '.daftar-kabupaten',
    meta: { 
      auth: true, 
      name: 'Daftar Kabupaten', 
      isBanner: true,
      pageTitle: 'Daftar Kabupaten',
      breadcrumbs: [
        { text: 'Master Lokasi' },
        { text: 'Daftar Kabupaten' },
      ],
    },
    component: () => import('@/views/master-lokasi/DaftarKabupaten.vue')
  },
  {
    path: '/daftar-kecamatan',
    name: prefix + '.daftar-kecamatan',
    meta: { 
      auth: true, 
      name: 'Daftar Kecamatan', 
      isBanner: true,
      pageTitle: 'Daftar Kecamatan',
      breadcrumbs: [
        { text: 'Master Lokasi' },
        { text: 'Daftar Kecamatan' },
      ],
    },
    component: () => import('@/views/master-lokasi/DaftarKecamatan.vue')
  },
  {
    path: '/daftar-kelurahan',
    name: prefix + '.daftar-kelurahan',
    meta: { 
      auth: true, 
      name: 'Daftar Kelurahan', 
      isBanner: true,
      pageTitle: 'Daftar Kelurahan',
      breadcrumbs: [
        { text: 'Master Lokasi' },
        { text: 'Daftar Kelurahan' },
      ],
    },
    component: () => import('@/views/master-lokasi/DaftarKelurahan.vue')
  },
  {
    path: '/koordinator-kabupaten',
    name: prefix + '.koordinator-kabupaten',
    meta: { 
      auth: true, 
      name: 'Data Koordinator Kabupaten', 
      isBanner: true,
      pageTitle: 'Data Koordinator Kabupaten',
      breadcrumbs: [
        { text: 'Master Koordinator' },
        { text: 'Data Koordinator Kabupaten' },
      ],
    },
    component: () => import('@/views/master-koordinator/KoordinatorKabupaten.vue')
  },
  {
    path: '/koordinator-kecamatan',
    name: prefix + '.koordinator-kecamatan',
    meta: { 
      auth: true, 
      name: 'Data Koordinator Kecamatan', 
      isBanner: true,
      pageTitle: 'Data Koordinator Kecamatan',
      breadcrumbs: [
        { text: 'Master Koordinator' },
        { text: 'Data Koordinator Kecamatan' },
      ],
    },
    component: () => import('@/views/master-koordinator/KoordinatorKecamatan.vue')
  },
  {
    path: '/koordinator-kelurahan',
    name: prefix + '.koordinator-kelurahan',
    meta: { 
      auth: true, 
      name: 'Data Koordinator Kelurahan', 
      isBanner: true,
      pageTitle: 'Data Koordinator Kelurahan',
      breadcrumbs: [
        { text: 'Master Koordinator' },
        { text: 'Data Koordinator Kelurahan' },
      ],
    },
    component: () => import('@/views/master-koordinator/KoordinatorKelurahan.vue')
  },
  {
    path: '/koordinator-tps',
    name: prefix + '.koordinator-tps',
    meta: { 
      auth: true, 
      name: 'Data Koordinator TPS', 
      isBanner: true,
      pageTitle: 'Data Koordinator TPS',
      breadcrumbs: [
        { text: 'Master Koordinator' },
        { text: 'Data Koordinator TPS' },
      ],
    },
    component: () => import('@/views/master-koordinator/KoordinatorTPS.vue')
  },
  // Extra Pages
  {
    path: '/privacy-policy',
    name: prefix + '.privacy-policy',
    meta: { auth: true, name: 'Privacy Policy', isBanner: true },
    component: () => import('@/views/extra/PrivacyPolicy.vue')
  },
  {
    path: '/terms-and-conditions',
    name: prefix + '.terms-and-conditions',
    meta: { auth: true, name: 'Terms and Conditions', isBanner: true },
    component: () => import('@/views/extra/TermsAndConditions.vue')
  },
]

const errorRoutes = (prefix) => [
  // Error Pages
  {
    path: '404',
    name: prefix + '.404',
    meta: { auth: true, name: 'Error 404', isBanner: true },
    component: () => import('@/views/errors/Error404Page.vue')
  },
  {
    path: '500',
    name: prefix + '.500',
    meta: { auth: true, name: 'Error 500', isBanner: true },
    component: () => import('@/views/errors/Error500Page.vue')
  },
  {
    path: 'maintenance',
    name: prefix + '.maintenance',
    meta: { auth: true, name: 'Maintenance', isBanner: true },
    component: () => import('@/views/errors/MaintenancePage.vue')
  }
]

const routes = [
  // Default Pages
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: defaultChildRoutes('default')
  },
  // Menu Styles
  {
    path: '/horizontal',
    name: 'horizontal',
    component: () => import('../layouts/menu-styles/HorizontalLayout.vue'),
    children: dashboardRoutes('horizontal')
  },
  {
    path: '/dual-horizontal',
    name: 'dual-horizontal',
    component: () => import('../layouts/menu-styles/DualHorizontalLayout.vue'),
    children: dashboardRoutes('dual-horizontal')
  },
  {
    path: '/dual-compact',
    name: 'dual-compact',
    component: () => import('../layouts/menu-styles/DualCompactLayout.vue'),
    children: dashboardRoutes('dual-compact')
  },
  {
    path: '/boxed',
    name: 'boxed',
    component: () => import('../layouts/menu-styles/BoxedLayout.vue'),
    children: dashboardRoutes('boxed')
  },
  {
    path: '/boxed-fancy',
    name: 'boxed-fancy',
    component: () => import('../layouts/menu-styles/BoxedFancyLayout.vue'),
    children: dashboardRoutes('boxed-fancy')
  },

  // Auth Skins
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: authChildRoutes('auth')
  },
  // Errors Pages
  {
    path: '/errors',
    name: 'errors',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: errorRoutes('errors')
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
