<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <b-card no-body class="card">
        <b-card-body>
          <b-row>
            <b-col sm="3">
              <b-form-group>
                <label for="input-kabupaten" class="form-label">Kota/Kabupaten</label>
                <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="!isAdmin"></v-select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label for="input-kecamatan" class="form-label">Kecamatan</label>
                <v-select v-model="selectedKecamatan" placeholder="Pilih Kecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="!selectedKabupaten"></v-select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label for="input-kelurahan" class="form-label">Kelurahan</label>
                <v-select v-model="selectedKelurahan" placeholder="Pilih Kelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="!selectedKecamatan"></v-select>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label for="input-kelurahan" class="form-label">Jaringan</label>
                <v-select v-model="selectedJaringan" placeholder="Pilih Jaringan" :options="jaringanOptions2" id="input-kelurahan" :disabled="!selectedKabupaten"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="800">
        <div class="d-slider1 overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
          <Swiper
            class="p-0 m-0 mb-2 swiper-wrapper list-inline"
            :modules="modules"
            :slide-per-view="4"
            :space-between="32"
            :breakpoints="{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
              1400: { slidesPerView: 3 },
              1500: { slidesPerView: 4 },
              1920: { slidesPerView: 4 },
              2040: { slidesPerView: 7 },
              2440: { slidesPerView: 8 }
            }"
            :navigation="{
              nextEl: '#blog-tranding-next',
              prevEl: '#blog-tranding-prev'
            }">
            <SwiperSlide class="swiper-slide card card-slide" v-for="(item, index) in swiperItems" :key="index">
              <b-card-body class="d-flex align-items-center">
                <div class="progress-widget">
                  <div class="icon-card p-3 rounded-pill border border-4" :class="index % 2 ? 'border-primary' : 'border-info'">
                    <button class="btn p-0" @click="fetchKK()" v-if="item.is_refresh">
                      <b-spinner variant="light" v-if="isFetchKK"></b-spinner>
                      <svg v-else class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8397 20.1642V6.54639" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.9173 16.0681L16.8395 20.1648L12.7617 16.0681" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M6.91102 3.83276V17.4505" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M2.8335 7.92894L6.91127 3.83228L10.9891 7.92894" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </button>
                    <svg v-else class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6.5C3 3.87479 3.02811 3 6.5 3C9.97189 3 10 3.87479 10 6.5C10 9.12521 10.0111 10 6.5 10C2.98893 10 3 9.12521 3 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 6.5C14 3.87479 14.0281 3 17.5 3C20.9719 3 21 3.87479 21 6.5C21 9.12521 21.0111 10 17.5 10C13.9889 10 14 9.12521 14 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.5C3 14.8748 3.02811 14 6.5 14C9.97189 14 10 14.8748 10 17.5C10 20.1252 10.0111 21 6.5 21C2.98893 21 3 20.1252 3 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17.5C14 14.8748 14.0281 14 17.5 14C20.9719 14 21 14.8748 21 17.5C21 20.1252 21.0111 21 17.5 21C13.9889 21 14 20.1252 14 17.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                  <div class="progress-detail">
                    <p class="mb-2">{{ item.subTitle }}</p>
                    <h4 class="counter">{{ item.amount }}</h4>
                  </div>
                </div>
              </b-card-body>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button swiper-button-next" id="blog-tranding-next"></div>
          <div class="swiper-button swiper-button-prev" id="blog-tranding-prev"></div>
          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
      <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="800">
        <div class="d-slider1 overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
          <Swiper
            class="p-0 m-0 mb-2 swiper-wrapper list-inline"
            :modules="modules"
            :slide-per-view="4"
            :space-between="32"
            :breakpoints="{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
              1400: { slidesPerView: 3 },
              1500: { slidesPerView: 4 },
              1920: { slidesPerView: 4 },
              2040: { slidesPerView: 7 },
              2440: { slidesPerView: 8 }
            }"
            :navigation="{
              nextEl: '#blog-caleg-next',
              prevEl: '#blog-caleg-prev'
            }">
            <SwiperSlide class="swiper-slide card card-slide" v-for="(item, index) in swiperCalegItems" :key="index">
              <b-card-body class="d-flex align-items-center">
                <div class="progress-widget">
                  <div class="icon-card p-0">
                    <img :src="item.img_url" class="rounded-pill w-100 border icon-card">
                  </div>
                  <div class="progress-detail">
                    <p class="mb-2">{{ item.subTitle }}</p>
                    <h4 class="counter">{{ item.amount }}</h4>
                  </div>
                </div>
              </b-card-body>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button swiper-button-next" id="blog-caleg-next"></div>
          <div class="swiper-button swiper-button-prev" id="blog-caleg-prev"></div>
          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12" data-aos="fade-up" data-aos-delay="800">
          <div class="card aos-init aos-animate">
            <div class="flex-wrap card-header d-flex justify-content-between align-items-center">
              <div class="header-title">
                <h4 class="card-title">Ringkasan Pemilih</h4>
              </div>
              <div class="d-flex align-items-center align-self-center">
                <div class="d-flex align-items-center text-primary">
                  <svg class="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                    <g>
                      <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                    </g>
                  </svg>
                  <div class="ms-2">
                    <span class="text-secondary">Cianjur</span>
                  </div>
                </div>
                <div class="d-flex align-items-center ms-3 text-info">
                  <svg class="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                    <g>
                      <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                    </g>
                  </svg>
                  <div class="ms-2">
                    <span class="text-secondary">Bogor</span>
                  </div>
                </div>
              </div>
              <div class="dropdown">
                <a href="#" class="text-secondary dropdown-toggle" id="dropdownMenuButton22" data-bs-toggle="dropdown" aria-expanded="false"> Filter </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton22">
                  <li class="d-flex justify-content-between">
                    <a @click.stop.prevent="handleMonth(-1)" class="dropdown-item">
                      <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.48 6.49 2 12 2L12.2798 2.00384C17.6706 2.15216 22 6.57356 22 12C22 17.51 17.52 22 12 22C6.49 22 2 17.51 2 12ZM13.98 16C14.27 15.7 14.27 15.23 13.97 14.94L11.02 12L13.97 9.06C14.27 8.77 14.27 8.29 13.98 8C13.68 7.7 13.21 7.7 12.92 8L9.43 11.47C9.29 11.61 9.21 11.8 9.21 12C9.21 12.2 9.29 12.39 9.43 12.53L12.92 16C13.06 16.15 13.25 16.22 13.44 16.22C13.64 16.22 13.83 16.15 13.98 16Z" fill="currentColor"></path>
                      </svg>
                    </a>
                    <a href="#" disable class="dropdown-item pe-auto">{{ selectedMonth.text ?? 'Bulan Ini' }}</a>
                    <a @click.stop.prevent="handleMonth(+1)" class="dropdown-item pe-auto">
                      <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.52 17.51 22 12 22L11.7202 21.9962C6.32942 21.8478 2 17.4264 2 12C2 6.49 6.48 2 12 2C17.51 2 22 6.49 22 12ZM10.02 8C9.73 8.3 9.73 8.77 10.03 9.06L12.98 12L10.03 14.94C9.73 15.23 9.73 15.71 10.02 16C10.32 16.3 10.79 16.3 11.08 16L14.57 12.53C14.71 12.39 14.79 12.2 14.79 12C14.79 11.8 14.71 11.61 14.57 11.47L11.08 8C10.94 7.85 10.75 7.78 10.56 7.78C10.36 7.78 10.17 7.85 10.02 8Z" fill="currentColor"></path>
                      </svg>                        
                    </a>
                  </li>
                  <li class="text-center" :class="selectedWeek.value === null ? 'bg-primary' : ''">
                    <a href="#" class="dropdown-item pe-auto" :class="selectedWeek.value === null ? 'text-white' : ''" @click.prevent="fetchChartTop(weekOptions[0].value, 'month')">Bulanan</a>
                  </li>
                  <li v-for="item in weekOptions" :key="item" :class="selectedWeek.value === item.value ? 'bg-primary' : ''" class="text-center">
                    <a href="#" class="dropdown-item pe-auto" :class="selectedWeek.value === item.value ? 'text-white' : ''" @click.prevent="fetchChartTop(item.value, 'week')">{{ item.text }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <apexchart :height="245" type="area" id="d-main" :options="grossSaleChart.options" :series="grossSaleChart.series" />
            </div>
          </div>
        </div>
        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="1000">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Progres</h4>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <apexchart :height="230" type="radialBar" class="col-md-8 col-lg-8" id="myChart1" :options="earningChart.options" :series="earningChart.series" />
                <div class="d-grid gap col-md-4 col-lg-4">
                  <div class="d-flex align-items-start">
                    <svg class="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                      </g>
                    </svg>
                    <div class="ms-3">
                      <span class="text-secondary">Cianjur</span>
                      <h6>{{ totalCianjur }}</h6>
                    </div>
                  </div>
                  <div class="d-flex align-items-start">
                    <svg class="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                      </g>
                    </svg>
                    <div class="ms-3">
                      <span class="text-secondary">Bogor</span>
                      <h6>{{ totalBogor }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="1200">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Perbandingan</h4>
              </div>
            </div>
            <div class="card-body">
              <apexchart :height="195" type="pie" class="dactivity1" id="dactivity1" :options="conversionChart.options" :series="conversionChart.series" />
            </div>
          </div>
        </div>
        <div class="col-md-12 col-xl-12">
          <div class="overflow-hidden card aos-init aos-animate" data-aos="fade-up" data-aos-delay="600">
            <div class="flex-wrap card-header d-flex justify-content-between">
              <div class="header-title">
                <h4 class="mb-2 card-title">Pemilih Terbaru</h4>
                <p class="mb-0">
                  <svg class="me-2 text-primary" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                  </svg>
                  {{ countTodayPemilih }} Data Baru Hari Ini
                </p>
              </div>
            </div>
            <div class="p-0 card-body">
              <div class="mt-4 table-responsive">
                <table id="basic-table" class="table mb-0 table-striped" role="grid">
                  <thead>
                    <tr>
                      <th>NAMA</th>
                      <th>KABUPATEN</th>
                      <th>KECAMATAN</th>
                      <th>KELURAHAN</th>
                      <th>TPS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in lastPemilih" :key="index">
                      <td>
                        <div class="d-flex align-items-center">
                          {{ item.nama }}
                        </div>
                      </td>
                      <td>
                        {{ item.nama_kabupaten }}
                      </td>
                      <td>
                        {{ item.nama_kecamatan }}
                      </td>
                      <td>
                        {{ item.nama_kelurahan }}
                      </td>
                      <td>
                        {{ item.tps }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import AOS from 'aos'
import axios  from 'axios';
import kangZamanImage from '@/assets/custom-vue/img/kangzaman.png';

let withHeader = {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  }
}

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const monthOptions = ref([
      { value: 1, text: 'Januari' },
      { value: 2, text: 'Februari' },
      { value: 3, text: 'Maret' },
      { value: 4, text: 'April' },
      { value: 5, text: 'Mei' },
      { value: 6, text: 'Juni' },
      { value: 7, text: 'Juli' },
      { value: 8, text: 'Agustus' },
      { value: 9, text: 'September' },
      { value: 10, text: 'Oktober' },
      { value: 11, text: 'November' },
      { value: 12, text: 'Desember' },
    ]);
    const weekOptions =  ref([]);
    const selectedWeek = ref({
      value: null,
      text: null,
    });
    const selectedMonth = ref([]);
    const monthOffset = ref(0);
    const kabupatenOptions = ref([]);
    const kecamatanOptions = ref([]);
    const kelurahanOptions = ref([]);
    const jaringanOptions2 = ref([]);
    const selectedKabupaten = ref(null);
    const selectedKecamatan = ref(null);
    const selectedKelurahan = ref(null);
    const selectedJaringan = ref(null);
    const isAdmin = ref(false);
    const isFetchKK = ref(false);
    const modules = ref([Navigation]);
    const lastPemilih = ref([]);
    const countTodayPemilih = ref(0);
    const totalCianjur = ref(0);
    const totalBogor = ref(0);
    const swiperItems = ref([]);
    const swiperCalegItems = ref([]);

    const handleMonth = (mod) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();

      if (!mod) {
        const currentMonth = currentDate.getMonth() + 1;
        const monthIndex = monthOptions.value.findIndex((month) => month.value === currentMonth);
        selectedMonth.value = monthOptions.value[monthIndex];

        const weekDates = getWeekDates(year, currentMonth);
        weekOptions.value = weekDates;
        selectedWeek.value = weekOptions.value[0];
        monthOffset.value = monthIndex;
        fetchChartTop(weekOptions.value[0].value, 'week')
        return
      }

      let next = monthOffset.value + mod;
      if (next > 11 || next < 0) {
        return;
      }

      selectedMonth.value = monthOptions.value[next];
      monthOffset.value = next;

      const weekDates = getWeekDates(year, next+1);
      weekOptions.value = weekDates;
      selectedWeek.value = weekOptions.value[0];
      fetchChartTop(weekDates[0].value, 'month');
    };

    const getWeekDates = (year, month) => {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const offsetToFirstSunday = (7 - firstDayOfWeek) % 7;
      const result = [];

      for (let weekNumber = 0; ; weekNumber++) {
        const firstDateOfWeek = new Date(year, month - 1, 1 + offsetToFirstSunday + weekNumber * 7);

        if (firstDateOfWeek.getMonth() !== month - 1) {
          break;
        }

        const formattedDate = `${firstDateOfWeek.getFullYear()}-${(firstDateOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${firstDateOfWeek.getDate().toString().padStart(2, '0')}`;
        const data = {
          value: formattedDate,
          text: 'Minggu Ke '+ (weekNumber+1),
        };
        result.push(data);
      }

      return result;
    }

    const grossSaleChart = ref({
      series: [
        {
          name: 'Cianjur',
          data: []
        },
        {
          name: 'Bogor',
          data: []
        }
      ],
      options: {
        chart: {
          fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          height: 245,
          type: 'area',
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          }
        },
        colors: ['#3a57e8', '#079aa2'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            minWidth: 19,
            maxWidth: 25,
            style: {
              colors: '#8A92A6'
            },
            offsetX: -5
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          type: 'category',
          overwriteCategories: undefined,
          labels: {
            minHeight: 22,
            maxHeight: 22,
            show: true,
            style: {
              colors: '#8A92A6'
            }
          },
          lines: {
            show: false // or just here to disable only x axis grids
          },
          categories: []
        },
        grid: {
          show: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 50, 80],
            colors: ['#3a57e8', '#4bc7d2']
          }
        },
        tooltip: {
          enabled: true
        }
      }
    });

    const earningChart = ref({
      series: [55, 75],
      options: {
        chart: {
          height: 260,
          type: 'radialBar'
        },
        colors: ['#4bc7d2', '#3a57e8'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: '50%'
            },
            track: {
              margin: 10,
              strokeWidth: '50%'
            },
            dataLabels: {
              show: false
            }
          }
        }
      }
    });

    const conversionChart = ref({
      series: [],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        colors: ['#4bc7d2', '#3a57e8'],
        labels: ['Cianjur', 'Bogor'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    });

    const fetchKabupatenOptions = async () => {
      selectedKecamatan.value = null;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/city/list`, withHeader);
        if (response.data.meta.code === 200) {
          kabupatenOptions.value = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching Kabupaten options:', error);
      }

      adminCity();
    };

    const fetchKecamatanOptions = async () => {
      selectedKecamatan.value = null;
      selectedJaringan.value = null;
      selectedKelurahan.value = null;
      if (selectedKabupaten.value) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/district/by-city?nama_kabupaten=${selectedKabupaten.value}`, withHeader);
          if (response.data.meta.code === 200) {
            kecamatanOptions.value = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching Kecamatan options:', error);
        }
      }
      fetchCard();
      fetchCalegCard();
    };

    const fetchKelurahanOptions = async () => {
      selectedKelurahan.value = null;
      if (selectedKecamatan.value) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/subdistrict/by-district?nama_kecamatan=${selectedKecamatan.value}`, withHeader);
          if (response.data.meta.code === 200) {
            kelurahanOptions.value = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching Kelurahan options:', error);
        }
      }
      fetchCard();
      fetchCalegCard();
    };

    const fetchJaringanOptions =  async () => {
      if (selectedKabupaten.value) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/network/list?nama_kabupaten=${selectedKabupaten.value}`, withHeader);
          if(response.data.meta.code == 200) {
            const data = response.data.data;

            jaringanOptions2.value = data.map(item => {
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
    };

    const adminCity = () => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.role === 'admin') {
        const region = userData.regency;
        const network = userData.user_network;

        jaringanOptions2.value = network.map(item => {
          return {
            value: item,
            label: item,
          }
        });

        if (kabupatenOptions.value.includes(region)) {
          selectedKabupaten.value = region;
        }

        fetchCard();
        fetchCalegCard();
      } else {
        isAdmin.value = true;
      }
    };

    const grossSaleChartUpdate = (data) => {
      grossSaleChart.value.series[0].data = data.data_cianjur;
      grossSaleChart.value.series[1].data = data.data_bogor;
      grossSaleChart.value.options.xaxis.overwriteCategories = data;
    };

    const fetchChartTop = async (date, by) => {
      try {
        var queryParam = '?';
  
        if (date) {
          queryParam += `date=${date}&`;
        }

        if (by) {
            queryParam += `filter_by=${by}`;
        }

        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/dashboard/top-chart${queryParam ?? ''}`, withHeader);
        if(response.data.meta.code == 200) {
          const data = response.data.data;
          grossSaleChartUpdate(data);
          const weekIndex = weekOptions.value.findIndex((week) => week.value === date);
          if(by === 'month') {
            selectedWeek.value = {
              value: null,
              text: null,
            };
          } else {
            selectedWeek.value = weekOptions.value[weekIndex];
          }
        }
      } catch (error) {
        console.error('Error fetching chart top data:', error);
      }
    };

    const fetchChartProgres = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/dashboard/bottom-chart`, withHeader);
        if(response.data.meta.code == 200) {
          const data = response.data.data;
          totalCianjur.value = data.data_cianjur.total;
          totalBogor.value = data.data_bogor.total;
          earningChart.value.series = [data.data_cianjur.total, data.data_bogor.total];
          conversionChart.value.series = [data.data_cianjur.total, data.data_bogor.total];

          earningChart.value.options.plotOptions.radialBar.hollow = Math.ceil(data.data_cianjur.percentage)+'%';
          earningChart.value.options.plotOptions.radialBar.track = Math.ceil(data.data_bogor.percentage)+'%';
        }
      } catch (error) {
        console.error('Error fetching chart top data:', error);
      }
    };

    const fetchCard = async () => {
      try {
        var queryParam = '?';
        
        if (selectedKabupaten.value) {
          queryParam += `nama_kabupaten=${selectedKabupaten.value}&`;
        }

        if (selectedKecamatan.value) {
            queryParam += `nama_kecamatan=${selectedKecamatan.value}&`;
        }

        if (selectedKelurahan.value) {
            queryParam += `nama_kelurahan=${selectedKelurahan.value}&`;
        }

        if (selectedJaringan.value) {
            queryParam += `jaringan=${selectedJaringan.value.value}`;
        }

        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/dashboard/card${queryParam ?? ''}`, withHeader);
        if(response.data.meta.code == 200) {
          swiperItems.value = []
          const data = response.data.data;
          data.forEach((item, index) => {
            swiperItems.value.push({
              size: 100,
              amount: item.total,
              subTitle: item.name,
              color: index % 2 ? 'primary' : 'info',
              is_refresh: item.is_refresh
            });
          });
          isFetchKK.value = false;
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    const fetchCalegCard = async () => {
      try {
        var queryParam = '?';
        
        if (selectedKabupaten.value) {
          queryParam += `nama_kabupaten=${selectedKabupaten.value}&`;
        }

        if (selectedKecamatan.value) {
            queryParam += `nama_kecamatan=${selectedKecamatan.value}&`;
        }

        if (selectedKelurahan.value) {
            queryParam += `nama_kelurahan=${selectedKelurahan.value}&`;
        }

        if (selectedJaringan.value) {
            queryParam += `jaringan=${selectedJaringan.value.value}`;
        }

        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/dashboard/card/voter-caleg${queryParam ?? ''}`, withHeader);
        if(response.data.meta.code == 200) {
          swiperItems.value = []
          const data = response.data.data;
          data.forEach((item, index) => {
            swiperCalegItems.value.push({
              size: 100,
              amount: item.total,
              subTitle: item.name,
              color: index % 2 ? 'primary' : 'info',
              is_refresh: item.is_refresh,
              img_url: item.img_url ?? kangZamanImage,
            });
          });
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    const fetchKK = async () => {
      isFetchKK.value = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/validresident/check-kk`, withHeader);
        if(response.data.meta.code == 200) {
          fetchCard();
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    const fetchLastPemilih = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_API}/api/v1/dashboard/list-new-data`, withHeader);
        if(response.data.meta.code == 200) {
          const data = response.data.data.items;
          const todayCount = response.data.data.total_new_today;
          lastPemilih.value = data;
          countTodayPemilih.value = todayCount;
        }
      } catch (error) {
        console.error('Error fetching last pemilih data:', error);
      }
    };

    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
      
      handleMonth()
      fetchKabupatenOptions()
      fetchCard()
      fetchCalegCard()
      fetchLastPemilih()
      setTimeout(() => {
        fetchChartProgres();
      }, 2000);
    });

    watch(selectedKabupaten, () => {
      fetchKecamatanOptions();
      if(isAdmin.value) {
        fetchJaringanOptions();
      }
    });

    watch(selectedKecamatan, () => {
      fetchKelurahanOptions();
    });

    watch(selectedKelurahan, () => {
      fetchCard();
      fetchCalegCard();
    });

    watch(selectedJaringan, () => {
      fetchCard();
      fetchCalegCard();
    });
    
    return {
      monthOptions,
      weekOptions,
      selectedMonth,
      selectedWeek,
      handleMonth,
      kabupatenOptions,
      kecamatanOptions,
      kelurahanOptions,
      jaringanOptions2,
      selectedJaringan,
      selectedKabupaten,
      selectedKecamatan,
      selectedKelurahan,
      isAdmin,
      modules,
      lastPemilih,
      countTodayPemilih,
      totalCianjur,
      totalBogor,
      swiperItems,
      swiperCalegItems,
      fetchKabupatenOptions,
      fetchKecamatanOptions,
      fetchKelurahanOptions,
      adminCity,
      fetchCard,
      fetchLastPemilih,
      fetchChartTop,
      fetchChartProgres,
      grossSaleChart,
      earningChart,
      conversionChart,
      isFetchKK,
      fetchKK,
    };
  }
}
</script>
<style scoped>
.icon-card{
  height: 72px !important;
  width: 72px !important;
  object-fit: cover;
}
</style>
