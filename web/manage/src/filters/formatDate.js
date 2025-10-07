import Vue from 'vue';
// import moment from 'moment-timezone'
import store from '../store';

Vue.filter('formatDate', (value, filterFormat) => {
  const { zone, format } = store.state.app.time;

  if (value) {
    return Vue.prototype
      .$dayjs(value)
      .tz(zone)
      .format(filterFormat || format || 'lll');
  }

  return '';
});

Vue.filter('toYMD', (value, originSeparate) => {
  const separate = originSeparate || '-';

  // console.log(value, dayjs(value).format(`YYYY${separate}MM${separate}DD`))

  if (value) {
    return Vue.prototype.$dayjs(value).format(`YYYY${separate}MM${separate}DD`);
  } else {
    console.error(value);

    return 'time error';
  }
});

Vue.filter('toYMD_hms', (value, originSeparate) => {
  const separate = originSeparate || '-';

  // console.log(value, dayjs(value).format(`YYYY${separate}MM${separate}DD`))

  if (value) {
    return Vue.prototype.$dayjs(value).format(`YYYY${separate}MM${separate}DD HH:mm:ss`);
  } else {
    console.error(value);

    return 'time error';
  }
});
