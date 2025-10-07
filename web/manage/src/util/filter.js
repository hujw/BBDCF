import Vue from 'vue';

/**
 * 使用全域
 */
Vue.filter('datetimeFilter', (value) => {
  return value ? Vue.prototype.$dayjs(String(value)).format('YYYY-MM-DD HH:mm:ss') : '';
});

Vue.filter('datetimeFilterNoSec', (value) => {
  return value ? Vue.prototype.$dayjs(String(value)).format('YYYY-MM-DD HH:mm') : '';
});

Vue.filter('dateFilter', (value) => {
  return value ? Vue.prototype.$dayjs(String(value)).format('YYYY-MM-DD') : '';
});

Vue.filter('prettyBytes', (num) => {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('Expected a number');
  }

  const neg = num < 0;
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);

  num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
  const unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
});
