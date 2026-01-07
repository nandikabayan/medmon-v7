// import i18n from "@/shared/hooks/i18n";
import { stateManagement } from "@/app/store/app-store";
import ExcelJS from 'exceljs';
import cookie from "js-cookie";
import JSEncrypt from "jsencrypt";
import { format, addHours } from "date-fns";
import Swal from "sweetalert2";
import { MONTHS } from "@/shared/constants/month";
import { EMOTION_COLOR, EMOTION_ICON, EMOTION_NAME } from "@/shared/constants/emotion";
import { SENTIMENT_COLOR, SENTIMENT_ICON, SENTIMENT_NAME } from "@/shared/constants/sentiment";
import { SOURCE_COLOR, SOURCE_ICON, SOURCE_NAME } from "@/shared/constants/source";
import { NOTIFICATION_TYPE } from "@/shared/constants/notification";
import { PAGE_NAME } from "@/shared/constants/page";

// fungsi untuk assign series data chart ketika tidak ada
export function assignNullSeriesData(categories_length: number) {
  let series_data = [] as number[];
  for (let i = 0; i < categories_length; i++) {
    series_data.push(0);
  }
  return series_data;
}
// fungsi untuk menghitung jumlah data number di array
export function arrayCounter(arr: []) {
  return arr.reduce((total, current) => total + current, 0);
}
// fungsi untuk mengubah \n menjadi baris baru (ENTER)
export function contentFormatter(text: string): string {
  var new_text = text;
  new_text = new_text.replace(/\n/g, "<br />");
  return new_text;
}
// fungsi untuk memunculkan konfirmasi sweet alert
export async function confirmAction(
  title: string,
  subtitle: string,
  button_text: string,
  theme: string
): Promise<boolean> {
  try {
    const result = await Swal.fire({
      title: `${title}`,
      html: `${subtitle}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `${button_text}`,
      cancelButtonText: `${handlerBilingual('global.cancel')}`,
      reverseButtons: true,
      customClass: {
        title: "fs-22",
        icon: "icon-sweetalert-question",
        popup: `popup-sweetalert ${
          theme === "dark" ? "popup-sweetalert-dark" : ""
        }`,
        confirmButton: "btn-sweetalert btn-sweetalert-success",
        cancelButton: "btn-sweetalert btn-sweetalert-error",
      },
    });

    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
// fungsi untuk mengubah format tanggal dari hari ini
export function dateFromNowFormatter(date: string) {
  const now = new Date();
  const time_different = now.getTime() - new Date(date).getTime();

  const seconds = Math.floor(time_different / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${handlerBilingual('global.years-ago')}`;
  } else if (months > 0) {
    return `${months} ${handlerBilingual('global.months-ago')}`;
  } else if (days > 0) {
    return `${days} ${handlerBilingual('global.days-ago')}`;
  } else if (hours > 0) {
    return `${hours} ${handlerBilingual('global.hours-ago')}`;
  } else if (minutes > 0) {
    return `${minutes} ${handlerBilingual('global.minutes-ago')}`;
  } else {
    return seconds <= 5 ? `${handlerBilingual('global.just-now')}` : `${seconds} ${handlerBilingual('global.seconds-ago')}`;
  }
}
// fungsi untuk mengubah format tanggal atau waktu pada grafik
export function dateChartFormatter(date: string, selected_date: string) {
  if (date.includes(':')) {
    const today = format(new Date(selected_date), 'yyyy-MM-dd')

    return {
      from: `${today} ${date}:00`,
      to: `${today} ${date.substring(0, 2)}:59:59`,
    }
  }

  const day = format(new Date(date), 'yyyy-MM-dd')

  return {
    from: `${day} 00:00:00`,
    to: `${day} 23:59:59`,
  }
}

// fungsi untuk mengubah format tanggal dengan format Indonesia
export function dateFormatterID(
  date: string,
  month_shorted = false,
  show_time = false,
  is_plus_7 = false
): string {
  const current_lang = localStorage.getItem('mv6_lang') || 'id';

  const baseDate = new Date(date)
  const finalDate = is_plus_7 ? addHours(baseDate, 7) : baseDate

  const day = format(finalDate, 'dd')
  const year = format(finalDate, 'yyyy')
  const monthIndex = Number(format(finalDate, 'M')) - 1
  const monthName = MONTHS[current_lang][monthIndex]

  const time = show_time ? format(finalDate, 'HH:mm:ss') : ''

  return `${day} ${
    month_shorted ? monthName.substring(0, 3) : monthName
  } ${year}${time ? ` ${time}` : ''}`
}
// fungsi untuk mengubah format tanggal dengan format untuk parameter endpoint (YYYY-MM-DD HH:mm:ss)
export function dateFormatterParams(date: string): string {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}
// fungsi untuk menghitung dan menampilkan jumlah data pada setiap pagination
export function dataCountFormatter(
  page: number,
  item: number,
  count: number,
  showed: number
): string {
  if (showed > 0) {
    const value = item * page;
    return `${thousandSeparator((page - 1) * item + 1)} - ${
      value <= count ? thousandSeparator(value) : thousandSeparator(count)
    } ${handlerBilingual('global.from')} ${thousandSeparator(count)} Data`;
  }
  return `0 - 0 ${handlerBilingual('global.from')} 0 Data`;
}
// fungsi untuk enkripsi password menggunakan public key
export function encryptPassword(password: string) {
  const public_key = `-----BEGIN PUBLIC KEY-----\n${
    import.meta.env.VITE_PUBLIC_KEY
  }\n-----END PUBLIC KEY-----`;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(public_key);
  const password_encrypted = encrypt.encrypt(password);
  return password_encrypted;
}
// fungsi untuk menampilkan error message
export function errorMessage(err: any): string {
  const message =
    err &&
    "response" in err &&
    "data" in err.response &&
    err.response.data.detail
      ? err.response.data.detail.message || handlerBilingual('alert.an-error-in-apps')
      : handlerBilingual('alert.an-error-in-apps');
  return message;
}
// fungsi untuk menampilkan otomatis nama, icon dan warna emotion
export function emotionFormatter(type: string, emotion: any): any {
  const temp_emotion =
    emotion == 0 || emotion == "netral" || emotion == "no emotion"
      ? "netral"
      : emotion == 1 || emotion == "senang"
      ? "senang"
      : emotion == 2 || emotion == "takut"
      ? "takut"
      : emotion == 3 || emotion == "sedih"
      ? "sedih"
      : emotion == 4 || emotion == "marah"
      ? "marah"
      : "all";
  if (type === "value") {
    if (emotion === "netral" || emotion === "no emotion") {
      return 0;
    } else if (emotion === "senang") {
      return 1;
    } else if (emotion === "takut") {
      return 2;
    } else if (emotion === "sedih") {
      return 3;
    } else if (emotion === "marah") {
      return 4;
    }
  } else if (type === "icon") {
    return EMOTION_ICON[temp_emotion];
  } else if (type === "name") {
    return EMOTION_NAME[temp_emotion];
  } else {
    return EMOTION_COLOR[temp_emotion];
  }
}
// fungsi untuk menentukan apakah sumber yang dimasukkan adalah media konvensional atau bukan
export function isFormedSource(source: string): boolean {
  const formed_list = ["news", "media_cetak", "media_tv", "radio", "running_text"];
  if (formed_list.includes(source)) {
    return true;
  }
  return false;
}
// fungsi untuk mengubah format number menjadi format angka plus huruf mulai dari Ribuan (1K, 2M, dll)
export function kmbtNumberFormatter(number: number): string {
  if (isNaN(number)) {
    return number.toString();
  }
  const abs_number = Math.abs(number);
  if (abs_number < 1000) {
    return number.toLocaleString("id");
  }
  const suffixes = ["", "K", "M", "B", "T"];
  const suffix_index = Math.floor(Math.log10(abs_number) / 3);
  const formatted_number = (number / Math.pow(1000, suffix_index)).toFixed(1);

  return (
    parseFloat(formatted_number).toLocaleString("id") + suffixes[suffix_index]
  );
}
// fungsi untuk menentukan minimum dan maksimum series data
export function minMaxSeriesFormatter(series: any[], title: string) {
  const selected_series = series.find((el: any) => el.name === title);
  if (selected_series) {
    return {
      min: Math.min(...selected_series.data),
      max: Math.max(...selected_series.data),
    };
  }
  return {
    min: 0,
    max: 500000,
  };
}
// fungsi untuk menentukan nomor item list
export function numberItemListFormatter(
  index: number,
  page: number,
  item: number
) {
  const num_value = (page - 1) * item + 1;
  return thousandSeparator(num_value + index);
}
// fungsi untuk random warna
export function randomColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color_hex = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  return color_hex;
}
// fungsi untuk menampilkan otomatis nama, icon dan warna sumber
export function sourceFormatter(type: string, source: string): string {
  if (type === "icon") {
    return SOURCE_ICON[source];
  } else if (type === "name") {
    return SOURCE_NAME[source];
  } else {
    return SOURCE_COLOR[source];
  }
}
// fungsi untuk menampilkan value dari nama sumber
export function sourceFormatterValue(source: string) {
  switch (source) {
    case handlerBilingual('global.online-media'):
      return "news";
    case handlerBilingual('global.print-media'):
      return "media_cetak";
    case handlerBilingual('global.tv-media'):
      return "media_tv";
    case handlerBilingual('global.running-text'):
      return "running_text";
    case handlerBilingual('global.review-apps'):
      return "review";
    case "X":
      return "twitter";
    default:
      return source.toLowerCase();
  }
}
// fungsi untuk menampilkan otomatis nama, icon dan warna sentiment
export function sentimentFormatter(type: string, sentiment: any): any {
  const temp_sentiment =
    sentiment == 0 || sentiment == "netral"
      ? "netral"
      : sentiment == 1 || sentiment == "positif"
      ? "positif"
      : sentiment == -1 || sentiment == "negatif"
      ? "negatif"
      : "all";
  if (type === "value") {
    if (sentiment === "netral") {
      return 0;
    } else if (sentiment === "positif") {
      return 1;
    } else if (sentiment === "negatif") {
      return -1;
    }
  } else if (type === "icon") {
    return SENTIMENT_ICON[temp_sentiment];
  } else if (type === "name") {
    return SENTIMENT_NAME[temp_sentiment];
  } else {
    return SENTIMENT_COLOR[temp_sentiment];
  }
}
// fungsi untuk memotong string dan menambahkan dengan  ...
export function stringCutter(text: string, substring: number): string {
  if (text) {
    if (text.length <= substring) {
      return text;
    }
    return text.substring(0, substring) + "...";
  }
  return " ";
}
// fungsi untuk menghighlight keyword yang terdapat dalam sebuah string
export function stringMarker(content: string, keywords: string[], color: string = "#FFFF00"): string {
  if (keywords && keywords.length > 0) {
    const sanitize_keywords = keywords
      .map((keyword) => {
        if (keyword) {
          if (!/["']/.test(keyword)) {
            return keyword.split(" ");
          }
          return keyword.trim().replace(/["']/g, "");
        }
        return keyword;
      })
      .flat();

    const temp_regex_pattern = sanitize_keywords.map((keyword) => {
      if (keyword) {
        return keyword.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
      }
    });

    const regex_pattern = temp_regex_pattern
      .filter(Boolean) // Tambahan penting
      .map((keyword) => `\\b${keyword}\\b`)
      .join("|");

    if (regex_pattern) {
      const regex = new RegExp(`(${regex_pattern})`, "gi");
      return content.replace(
        regex,
        `<mark style="background-color:${color}" data-markjs="true">$&</mark>`
      );
    }
  }
  return content;
}
// fungsi untuk menentukan total pagination yang ditampilkan
export function setPaginationLength(item: number, data_length: number): number {
  if (data_length == 0) {
    return 1;
  }
  return Math.ceil(data_length / item);
}
// fungsi untuk menampilkan sweet alert action status di sebelah kanan atas
export function showToastification(
  type: any,
  title: string,
  theme: string,
  timer: number = 3000
) {
  Swal.fire({
    position: "top-end",
    icon: type,
    toast: true,
    title: `${type === "error" ? `${handlerBilingual('global.failed')}!` : `${handlerBilingual('global.success')}!`} ${title}`,
    showConfirmButton: false,
    timer: timer,
    customClass: {
      title: "fs-14",
      icon: "fs-14",
      popup: `popup-sweetalert ${
        theme === "dark" ? "popup-sweetalert-dark" : ""
      }`,
    },
  });
}
// fungsi untuk menampilkan nama topik
export function showTopicName(topic_id: string, topic_list: Array<any>) {
  const find_data = topic_list.find((el: any) => el._id === topic_id);
  if (find_data) {
    return find_data.name;
  }
  return `-${handlerBilingual('alert.topic-unavailable')}-`;
}
// fungsi untuk mengubah format number dengan format ribuan (1000 => 1.000)
export function thousandSeparator(number: number): string {
  if (isNaN(number)) {
    return number.toString();
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// fungsi untuk mengubah timestamp ke dengan format Indonesia
export function timestampToDateFormatter(
  timestamp: number,
  month_shorted: boolean = false,
  show_time: boolean = false
): string {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formatted_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateFormatterID(formatted_time, month_shorted, show_time);
}
// fungsi untuk mendapatkan tipe notifikasi
export function getTypeNotification(type_idx: number): string {
  let notification_type_length = Object.keys(NOTIFICATION_TYPE).length;
  if (type_idx > notification_type_length) {
    return "type not found";
  }
  return NOTIFICATION_TYPE[type_idx];
}
// fungsi untuk menampilkan nama halaman pada tabel export powerpoint
export function showPageName(page: any): string {
  if (Array.isArray(page)) {
    return "Multiple PowerPoint";
  }
  return PAGE_NAME[page];
}
// fungsi untuk memformat status
export function statusFormatter(type: string, status: string) {
  if (type === "icon") {
    if (status.toLocaleLowerCase() === "success") {
      return "tabler-circle-check";
    } else if (status.toLocaleLowerCase() === "pending") {
      return "tabler-clock-cancel";
    } else if (status.toLocaleLowerCase() === "running") {
      return "tabler-clock-play";
    } else if (status.toLocaleLowerCase() === "stopped") {
      return "tabler-clock-x";
    } else if (status.toLocaleLowerCase() === "failed") {
      return "tabler-clock-x";
    } else {
      return "";
    }
  } else if (type === "name") {
    if (status.toLocaleLowerCase() === "success") {
      return handlerBilingual('global.success');
    } else if (status.toLocaleLowerCase() === "pending") {
      return handlerBilingual('global.pending');
    } else if (status.toLocaleLowerCase() === "running") {
      return handlerBilingual('global.running');
    } else if (status.toLocaleLowerCase() === "stopped") {
      return handlerBilingual('global.stopped');
    } else if (status.toLocaleLowerCase() === "failed") {
      return handlerBilingual('global.failed');
    } else {
      return "";
    }
  } else {
    if (status.toLocaleLowerCase() === "success") {
      return "success";
    } else if (status.toLocaleLowerCase() === "pending") {
      return "secondary";
    } else if (status.toLocaleLowerCase() === "running") {
      return "warning";
    } else if (status.toLocaleLowerCase() === "stopped") {
      return "error";
    } else if (status.toLocaleLowerCase() === "failed") {
      return "error";
    } else {
      return "";
    }
  }
}
export function writeContent(text: string): string {
  var new_text = text;
  new_text = new_text.replace(/\n/g, "<br />");
  return new_text;
}
// Fungsi untuk mengubah format number manjadi format angka persen
export function numberPercent(number: number = 0): string {
  const numbervalue = Number.isInteger(number) ? number : number.toFixed(3); 

  return numbervalue + "%";
}
// Fungsi untuk mengubah format number manjadi format rupiah
export function formatRupiah(number: number = 0): string {
  return 'Rp. ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
// Fungsi untuk split dan merge string
export function splitMergeString(type: string, data: any) {
  if (type === "merge") {
    let value = ""; 

    data.forEach((item: any, index: number) => {
      value += index === 0 ? item.trim() : ", " + item.trim();
    });

    return value;
  } else if (type === "split") {
    return data.split(',').map((item: any) => item.trim());
  }
}
// Fungsi untuk handler bahasa
export function handlerBilingual(key: string): string {
  // return i18n.global.t(key) || '-'
  return key;
}
// Fungsi untuk handler title
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Fungsi untuk formater mengambil title account category
export function accountCategoryFormatter(val: string) {
  const data_category =  JSON.parse(cookie.get("mv6_enum_type_account")) || [];
  if(data_category) {
    const result: any = data_category.find((el: any) => el.value === val);
    
    if (val === '' || val === null) {
      return null;
    } 
    
    return result.name || '';
  } else {
    return null;
  }
}
// function untuk generate query
// export function generateQuery(is_additional: boolean, data_params: Record<string, any> = {}) {
//   const store = stateManagement();
//   const filter_additional = store.getFilterAdditional;
//   let params: Record<string, any> = {};

//   if (is_additional) {
//     let data_additional: Record<string, any> = {};

//     Object.entries(filter_additional).forEach(([key, val]) => {
//       if (val !== null && val !== undefined && val !== '') {
//         if (Array.isArray(val) && val.length > 0) {
//           if (key === 'tier') {
//             data_additional[key] = val.join(',');
//           } else {
//             data_additional[key] = btoa(val.join(','));
//           }
//         } else if (!Array.isArray(val)) {
//           let value = val;
//           if (['query', 'exclude', 'sentiments'].includes(key)) {
//             value = btoa(val);
//           }
//           data_additional[key] = value;
//         }
//       }
//     });

//     // data_params memiliki prioritas lebih tinggi
//     params = Object.assign({}, data_additional, data_params);
//   } else {
//     params = data_params;
//   }

//   // pastikan tidak ada duplikat key
//   const seen = new Set<string>();
//   const uniqueEntries = Object.entries(params).filter(([key]) => {
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });

//   const uniqueParams = Object.fromEntries(uniqueEntries);

//   const query = Object.keys(uniqueParams)
//     .map((key) => `${key}=${uniqueParams[key]}`)
//     .join('&');

//   return query;
// }

// function export excel
export async function exportToExcel(formattedData: any[], options: any = {}): Promise<void> {
  const {
    fileName = 'export_data',
    worksheetName = 'Data',
    useStyling = true,
    centerColumns = [],
    customWidths,
    headerBackgroundColor = '000000',
    headerTextColor = 'FFFFFF'
  } = options;

  if (!formattedData || formattedData.length === 0) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  const headers = Object.keys(formattedData[0]);
  const finalWidths = customWidths || headers.map(() => 15);

  worksheet.columns = headers.map((header, index) => ({
    header,
    key: header,
    width: finalWidths[index]
  }));

  const headerRow = worksheet.getRow(1);

  if (useStyling) {
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: headerBackgroundColor }
      };
      cell.font = {
        color: { argb: headerTextColor },
        bold: true,
        size: 12
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      };
    });
  }

  // Tambahkan data rows
  formattedData.forEach((item) => {
    const row = worksheet.addRow(item);
    if (useStyling) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
      });

      centerColumns.forEach((colIndex) => {
        row.getCell(colIndex + 1).alignment = { horizontal: 'center', vertical: 'middle' };
      });
    }
  });

  // Freeze header
  if (useStyling) {
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  // Auto width (kalau tidak pakai custom)
  if (!customWidths) {
    worksheet.columns.forEach((col) => {
      let max = 10;
      col.eachCell({ includeEmpty: true }, (cell) => {
        const val = cell.value ? cell.value.toString() : "";
        max = Math.max(max, val.length);
      });
      col.width = max + 2;
    });
  }

  // Ekspor file
  let url: string | null = null;
  const a = document.createElement('a');
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    await new Promise((r) => setTimeout(r, 100));
  } catch (err) {
    throw err;
  } finally {
    document.body.removeChild(a);
    if (url) URL.revokeObjectURL(url);
  }
}
