const pageRouter = [
  {
    method: 'GET',
    path: '/',
    handler: 'home.index',
    config: {
      auth: false,
      middlewares: ['api::frontend.view']
    },
  },
];

const ajaxRouter = [
  {
    method: 'GET',
    path: 'api/user/login',
    handler: 'user.api_login',
    config: {
      auth: false,
      middlewares: ['api::frontend.api']
    },
  },
]




export default {
  routes: [
    ...pageRouter,
    ...ajaxRouter,
  ],
};
