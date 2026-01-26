import ExcelJS from 'exceljs';

export interface ExportExcelOptions {
  fileName?: string;
  worksheetName?: string;
  useStyling?: boolean;
  centerColumns?: number[];
  customWidths?: number[];
  headerBackgroundColor?: string; // ARGB
  headerTextColor?: string;       // ARGB
}

/**
 * Export array of object ke Excel (.xlsx)
 */
export async function exportToExcel<T extends Record<string, any>>(
  data: T[],
  options: ExportExcelOptions = {}
): Promise<void> {
  if (!data || data.length === 0) return;

  const {
    fileName = 'export_data',
    worksheetName = 'Data',
    useStyling = true,
    centerColumns = [],
    customWidths,
    headerBackgroundColor = '000000',
    headerTextColor = 'FFFFFF',
  } = options;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  // ===== HEADER =====
  const headers = Object.keys(data[0]);

  worksheet.columns = headers.map((key, index) => ({
    header: key,
    key,
    width: customWidths?.[index] || 15,
  }));

  const headerRow = worksheet.getRow(1);

  if (useStyling) {
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: headerBackgroundColor },
      };
      cell.font = {
        bold: true,
        size: 12,
        color: { argb: headerTextColor },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = defaultBorder();
    });
  }

  // ===== DATA ROWS =====
  data.forEach((item) => {
    const row = worksheet.addRow(item);

    if (useStyling) {
      row.eachCell((cell, colNumber) => {
        cell.border = defaultBorder();

        if (centerColumns.includes(colNumber - 1)) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      });
    }
  });

  // ===== FREEZE HEADER =====
  if (useStyling) {
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  // ===== AUTO WIDTH =====
  if (!customWidths) {
    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, value.length);
      });
      column.width = maxLength + 2;
    });
  }

  // ===== EXPORT FILE =====
  let url: string | null = null;
  const link = document.createElement('a');

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
  } finally {
    document.body.removeChild(link);
    if (url) URL.revokeObjectURL(url);
  }
}

/* ======================
   HELPER (PRIVATE)
====================== */

function defaultBorder() {
  return {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } },
  };
}
