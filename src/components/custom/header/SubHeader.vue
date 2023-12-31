<template>
  <div class="iq-navbar-header" style="height: 215px">
    <b-container fluid class="iq-container">
      <b-row>
        <b-col md="12">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1>{{ pageTitle }}</h1>
              <BreadcrumbList :breadcrumbs="breadcrumbs" />
            </div>
            <div>
              <a target="_blank" href="https://wa.me/6285229931237?text=Halo%20saya%20butuh%20bantuan%20pada%20sistem%20Kaznet!" class="btn btn-link btn-soft-light">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 15L1.05086 11.1485C0.402647 10.0212 0.0616892 8.74249 0.0621656 7.43247C0.0638328 3.33422 3.38671 0 7.46987 0C9.45131 0.000836701 11.3112 0.774898 12.7098 2.17983C14.1083 3.58475 14.8782 5.45225 14.8775 7.43844C14.8757 11.5366 11.5523 14.8713 7.46987 14.8713C7.46964 14.8713 7.46999 14.8713 7.46987 14.8713H7.46666C6.22692 14.8708 5.00885 14.5587 3.92691 13.9664L0 15ZM4.10876 12.6209L4.33373 12.7547C5.27883 13.3176 6.36244 13.6154 7.46749 13.616H7.46987C10.8633 13.616 13.6252 10.8444 13.6266 7.43797C13.6272 5.78717 12.9875 4.23486 11.825 3.0672C10.6625 1.89953 9.11679 1.25612 7.47214 1.2554C4.07601 1.2554 1.31417 4.02665 1.31286 7.43295C1.31238 8.60025 1.63774 9.73696 2.25416 10.7207L2.40064 10.9545L1.77851 13.2341L4.10876 12.6209Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.61847 4.32524C5.47985 4.0159 5.33384 4.00968 5.20189 4.0043C5.09399 3.99964 4.9705 3.99988 4.84724 3.99988C4.72386 3.99988 4.52331 4.0465 4.35373 4.23236C4.18402 4.41823 3.70575 4.86766 3.70575 5.78169C3.70575 6.69585 4.36909 7.57904 4.46162 7.70311C4.55416 7.82706 5.74209 9.76271 7.62336 10.5074C9.1869 11.1263 9.505 11.0032 9.8444 10.9722C10.1838 10.9413 10.9394 10.5228 11.0937 10.089C11.248 9.65525 11.248 9.28352 11.2017 9.20571C11.1554 9.12837 11.032 9.08187 10.8469 8.989C10.6618 8.89613 9.75187 8.44658 9.58217 8.38466C9.41246 8.32263 9.28908 8.29179 9.16571 8.47778C9.04221 8.66352 8.68779 9.08187 8.57978 9.20571C8.47176 9.3299 8.36375 9.34543 8.17868 9.25244C7.99362 9.15933 7.39745 8.9633 6.69029 8.3304C6.14009 7.83806 5.76852 7.2299 5.66051 7.04391C5.55261 6.85817 5.65872 6.76637 5.74185 6.66489C5.89155 6.48213 6.14271 6.15354 6.2044 6.02971C6.26609 5.90564 6.23524 5.79723 6.18903 5.70424C6.14271 5.61136 5.78293 4.69267 5.61847 4.32524Z" fill="white"/>
                </svg>
                Pusat Bantuan
              </a>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="iq-header-img">
      <img src="@/assets/images/dashboard/top-header.png" alt="header" class="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header1.png" alt="header" class="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header2.png" alt="header" class="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header3.png" alt="header" class="theme-color-green-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header4.png" alt="header" class="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header5.png" alt="header" class="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX" />
    </div>
  </div>
</template>
<script>
import BreadcrumbList from '@/components/custom/breadcrumbs/BreadcrumbList.vue';

export default {
  components: {
    BreadcrumbList,
  },
  computed: {
    breadcrumbs() {
      const matchedRoutes = this.$route.matched;
      return matchedRoutes.reduce((acc, route) => {
        if (route.meta.breadcrumbs) {
          acc = acc.concat(route.meta.breadcrumbs);
        }
        return acc;
      }, []);
    },
    pageTitle() {
      const matchedRoute = this.$route.matched[this.$route.matched.length - 1];
      return matchedRoute.meta.pageTitle || ''; // Use the dynamic page title or an empty string
    }
  }
}
</script>
