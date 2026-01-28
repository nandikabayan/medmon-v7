import VueGtag from 'vue-gtag-next';

export function initAnalytics(app: any) {
  app.use(VueGtag, {
    property: {
      id: 'G-XP87CRNMQ0',
    },
  });
}