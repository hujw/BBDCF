// 導航守衛
export default ({ app, route, store, $toast }) => {
  app.router.beforeEach((to, from, next) => {
    return next();
  });
};
