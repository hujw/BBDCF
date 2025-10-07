export default [
  {
    path: '/C/C10',
    name: 'c-c10',
    component: () => import(/* webpackChunkName: "consent" */ '@/pages/privilegeC/C10.vue'),
    meta: {
      breadcrumb: [
        {
          text: '同意書管理',
          disabled: true,
          to: ''
        },
        {
          text: '同意書列表',
          disabled: true,
          to: 'C10'
        }
      ]
    }
  }
];
