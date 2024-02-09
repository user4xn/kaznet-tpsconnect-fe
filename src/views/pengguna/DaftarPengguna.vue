<template>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="card">
          <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
            <div class="header-title">
              <h4 class="card-title mb-0">Filter</h4>
            </div>
            <div class="d-flex align-items-center gap-3">
              <button class="text-center btn btn-primary d-flex gap-2"
              :class="addCollapse ? null : 'collapsed'"
              :aria-expanded="addCollapse ? 'true' : 'false'"
              aria-controls="addManual"
              @click="addCollapse = !addCollapse"
              :disabled="!isAdmin"
              >
                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah
              </button>
            </div>
          </div>
          <b-card-body>
            <b-form>
              <b-row>
                <b-col sm="12" v-if="!addCollapse">
                    <label for="input-name" class="form-label">Cari <i>(enter untuk memuat data)</i></label>
                    <b-form-input class="form-control-sm height-select2" v-model="inputName" placeholder="Cari Nama" id="input-name" :disabled="isOnFetch" @keyup.enter="cariData(false)"></b-form-input>
                </b-col>
              </b-row>
              <div class="col-12 d-flex justify-content-center">
                <span v-if="isOnFetch">
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Memuat...
                </span>
              </div>
              <b-col sm="12">
                <b-collapse v-model="addCollapse" id="addManual">
                  <hr class="hr-horizontal">
                  <b-form @submit="handleSubmit">
                    <b-row>
                      <b-col sm="6">
                        <b-form-group>
                            <label for="input-role" class="form-label">Role*</label>
                            <v-select v-model="selectedRole" placeholder="Pilih Role" :options="roleOptions" id="input-role" required></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group>
                            <label for="input-kabupaten" class="form-label">Kota/Kabupaten*</label>
                            <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="selectedRole == 'superadmin'" :required="selectedRole != 'superadmin'"></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group>
                            <label for="input-kabupaten" class="form-label">Jaringan*</label>
                            <v-select v-model="selectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2" id="input-kabupaten" :disabled="selectedRole == 'superadmin'" multiple :required="selectedRole != 'superadmin'"></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group>
                            <label for="input-full-name" class="form-label">Nama*</label>
                            <b-form-input class="form-control-sm height-select2" v-model="inputFullName" placeholder="Masukan Nama" id="input-full-name" required></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group>
                            <label for="input-email" class="form-label">Email*</label>
                            <b-form-input type="email" class="form-control-sm height-select2" v-model="inputEmail" placeholder="Masukan Email" id="input-email" required></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group
                        label="Password*"
                        label-for="input-password"
                        >
                        <b-form-input
                            type="password"
                            v-model="inputPassword"
                            id="input-password"
                            required
                        ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col sm="6">
                        <b-form-group
                        :state="passwordsMatch ? true : false"
                        label="Masukan Ulang Password*"
                        label-for="input-retype-password"
                        >
                          <b-form-input
                              type="password"
                              v-model="inputPasswordConfirm"
                              id="input-retype-password"
                              required
                          ></b-form-input>
                          <div v-if="!passwordsMatch" class="text-danger">
                            Password tidak sama.
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col md="12 mt-4">
                        <b-form-group>
                          <b-button type="submit" class="w-100" variant="primary" :disabled="isOnSubmit || !passwordsMatch">
                            <span v-if="!isOnSubmit">
                              Simpan Data
                            </span>
                            <span v-if="isOnSubmit">
                              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                              Memproses Data...
                            </span>
                          </b-button>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-form>
                </b-collapse>
              </b-col>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="succesSubmit">
      <b-col sm="12">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.94118 10.7474V20.7444C5.94118 21.0758 5.81103 21.3936 5.57937 21.628C5.3477 21.8623 5.0335 21.994 4.70588 21.994H2.23529C1.90767 21.994 1.59347 21.8623 1.36181 21.628C1.13015 21.3936 1 21.0758 1 20.7444V11.997C1 11.6656 1.13015 11.3477 1.36181 11.1134C1.59347 10.879 1.90767 10.7474 2.23529 10.7474H5.94118ZM5.94118 10.7474C7.25166 10.7474 8.50847 10.2207 9.43512 9.28334C10.3618 8.34594 10.8824 7.07456 10.8824 5.74887V4.49925C10.8824 3.83641 11.1426 3.20071 11.606 2.73201C12.0693 2.26331 12.6977 2 13.3529 2C14.0082 2 14.6366 2.26331 15.0999 2.73201C15.5632 3.20071 15.8235 3.83641 15.8235 4.49925V10.7474H19.5294C20.1847 10.7474 20.8131 11.0107 21.2764 11.4794C21.7397 11.9481 22 12.5838 22 13.2466L20.7647 19.4947C20.5871 20.2613 20.25 20.9196 19.8045 21.3704C19.3589 21.8211 18.8288 22.04 18.2941 21.994H9.64706C8.6642 21.994 7.72159 21.599 7.0266 20.896C6.33162 20.1929 5.94118 19.2394 5.94118 18.2451" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <strong> Berhasil!</strong> data berhasil di simpan
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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
                    <th>NAMA</th>
                    <th>EMAIL</th>
                    <th>REGENCY</th>
                    <th>ROLE</th>
                    <th>NETWORK</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(result, index) in resultSearch" :key="index">
                    <tr>
                      <td>{{ (resultPagination.currentPage - 1) * resultLimit + index + 1 }}.</td>
                      <td>{{ result.full_name }}</td>
                      <td>{{ result.email }}</td>
                      <td>{{ result.regency }}</td>
                      <td>{{ result.role }}</td>
                      <td>
                        <template class="d-flex flex-wrap">
                          <span class="mx-1" v-for="(item, itemIndex) in result.user_network" :key="itemIndex">
                            <span :class="`badge bg-success rounded-pill`">{{ item }}</span>
                          </span>
                        </template>
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
        addCollapse: false,
        isOnSubmit: false,
        succesSubmit: false,
        isAdmin: false,
        isOnFetch: false,
        selectedKabupaten: null,
        selectedJaringan: null,
        selectedRole: null,
        inputFullName: null,
        inputEmail: null,
        inputPassword: null,
        inputPasswordConfirm: null,
        inputName: null,
        kabupatenOptions: [],
        tpsOptions: [],
        resultSearch: [],
        resultTotal: null,
        resultMode: true,
        resultPagination: {
          currentLimit: null,
          currentOffset: null,
          currentPage: 1,
        },
        submitSearchFalse: false,
        resultLimit: 10,
        resultOffset: 0,
        jaringanOptions2: [],
        roleOptions: ['admin', 'superadmin'],
      }
    },
    mounted() {
      this.fetchKabupatenOptions();
      this.cariData(false);
    },
    watch: {
        selectedKabupaten: 'fetchJaringanOptions',
    },
    computed: {
      passwordsMatch() {
        const match = this.inputPassword === this.inputPasswordConfirm;
        console.log('Passwords match:', match);
        return match;
      }
    },
    methods: {
      fetchData(){
        if(this.isAdmin) {
          this.fetchJaringanOptions();
        }
        this.cariData(false, this.resultOffset);``
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
  
        if (!showAll && this.inputName) {
          queryParam += `search=${this.inputName}&`;
        }

        queryParam += `limit=${limit}&`;
        queryParam += `offset=${offset}`;
  
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/user/list${queryParam ?? ''}`, withHeader);
  
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
      async handleSubmit() {
        this.isOnSubmit = true;
        
        try {
          const body = {
            role: this.selectedRole,
            regency: this.selectedKabupaten,
            full_name: this.inputFullName,
            email: this.inputEmail,
            password: this.inputPassword,
            jaringan: this.selectedJaringan.map(item => item.value),
          }
  
          const response = await axios.post(`${process.env.VUE_APP_BACKEND_API}/api/v1/user/store`, body, withHeader);
          
          if(response.data.meta.code == 200) {
            this.succesSubmit = true;
            this.resetAddManual();
            this.cariData(false);
  
            setTimeout(() => {
              this.succesSubmit = false;
            }, 10000);
          }
        } catch (error) {
          console.log('error cant store data: ', error);
        }

        this.resetAddManual();
  
        setTimeout(() => {
          this.isOnSubmit = false;
        }, 500);
      },
      resetAddManual() {
        this.selectedRole = null;
        this.selectedKabupaten = null;
        this.inputFullName = null;
        this.inputEmail = null;
        this.inputPassword = null;
        this.selectedJaringan = null;
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
    