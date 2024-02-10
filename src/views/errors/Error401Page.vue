<template>
  <div class="gradient">
    <b-container>
      <h1 class="fw-bold">401</h1>
      <h2 class="mb-0 mt-4 text-white">Anda tidak memiliki akses ke halaman ini.</h2>
      <p class="mt-2 text-white">Page Unauthorized.</p>
      <a class="btn bg-white text-primary d-inline-flex align-items-center" href="/dashboard">Kembali Ke Home</a>
    </b-container>
    <div class="box">
      <div class="c xl-circle">
        <div class="c lg-circle">
          <div class="c md-circle">
            <div class="c sm-circle">
              <div class="c xs-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .gradient {
    background: radial-gradient(20% 60% at 50% 50%, #e997a1 0%, #DB5363 100%) !important;
  }
</style>
