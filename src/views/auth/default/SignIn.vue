<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white h-100">
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col md="10">
            <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
              <div class="navbar-brand d-flex align-items-center mb-3 text-primary">
                <brand-logo></brand-logo>
                <h4 class="logo-title ms-3 mb-0" data-setting="app_name"><brand-name></brand-name></h4>
              </div>
              <h2 class="mb-2 text-center">Masuk</h2>
              <p class="text-center">Selamat datang di Kaznet, Masuk untuk melanjutkan!</p>
              <form @submit.prevent="handleSignIn">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="email" placeholder=" " />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="password" class="form-label">Password</label>
                      <input v-model="password" type="password" class="form-control" id="password" aria-describedby="password" placeholder=" " />
                    </div>
                  </div>
                  <div class="col-lg-12 d-flex justify-content-between">
                    <div class="form-check mb-3">
                      <input type="checkbox" class="form-check-input" id="customCheck1" />
                      <label class="form-check-label" for="customCheck1">Ingat Saya</label>
                    </div>
                    <a href="/auth/reset-password">Lupa Password?</a>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary">Masuk</button>
                </div>
              </form>
            </b-card>
          </b-col>
        </b-row>
        <div class="sign-bg">
          <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
              <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
              <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
              <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
            </g>
          </svg>
        </div>
      </b-col>
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
    </b-row>
  </section>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref('');
const password = ref('');

onMounted(() => {
  if (localStorage.getItem('jwtToken')) {
    // If a token is present, redirect to the dashboard
    router.push({ name: 'default.dashboard' });
  }
});


const handleSignIn = async () => {
  try {
    const response = await axios.post(`${process.env.VUE_APP_BACKEND_API}/api/v1/user/login`, {
      email: email.value,
      password: password.value,
    });

    console.log(response.data.data);

    const token = response.data.data.token;
    const id = response.data.data.id;
    const full_name = response.data.data.full_name;
    const regency = response.data.data.regency;
    const status = response.data.data.status;
    const role = response.data.data.role;

    const userData = {
      id: id,
      email: email,
      full_name: full_name,
      regency: regency,
      status: status,
      role: role,
    }

    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to the dashboard on successful login
    router.push({ name: 'default.dashboard' });
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
};
</script>

<style lang="scss" scoped></style>
