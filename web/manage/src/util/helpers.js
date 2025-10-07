export function leadingSlash(str) {
  return str.startsWith('/') ? str : '/' + str;
}

export function trailingSlash(str) {
  return str.endsWith('/') ? str : str + '/';
}

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function replaceNullToEmptyField(name, value, isInteger) {
  return isInteger ? `${name}: ${value},` : [null, undefined].indexOf(value) === -1 ? `${name}: "${value}",` : '';
}

export function convertArrayToObject(array, key) {
  const initialValue = {};

  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
}

export function base64ToBlob(b64, type) {
  // decode base64
  const imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  const blob = new Blob([buffer], { type: type });

  return blob;
}

export function base64ToFile(b64, name, type) {
  return new File([base64ToBlob(b64)], name, { type: type });
}

export function imageLimit(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      const img = new Image();

      img.onload = () => {
        if (img.width !== maxWidth) {
          console.log(`The image width (${img.width}) is not equals (${maxWidth}).`);
          resolve(false);
        }
        if (img.height !== maxHeight) {
          console.log(`The image height (${img.height}) is not equals (${maxHeight}).`);
          resolve(false);
        }
        resolve(true);
      };
      img.src = evt.target.result;
    };

    reader.onerror = (evt) => {
      console.error(evt);
      resolve(false);
    };
  });
}
