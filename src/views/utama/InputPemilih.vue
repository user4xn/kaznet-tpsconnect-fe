<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body class="card">
        <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
          <div class="header-title">
            <h4 class="card-title mb-0">Cari Pemilih</h4>
          </div>
          <div class="d-flex align-items-center gap-3">
            <button class="text-center btn btn-primary d-flex gap-2">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Pemilih
            </button>
          </div>
        </div>
        <b-card-body>
          <b-form>
            <b-row>
              <b-col sm="4">
                <b-form-group>
                  <label for="input-kabupaten" class="form-label">Kota/Kabupaten:</label>
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
                            <div class="d-flex justify-content-between flex-wrap align-items-center">
                              <div>
                                {{ `${result.nik} - ${result.nama} - ${result.jenis_kelamin}` }}
                              </div>
                              <div class="ms-auto me-2">
                                <b-form-input type="number" class="form-control-sm height-select2" v-model="selectedPhoneInput[index]" placeholder="Masukan No Handphone" id="input-phone"></b-form-input>
                              </div>
                              <div>
                                <span class="p-2 badge bg-success rounded-pills" style="min-width: 66px;">TPS {{ result.tps }}</span>
                                <button class="p-2 badge bg-danger border-0 ms-2 rounded-pills" @click="removeSelected(index, result.id)">HAPUS</button>
                              </div>
                            </div>
                          </li>
                      </ol>
                      <hr class="hr-horizontal"/>
                      <div class="text-center mt-1">
                          <button class="btn btn-success" :disabled="isOnValidate" @click="processValidate">
                            <span v-if="!isOnValidate">
                            Tambahkan Ke Pemilih
                            </span>
                            <span v-if="isOnValidate">
                              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                              Memproses Data...
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
  <b-row v-if="succesValidate">
    <b-col sm="12">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.94118 10.7474V20.7444C5.94118 21.0758 5.81103 21.3936 5.57937 21.628C5.3477 21.8623 5.0335 21.994 4.70588 21.994H2.23529C1.90767 21.994 1.59347 21.8623 1.36181 21.628C1.13015 21.3936 1 21.0758 1 20.7444V11.997C1 11.6656 1.13015 11.3477 1.36181 11.1134C1.59347 10.879 1.90767 10.7474 2.23529 10.7474H5.94118ZM5.94118 10.7474C7.25166 10.7474 8.50847 10.2207 9.43512 9.28334C10.3618 8.34594 10.8824 7.07456 10.8824 5.74887V4.49925C10.8824 3.83641 11.1426 3.20071 11.606 2.73201C12.0693 2.26331 12.6977 2 13.3529 2C14.0082 2 14.6366 2.26331 15.0999 2.73201C15.5632 3.20071 15.8235 3.83641 15.8235 4.49925V10.7474H19.5294C20.1847 10.7474 20.8131 11.0107 21.2764 11.4794C21.7397 11.9481 22 12.5838 22 13.2466L20.7647 19.4947C20.5871 20.2613 20.25 20.9196 19.8045 21.3704C19.3589 21.8211 18.8288 22.04 18.2941 21.994H9.64706C8.6642 21.994 7.72159 21.599 7.0266 20.896C6.33162 20.1929 5.94118 19.2394 5.94118 18.2451" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <strong> Berhasil!</strong> {{ resultValidate.total - resultValidate.error }} data berhasil <u>di tambahkan</u>{{ resultValidate.error != 0 ? `, ${resultValidate.error} data duplikat ditemukan (akan dihapus).` : `. `}}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </b-col>
  </b-row>
  <b-row v-if="resultSearch.length > 0">
    <b-col sm="12">
      <b-card no-body class="card">
        <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
          <div class="header-title">
            <p class="text-muted mb-0">Tampil {{ `${(resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit) + 1} - ${((resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit)) + this.resultSearch.length} dari ${resultTotal.toLocaleString()}` }} data...</p>
          </div>
        </div>
        <b-card-body>
          <div class="table-responsive">
            <table id="result-dpt" class="table table-hover table-sm">
              <thead>
                <tr class="ligth">
                  <th>#</th>
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
                <template v-for="(result, index) in resultSearch" :key="index">
                  <tr>
                    <td>{{ (resultPagination.currentPage - 1) * resultLimit + index + 1 }}</td>
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
                      <button :disabled="result.is_verification == true || result.is_selected == true" class="btn btn-primary btn-sm" @click="insertSelected(result, index)">Pilih</button>
                      <button class="btn btn-success btn-sm ms-2" data-bs-toggle="collapse" :data-bs-target="'#detailRow-' + index"  @click="processDetail(result.id, '#detailRow-' + index)">Detail</button>
                    </td>
                  </tr>
                  <tr>
                    <td :colspan="resultSearch.length + 1" style="border:0px !important" class="p-0">
                      <div class="collapse border-bottom p-4" :id="'detailRow-' + index">
                        <b-card no-body="" class="card">
                          <div class="p-4 d-flex justify-content-between flex-wrap align-items-center">
                            <div class="header-title w-100">
                              <div class="d-flex justify-content-between flex-wrap">
                                <h5 class="text-muted mb-0">{{ result.nama }}</h5>
                                <h5 class="text-muted mb-0">{{ result.jenis_kelamin == 'L' ? 'Laki-Laki' : 'Perempuan' }}</h5>
                              </div>
                              <hr class="hr-horizontal">
                              <div class="d-flex justify-content-between flex-wrap">
                                <p class="text-muted mb-0">NIK: {{ result.nik }}</p>
                                <p class="text-muted mb-0">NKK: {{ result.nkk }}</p>
                              </div>
                              <div class="d-flex justify-content-between flex-wrap">
                                <p class="text-muted mb-0">Tempat Tanggal Lahir: {{ `${result.tempat_lahir}, ${result.tanggal_lahir}` }}</p>
                                <p class="text-muted mb-0">Status: {{ result.kawin == 'S' ? (result.kawin == 'B' ? 'Belum Menikah' : 'Kawin') : 'Pisah' }}</p>
                              </div>
                              <div class="d-flex justify-content-between flex-wrap">
                                <p class="text-muted mb-0">Alamat: {{ result.alamat }}</p>
                                <p class="text-muted mb-0">RT/RW: {{ `${result.rt}/${result.rw}` }}</p>
                              </div>
                              <div class="d-flex justify-content-between flex-wrap">
                                <p class="text-muted mb-0">No Telp: {{ result.telp ?? '-' }}</p>
                                <span class="badge bg-primary py-2 ms-auto me-1">TPS: {{ result.status_tps_label }}</span>
                                <span v-if="result.difabel == '1'" class="badge bg-warning py-2">DIFABEL</span>
                              </div>
                            </div>
                          </div>
                        </b-card>
                      </div>
                    </td>
                  </tr>
                </template>
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
      succesValidate: false,
      resultValidate: {
        total: 0,
        error: 0
      },
      openedDetail: null,
      selectedPhoneInput: [],
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
      this.adminCity();
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
      if(showAll == false && !this.inputName) {
        return
      }

      if(showAll == false && this.inputName.length < 2) {
        return
      }

      if(showAll == false && !page) {
        this.resetSearch();
      }

      if(!page) {
        this.resultSearch = [];
      }

      this.isOnFetch = true;
      let limit = this.resultPagination.currentLimit ?? this.resultLimit;
      let offset = this.resultPagination.currentOffset ?? this.resultOffset;

      if(page) {
        offset = this.resultPagination.currentLimit * (page - 1);
      }
      
      var queryParam = `nama_kabupaten=${this.selectedKabupaten}`;
          queryParam += `&nama_kecamatan=${this.selectedKecamatan}`;
          queryParam += `&nama_kelurahan=${this.selectedKelurahan}`;
          queryParam += `&tps=${this.selectedTps}`;
          queryParam += `&limit=${limit}`;
          queryParam += `&offset=${offset}`;
      
      if(showAll == false) {
        queryParam += `&nama=${this.inputName}`;
      }

      console.log(queryParam);

      const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/validate/list?${queryParam}`, withHeader);

      if(response.data.meta.code == 200) {
        const data = response.data.data.items;
        const metadata = response.data.data.metadata;
        
        if(data != []) {
          const remappedData = data.map(item => ({
            ...item,
            is_selected: false
          }));
          
          this.resultSearch = remappedData;
          this.resultTotal = metadata.total_results;
        }
      }  

      this.resultPagination.currentLimit = limit;
      this.resultPagination.currentOffset = offset;
      this.resultMode = showAll;

      setTimeout(() => {
        this.isOnFetch = false;
      }, 500);
    },500),
    prevNextCariData(x) {
      let current = this.resultPagination.currentPage;
      let count = current + x;
      let mod = this.resultTotal % this.resultPagination.currentLimit;

      if ((count > 0 && count <= (this.resultTotal / this.resultPagination.currentLimit)) || mod != 0 && ((this.resultPagination.currentLimit * (count - 1)) + mod) <= this.resultTotal) {
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
    insertSelected(value, index) {
      const isDuplicate = this.selectedData.find(item => item.id === value.id);
    
      if (!isDuplicate) {
        this.selectedData.push(value);
        this.resultSearch[index].is_selected = true;
      }

      console.log(this.selectedPhoneInput);
    },
    removeSelected(index, id) {
      this.selectedData.splice(index, 1);
      this.selectedPhoneInput.splice(index, 1);
      const resIndex = this.resultSearch.findIndex(item => item.id === id);
      this.resultSearch[resIndex].is_selected = false;
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
    },
    async processValidate() {
      this.isOnValidate = true;

      this.resultValidate = {
        total: 0,
        error: 0
      }

      try {
        var selectedDataID = this.selectedData.map((item, index) => ({
            id: item.id,
            no_handphone: this.selectedPhoneInput[index],
        }));
      
        const body = {
          items: selectedDataID,
          is_true: true
        }

        const response = await axios.post(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/validate`, body, withHeader);
        
        if(response.data.meta.code == 200) {
          const totalValidate = this.selectedData.length;
          const errorData = response.data.data.items;
          let totalError = 0;

          if(errorData) {
            totalError = errorData.length;
          }

          this.selectedData = [];
          this.succesValidate = true;
          this.resultValidate = {
            total: totalValidate,
            error: totalError
          }

          this.cariData(this.resultMode, this.resultPagination.currentPage);

          setTimeout(() => {
            this.succesValidate = false;
          }, 10000);
        }
      } catch (error) {
        console.log('error cant validate data: ', error);
      }

      setTimeout(() => {
        this.isOnValidate = false;
      }, 500);
    },
    async processDetail (opened) {
      this.openedDetail = opened;
    }
  }
}
</script>

<style scoped>
.height-select2 {
  min-height: 34.40px !important;
}
</style>
  