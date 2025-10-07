import Vue from 'vue';

// 複製caseNumber
export const copyCaseNumber = async (caseNumber) => {
  try {
    await Vue.prototype.$copyText(caseNumber);
    Vue.prototype.$snackbar.showMessage({ content: '複製成功', color: 'success' });
  } catch (err) {
    Vue.prototype.$snackbar.showMessage({ content: '複製失敗', color: 'error' });
  }
};

// 處理csv下載
export const handleCsv = async (csvData) => {
  // 處理csv內容的中文 否則會亂碼
  const BOM = '\uFEFF';
  // [BOM, csvData.data] 或 [BOM + csvData.data]都可以
  const blob = new Blob([BOM + csvData.data], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(blob);
  // 取到的fileName是encode格式
  // attachment;filename=%E7%B0%A1%E6%98%93%E8%AA%BF%E6%9F%A5%E5%95%8F%E5%8D%B70.0_DC20000000.csv
  let fileName = csvData.headers['content-disposition'];

  // 取出filename=後面的字串
  fileName = fileName.slice(fileName.indexOf('=') + 1);
  // decode
  fileName = decodeURI(fileName);

  let link = document.createElement('a');

  link.href = csvUrl;
  link.download = fileName;
  link.click();
  link = null;
};
