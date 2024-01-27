<template>
    <b-row>
      <b-col sm="12">
        <b-card no-body class="card">
          <div class="card-header d-flex justify-content-between flex-wrap align-items-center">
            <div class="header-title">
              <h4 class="card-title mb-0">Tambah Rekap Pemilih</h4>
            </div>
          </div>
          <b-card-body>
            <b-form>
              <b-row>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kabupaten" class="form-label">Kota/Kabupaten*</label>
                    <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="isEditMode || !isAdmin"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kecamatan" class="form-label">Kecamatan*</label>
                    <v-select v-model="selectedKecamatan" placeholder="Pilih Kecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="isEditMode || !selectedKabupaten"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-kelurahan" class="form-label">Kelurahan*</label>
                    <v-select v-model="selectedKelurahan" placeholder="Pilih Kelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="isEditMode || !selectedKecamatan"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-tps" class="form-label">TPS*</label>
                    <v-select taggable v-model="selectedTps" placeholder="Pilih TPS" :options="tpsOptions" id="input-tps" :disabled="isEditMode || !selectedKelurahan"></v-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <label for="input-target-suara" class="form-label">Target Suara*</label>
                    <b-form-input type="number" class="form-control-sm height-select2" v-model="inputTargetSuara" placeholder="Masukan Target" id="input-target-suara" :disabled="!selectedTps"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
            <b-col sm="12" class="col-12 d-flex justify-content-center">
              <span v-if="isOnFetch">
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Memuat...
              </span>
            </b-col>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="isAlertInput">
      <b-col sm="12">
        <div  :class="`alert alert-${alertDataInput.type} alert-dismissible fade show`" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </symbol>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>

          <svg class="bi flex-shrink-0 me-2" width="24" height="24">
            <use xlink:href="#exclamation-triangle-fill" v-if="alertDataInput.icon == 'warning'"/>
            <use xlink:href="#info-fill" v-if="alertDataInput.icon == 'info'" />
            <use xlink:href="#check-circle-fill" v-if="alertDataInput.icon == 'success'"/>
          </svg>
          {{ alertDataInput.text }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="isAlert">
      <b-col sm="12">
        <div  :class="`alert alert-${alertData.type} alert-dismissible fade show`" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </symbol>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>

          <svg class="bi flex-shrink-0 me-2" width="24" height="24">
            <use xlink:href="#exclamation-triangle-fill" v-if="alertData.icon == 'warning'"/>
            <use xlink:href="#info-fill" v-if="alertData.icon == 'info'" />
            <use xlink:href="#check-circle-fill" v-if="alertData.icon == 'success'"/>
          </svg>
          {{ alertData.text }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="inputItems.length != 0">
      <b-col sm="12">
        <b-card no-body class="card">
          <b-card-body>
            <b-form @submit="handleSubmit">
              <b-row v-for="(item, index) in inputItems" :key="index" class="border p-3 py-4 rounded-2 mb-0 m-1 mt-3">
                <b-col sm="6">
                  <b-form-group>
                    <label :for="`input-name-${index}`" class="form-label">Jaringan*</label>
                    <b-form-input
                      :id="`input-name-${index}`"
                      class="form-control-sm height-select2"
                      v-model="item.jaringan"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group>
                    <label :for="`input-suara-${index}`" class="form-label">Suara</label>
                    <b-form-input
                      :id="`input-suara-${index}`"
                      type="number"
                      class="form-control-sm height-select2"
                      v-model="item.suara"
                      placeholder="Masukan Jumlah Suara"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <hr class="hr-horizontal"/>
                <b-col sm="12" class="d-flex justify-content-end">
                  <b-col sm="2" class="d-flex justify-content-end">
                    <b-button @click="addUpload(index)" variant="primary" size="sm" class="my-3">+ File</b-button>
                  </b-col>
                </b-col>
                <b-col sm="12" v-for="(file, fileIndex) in item.image_uploads" :key="`file-${index}-${fileIndex}`">
                  <b-form-group>
                    <b-col sm="12" class="d-flex justify-content-between align-items-center">
                      <label :for="`input-gambar-${index}-${fileIndex}`" class="form-label">Upload Gambar {{ fileIndex + 1 }}</label>
                      <a href="#" @click.prevent="removeUpload(index, fileIndex)" class="pe-auto" v-if="fileIndex != 0 || isEditMode">
                        <svg width="26" viewBox="-10 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.67 1.99927H16.34C19.73 1.99927 22 4.37927 22 7.91927V16.0903C22 19.6203 19.73 21.9993 16.34 21.9993H7.67C4.28 21.9993 2 19.6203 2 16.0903V7.91927C2 4.37927 4.28 1.99927 7.67 1.99927ZM15.01 14.9993C15.35 14.6603 15.35 14.1103 15.01 13.7703L13.23 11.9903L15.01 10.2093C15.35 9.87027 15.35 9.31027 15.01 8.97027C14.67 8.62927 14.12 8.62927 13.77 8.97027L12 10.7493L10.22 8.97027C9.87 8.62927 9.32 8.62927 8.98 8.97027C8.64 9.31027 8.64 9.87027 8.98 10.2093L10.76 11.9903L8.98 13.7603C8.64 14.1103 8.64 14.6603 8.98 14.9993C9.15 15.1693 9.38 15.2603 9.6 15.2603C9.83 15.2603 10.05 15.1693 10.22 14.9993L12 13.2303L13.78 14.9993C13.95 15.1803 14.17 15.2603 14.39 15.2603C14.62 15.2603 14.84 15.1693 15.01 14.9993Z" fill="currentColor"></path>
                        </svg>
                      </a>
                    </b-col>
                    <input
                      type="file"
                      :id="`input-gambar-${index}-${fileIndex}`"
                      @change="event => handleAdditionalFileChange(event, index, fileIndex)"
                      class="mt-3 form-control form-control-sm height-select2"
                      :required="(fileIndex == 0 && item.suara != 0 && isEditMode != true)"
                      :class="inputItems[index].image_uploads[fileIndex].file == null ? 'is-invalid' : 'is-valid'"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="12">
                  <b-row class="m-0">
                    <b-col sm="3" v-for="(preview, previewIndex) in item.image_previews" :key="previewIndex" class="d-flex flex-column align-items-center">
                      <img :src="preview.image" :alt="getFilenameAndExtension(preview.image, 'filename')" class="preview-image rounded-2 mt-3 border">
                      {{ getFilenameAndExtension(preview.image, 'filename') }}
                      <template class="my-2 d-flex justify-content-center">
                        <b-button @click="handleDownloadImage(preview.image)" variant="outline-info" size="sm" class="mx-1 rounded-2">
                          <svg width="26" viewBox="-5 -3 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2301 7.29052V3.2815C11.2301 2.85523 11.5701 2.5 12.0001 2.5C12.3851 2.5 12.7113 2.79849 12.763 3.17658L12.7701 3.2815V7.29052L17.55 7.29083C19.93 7.29083 21.8853 9.23978 21.9951 11.6704L22 11.8861V16.9254C22 19.373 20.1127 21.3822 17.768 21.495L17.56 21.5H6.44C4.06 21.5 2.11409 19.5608 2.00484 17.1213L2 16.9047L2 11.8758C2 9.4281 3.87791 7.40921 6.22199 7.29585L6.43 7.29083H11.23V13.6932L9.63 12.041C9.33 11.7312 8.84 11.7312 8.54 12.041C8.39 12.1959 8.32 12.4024 8.32 12.6089C8.32 12.7659 8.3648 12.9295 8.45952 13.0679L8.54 13.1666L11.45 16.1819C11.59 16.3368 11.79 16.4194 12 16.4194C12.1667 16.4194 12.3333 16.362 12.4653 16.2533L12.54 16.1819L15.45 13.1666C15.75 12.8568 15.75 12.3508 15.45 12.041C15.1773 11.7594 14.7475 11.7338 14.4462 11.9642L14.36 12.041L12.77 13.6932V7.29083L11.2301 7.29052Z" fill="currentColor"></path>
                          </svg>
                        </b-button>
                        <b-button @click="handleDeleteImage(index, previewIndex)" variant="outline-danger" size="sm" class="mx-1 rounded-2">
                          <svg width="26" viewBox="-5 -3 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="currentColor"></path>
                          </svg>
                        </b-button>
                      </template>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="m-1 mt-3">
                <b-col sm="12" class="p-0 mb-0">
                    <b-form-group>
                      <b-button type="submit" class="w-100 rounded-2" variant="primary" :disabled="!selectedKabupaten || !selectedKecamatan || !selectedKelurahan || !selectedTps || isOnSubmit">
                        <span v-if="!isOnSubmit">
                          {{ isEditMode == true ? 'Simpan Perubahan' : 'Submit' }}
                        </span>
                        <span v-if="isOnSubmit">
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          Menyimpan Data...
                        </span>
                      </b-button>
                    </b-form-group>
                  </b-col>
              </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </template>
  <script scoped>
  import axios from 'axios';

  let withHeader = {
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  }

  export default {
    data() {
      return {
        isEditMode: false,
        isOnFetch: false,
        isOnSubmit: false,
        isAdmin: false,
        selectedKabupaten: null,
        selectedKecamatan: null,
        selectedKelurahan: null,
        selectedTps: null,
        inputTargetSuara: null,
        inputItems: [],
        kabupatenOptions: [],
        kecamatanOptions: [],
        kelurahanOptions: [],
        tpsOptions: [],
        isAlert: false,
        isAlertInput: false,
        alertData: {
          type: null,
          icon: null,
          text: null,
        },
        alertDataInput: {
          type: null,
          icon: null,
          text: null,
        }
      }
    },
    mounted() {
      this.checkEdit();
      this.fetchKabupatenOptions();
      this.checkInputKabupaten();
    },
    watch: {
      selectedKabupaten: function () {
        this.fetchKecamatanOptions();
        this.checkInputKabupaten();
      },
      selectedKecamatan: 'fetchKelurahanOptions',
      selectedKelurahan: 'fetchTpsOptions',
    },
    methods: {
      handleDownloadImage(imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        link.download = filename;
        link.click();
      },
      handleDeleteImage(index,previewIndex) {
        let id = this.inputItems[index].image_previews[previewIndex].id;

        this.$swal({
          title: "Konfirmasi Hapus!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Batal",
          confirmButtonText: "Ya, Hapus!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              axios.delete(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/delete/image/${id}`, withHeader);
              this.inputItems[index].image_previews.splice(previewIndex, 1);
            } catch (error) {
              this.$swal({
                title: "Error!",
                text: error.message,
                icon: "error"
              });

              console.log('error cant delete image: ', error);
            }
          }
        });
      },
      getFilenameAndExtension(url, type) {
        const pathSegments = url.split('/');
        const filenameWithExtension = pathSegments[pathSegments.length - 1];
        const lastDotIndex = filenameWithExtension.lastIndexOf('.');

        if (lastDotIndex === -1) {
          return {
            filename: filenameWithExtension,
            extension: '',
          };
        }

        const filename = filenameWithExtension.substring(0, lastDotIndex);
        const extension = filenameWithExtension.substring(lastDotIndex + 1);

        if(type == 'filename') {
          return filename;
        } else {
          return extension;
        }
      },
      checkEdit(){
        let param = this.$route.params;
        
        if(param.id) {
          this.fetchDetail(param.id, false);
          this.isEditMode = true;
        }
      },
      async fetchDetail(id, refresh) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/detail/${id}`, withHeader);
          if(response.data.meta.code == 200) {
            const data = response.data.data;
            if(refresh == true) {
              this.inputTargetSuara = data.target_pemilih;
              this.inputItems = data.jaringan.map(item => {
                return {
                  jaringan: item.Network,
                  suara: item.count,
                  image_uploads: [],
                  image_previews: item.images
                }
              });
            } else {
              this.setDetail(data); 
            }
          }        
        } catch (error) {
          console.error('Error fetching detail data:', error);
        }
      },
      async setDetail(data) {
        this.selectedKabupaten = data.nama_kabupaten;
        await this.fetchKecamatanOptions();
        this.selectedKecamatan = data.nama_kecamatan;
        await this.fetchKelurahanOptions();
        this.selectedKelurahan = data.nama_kelurahan;
        await this.fetchTpsOptions();
        this.selectedTps = data.tps;

        this.inputTargetSuara = data.target_pemilih;
        this.inputItems = data.jaringan.map(item => {
          return {
            jaringan: item.Network,
            suara: item.count,
            image_uploads: [],
            image_previews: item.images
          }
        });
      },
      checkInputKabupaten() {
        if(!this.selectedKabupaten){
          this.isAlertInput = true;
          this.alertDataInput = {
            type: 'info',
            icon: 'info',
            text: 'input kabupaten terlebih dahulu untuk memunculkan form jaringan!'
          };        
        } else {
          this.isAlertInput = false;
        }
      },
      removeUpload(index, fileIndex) {
        if (this.inputItems[index] && this.inputItems[index].image_uploads[fileIndex]) {
          this.inputItems[index].image_uploads.splice(fileIndex, 1);
        }
      },
      addUpload(index) {
        if (!this.inputItems[index]) {
          this.$set(this.inputItems, index, { jaringan: '', suara: '', image_uploads: [] });
        }
        this.inputItems[index].image_uploads.push({ file: null });
      },
      handleAdditionalFileChange(event, index, fileIndex) {
        const selectedFile = event.target.files[0];
        this.inputItems[index].image_uploads[fileIndex].file = selectedFile;
      },
      resetInput() {
        this.selectedKabupaten = null;
        this.selectedKecamatan = null;
        this.selectedKelurahan = null;
        this.selectedTps = null;
        this.inputTargetSuara = null;
        this.inputItems = [];
        if(!this.isAdmin) {
          this.adminCity();
        }
      },
      async handleSubmit() {
        this.isOnSubmit = true;
        const formData = new FormData();
        formData.append('nama_kabupaten', this.selectedKabupaten);
        formData.append('nama_kecamatan', this.selectedKecamatan);
        formData.append('nama_kelurahan', this.selectedKelurahan);
        formData.append('tps', this.selectedTps);
        formData.append('target_suara', this.inputTargetSuara);

        this.inputItems.forEach((item, index) => {
          formData.append(`items[${index}][jaringan]`, item.jaringan);
          formData.append(`items[${index}][total_suara]`, item.suara);
          item.image_uploads.forEach((fileData, fileIndex) => {
            formData.append(`items[${index}][image_uploads][${fileIndex}]`, fileData.file);
          });
        });

        let urlBuilder = null;

        try {
          if(this.isEditMode) {
            let param = this.$route.params;
            urlBuilder = `${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/update/${param.id}`;
          } else {
            urlBuilder = `${process.env.VUE_APP_BACKEND_API}/api/v1/voter-recap/store`;
          }

          const response = await axios.post(urlBuilder, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
          });

          if(response.data.meta.code == 200) {
            this.isAlert = true;
            if(this.isEditMode) {
              this.alertData = {
                type: 'success',
                icon: 'success',
                text: 'Berhasil meyimpan data rekap pemilih!'
              };
              
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              
              this.fetchDetail(this.$route.params.id, true);
            } else {
              this.alertData = {
                type: 'success',
                icon: 'success',
                text: 'Berhasil menambahkan data rekap pemilih!'
              };

              this.resetInput();
            }
          }
        } catch (error) {
          this.isAlert = true;
          this.alertData = {
            type: 'danger',
            icon: 'warning',
            text: `Gagal memproses data rekap pemilih! (${error.response.data.meta.message})`
          }
          console.error('Error processing data:', error);
        }

        setTimeout(() => {
          this.isAlert = false;
        }, 4000);
        this.isOnSubmit = false;
      }, 
      async fetchKabupatenOptions() {
        this.isOnFetch = true;
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/city/list`, withHeader);
          if(response.data.meta.code == 200) {
            this.kabupatenOptions = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching Kabupaten options:', error);
        }
        this.isOnFetch = false;
        this.adminCity();
      },
      async fetchJaringanOptions() {
        this.isOnFetch = true;
        this.inputItems = [];
        if (this.selectedKabupaten) {
          try {
            const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/network/list?nama_kabupaten=${this.selectedKabupaten}`, withHeader);
            if(response.data.meta.code == 200) {
              const data = response.data.data;
              this.inputItems = data.map(item => {
                return {
                  jaringan: item,
                  suara: 0,
                  image_uploads: [
                    {
                      file: null
                    }
                  ],
                }
              });
            }        
          } catch (error) {
            console.error('Error fetching Jaringan options:', error);
          }
        }
        this.isOnFetch = false;
      },
      async fetchKecamatanOptions() {
        this.isOnFetch = true;
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
        }
        if(this.isAdmin) {
          this.fetchJaringanOptions();
        }
        this.isOnFetch = false;
      },
      async fetchKelurahanOptions() {
        this.isOnFetch = true;
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
        this.isOnFetch = false;
      },
      async fetchTpsOptions() {
        this.isOnFetch = true;
        this.selectedTps = null;
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
            console.error('Error fetching TPS options:', error);
          }
        }
        this.isOnFetch = false;
      },
      adminCity() {
        const userData = JSON.parse(localStorage.getItem('userData'));
  
        if(userData && userData.role === 'admin') {
          const region = userData.regency;
          const network = userData.user_network;

          this.inputItems = network.map(item => {
            return {
              jaringan: item,
              suara: 0,
              image_uploads: [
                {
                  file: null
                }
              ],
            }
          });
        
          if(this.kabupatenOptions.includes(region)) {
            this.selectedKabupaten = region;
          }
        } else {
          this.isAdmin = true;
        }
      },
    }
  }
  </script>
  
  <style scoped>
  .height-select2 {
    min-height: 34.40px !important;
  }

  .preview-image {
    min-height: 140px;
    width: 100%;
  }
  </style>
    