<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar}`">
    <!-- <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar} ${navbarHide.join('')}`"> -->
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <div class="input-group search-input" v-if="isSearch">
        <span class="input-group-text" id="search-input">
          <icon-component type="outlined" :size="18" icon-name="search"></icon-component>
        </span>
        <input type="search" class="form-control" placeholder="Search..." />
      </div>
      <a class="nav-link py-0 d-flex align-items-center ms-auto" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
        <div class="caption ms-3 d-none d-md-block">
          <h6 class="mb-0 caption-title">{{ userName }}</h6>
          <p class="mb-0 caption-sub-title">{{ userRole }}</p>
        </div>
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><router-link class="dropdown-item" :to="{ name: 'default.user-privacy-setting' }">Pengaturan</router-link></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a href="#" class="dropdown-item" @click="handleLogout">Keluar</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();

export default {
  components: {},
  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const isHidden = ref(false)
    const userName = ref('');
    const userRole = ref('');

    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector('.navs-sticky')
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add('menu-sticky')
        } else {
          navbar.classList.remove('menu-sticky')
        }
      }
    }

    const carts = computed(() => store.getters.carts)

    const handleLogout = async()=> {
      try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.post(`${process.env.VUE_APP_BACKEND_API}/api/v1/user/logout`, {}, {
          headers: {
            Authorizations: `Bearer ${jwtToken}`
          }
        });

        if (response.code === 200) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userData');

          console.log('Logout successful:', response.data);

          // Redirect to the login page
          router.push({ name: 'auth.login' });
        }
      } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
      }
    }

    const setProfile = () => {
      const userData = JSON.parse(localStorage.getItem('userData'))
      userName.value = userData?.full_name || 'John Doe';
      userRole.value = userData?.role || 'Admin (Example)';
    }

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
      setProfile()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())
    })
    return {
      headerNavbar,
      isHidden,
      carts,
      emit,
      userName,
      userRole,
      handleLogout
    }
  }
}
</script>
