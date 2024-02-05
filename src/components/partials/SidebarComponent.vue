<template>
  <!-- Sidebar Component Start Here-->
  <default-sidebar>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
      <side-menu title="Beranda" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Dashboard" icon="view-grid" :route="{ to: 'default.dashboard' }"></side-menu>
      
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Utama" :static-item="true"></side-menu>
      <side-menu title="Data Pemilih" icon="shield-check" toggle-id="chooser-data" :caret-icon="true" :route="{ popup: 'false', to: 'chooser-data' }" @onClick="toggle" :active="currentRoute.includes('chooser-data')">
        <b-collapse tag="ul" class="sub-nav" id="chooser-data" accordion="sidebar-menu" :visible="currentRoute.includes('chooser-data')">
          <side-menu isTag="router-link" title="Input Pemilih" icon="circle" :icon-size="10" icon-type="solid" miniTitle="IP" :route="{ to: 'default.input-pemilih' }"></side-menu>
          <side-menu isTag="router-link" title="Daftar Pemilih" icon="circle" :icon-size="10" icon-type="solid" miniTitle="DP" :route="{ to: 'default.daftar-pemilih' }"></side-menu>
          <side-menu isTag="router-link" title="Rekap Pemilih" icon="circle" :icon-size="10" icon-type="solid" miniTitle="RP" :route="{ to: 'default.rekap-pemilih' }"></side-menu>
        </b-collapse>
      </side-menu>
      <side-menu isTag="router-link" title="Rekap Pemilu" icon="chart-square-bar" :route="{ to: 'default.rekap-pemilu' }"></side-menu>

      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Master Data" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Data DPT" icon="location-arrow" :route="{ to: 'default.daftar-dpt' }"></side-menu>
      <side-menu isTag="router-link" title="Pengguna" icon="user-group" :route="{ to: 'default.daftar-pengguna' }"></side-menu>
      
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="Master Koordinator" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Kor Kabupaten" icon="adjustment" :route="{ to: 'default.koordinator-kabupaten' }"></side-menu>
      <side-menu isTag="router-link" title="Kor Kecamatan" icon="adjustment" :route="{ to: 'default.koordinator-kecamatan' }"></side-menu>
      <side-menu isTag="router-link" title="Kor Kelurahan" icon="adjustment" :route="{ to: 'default.koordinator-kelurahan' }"></side-menu>
      <side-menu isTag="router-link" title="Kor TPS" icon="adjustment" :route="{ to: 'default.koordinator-tps' }"></side-menu>

      <!-- <li><hr class="hr-horizontal" /></li>
      <side-menu title="Master Lokasi" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Kabupaten" icon="location" :route="{ to: 'default.daftar-kabupaten' }"></side-menu>
      <side-menu isTag="router-link" title="Kecamatan" icon="location" :route="{ to: 'default.daftar-kecamatan' }"></side-menu>
      <side-menu isTag="router-link" title="Kelurahan" icon="location" :route="{ to: 'default.daftar-kelurahan' }"></side-menu> -->
    </ul>
  </default-sidebar>
</template>
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
