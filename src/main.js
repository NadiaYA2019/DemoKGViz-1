import {createApp} from 'vue'
import App from './App.vue'
import {store} from "./store/store"

import 'vuetify/dist/vuetify.min.css';
import { createVuetify } from 'vuetify/lib/framework';

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {aliases, mdi} from 'vuetify/iconsets/mdi'
import colors from 'vuetify/lib/util/colors'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css';




const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.indigo.darken1,
                    secondary: colors.indigo.lighten1
                }
            },
        },
    },

})

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
