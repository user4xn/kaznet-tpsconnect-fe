<template>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="card">
          <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
            <div class="header-title">
              <h4 class="card-title mb-0">Filter</h4>
            </div>
            <div class="d-flex align-items-center gap-3">
              <router-link :to="{ name: 'default.tambah-rekap-pemilih'}" class="text-center btn btn-primary d-flex gap-2">
                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Rekap
              </router-link>
            </div>
          </div>
          <b-card-body>
            <b-form>
              <b-row>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kabupaten" class="form-label">Kota/Kabupaten*</label>
                    <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="!isAdmin"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kecamatan" class="form-label">Kecamatan*</label>
                    <v-select v-model="selectedKecamatan" placeholder="Pilih Kecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="!selectedKabupaten"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kelurahan" class="form-label">Kelurahan*</label>
                    <v-select v-model="selectedKelurahan" placeholder="Pilih Kelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="!selectedKecamatan"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-tps" class="form-label">TPS*</label>
                    <v-select taggable v-model="selectedTps" placeholder="Pilih TPS" :options="tpsOptions" id="input-tps" :disabled="!selectedKelurahan"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="8">
                  <b-form-group>
                    <b-row>
                      <b-col md="6">
                        <label for="input-jaringan" class="form-label">Jaringan</label>
                        <v-select v-model="selectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2" id="input-jaringan" required :disabled="!selectedKabupaten"></v-select>
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
    <b-row v-if="resultSearch.length > 0">
      <b-col sm="12">
        <b-card no-body class="card">
          <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
            <div class="header-title w-100">
              <b-row>
                <b-col sm="8" class="d-flex align-items-center">
                  <p class="text-muted mb-0">Tampil {{ `${(resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit) + 1} - ${((resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit)) + this.resultSearch.length} dari ${resultTotal.toLocaleString()}` }} data...</p>
                </b-col>
                <b-col sm="4" class="text-end">
                  <b-button variant="success" @click="handleExport()" :disabled="isOnExport" size="sm">
                    {{ isOnExport ? 'Mengekspor..' : 'Export XLS' }}
                  </b-button>
                </b-col>
              </b-row>
              <hr class="hr-horizontal"/>
              <b-row>
                <b-col sm="3">
                  <b-input-group size="md" prepend="Baris">
                    <b-form-select v-model="resultLimit" @change="cariData(false)" placeholder="10" :options="[10,50,100]"></b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
            </div>
          </div>
          <b-card-body>
            <div class="table-responsive">
              <table id="result-dpt" class="table table-hover table-sm">
                <thead>
                  <tr class="ligth">
                    <th>#</th>
                    <th>KABUPATEN</th>
                    <th>KECAMATAN</th>
                    <th>KELURAHAN</th>
                    <th>NO TPS</th>
                    <th>TARGET</th>
                    <th>JARINGAN</th>
                    <th>TERINPUT</th>
                    <th>STATUS</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(result, index) in resultSearch" :key="index">
                    <tr>
                      <td class="align-middle pt-1">{{ (resultPagination.currentPage - 1) * resultLimit + index + 1 }}.</td>
                      <td class="align-middle pt-1">{{ result.nama_kabupaten }}</td>
                      <td class="align-middle pt-1">{{ result.nama_kecamatan }}</td>
                      <td class="align-middle pt-1">{{ result.nama_kelurahan }}</td>
                      <td class="align-middle pt-1 text-center">{{ result.tps }}</td>
                      <td class="align-middle pt-1 text-center">{{ result.target_pemilih }}</td>
                      <td class="align-middle">
                        <template class="d-flex flex-wrap">
                          <span class="mx-1" v-for="(item, itemIndex) in result.jaringan" :key="itemIndex">
                            <span :class="`badge ${randomBootstrapColor(item.count)} rounded-pill`">{{ item.Network }} <span class="badge bg-secondary">{{ item.count }}</span></span>
                          </span>
                        </template>
                      </td>
                      <td class="align-middle"> 
                        <template class="d-flex flex-wrap">
                          <span class="mx-1" v-for="(item, itemIndex) in result.terinput" :key="itemIndex">
                            <span :class="`badge ${randomBootstrapColor(item.count)} rounded-pill`">{{ item.Network }} <span class="badge bg-secondary">{{ item.count }}</span></span>
                          </span>
                        </template>
                      </td>
                      <td class="align-middle pt-1 text-center px-3">{{ result.status }}</td>
                      <td class="align-middle pt-1 text-center px-3">
                        <router-link isTag="button" class="btn btn-info btn-sm me-2" :to="{ name: 'default.detail-rekap-pemilih', params: { id: result.id }}" >Detail</router-link>
                        <b-button variant="danger" size="sm" @click="handleDelete(index)">Hapus</b-button>
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
                
                <!-- Display first page number if not on the first page -->
                <button v-if="resultPagination.currentPage > 2 && resultPagination.currentPage != 3" class="btn btn-primary rounded-0" @click="prevNextCariData(-(resultPagination.currentPage-1))">1</button>

                <!-- Display ellipsis (...) if not on the first page -->
                <span v-if="resultPagination.currentPage > 3" class="btn btn-primary rounded-0">...</span>

                <!-- Display two pages before the current page -->
                <button v-if="resultPagination.currentPage > 1 && resultPagination.currentPage != 2" class="btn btn-primary rounded-0" @click="prevNextCariData(-2)">{{ resultPagination.currentPage - 2 }}</button>
                <button v-if="resultPagination.currentPage > 0 && resultPagination.currentPage != 1" class="btn btn-primary rounded-0" @click="prevNextCariData(-1)">{{ resultPagination.currentPage - 1 }}</button>

                <button class="btn btn-primary rounded-0" disabled>
                  {{ this.resultPagination.currentPage }}
                </button>

                <!-- Display two pages after the current page -->
                <button v-if="(resultPagination.currentPage < (Math.ceil(resultTotal / resultPagination.currentLimit))) && (resultPagination.currentPage != (Math.ceil(resultTotal / resultPagination.currentLimit)))" class="btn btn-primary rounded-0" @click="prevNextCariData(+1)">{{ resultPagination.currentPage + 1 }}</button>
                <button v-if="(resultPagination.currentPage < (Math.ceil(resultTotal / resultPagination.currentLimit)) - 1) && (resultPagination.currentPage != (Math.ceil(resultTotal / resultPagination.currentLimit)) - 1)" class="btn btn-primary rounded-0" @click="prevNextCariData(+2)">{{ resultPagination.currentPage + 2 }}</button>

                <!-- Display ellipsis (...) if not on the last page -->
                <span v-if="resultPagination.currentPage < (Math.ceil(resultTotal / resultPagination.currentLimit)) - 2" class="btn btn-primary rounded-0">...</span>

                <!-- Display last page number if not on the last page -->
                <button v-if="(resultPagination.currentPage < (Math.ceil(resultTotal / resultPagination.currentLimit)) - 1) && resultPagination.currentPage != (Math.ceil(resultTotal / resultPagination.currentLimit) - 2)" class="btn btn-primary rounded-0" @click="prevNextCariData(+(Math.ceil(resultTotal / resultPagination.currentLimit) - resultPagination.currentPage))">{{ Math.ceil(resultTotal / resultPagination.currentLimit) }}</button>

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
        selectedSuggestion: null,
        selectedKabupaten: null,
        selectedKecamatan: null,
        selectedKelurahan: null,
        selectedTps: null,
        selectedJaringan: null,
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
        resultLimit: 10,
        resultOffset: 0,
        jaringanOptions2: [],
        isOnExport: false,
      }
    },
    mounted() {
      this.fetchKabupatenOptions();
      this.cariData(false);
    },
    watch: {
      selectedKabupaten: 'fetchKecamatanOptions',
      selectedKecamatan: 'fetchKelurahanOptions',
      selectedKelurahan: 'fetchTpsOptions',
      selectedTps: 'fetchData',
      selectedJaringan: 'fetchData',
    },
    methods: {
      randomBootstrapColor(count) {
        if (count === 0) {
          return 'bg-danger';
        } else if (count >= 1 && count <= 5) {
          return 'bg-warning';
        } else if (count >= 6 && count <= 10) {
          return 'bg-success';
        } else {
          return 'bg-info';
        }
      },
      handleDelete(index) {
        const id = this.resultSearch[index].id;

        this.$swal({
          title: "Konfirmasi Hapus!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Batal",
          confirmButtonText: "Ya, Hapus!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/delete/${id}`, withHeader);
              
              if(response.data.meta.code == 200) {
                this.$swal({
                  title: "Ok",
                  text: "data sudah dihapus!",
                  icon: "success"
                });
                this.cariData(false, this.resultOffset);
                return
              }
              
            } catch (error) {
              this.$swal({
                title: "Error!",
                text: error.message,
                icon: "error"
              });

              console.log('error cant delete data: ', error);
            }
          }
        });
      },
      handleExport: debounce(async function () {
        this.isOnExport = true;

        var queryParam = '?';
        let filename = 'RekapPemilih';
        this.isOnFetchExport = true;

        if (this.selectedKabupaten) {
          queryParam += `nama_kabupaten=${this.selectedKabupaten}&`;
          filename += `-${this.selectedKabupaten}`;
        }

        if (this.selectedKecamatan) {
          queryParam += `nama_kecamatan=${this.selectedKecamatan}&`;
          filename += `-${this.selectedKecamatan}`;
        }

        if (this.selectedKelurahan) {
          queryParam += `nama_kelurahan=${this.selectedKelurahan}&`;
          filename += `-${this.selectedKelurahan}`;
        }

        if (this.selectedTps) {
          queryParam += `tps=${this.selectedTps}&`;
          filename += `-${this.selectedTps}`;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        filename += `-${timestamp}`;
        
        await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/export${queryParam ?? ''}`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          responseType: 'arraybuffer'
        }).then(response => {
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${filename}.xlsx`; 
          document.body.appendChild(link);
          link.click();        
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('Error downloading data:', error);
        });

        setTimeout(() => {
          this.isOnExport = false;
        }, 500);
      },300),
      fetchData(){
        this.cariData(false, this.resultOffset);
      },
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
      async fetchJaringanOptions() {
        if (this.selectedKabupaten) {
          try {
            const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/network/list?nama_kabupaten=${this.selectedKabupaten}`, withHeader);
            if(response.data.meta.code == 200) {
              const data = response.data.data;

              this.jaringanOptions2 = data.map(item => {
                return {
                  value: item,
                  label: item,
                }
              });
            }        
          } catch (error) {
            console.error('Error fetching Jaringan options:', error);
          }
        }
      },
      async fetchKecamatanOptions() {
        this.selectedKecamatan = null;
        this.selectedKelurahan = null;
        if (this.selectedKabupaten) {
          try {
            const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/district/by-city?nama_kabupaten=${this.selectedKabupaten}`, withHeader);
            if(response.data.meta.code == 200) {
                this.kecamatanOptions = response.data.data;
            }        
          } catch (error) {
            console.error('Error fetching Kecamatan options:', error);
          }
          this.cariData(false, this.resultOffset);
          if(this.isAdmin) {
            this.fetchJaringanOptions();
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
          this.cariData(false, this.resultOffset);
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
          this.cariData(false, this.resultOffset);
        }
      },
      cariData: debounce(async function (showAll, page) {      
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
  
        var queryParam = '?';
  
        if (this.selectedKabupaten) {
          queryParam += `nama_kabupaten=${this.selectedKabupaten}&`;
        }

        if (this.selectedKecamatan) {
            queryParam += `nama_kecamatan=${this.selectedKecamatan}&`;
        }

        if (this.selectedKelurahan) {
          queryParam += `nama_kelurahan=${this.selectedKelurahan}&`;
        }

        if (this.selectedTps) {
          queryParam += `tps=${this.selectedTps}&`;
        }

        if (this.selectedJaringan) {
          queryParam += `jaringan=${this.selectedJaringan.value}&`;
        }
  
        if (!showAll && this.inputName) {
          queryParam += `nama=${this.inputName}&`;
        }
        queryParam += `limit=${limit}&`;
        queryParam += `offset=${offset}`;
  
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/list${queryParam ?? ''}`, withHeader);
        
        if(response.data.meta.code == 200) {
          const data = response.data.data.items;
          const metadata = response.data.data.metadata;
          
          if(data != []) {
            this.resultSearch = data;
            this.resultTotal = metadata.total_results;
          }
        }  
  
        this.resultPagination.currentLimit = limit;
        this.resultPagination.currentOffset = offset;
        this.resultMode = showAll;
  
        setTimeout(() => {
          this.isOnFetch = false;
        }, 500);
      },300),
      prevNextCariData(x) {
        let current = this.resultPagination.currentPage;
        let count = current + x;
        let mod = this.resultTotal % this.resultPagination.currentLimit;
  
        if(count == 0) {
          return;
        }
  
        if ((count > 0 && count <= (this.resultTotal / this.resultPagination.currentLimit)) || (mod != 0 && ((this.resultPagination.currentLimit * (count - 1)) + mod) <= this.resultTotal)) {
          this.resultPagination.currentPage = count;
          this.cariData(this.resultMode, this.resultPagination.currentPage);
        }
      },
      adminCity() {
        const userData = JSON.parse(localStorage.getItem('userData'));
  
        if(userData && userData.role === 'admin') {
          const region = userData.regency;
          const network = userData.user_network;

          this.jaringanOptions2 = network.map(item => {
            return {
              value: item,
              label: item,
            }
          });

          this.jaringanOptions2Edit = network.map(item => {
            return {
              value: item,
              label: item,
            }
          });
        
          if(this.kabupatenOptions.includes(region)) {
            this.selectedKabupaten = region;
          }
  
          this.cariData(false, this.resultOffset);
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
        this.cariData(false, this.resultOffset);
        this.resetSearch();
      },
      swalAlert (paramIcon, paramTitle, paramText) {
        this.$swal({
          title: paramTitle,
          text: paramText,
          icon: paramIcon,
        });
      },
    }
  }
  </script>
  
  <style scoped>
  .height-select2 {
    min-height: 34.40px !important;
  }
  </style>
    