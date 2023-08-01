import { Constant } from './_utils';

const { ApiPrefix } = Constant;

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘',
    },
    'pt-br': {
      name: 'Dashboard',
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '',
    name: 'User Management',
    zh: {
      name: '用户管理',
    },
    'pt-br': {
      name: 'Usuário',
    },
    icon: 'user',
    route: '/user',
  },
];

export default [
  {
    url: `${ApiPrefix}/routes`,
    method: 'get',
    response: () => {
      return database;
    },
  },
];