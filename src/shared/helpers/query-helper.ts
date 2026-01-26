import { stateManagement } from '@/app/store/app-store';

export function generateQuery(is_additional: boolean, data_params: Record<string, any> = {}) {
  const store = stateManagement();
  const filter_additional = store.getFilterAdditional;
  let params: Record<string, any> = {};

  if (is_additional) {
    let data_additional: Record<string, any> = {};

    Object.entries(filter_additional).forEach(([key, val]) => {
      if (val !== null && val !== undefined && val !== '') {
        if (Array.isArray(val) && val.length > 0) {
          if (key === 'tier') {
            data_additional[key] = val.join(',');
          } else {
            data_additional[key] = btoa(val.join(','));
          }
        } else if (!Array.isArray(val)) {
          let value = val;
          if (['query', 'exclude', 'sentiments'].includes(key)) {
            value = btoa(val);
          }
          data_additional[key] = value;
        }
      }
    });

    // data_params memiliki prioritas lebih tinggi
    params = Object.assign({}, data_additional, data_params);
  } else {
    params = data_params;
  }

  // pastikan tidak ada duplikat key
  const seen = new Set<string>();
  const uniqueEntries = Object.entries(params).filter(([key]) => {
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const uniqueParams = Object.fromEntries(uniqueEntries);

  const query = Object.keys(uniqueParams)
    .map((key) => `${key}=${uniqueParams[key]}`)
    .join('&');

  return query;
}