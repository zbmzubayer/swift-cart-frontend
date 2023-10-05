type NavLinks = {
  name: string;
  path: string;
};

const rootNavLinks: NavLinks[] = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Store',
    path: '/store',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Support',
    path: '/support',
  },
];

const adminNavLinks: NavLinks[] = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
  },
  {
    name: 'Products',
    path: '/admin/products',
  },
  {
    name: 'User',
    path: '/admin/users',
  },
  {
    name: 'Customers',
    path: '/admin/customers',
  },
  {
    name: 'Settings',
    path: '/admin/settings',
  },
];

const sellerNavLinks: NavLinks[] = [
  {
    name: 'Dashboard',
    path: '/seller/dashboard',
  },
  {
    name: 'Products',
    path: '/seller/products',
  },
  {
    name: 'Orders',
    path: '/seller/orders',
  },
  {
    name: 'Customers',
    path: '/seller/customers',
  },
  {
    name: 'Settings',
    path: '/seller/settings',
  },
];

export { adminNavLinks, rootNavLinks, sellerNavLinks };
