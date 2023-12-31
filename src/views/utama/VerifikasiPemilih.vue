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
                  <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="!isAdmin"></v-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="input-kecamatan" class="form-label">Kecamatan:</label>
                  <v-select v-model="selectedKecamatan" placeholder="Pilih Kecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="!selectedKabupaten"></v-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="input-kelurahan" class="form-label">Kelurahan:</label>
                  <v-select v-model="selectedKelurahan" placeholder="Pilih Kelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="!selectedKecamatan"></v-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="input-tps" class="form-label">TPS:</label>
                  <v-select v-model="selectedTps" placeholder="Pilih TPS" :options="tpsOptions" id="input-tps" :disabled="!selectedKelurahan"></v-select>
                </b-form-group>
              </b-col>
              <b-col sm="8">
                <b-form-group>
                  <b-row>
                    <b-col md="8">
                      <label for="input-name" class="form-label">Nama: <span class="text-muted">(minimal 2 karakter)</span></label>
                      <b-form-input class="form-control-sm height-select2" v-model="inputName" placeholder="Cari Nama" id="input-name" :disabled="!selectedTps" @keyup="cariData(false)"></b-form-input>
                    </b-col>
                    <b-col md="4" class="d-flex align-items-end">
                      <b-button variant="primary" size="sm" class="height-select2 w-100" @click="cariData(true)" :disabled="!selectedTps || isOnFetch">Tampilkan Semua</b-button>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>
            <div class="col-12 d-flex justify-content-center">
              <span v-if="isOnFetch">
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Memuat...
              </span>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row v-if="selectedData.length > 0">
    <b-col sm="12">
      <b-card no-body class="card">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h4 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Data Terpilih
                        <span class="badge rounded-pill bg-danger ms-1">
                          {{ selectedData.length }}
                        </span>
                    </button>
                </h4>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <ol>
                          <li v-for="(result, index) in selectedData" :key="index" class="mt-2">
                            <div class="d-flex justify-content-between">
                              <div>
                                {{ `${result.nik} - ${result.nama} - ${result.jenis_kelamin}` }}
                              </div>
                              <div>
                                <span class="p-2 badge bg-success rounded-pills" style="min-width: 66px;">TPS {{ result.tps }}</span>
                                <button class="p-2 badge bg-danger border-0 ms-2 rounded-pills" @click="removeSelected(index)">HAPUS</button>
                              </div>
                            </div>
                          </li>
                      </ol>
                      <hr class="hr-horizontal"/>
                      <div class="text-center mt-1">
                          <button class="btn btn-primary" :disabled="isOnValidate">
                            <span v-if="!isOnValidate">
                            Validasi Semua
                            </span>
                            <span v-if="isOnValidate">
                              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                              Memproses Validasi Data...
                            </span>
                          </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row v-if="resultSearch.length > 0">
    <b-col sm="12">
      <b-card no-body class="card">
        <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
          <div class="header-title">
            <p class="text-muted mb-0">Tampil {{ `${(resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit) + 1} - ${resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)} dari ${resultTotal.toLocaleString()}` }} data...</p>
          </div>
        </div>
        <b-card-body>
          <div class="table-responsive">
            <table id="found-citizen-table" class="table table-striped table-sm" role="grid" data-toggle="data-table">
              <thead>
                <tr class="ligth">
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>TPS</th>
                  <th>Tanggal Lahir</th>
                  <th>JK</th>
                  <th>Usia</th>
                  <th>Status</th>
                  <th style="min-width: 100px" class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in resultSearch" :key="index">
                  <td>{{ result.nama }}</td>
                  <td>{{ result.nik }}</td>
                  <td>{{ result.tps }}</td>
                  <td>{{ result.tanggal_lahir }}</td>
                  <td>{{ result.jenis_kelamin }}</td>
                  <td>{{ calculateAge(result.tanggal_lahir) }}</td>
                  <td>
                    <span v-if="result.is_verification == true" class="badge bg-soft-success border border-success text-success rounded-pill py-1 px-3"> Sudah Valid </span>
                    <span v-if="result.is_verification == false" class="badge bg-light border border-gray text-gray rounded-pill py-1 px-3"> Belum Valid </span>
                  </td>
                  <td class="d-flex justify-content-center">
                    <button class="btn btn-primary btn-sm" @click="insertSelected(result)">Pilih</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center mt-1">
              <button class="btn btn-primary btn-sm rounded-0 rounded-start" @click="prevNextCariData(-1)">
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.48 6.49 2 12 2L12.2798 2.00384C17.6706 2.15216 22 6.57356 22 12C22 17.51 17.52 22 12 22C6.49 22 2 17.51 2 12ZM13.98 16C14.27 15.7 14.27 15.23 13.97 14.94L11.02 12L13.97 9.06C14.27 8.77 14.27 8.29 13.98 8C13.68 7.7 13.21 7.7 12.92 8L9.43 11.47C9.29 11.61 9.21 11.8 9.21 12C9.21 12.2 9.29 12.39 9.43 12.53L12.92 16C13.06 16.15 13.25 16.22 13.44 16.22C13.64 16.22 13.83 16.15 13.98 16Z" fill="currentColor"></path>
                </svg>                        
              </button>
              <button class="btn btn-primary rounded-0" disabled>
                {{ this.resultPagination.currentPage }}
              </button>
              <button class="btn btn-primary btn-sm rounded-0 rounded-end" @click="prevNextCariData(+1)">
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.52 17.51 22 12 22L11.7202 21.9962C6.32942 21.8478 2 17.4264 2 12C2 6.49 6.48 2 12 2C17.51 2 22 6.49 22 12ZM10.02 8C9.73 8.3 9.73 8.77 10.03 9.06L12.98 12L10.03 14.94C9.73 15.23 9.73 15.71 10.02 16C10.32 16.3 10.79 16.3 11.08 16L14.57 12.53C14.71 12.39 14.79 12.2 14.79 12C14.79 11.8 14.71 11.61 14.57 11.47L11.08 8C10.94 7.85 10.75 7.78 10.56 7.78C10.36 7.78 10.17 7.85 10.02 8Z" fill="currentColor"></path>
                </svg>                                               
              </button>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script scoped>
import axios from 'axios';
import debounce from 'lodash/debounce';

let withHeader = {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  }
}

export default {
  data() {
    return {
      isAdmin: false,
      isOnFetch: false,
      isOnValidate: false,
      selectedKabupaten: null,
      selectedKecamatan: null,
      selectedKelurahan: null,
      selectedTps: null,
      inputName: null,
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
      tpsOptions: [],
      resultSearch: [],
      resultTotal: null,
      resultMode: true,
      resultPagination: {
        currentLimit: null,
        currentOffset: null,
        currentPage: 1,
      },
      selectedData: [],
      submitSearchFalse: false,
      openIndex: -1,
      resultLimit: 10,
      resultOffset: 0,
    }
  },
  watch: {
    selectedKabupaten: 'fetchKecamatanOptions',
    selectedKecamatan: 'fetchKelurahanOptions',
    selectedKelurahan: 'fetchTpsOptions',
    selectedTps: 'resetSelected',
  },
  mounted() {
    this.fetchKabupatenOptions();
    this.adminCity();
  },
  methods: {
    async fetchKabupatenOptions() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/city/list`, withHeader);
        if(response.data.meta.code == 200) {
          this.kabupatenOptions = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching Kabupaten options:', error);
      }
    },
    async fetchKecamatanOptions() {
      this.selectedKecamatan = null;
      this.selectedKelurahan = null;
      this.selectedTps = null;
      if (this.selectedKabupaten) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/district/by-city?nama_kabupaten=${this.selectedKabupaten}`, withHeader);
          if(response.data.meta.code == 200) {
            this.kecamatanOptions = response.data.data;
          }        
        } catch (error) {
          console.error('Error fetching Kecamatan options:', error);
        }
      }
    },
    async fetchKelurahanOptions() {
      this.selectedKelurahan = null;
      this.selectedTps = null;
      if (this.selectedKecamatan) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/subdistrict/by-district?nama_kecamatan=${this.selectedKecamatan}`, withHeader);
          if(response.data.meta.code == 200) {
            this.kelurahanOptions = response.data.data;
          }  
        } catch (error) {
          console.error('Error fetching Kelurahan options:', error);
        }
      }
    },
    async fetchTpsOptions() {
      this.selectedTps = null;
      this.inputName = null;
      this.resetSearch();
      if (this.selectedKelurahan) {
        try {
          var queryParam = `nama_kabupaten=${this.selectedKabupaten}`;
              queryParam += `&nama_kecamatan=${this.selectedKecamatan}`;
              queryParam += `&nama_kelurahan=${this.selectedKelurahan}`;

          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/tps/subdistrict?${queryParam}`, withHeader);
          if(response.data.meta.code == 200) {
            this.tpsOptions = response.data.data;
          }  
        } catch (error) {
          console.error('Error fetching Kelurahan options:', error);
        }
      }
    },
    cariData: debounce(async function (showAll, page) {
      this.resultMode = showAll;
      
      if(showAll == false && !this.inputName) {
        return
      }

      if(showAll == false && this.inputName.length < 2) {
        return
      }

      if(!page) {
        this.resultSearch = [];
      }

      this.isOnFetch = true;
      let limit = this.resultPagination.currentLimit ?? this.resultLimit;
      let offset = this.resultPagination.currentOffset ?? this.resultOffset;

      if(page) {
        offset = this.resultPagination.currentLimit * page;
      }
      
      var queryParam = `nama_kabupaten=${this.selectedKabupaten}`;
          queryParam += `&nama_kecamatan=${this.selectedKecamatan}`;
          queryParam += `&nama_kelurahan=${this.selectedKelurahan}`;
          queryParam += `&tps=${this.selectedTps}`;
          queryParam += `&limit=${limit}`;
          queryParam += `&offset=${offset}`;

      console.log(queryParam);

      if(showAll == false) {
        queryParam += `&nama=${this.inputName}`;
      }

      const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/list?${queryParam}`, withHeader);

      if(response.data.meta.code == 200) {
        const data = response.data.data.items;
        const metadata = response.data.data.metadata;
        
        if(data != null) {
          this.resultSearch = data;
          this.resultTotal = metadata.total_results;
        }
      }  

      this.resultPagination.currentLimit = limit;
      this.resultPagination.currentOffset = offset;

      setTimeout(() => {
        this.isOnFetch = false;
      }, 500);
    },500),
    prevNextCariData(x) {
      let current = this.resultPagination.currentPage;
      let count = current + x;
      
      if (count > 0 && count < (this.resultTotal / this.resultPagination.currentLimit)) {
        this.resultPagination.currentPage = count;
        this.cariData(this.resultMode, this.resultPagination.currentPage);
      }
    },
    adminCity() {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if(userData && userData.role === 'admin') {
        const region = userData.regency;
      
        if(this.kabupatenOptions.includes(region)) {
          this.selectedKabupaten = region;
        }
      } else {
        this.isAdmin = true;
      }
    },
    resetSearch() {
      this.resultMode = true;
      this.resultPagination ={
        currentLimit: null,
        currentOffset: null,
        currentPage: 1,
      };
    },
    resetSelected() {
      this.selectedData = [];
      this.resetSearch();
    },
    insertSelected(value) {
      const isDuplicate = this.selectedData.find(item => item.id === value.id);
      console.log(isDuplicate);

      if (!isDuplicate) {
        this.selectedData.push(value);
      }
    },
    removeSelected(index) {
      this.selectedData.splice(index, 1);
    },
    calculateAge(birthdate) {
      const birthdateDate = new Date(birthdate);
      const currentDate = new Date();

      let age = currentDate.getFullYear() - birthdateDate.getFullYear();

      const hasBirthdayOccurred = (
      currentDate.getMonth() > birthdateDate.getMonth() ||
      (currentDate.getMonth() === birthdateDate.getMonth() && currentDate.getDate() >= birthdateDate.getDate())
      );

      if (!hasBirthdayOccurred) {
        age--;
      }

      return age;
    }
  }
}
</script>

<style scoped>
.height-select2 {
  min-height: 34.40px !important;
}
</style>
  