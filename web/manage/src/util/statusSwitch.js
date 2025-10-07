export const statusSwitch = {
  // 用戶帳號狀態
  accountStatusStyle: (status) => {
    let style = null;

    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-cancel',
          iconText: '停用'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用'
        };
        break;
      case '2':
        style = {
          color: 'primary  darken-2',
          icon: 'mdi-checkbox-blank-off-outline',
          iconText: '凍結'
        };
        break;
      case '3':
        style = {
          color: 'warning  darken-2',
          icon: 'mdi-alert-circle',
          iconText: '未開通 (未重設密碼)'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // B101 ----------------------------------------------------------------
  // 同意書填寫狀態
  consentWriteStatusStyle: (status) => {
    let style = null;

    switch (status) {
      case 'AGREE':
        style = {
          color: 'success darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '同意'
        };
        break;
      case 'DISAGREE':
        style = {
          color: 'error  darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '退出'
        };
        break;
      case 'BLANK':
        style = {
          color: 'warning  darken-2',
          icon: 'mdi-help-circle-outline',
          iconText: '未簽署'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // 問卷填寫狀態
  questionnaireWriteStatusStyle(status) {
    let style = null;

    switch (status) {
      case 'AGREE':
        style = {
          color: 'success darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '已填寫'
        };
        break;
      case 'DISAGREE':
        style = {
          color: 'error  darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '不同意'
        };
        break;
      case 'BLANK':
        style = {
          color: 'warning  darken-2',
          icon: 'mdi-help-circle-outline',
          iconText: '未填寫'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // C10 ----------------------------------------------------------------
  // 原始同意書版本
  consentCurrentSwitchStyle: (status) => {
    let style = {};

    // 非當前版本的 才顯示switch和switchText
    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '',
          switch: 'mdi-check-bold',
          switchText: '指定為當前版本'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '',
          switch: '',
          switchText: ''
        };
        break;
    }

    return style;
  },
  // C20 ----------------------------------------------------------------
  // 追加同意書類型的狀態
  consentTypeStatusStyle: (status) => {
    let style = null;

    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '停用'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用'
        };
        break;
    }

    return style;
  },
  // C40 ----------------------------------------------------------------
  // 問卷狀態
  questionnaireStatusSwitchStyle: (status) => {
    let style = null;

    switch (status) {
      case 'DISABLE':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '停用',
          switch: 'mdi-eye-off',
          switchText: '啟用'
        };
        break;
      case 'ENABLE':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用',
          switch: 'mdi-eye',
          switchText: '停用'
        };
        break;
      default:
        style = {
          color: '',
          icon: '',
          iconText: '未知',
          switch: '',
          switchText: '未知'
        };
    }

    return style;
  },
  // 問卷版本
  currentSwitchStyle: (status) => {
    let style = {};

    // 非當前版本的 才顯示switch和switchText
    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '',
          switch: 'mdi-check-bold',
          switchText: '指定為當前版本'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '',
          switch: '',
          switchText: ''
        };
        break;
      default:
        style = {
          color: '',
          icon: '',
          iconText: '未知',
          switch: '',
          switchText: '未知'
        };
    }

    return style;
  },
  // 問卷可重複發送
  repeatableStyle: (repeatable) => {
    let style = {};

    switch (repeatable) {
      case true:
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: ''
        };
        break;
      case false:
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: ''
        };
        break;
      default:
        style = {
          color: '',
          icon: '',
          iconText: '未知'
        };
    }

    return style;
  },
  // D30 D40 D50 ----------------------------------------------------------------
  // 資訊管理狀態
  infoStatusSwitchStyle: (status) => {
    let style = null;

    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '隱藏',
          switch: 'mdi-eye-off',
          switchText: '顯示'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '顯示',
          switch: 'mdi-eye',
          switchText: '隱藏'
        };
        break;
    }

    return style;
  },
  // D60 ----------------------------------------------------------------
  // QA狀態
  qaStatusSwitchStyle: (status) => {
    let style = null;

    switch (status) {
      case 'HIDDEN':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '隱藏',
          switch: 'mdi-eye-off',
          switchText: '顯示'
        };
        break;
      case 'DISPLAY':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '顯示',
          switch: 'mdi-eye',
          switchText: '隱藏'
        };
        break;
    }

    return style;
  },
  // E ----------------------------------------------------------------
  // 駐站狀態
  stationStatusStyle: (status) => {
    let style = null;

    switch (status) {
      case 'DISABLE':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '停用'
        };
        break;
      case 'ENABLE':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // 預約時段狀態
  reservationTimeSlotStatusStyle(status) {
    let style = null;

    switch (status) {
      case 'DISABLE':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '停用'
        };
        break;
      case 'ENABLE':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // 預約狀態
  reservationStatusStyle(status) {
    let style = null;

    switch (status) {
      case 'CANCELLED':
        style = {
          color: 'error darken-2',
          icon: 'mdi-close-circle-outline',
          iconText: '預約取消'
        };
        break;
      case 'SUCCESS':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '預約成功'
        };
        break;
      default:
        style = {
          color: 'info  darken-2',
          icon: 'mdi-account-question',
          iconText: '未知'
        };
        break;
    }

    return style;
  },
  // Z10 ----------------------------------------------------------------
  // 後台帳號狀態
  systemAccountStatusStyle: (status) => {
    let style = null;

    switch (status) {
      case '0':
        style = {
          color: 'error darken-2',
          icon: 'mdi-cancel',
          iconText: '停用'
        };
        break;
      case '1':
        style = {
          color: 'success  darken-2',
          icon: 'mdi-check-circle-outline',
          iconText: '啟用'
        };
        break;
    }

    return style;
  }
};
