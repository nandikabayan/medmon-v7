import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


export function initUI(app: any) {
  const vuetify = createVuetify({
    components,
    directives,
  });

  app.use(vuetify);
}
