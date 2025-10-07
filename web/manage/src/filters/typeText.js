import Vue from 'vue';

Vue.filter('nftTypeToText', (value, format) => {
  const allText = ['數位創作', '憑證', '遊戲'];

  return toTextByValue(value, allText);
});

Vue.filter('shelfTypeToText', (value, format) => {
  const allText = ['定價', '競拍', '眾籌'];

  return toTextByValue(value, allText);
});

Vue.filter('batchTaskItemStatusToText', (value, format) => {
  const allText = ['等待', '成功', '失敗'];

  return toTextByValue(value, allText);
});

Vue.filter('shelfTypeToText2', (value, format) => {
  const allText = { pricing: '定價', bid: '競拍' };

  return allText[value] || '未上架';
});

Vue.filter('tokenTypeToText', (value, format) => {
  const allText = { Ethereum: 'ETH', Mojo: 'MJOY', TetherUS: 'USDT', USDCoin: 'USDC', UJCoin: 'UJ', MaticToken: 'MATIC', ManaBean: 'MBN' };

  return allText[value];
});

Vue.filter('shelfStatusToText', (value, format) => {
  const allText = ['自動下架', '已上架', '官方下架', '已出售'];

  return toTextByValue(value, allText);
});

Vue.filter('hideToText', (value, format) => {
  const allText = ['顯示', '隱藏'];

  return toTextByValue(value, allText);
});

Vue.filter('nullToUnShelf', (value) => {
  return value === '未知' ? '未上架' : value;
});

Vue.filter('userStatusToText', (value, format) => {
  const allText = ['停用', '啟用', '凍結'];

  return toTextByValue(value, allText);
});

Vue.filter('auditTypeToText', (value, format) => {
  const allText = ['未審核', '通過', '否決'];

  return toTextByValue(value, allText);
});

Vue.filter('kycLevelToText', (value, format) => {
  const allText = ['Level - 0', 'Level - 1', 'Level - 2'];

  return toTextByValue(value, allText);
});

Vue.filter('categoryToText', (value, format) => {
  const allText = {
    art: '藝術',
    photography: '攝影',
    other: '其他',
    sport: '運動',
    music: '音樂',
    gaming: '遊戲',
    metaverse: '元宇宙',
    tradingCards: '收藏卡',
    all: '全部'
  };

  return allText[value] || value;
});

Vue.filter('messageTypeToText', (value, format) => {
  const allText = ['', '一般通知', '資料補充', '追蹤聯繫', '計畫邀請', '意外發現通知', '追加同意通知'];
  // const allText = ['系統', '活動']

  return toTextByValue(value, allText);
});

Vue.filter('transactionTypeToText', (value, format) => {
  const allText = {
    withdrawal: '出金',
    deposit: '入金',
    credit: '信用卡',
    pricingBuy: '定價(買)',
    pricingSell: '定價(賣)',
    bidBuy: '競標(買)',
    bidSell: '競標(賣)',
    couponA: '折價卷',
    couponB: '回饋卷',
    gas: '瓦斯',
    fee: '手續費',
    copyrightGet: '收版權費',
    copyrightPay: '發版權費',
    mintFee: '鑄造費',
    addMoney: '活動發送'
  };

  return allText[value];
});

Vue.filter('transactionStatusToText', (value, format) => {
  const allText = ['等待(凍結)', '成功', '失敗', '退還'];

  return toTextByValue(value, allText);
});

Vue.filter('messageTitleToText', (value, format) => {
  const allText = [
    '競標出價成功',
    '官方訊息',
    '競標得標',
    '競標出價被超越',
    'KYC審核結果',
    'NFT鑄造結果',
    '出入金結果',
    '2FA變更通知',
    '購買',
    '賣出'
  ];

  return toTextByValue(value, allText);
});

Vue.filter('collectionStatusToText', (value, format) => {
  const allText = ['PENDING', 'RUNNING', 'SUCCESS', 'ERROR'];

  return toTextByValue(value, allText);
});

Vue.filter('transactionTypeToText', (value, format) => {
  const allText = { All: '全部', minted: '鑄造', sale: '購買' };

  return allText[value] || value;
});

const toTextByValue = (value, arr) => {
  const typeText = '';

  try {
    const valueInt = parseInt(value);

    return arr[valueInt] || '未知';
  } catch (e) {
    console.error(e);

    return '未知';
  }
};
