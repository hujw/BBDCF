import { getTokenByApp, setTokenByApp } from '@/util/auth';

export default function ({ $axios, app, $config, $toast, store }) {
  $axios.defaults.baseURL = $config.VUE_APP_REQUEST_API_URL;
  $axios.defaults.timeout = $config.VUE_APP_REQUEST_TIMEOUT;
  $axios.defaults.withCredentials = true;

  $axios.interceptors.request.use(
    (config) => {
      const token = getTokenByApp(app);

      if (token !== '') {
        config.headers.common.Authorization = token;
        config.headers.Authorization = token;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    (response) => {
      if (response.headers.authorization) {
        setTokenByApp(app, 'Bearer ' + response.headers.authorization);
      }

      return response;
    },
    (error) => {
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            console.log('登入失敗');
            // $toast.error('登入失敗')
            break;
          case 403:
            console.log('Token過期');
            $toast.warning('登入逾時，請重新登入', {
              id: 'timeoutToLogout'
            });

            break;
          case 404:
            console.log('找不到該頁面');
            break;
          case 500:
            console.log('伺服器出錯');
            break;
          case 503:
            console.log('服務失效');
            break;
        }

        // 登出
      } else {
        console.error(error);
      }

      return Promise.reject(error.response);
    }
  );
}

export function fetch($axios, url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    $axios
      .$get(
        url,
        {
          params
        },
        {
          headers
        }
      )
      .then((response) => {
        resolve(response.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function fetchFile($axios, url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    $axios({
      url,
      // 一定要寫responseType: 'blob'
      responseType: 'blob',
      method: 'get'
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function fetchImage($axios, url, params = {}, responseType) {
  return new Promise((resolve, reject) => {
    $axios
      .$get(url, {
        params,
        responseType
      })
      .then((response) => {
        resolve(response.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post($axios, url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    $axios
      .$post(url, data, {
        headers,
        timeout: 60000
      })
      .then(
        (response) => {
          if (response.errors) {
            reject(response.errors);
          }
          resolve(response.result);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

export function remove($axios, url, data = {}) {
  return new Promise((resolve, reject) => {
    $axios.$delete(url, data).then(
      (response) => {
        resolve(response.result);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function put($axios, url, data = {}) {
  return new Promise((resolve, reject) => {
    $axios.$put(url, data).then(
      (response) => {
        resolve(response.result);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
