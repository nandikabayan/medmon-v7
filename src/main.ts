// PLUGINS
import { createApp } from "vue";
import { pinia } from "@/app/store";
import router from "@/app/router";
import VueGtag from "vue-gtag-next";
// import i18n from "@/global-helper/i18n";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// COMPONENT
import App from '@/App.vue'

// STYLE

// VARIABLE
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

// USE PLUGINS
app.use(pinia);
app.use(router);
app.use(vuetify);
// app.use(i18n);
app.use(VueGtag, {
  property: {
    id: "G-XP87CRNMQ0",
  },
});

// GLOBAL COMPONENT
// app.component("PageHeader", PageHeader);

// MOUNT VUE APP
app.mount('#app')
