<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <b-card no-body class="card">
        <b-card-body>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="input-kabupaten" class="form-label">Kota/Kabupaten</label>
                <v-select v-model="selectedKabupaten" placeholder="Pilih Kabupaten" :options="kabupatenOptions" id="input-kabupaten" :disabled="!isAdmin"></v-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="input-kecamatan" class="form-label">Kecamatan</label>
                <v-select v-model="selectedKecamatan" placeholder="Pilih Kecamatan" :options="kecamatanOptions" id="input-kecamatan" :disabled="!selectedKabupaten"></v-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="input-kelurahan" class="form-label">Kelurahan</label>
                <v-select v-model="selectedKelurahan" placeholder="Pilih Kelurahan" :options="kelurahanOptions" id="input-kelurahan" :disabled="!selectedKecamatan"></v-select>
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
              <b-card-body>
                <div class="progress-widget">
                  <analytics-widget :index="index" :title="item.title" :size="item.size" :sub-title="item.subTitle" :value="item.value" :color="item.color" :is-profit="item.isProfit">
                    <svg class="card-slie-arrow" width="24" height="24px" viewBox="0 0 24 24" v-if="index % 2">
                      <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"></path>
                    </svg>
                    <svg class="card-slie-arrow" width="24" height="24" viewBox="0 0 24 24" v-else>
                      <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
                    </svg>
                  </analytics-widget>
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
                  <li><a class="dropdown-item" @click="fetchChartTop(getCurrentDate(), 'week')">Minggu Ini</a></li>
                  <li><a class="dropdown-item" @click="fetchChartTop(getCurrentDate(), 'month')">Bulan Ini</a></li>
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
import AnalyticsWidget from '@/components/widgets/AnalyticsWidget.vue'
import AOS from 'aos'
import axios  from 'axios';

let withHeader = {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  }
}

export default {
  components: {
    Swiper,
    SwiperSlide,
    AnalyticsWidget
  },
  setup() {
    const kabupatenOptions = ref([]);
    const kecamatanOptions = ref([]);
    const kelurahanOptions = ref([]);
    const selectedKabupaten = ref(null);
    const selectedKecamatan = ref(null);
    const selectedKelurahan = ref(null);
    const isAdmin = ref(false);
    const modules = ref([Navigation]);
    const lastPemilih = ref([]);
    const countTodayPemilih = ref(0);
    const totalCianjur = ref(0);
    const totalBogor = ref(0);
    const swiperItems = ref([]);
    
    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
            maxWidth: 23,
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
    })

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
    })

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
    };

    const fetchKelurahanOptions = async () => {
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
    };

    const adminCity = () => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.role === 'admin') {
        const region = userData.regency;

        if (kabupatenOptions.value.includes(region)) {
          selectedKabupaten.value = region;
        }

        fetchCard();
      } else {
        isAdmin.value = true;
      }
    };

    const grossSaleChartUpdate = (data) => {
      grossSaleChart.value.series[0].data = data.data_cianjur;
      grossSaleChart.value.series[1].data = data.data_bogor;
      grossSaleChart.value.options.xaxis.overwriteCategories = data;
    }

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
        }
      } catch (error) {
        console.error('Error fetching chart top data:', error);
      }
    }

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
    }

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
            queryParam += `nama_kelurahan=${selectedKelurahan.value}`;
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
              color: index % 2 ? 'primary' : 'info'
            });
          });
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    }

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
    }

    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })

      fetchKabupatenOptions()
      fetchCard()
      fetchLastPemilih()
      setTimeout(() => {
        fetchChartTop(getCurrentDate(), 'week')
        fetchChartProgres();
      }, 2000);
    })

    watch(selectedKabupaten, () => {
      fetchKecamatanOptions();
    });

    watch(selectedKecamatan, () => {
      fetchKelurahanOptions();
    });

    watch(selectedKelurahan, () => {
      fetchCard();
    });
    
    return {
      kabupatenOptions,
      kecamatanOptions,
      kelurahanOptions,
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
      getCurrentDate,
    };
  }
}
</script>
