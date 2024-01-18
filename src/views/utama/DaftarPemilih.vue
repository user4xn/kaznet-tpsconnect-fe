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
              <b-col sm="8" :class="addCollapse == true ? 'd-none' : ''">
                <b-form-group>
                  <b-row>
                    <b-col md="6">
                      <label for="input-jaringan" class="form-label">Jaringan</label>
                      <v-select v-model="selectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2" id="input-jaringan" required :disabled="!selectedKabupaten"></v-select>
                    </b-col>
                    <b-col md="6">
                      <label for="input-name" class="form-label">Nama <i>(enter untuk memuat data)</i></label>
                      <b-form-input class="form-control-sm height-select2" v-model="inputName" placeholder="Cari Nama" id="input-name" :disabled="!selectedKabupaten || isOnFetch" @keyup.enter="cariData(false)"></b-form-input>
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
            <b-col sm="12">
              <b-collapse v-model="addCollapse" id="addManual">
                <hr class="hr-horizontal">
                <b-col sm="12" v-if="isAlertNik">
                  <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <h4 class="alert-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                      Perbedaan Data Terdeteksi!
                    </h4>
                    <hr>
                    <p>NIK <b>{{ this.nikFound.nik }}</b> berasal dari <b>{{ `${this.nikFound.nama_kabupaten}, ${this.nikFound.nama_kecamatan}, ${this.nikFound.nama_kelurahan} - TPS ${this.nikFound.tps}`}}</b></p>
                    <p class="mb-0">peringatan muncul jika terdeteksi perbedaan data, abaikan jika ada tetap ingin menambahkan data ini.</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                </b-col>
                <b-form @submit="handleAddManual">
                  <b-row>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-nik" class="form-label">NIK*</label>
                        <b-form-input type="number" class="form-control-sm height-select2" v-model="manualInputNIK" placeholder="Masukan NIK" id="input-manual-nik" @keyup="cariNik()" required :class="nikFound != null ? 'is-valid' : null" :disabled="!selectedTps"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-name" class="form-label">Nama Lengkap*</label>
                        <b-form-input class="form-control-sm height-select2" v-model="manualInputName" placeholder="Masukan Nama" id="input-manual-name" required :disabled="!manualInputNIK || !nikSearched"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-jaringan" class="form-label">Jaringan*</label>
                        <v-select v-model="manualSelectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2" id="input-manual-jaringan" required :disabled="!manualInputNIK || !nikSearched"></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-gender" class="form-label">Jenis Kelamin</label>
                        <v-select class="style-chooser" v-model="manualSelectedGender" placeholder="Pilih Jenis Kelamin" :options="genderOptions" id="input-manual-gender" :disabled="!manualInputNIK || !nikSearched"></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-usia" class="form-label">Usia</label>
                        <b-form-input type="number" class="form-control-sm height-select2" v-model="manualInputUsia" placeholder="Masukan Usia" id="input-manual-usia" :disabled="!manualInputNIK || !nikSearched"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group>
                        <label for="input-manual-phone" class="form-label">No Telp</label>
                        <b-form-input type="number" class="form-control-sm height-select2" v-model="manualInputTelp" placeholder="Masukan No Telepon" id="input-manual-phone" :disabled="!manualInputNIK || !nikSearched"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="12">
                      <b-form-group>
                        <label for="input-manual-address" class="form-label">Alamat</label>
                        <b-form-textarea class="form-control-sm height-select2" v-model="manualInputAddress" placeholder="Masukan Alamat" id="input-manual-address" rows="3" max-rows="6" :disabled="!manualInputNIK || !nikSearched"></b-form-textarea>
                        <i>*data akan terisi otomatis jika NIK terdeteksi dalam database</i>
                      </b-form-group>
                    </b-col>
                    <b-col md="12 mt-4">
                      <b-form-group>
                        <b-button type="submit" class="w-100" variant="primary" :disabled="!manualSelectedJaringan || !selectedKabupaten || !selectedKecamatan || !selectedKelurahan || !selectedTps || isOnSubmit">
                          <span v-if="!isOnSubmit">
                            Tambahkan Ke Pemilih
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
        <strong> Berhasil!</strong> data berhasil di tambahkan
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
              <b-col sm="6" class="d-flex align-items-center">
                <p class="text-muted mb-0">Tampil {{ `${(resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit) + 1} - ${((resultPagination.currentPage * (resultPagination.currentLimit ?? resultLimit)) - (resultPagination.currentLimit ?? resultLimit)) + this.resultSearch.length} dari ${resultTotal.toLocaleString()}` }} data...</p>
              </b-col>
              <b-col sm="6" class="text-end">
                <b-button variant="success" @click="handleExport()" :disabled="isOnExport" size="sm">
                  {{ isOnExport ? 'Mengekspor..' : 'Export XLS' }}
                </b-button>
                <b-button :variant="resultManual == '1' ? 'warning' : 'outline-warning'" class="ms-1" @click="setCariDataManual('1')" size="sm">
                  Ditambahkan Manual
                </b-button>
                <b-button :variant="resultManual == '0' ? 'info' : 'outline-info'" class="ms-1" @click="setCariDataManual('0')" size="sm">
                  Dari Data DPT
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
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>KAB</th>
                  <th>KEC</th>
                  <th>KEL</th>
                  <th>TPS</th>
                  <th>JK</th>
                  <th>Usia</th>
                  <th>Telp</th>
                  <th>Jaringan</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(result, index) in resultSearch" :key="index">
                  <tr>
                    <td>{{ (resultPagination.currentPage - 1) * resultLimit + index + 1 }}.</td>
                    <td>{{ result.nama }}</td>
                    <td>{{ result.nik }}</td>
                    <td>{{ result.nama_kabupaten }}</td>
                    <td>{{ result.nama_kecamatan }}</td>
                    <td>{{ result.nama_kelurahan }}</td>
                    <td>{{ result.tps }}</td>
                    <td>{{ result.jenis_kelamin }}</td>
                    <td>{{ result.usia }}</td>
                    <td>{{ result.telp }}</td>
                    <td>{{ result.jaringan }}</td>
                    <td class="d-flex justify-content-center">
                      <button class="btn btn-info btn-sm" v-b-modal.modalEdit @click="enableEdit(index)">Ubah</button>
                      <button class="btn btn-danger btn-sm ms-2" @click="handleDelete(index)">Hapus</button>
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
  <b-modal id="modalEdit" hide-backdrop hide-footer centered size="lg" title="Ubah Data Pemilih">
    <b-form @submit="handleEdit">
      <b-row>
        <b-col md="3">
          <b-form-group>
            <label class="form-label">Kab*</label>
            <b-form-input v-model="editInputKab" class="form-control-sm height-select2" disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label class="form-label">Kec*</label>
            <b-form-input v-model="editInputKec" class="form-control-sm height-select2" disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label class="form-label">Kel*</label>
            <b-form-input v-model="editInputKel" class="form-control-sm height-select2" disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label class="form-label">TPS*</label>
            <v-select taggable v-model="editInputTps" placeholder="Pilih TPS" :options="tpsOptionsEdit"></v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="form-label">NIK*</label>
            <b-form-input type="number" v-model="editInputNIK" class="form-control-sm height-select2" disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="input-manual-name" class="form-label">Nama Lengkap*</label>
            <b-form-input class="form-control-sm height-select2" v-model="editInputName" placeholder="Masukan Nama" id="input-manual-name" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="input-manual-jaringan" class="form-label">Jaringan*</label>
            <v-select v-model="editSelectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2Edit" id="input-manual-jaringan" required></v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="input-manual-gender" class="form-label">Jenis Kelamin</label>
            <v-select class="style-chooser" v-model="editSelectedGender" placeholder="Pilih Jenis Kelamin" :options="genderOptions" id="input-manual-gender"></v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="input-manual-usia" class="form-label">Usia</label>
            <b-form-input type="number" class="form-control-sm height-select2" v-model="editInputUsia" placeholder="Masukan Usia" id="input-manual-usia"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label for="input-manual-phone" class="form-label">No Telp</label>
            <b-form-input type="number" class="form-control-sm height-select2" v-model="editInputTelp" placeholder="Masukan No Telepon" id="input-manual-phone"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group>
            <label for="input-manual-address" class="form-label">Alamat</label>
            <b-form-textarea class="form-control-sm height-select2" v-model="editInputAddress" placeholder="Masukan Alamat" id="input-manual-address" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col md="12 mt-4">
          <b-form-group>
            <b-button type="submit" class="w-100" data-bs-dismiss="modal" variant="primary" :disabled="!editSelectedJaringan || isOnSubmit">
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
  </b-modal>
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
      nikSearched: false,
      nikFound: null,
      addCollapse: false,
      isAlertNik: false,
      isOnSubmit: false,
      succesSubmit: false,
      isAdmin: false,
      isOnFetch: false,
      isOnFetchExport: false,
      selectedKabupaten: null,
      selectedKecamatan: null,
      selectedKelurahan: null,
      selectedTps: null,
      selectedJaringan: null,
      inputName: null,
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
      tpsOptions: [],
      tpsOptionsEdit: [],
      resultSearch: [],
      resultTotal: null,
      resultMode: true,
      resultManual: null,
      resultPagination: {
        currentLimit: null,
        currentOffset: null,
        currentPage: 1,
      },
      submitSearchFalse: false,
      openIndex: -1,
      resultLimit: 10,
      resultOffset: 0,
      manualInputName: null,
      manualInputNIK: null,
      manualInputTelp: null,
      manualInputUsia: null,
      manualInputAddress: null,
      manualSelectedGender: null,
      manualSelectedJaringan: null,
      editInputID: null,
      editInputKab: null,
      editInputKec: null,
      editInputKel: null,
      editInputTps: null,
      editInputName: null,
      editInputNIK: null,
      editInputTelp: null,
      editInputUsia: null,
      editInputAddress: null,
      editSelectedGender: null,
      editSelectedJaringan: null,
      genderOptions: [
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' },
      ],
      jaringanOptions2: [],
      jaringanOptions2Edit: [],
      isOnExport: false,
    }
  },
  watch: {
    selectedKabupaten: 'fetchKecamatanOptions',
    selectedKecamatan: 'fetchKelurahanOptions',
    selectedKelurahan: 'fetchTpsOptions',
    selectedJaringan: 'cariData',
    selectedTps: 'resetSelected',
    addCollapse: 'watchAddManual',
    editInputKab: function() {
      if(this.isAdmin) {
        this.fetchJaringanOptionsEdit();
      }
    }
  },
  mounted() {
    this.fetchKabupatenOptions();
    this.cariData(false);
  },
  methods: {
    setCariDataManual(param) {
      if(this.resultManual === param) {
        this.resultManual = null;
      } else {
        this.resultManual = param;
      }

      this.cariData(false, this.resultOffset);
    },
    handleExport: debounce(async function () {
      this.isOnExport = true;

      var queryParam = '?';
      let filename = 'DaftarPemilih';
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

      if (this.selectedJaringan) {
        queryParam += `jaringan=${this.selectedJaringan.value}&`;
        filename += `-${this.selectedJaringan.value}`;
      }

      if (this.inputName) {
        queryParam += `nama=${this.inputName}&`;
        filename += `-${this.inputName}%`;
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      filename += `-${timestamp}`;
      
      await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/export${queryParam ?? ''}`, {
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
    watchAddManual(){
      this.manualInputNIK = null;
      this.resetAddManual();
    },
    enableEdit(index) {
      const data = this.resultSearch[index];
      this.fetchTpsOptionsEdit(data.nama_kabupaten, data.nama_kecamatan, data.nama_kelurahan);
      this.editInputID = data.id;
      this.editInputKab = data.nama_kabupaten;
      this.editInputKec = data.nama_kecamatan;
      this.editInputKel = data.nama_kelurahan;
      this.editInputTps = data.tps;
      this.editInputName = data.nama;
      this.editInputNIK = data.nik;
      this.editInputTelp = data.telp;
      this.editInputUsia = data.usia;
      this.editInputAddress = data.alamat;
      this.editSelectedGender = { value: data.jenis_kelamin, label: data.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan' };
      this.editSelectedJaringan = { value: data.jaringan, label: data.jaringan };
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
            const response = await axios.delete(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/delete/${id}`, withHeader);
            
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
    async handleEdit() {
      if (!this.editSelectedJaringan) {
        return
      }

      this.isOnSubmit = true;
      
      try {
        const body = {
          full_name: this.editInputName,
          nik: this.editInputNIK,
          no_handphone: this.editInputTelp,
          age: parseInt(this.editInputUsia),
          gender: this.editSelectedGender.value ?? this.editSelectedGender,
          address: this.editInputAddress,
          tps: this.editInputTps,
          city: this.editInputKab,
          district: this.editInputKec,
          subdistrict: this.editInputKel,
          jaringan: this.editSelectedJaringan.value ?? this.editSelectedJaringan,
        }

        const response = await axios.put(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/update/${this.editInputID}`, body, withHeader);
        
        if(response.data.meta.code == 200) {
          this.succesSubmit = true;
          this.cariData(false);

          setTimeout(() => {
            this.succesSubmit = false;
          }, 10000);
        }
      } catch (error) {
        console.log('error cant store data: ', error);
      }

      this.editInputID = null;
      this.editInputKab = null;
      this.editInputKec = null;
      this.editInputKel = null;
      this.editInputTps = null;
      this.editInputName = null;
      this.editInputNIK = null;
      this.editInputTelp = null;
      this.editInputUsia = null;
      this.editInputAddress = null;
      this.editSelectedGender = null;
      this.editSelectedJaringan = null;

      setTimeout(() => {
        this.isOnSubmit = false;
      }, 500);
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
    async fetchJaringanOptionsEdit() {
      if (this.editInputKab) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/network/list?nama_kabupaten=${this.editInputKab}`, withHeader);
          if(response.data.meta.code == 200) {
            const data = response.data.data;

            this.jaringanOptions2Edit = data.map(item => {
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

          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/tps/subdistrict?${queryParam}`, withHeader);
          if(response.data.meta.code == 200) {
            this.tpsOptions = response.data.data;
          }  
        } catch (error) {
          console.error('Error fetching tps options:', error);
        }
        this.cariData(false, this.resultOffset);
      }
    },
    async fetchTpsOptionsEdit(kab, kec, kel) {
      this.editInputTps = null;

      if (kab == null || kec == null || kel == null) {
        return;
      }
      
      try {
        var queryParam = `nama_kabupaten=${kab}`;
            queryParam += `&nama_kecamatan=${kec}`;
            queryParam += `&nama_kelurahan=${kel}`;

        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/tps/subdistrict?${queryParam}`, withHeader);
        if(response.data.meta.code == 200) {
          this.tpsOptionsEdit = response.data.data;
        }  
      } catch (error) {
        console.error('Error fetching tps options:', error);
      }
    },
    cariData: debounce(async function (showAll, page) {      
      if(this.addCollapse == true) {
        return;
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

      if (this.resultManual) {
        queryParam += `is_manual=${this.resultManual}&`;
      }

      if (this.selectedJaringan) {
        queryParam += `jaringan=${this.selectedJaringan.value}&`;
      }

      if (!showAll && this.inputName) {
        queryParam += `nama=${this.inputName}&`;
      }
      queryParam += `limit=${limit}&`;
      queryParam += `offset=${offset}`;

      const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/list${queryParam ?? ''}`, withHeader);

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
    async handleAddManual() {
      if (!this.manualSelectedJaringan) {
        return
      }

      this.isOnSubmit = true;
      
      try {
        const body = {
          city: this.selectedKabupaten,
          district: this.selectedKecamatan,
          subdistrict: this.selectedKelurahan,
          tps: this.selectedTps,
          full_name: this.manualInputName,
          nik: this.manualInputNIK,
          age: this.manualInputUsia ? parseInt(this.manualInputUsia) : null,
          no_handphone: this.manualInputTelp,
          gender: this.manualSelectedGender ? (this.manualSelectedGender.value ?? this.manualSelectedGender) : null,
          address: this.manualInputAddress,
          jaringan: this.manualSelectedJaringan ? (this.manualSelectedJaringan.value ?? this.manualSelectedJaringan) : null,
        }
        
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/store`, body, withHeader);
        
        if(response.data.meta.code == 200) {
          this.succesSubmit = true;
          this.addCollapse = false;
          this.cariData(false);

          setTimeout(() => {
            this.succesSubmit = false;
          }, 10000);
        }
      } catch (error) {
        console.log('error cant store data: ', error);

        if (error.response.data.meta.message == "NIK already exists") {
          this.swalAlert('error', 'Gagal', 'NIK Sudah Terpilih!');
        }
        this.manualInputNIK = null;
        this.isAlertNik = false;
        this.nikFound = null;
      }

      this.nikFound = null;
      this.nikSearched = false;
      this.isAlertNik =  false;
      this.manualInputNIK = null;
      this.resetAddManual();

      setTimeout(() => {
        this.isOnSubmit = false;
      }, 500);
    },
    resetAddManual() {
      this.manualInputName = null;
      this.manualInputUsia = null;
      this.manualInputTelp = null;
      this.manualSelectedGender = null;
      this.manualSelectedJaringan = null;
      this.manualInputAddress = null;
    },
    cariNik: debounce(async function(){
      if (!this.manualInputNIK) {
        return
      }

      this.nikFound = null;
      this.nikSearched = false;
      this.isOnFetch = true;
      this.isAlertNik =  false;
      this.resetAddManual();
      
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/resident/by-nik?nik=${this.manualInputNIK}`, withHeader);
        if(response.data.meta.code == 200) {
          const data = response.data.data;
          this.nikFound = data;
          this.manualInputName = data.nama;
          this.manualInputTelp = data.telp;
          this.manualSelectedGender = {
            value: data.jenis_kelamin,
            label: data.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
          };
          this.manualInputUsia = this.calculateAge(data.tanggal_lahir);
          this.manualInputAddress = data.alamat;

          if(
            this.selectedKabupaten != data.nama_kabupaten
            ||this.selectedKecamatan != data.nama_kecamatan
            ||this.selectedKelurahan != data.nama_kelurahan
            ||this.selectedTps != data.tps
          ) {
            setTimeout(() => {
              this.isAlertNik = true;
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error fetching nik search:', error);
      }

      this.nikSearched = true;
      setTimeout(() => {
        this.isOnFetch = false;
      }, 500);
    }, 500),
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
  