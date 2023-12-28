<template>
  <!-- Sidebar Component Start Here-->
  <default-sidebar>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
      <side-menu title="Beranda" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Dashboard" icon="view-grid" :route="{ to: 'default.dashboard' }"></side-menu>
      
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Utama" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Verifikasi Pemilih" icon="shield-check" :route="{ to: 'default.admin-permissions' }"></side-menu>

      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Master Data" :static-item="true"></side-menu>
      <side-menu title="Data Masyarakat" icon="users" toggle-id="citizen" :caret-icon="true" :route="{ popup: 'false', to: 'citizen' }" @onClick="toggle" :active="currentRoute.includes('citizen')">
        <b-collapse tag="ul" class="sub-nav" id="citizen" accordion="sidebar-menu" :visible="currentRoute.includes('citizen')">
          <side-menu isTag="router-link" title="Tambah Masyarakat" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UA" :route="{ to: 'default.user-add' }"></side-menu>
          <side-menu isTag="router-link" title="List Data Masyarakat" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UL" :route="{ to: 'default.user-list' }"></side-menu>
        </b-collapse>
      </side-menu>
      <side-menu title="Pengguna" icon="user-group" toggle-id="users" :caret-icon="true" :route="{ popup: 'false', to: 'user' }" @onClick="toggle" :active="currentRoute.includes('user')">
        <b-collapse tag="ul" class="sub-nav" id="users" accordion="sidebar-menu" :visible="currentRoute.includes('user')">
          <side-menu isTag="router-link" title="User Profile" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UP" :route="{ to: 'default.user-profile' }"></side-menu>
          <side-menu isTag="router-link" title="User Add" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UA" :route="{ to: 'default.user-add' }"></side-menu>
          <side-menu isTag="router-link" title="User List" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UL" :route="{ to: 'default.user-list' }"></side-menu>
        </b-collapse>
      </side-menu>
      
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Master Lokasi" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Kabupaten" icon="location" :route="{ to: 'default.billing' }"></side-menu>
      <side-menu isTag="router-link" title="Kecamatan" icon="location" :route="{ to: 'default.kanban' }"></side-menu>
      <side-menu isTag="router-link" title="Kelurahan" icon="location" :route="{ to: 'default.calender' }"></side-menu>
    </ul>
  </default-sidebar>
  <!-- Sidebar Component End Here-->
</template>

<!-- <script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DefaultSidebar from '@/components/custom/sidebar/DefaultSidebar.vue'
import SideMenu from '@/components/custom/nav/SideMenu.vue'
export default {
  components: { DefaultSidebar, SideMenu },
  setup() {
    const visible = ref(false)
    const currentRoute = useRoute()
    const openMenu = () => {
      visible.value = !visible.value
    }
    const checkActive = (route) => {
      if (currentRoute.name === route) {
        return true
      }
      if (route.includes(currentRoute.name)) {
        return true
      }
    }

    return { visible, openMenu, checkActive }
  },
  methods: {}
}
</script> -->
<script setup>
import DefaultSidebar from '@/components/custom/sidebar/DefaultSidebar.vue'
import SideMenu from '@/components/custom/nav/SideMenu.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const currentRoute = ref('')
const route = useRoute()
const toggle = (route) => {
  if (route === currentRoute.value && route.includes('.')) {
    const menu = currentRoute.value.split('.')
    return (currentRoute.value = menu[menu.length - 2])
  }
  if (route !== currentRoute.value && currentRoute.value.includes(route)) {
    return (currentRoute.value = '')
  }
  if (route !== currentRoute.value) {
    return (currentRoute.value = route)
  }
  if (route === currentRoute.value) {
    return (currentRoute.value = '')
  }
  return (currentRoute.value = '')
}
toggle(route.name)
</script>
<style></style>
