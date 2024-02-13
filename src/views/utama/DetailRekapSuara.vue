	<template>
		<b-row>
			<b-col sm="12">
				<b-card no-body class="card">
					<div class="card-header d-flex justify-content-between flex-wrap align-items-center">
						<div class="header-title">
							<h4 class="card-title mb-0">Detail Rekap Suara</h4>
						</div>
					</div>
					<b-card-body>
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
							</b-row>
						</b-form>
						<b-col sm="12" class="col-12 d-flex justify-content-center">
							<span v-if="isOnFetch">
									<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
									Memuat...
							</span>
						</b-col>	
						<hr class="hr-horizontal"/>
						<b-row>
							<b-col sm="6" class="d-flex align-items-start">
									<img @click="showLightBox(imageFile, 0)" class="w-100 border rounded-2 mt-2 zoom-on-hover" :src="imageFile ?? 'https://semantic-ui.com/images/wireframe/white-image.png'">
							</b-col>
							<b-col sm="6">
								<b-form @submit="handleSubmit()">
									<b-row>
										<b-col sm="12" v-for="item in inputCaleg" :key="item">
											<b-form-group>
												<label for="input-kabupaten" class="form-label">{{ `${item.nama}${item.required ? '*' : ''}` }}</label>
												<b-form-input type="number" class="form-control-sm height-select2" v-model="item.count" placeholder="Masukan Jumlah Suara" :required="item.required"></b-form-input>
											</b-form-group>
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
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
		<vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
	</template>
	<script scoped>
	import axios from 'axios';
	import VueEasyLightbox from 'vue-easy-lightbox'

	let withHeader = {
		headers: { 
			'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
		}
	}

	export default {
		component: {
			VueEasyLightbox,
		},
		data() {
			return {
				visibleRef: false,
        indexRef: 0,
        imgsRef: [],
				isOnFetch: false,
				isEditMode: false,
				isOnSubmit: false,
				isAdmin: false,
				selectedKabupaten: null,
				selectedKecamatan: null,
				selectedKelurahan: null,
				selectedTps: null,
				kabupatenOptions: [],
				kecamatanOptions: [],
				kelurahanOptions: [],
				tpsOptions: [],
				detailData: [],
				imageFile: null,
				isAlert: false,
				alertData: {
					type: null,
					icon: null,
					text: null,
				},
				inputCaleg: [
					{
						nama: 'Diah Pitaloka',
						required: false,
						count: 0,
					},
					{
						nama: 'Arief Rachman',
						required: false,
						count: 0,
					},
					{
						nama: 'Mohammad Nuruzzaman',
						required: true,
						count: 0,
					},
					{
						nama: 'Yulistian Imam Taryudi',
						required: false,
						count: 0,
					},
					{
						nama: 'Andri Saleh Amarald',
						required: false,
						count: 0,
					},
					{
						nama: 'Isnur Yuhesti',
						required: false,
						count: 0,
					},
					{
						nama: 'Husdi Karyono',
						required: false,
						count: 0,
					},
					{
						nama: 'Muhamad Adbdul Azis',
						required: false,
						count: 0,
					},
					{
						nama: 'Kintan Kusuma',
						required: false,
						count: 0,
					},
				]
			}
		},
		mounted() {
			this.checkEdit();
			this.fetchKabupatenOptions();
		},
		watch: {
			selectedKabupaten: function () {
				this.fetchKecamatanOptions();
			},
			selectedKecamatan: 'fetchKelurahanOptions',
			selectedKelurahan: 'fetchTpsOptions',
		},
		methods: {
			showLightBox(image, index) {
        this.imgsRef = [];
        this.visibleRef = true;
				this.imgsRef.push(image);
        this.indexRef = index;
      },
      onHide() {
        this.visibleRef = false;
      },
			resetInput() {
        this.selectedKabupaten = null;
        this.selectedKecamatan = null;
        this.selectedKelurahan = null;
        this.selectedTps = null;
				this.inputCaleg = [
					{
						nama: 'Diah Pitaloka',
						required: false,
						count: 0,
					},
					{
						nama: 'Arief Rachman',
						required: false,
						count: 0,
					},
					{
						nama: 'Mohammad Nuruzzaman',
						required: true,
						count: 0,
					},
					{
						nama: 'Yulistian Imam Taryudi',
						required: false,
						count: 0,
					},
					{
						nama: 'Andri Saleh Amarald',
						required: false,
						count: 0,
					},
					{
						nama: 'Isnur Yuhesti',
						required: false,
						count: 0,
					},
					{
						nama: 'Husdi Karyono',
						required: false,
						count: 0,
					},
					{
						nama: 'Muhamad Adbdul Azis',
						required: false,
						count: 0,
					},
					{
						nama: 'Kintan Kusuma',
						required: false,
						count: 0,
					},
				];
        
        if(!this.isAdmin) {
          this.adminCity();
        }
      },
			async handleSubmit() {
				this.isOnSubmit = true;
				const param = this.$route.params;
				const id = param.id;
				const body = {
					nama_kabupaten: this.selectedKabupaten,
					nama_kelurahan: this.selectedKelurahan,
					nama_kecamatan: this.selectedKecamatan,
					tps: this.selectedTps,
					diah_pitaloka: parseInt(this.inputCaleg[0].count),
					arief_rachman: parseInt(this.inputCaleg[1].count),
					mohammad_nuruzzaman: parseInt(this.inputCaleg[2].count),
					yulistian_imam_taryudi: parseInt(this.inputCaleg[3].count),
					andri_saleh_amarald: parseInt(this.inputCaleg[4].count),
					isnur_yuhesti: parseInt(this.inputCaleg[5].count),
					husdi_karyono: parseInt(this.inputCaleg[6].count),
					muhamad_adbdul_azis: parseInt(this.inputCaleg[7].count),
					kintan_kusuma: parseInt(this.inputCaleg[8].count),
				};
				
				try {
          const response = await axios.put(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-caleg-recap/update/${id}`, body, withHeader);
          if(response.data.meta.code == 200) {
            this.isAlert = true;
            if(this.isEditMode) {
              this.alertData = {
                type: 'success',
                icon: 'success',
                text: 'Berhasil meyimpan data rekap suara!'
              };
              
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
              
              this.fetchDetail(this.$route.params.id);
            } else {
              this.alertData = {
                type: 'success',
                icon: 'success',
                text: 'Berhasil menambahkan data rekap suara!'
              };

              this.resetInput();
            }
          }        
        } catch (error) {
          console.error('Error menambahkan data:', error);
          this.isAlert = true;
          this.alertData = {
            type: 'Gagal',
            icon: 'error',
            text: 'Gagal menambahkan data rekap suara, data duplikat!'
          };
        }

				setTimeout(() => {
          this.isAlert = false;
        }, 4000);
        this.isOnSubmit = false;
			},
			checkEdit(){
        let param = this.$route.params;
        
        if(param.id) {
          this.fetchDetail(param.id, false);
          this.isEditMode = true;
        }
      },
			async fetchDetail(id) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/voter-caleg-recap/detail/${id}`, withHeader);
          if(response.data.meta.code == 200) {
            const data = response.data.data;
						this.setDetail(data); 
          }        
        } catch (error) {
          console.error('Error fetching detail data:', error);
        }
      },
      async setDetail(data) {
				this.imageFile = data.image_path;

        this.selectedKabupaten = data.nama_kabupaten;
        await this.fetchKecamatanOptions();
        this.selectedKecamatan = data.nama_kecamatan;
        await this.fetchKelurahanOptions();
        this.selectedKelurahan = data.nama_kelurahan;
        await this.fetchTpsOptions();
        this.selectedTps = data.tps;

				this.inputCaleg = [
					{
						nama: 'Diah Pitaloka',
						required: false,
						count: data.diah_pitaloka,
					},
					{
						nama: 'Arief Rachman',
						required: false,
						count: data.arief_rachman,
					},
					{
						nama: 'Mohammad Nuruzzaman',
						required: true,
						count: data.mohammad_nuruzzaman,
					},
					{
						nama: 'Yulistian Imam Taryudi',
						required: false,
						count: data.yulistian_imam_taryudi,
					},
					{
						nama: 'Andri Saleh Amarald',
						required: false,
						count: data.andri_saleh_amarald,
					},
					{
						nama: 'Isnur Yuhesti',
						required: false,
						count: data.isnur_yuhesti,
					},
					{
						nama: 'Husdi Karyono',
						required: false,
						count: data.husdi_karyono,
					},
					{
						nama: 'Muhamad Adbdul Azis',
						required: false,
						count: data.muhamad_adbdul_azis,
					},
					{
						nama: 'Kintan Kusuma',
						required: false,
						count: data.kintan_kusuma,
					},
				];
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
		height: 230px;
		object-fit: cover;
		width: 100%;
	}

	.zoom-on-hover {
		transition: transform 0.3s ease-in-out;
	}

	.zoom-on-hover:hover {
		transform: scale(1.05);
	}
	</style>
		