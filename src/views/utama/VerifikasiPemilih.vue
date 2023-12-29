<template>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="card">
          <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
            <div class="header-title">
              <h4 class="card-title mb-0">Cari Pemilih</h4>
            </div>
            <div class="d-flex align-items-center gap-3">
              <router-link :to="{ name: 'default.tambah-pemilih' }" class="text-center btn btn-primary d-flex gap-2">
                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Pemilih
              </router-link>
            </div>
          </div>
          <b-card-body>
            <b-form>
              <b-row>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kabupaten" class="form-label">Kabupaten:</label>
                    <b-form-select class="form-select" v-model="selectedKabupaten" :options="kabupatenOptions" id="input-kabupaten"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kecamatan" class="form-label">Kecamatan:</label>
                    <b-form-select class="form-select" v-model="selectedKecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="!selectedKabupaten"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kelurahan" class="form-label">Kelurahan:</label>
                    <b-form-select class="form-select" v-model="selectedKelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="!selectedKecamatan"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="col-12">
                <b-button variant="primary" class="w-100">Cari</b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="card">
          <b-card-body>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="text-center">
                <a href="#" type="button" class="btn btn-primary">Save</a>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- New Permission modal -->
    <div class="modal fade" id="new-permission" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropPermissionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropPermissionLabel">Add Permission</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Permission title</label>
              <input type="text" class="form-control" placeholder="Permission Title" />
            </div>
            <div class="text-start">
              <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal">Save</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- New Role modal -->
    <div class="modal fade" id="new-role" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropRoleLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropRoleLabel">Add Role</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Role title</label>
              <input type="text" class="form-control" placeholder="Role Title" />
            </div>
            <div>
              <span>Status</span>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status-yes" value="option2" />
                <label class="form-check-label" for="status-yes"> Yes </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status-no" value="option2" />
                <label class="form-check-label" for="status-no"> No </label>
              </div>
            </div>
            <div class="text-start mt-2">
              <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal">Save</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script scoped>
  // import axios from 'axios';

  export default {
    name: 'admin-view',
    data() {
      return {
        selectedKabupaten: null,
        selectedKecamatan: null,
        selectedKelurahan: null,
        kabupatenOptions: [],
        kecamatanOptions: [],
        kelurahanOptions: []
      }
    },
    watch: {
    // Watch for changes in selectedKabupaten and fetch Kecamatan options
    selectedKabupaten: 'fetchKecamatanOptions',
    // Watch for changes in selectedKecamatan and fetch Kelurahan options
    selectedKecamatan: 'fetchKelurahanOptions'
  },
    mounted() {
      // Fetch kabupaten and kecamatan data here
      this.fetchKabupatenOptions();
    },
    methods: {
      async fetchKabupatenOptions() {
        try {
          // const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/kabupaten`);
          // this.kabupatenOptions = response.data.data;

          this.kabupatenOptions = [
            'CIANJUR',
            'BOGOR'
          ];
        } catch (error) {
          console.error('Error fetching Kabupaten options:', error);
        }
      },
      async fetchKecamatanOptions() {
        if (this.selectedKabupaten) {
          try {
            // const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/kecamatan?kabupaten=${this.selectedKabupaten}`);
            // this.kecamatanOptions = response.data.data;

            this.kecamatanOptions = [
              'BOGOR TENGAH',
              'BOGOR BARAT',
              'TANAH SAREAL',
              'BOGOR TIMUR',
              'BOGOR SELATAN',
              'BOGOR UTARA',
            ];
          } catch (error) {
            console.error('Error fetching Kecamatan options:', error);
          }
        }
      },
      async fetchKelurahanOptions() {
        if (this.selectedKecamatan) {
          try {
            // const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/kelurahan?kecamatan=${this.selectedKecamatan}`);
            // this.kelurahanOptions = response.data.data;

            this.kelurahanOptions = [
              'BABAKAN',
              'BABAKAN PASAR',
              'CIBOGOR',
              'GUDANG',
              'PALEDANG',
              'PABATON',
              'SEMPUR',
              'TEGALLEGA',
              'PANARAGAN',
              'CIWARINGIN',
              'KEBON KALAPA',
              'MENTENG',
              'BALUMBANG JAYA',
              'TANAH SAREAL',
              'SUKASARI',
              'BATU TULIS',
              'KEBON PEDES',
              'BARANANGSIANG',
              'BONDONGAN',
              'EMPANG',
              'KEDUNG BADAK',
              'KATULAMPA',
              'LAWANGGINTUNG',
              'SINDANGSARI',
              'SUKARESMI',
              'KEDUNG WARINGIN',
              'SINDANGRASA',
              'PAMOYANAN',
              'RANGGA MEKAR',
              'TAJUR',
              'KEDUNG JAYA',
              'MULYA HARJA',
              'SUKADAMAI',
              'MEKAR WANGI',
              'CIKARET',
              'BOJONG KERTA',
              'KENCANA',
              'RANCAMAYA',
              'KERTAMAYA',
              'KAYU MANIS',
              'HARJASARI',
              'CIBADAK',
              'GENTENG',
              'PAKUAN',
              'CIPAKU',
              'BANTARJATI',
              'TEGAL GUNDIL',
              'KEDUNG HALANG',
              'CIPARIGI',
              'CIBULUH',
              'CILUAR',
              'TANAH BARU',
              'CIMAHPAR',
              'SINDANG BARANG',
              'BUBULAK',
              'MARGA JAYA',
              'SITU GEDE',
              'SEMPLAK',
              'CILENDEK BARAT',
              'CILENDEK TIMUR',
              'CURUG MEKAR',
              'CURUG',
              'PASIR JAYA',
              'PASIR KUDA',
              'PASIR MULYA',
              'GUNUNG BATU',
              'LOJI',
              'MUARA SARI',
            ];
          } catch (error) {
            console.error('Error fetching Kelurahan options:', error);
          }
        }
      },
      cariData() {
        // Implement your search logic using selectedKabupaten, selectedKecamatan, and selectedKelurahan
        console.log('Selected Kabupaten:', this.selectedKabupaten);
        console.log('Selected Kecamatan:', this.selectedKecamatan);
        console.log('Selected Kelurahan:', this.selectedKelurahan);
      }
    }
  }
  </script>
  