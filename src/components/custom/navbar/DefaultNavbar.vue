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
      <div class="">
        <span v-for="item in networks" :key="item" class="badge bg-primary p-2 me-1">
          {{ item }}
        </span>
      </div>
      <a class="nav-link py-0 d-flex align-items-center ms-auto text-muted" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
        <img src="@/assets/images/avatars/avtar_1.png" alt="User-Profile" class="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
        <img src="@/assets/images/avatars/avtar_2.png" alt="User-Profile" class="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
        <img src="@/assets/images/avatars/avtar_4.png" alt="User-Profile" class="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
        <img src="@/assets/images/avatars/avtar_5.png" alt="User-Profile" class="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
        <img src="@/assets/images/avatars/avtar_3.png" alt="User-Profile" class="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
        <div class="caption ms-3 d-none d-md-block">
          <h6 class="mb-0 caption-title">{{ userName }}</h6>
          <p class="mb-0 caption-sub-title">{{ userRole }}</p>
        </div>
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a href="#" class="dropdown-item">Pengaturan</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a href="#" class="dropdown-item" @click="handleLogout">Keluar</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

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
    const router = useRouter();
    const store = useStore()
    const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const isHidden = ref(false)
    const userName = ref('');
    const userRole = ref('');
    const networks = ref('');
    const tokenExpirationCheckInterval = 60000*5;
    let withHeader = {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    }
      
    const carts = computed(() => store.getters.carts);

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

    const setProfile = () => {
      const userData = JSON.parse(localStorage.getItem('userData'))
      userName.value = userData?.full_name || 'John Doe';
      userRole.value = userData?.role || 'Admin (Example)';
      networks.value = userData?.user_network;

      // Check token expiration periodically
      const tokenCheckIntervalId = setInterval(checkTokenExpiration, tokenExpirationCheckInterval);

      // Save the interval ID to clear it later
      store.commit('setting/saveTokenCheckIntervalId', tokenCheckIntervalId);
    }

    const checkTokenExpiration = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/user/get-profile`, withHeader); // Replace with your profile endpoint
        if (response.data.meta.code == 200) {
          // Token is still valid
          console.log('Token is still valid');
        } else {
          // Token has expired
          console.log('Token has expired');
          handleLogout();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        handleLogout();
      }
    }

    const handleLogout = async () => {
      try {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');

        console.log('logout hit');

        // Clear the token check interval
        clearTokenCheckInterval();

        // Redirect to the login page after a delay
        setTimeout(() => {
          router.push({ name: 'auth.login' });
        }, 500);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    const clearTokenCheckInterval = () => {
      clearInterval(store.state.setting.tokenCheckIntervalId);
      store.commit('setting/clearTokenCheckIntervalId');
    }

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
      setProfile()
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())

      // Clear the token check interval on component unmount
      clearTokenCheckInterval();
    });

    return {
      headerNavbar,
      isHidden,
      carts,
      emit,
      userName,
      userRole,
      networks,
      handleLogout
    }
  }
}
</script>
