import admin from '@/middleware/admin'
export default [
	{
        path: '/dashboard',
        name: 'auth.panel',
        component: () => import('@/views/Panel.vue'),
    },
    {
        path: '/panel',
        name: 'auth.dashboard',
        redirect: { name: 'auth.panel' }
    },
    {
        path: '/profile',
        name: 'auth.profile',
        component: () => import('@/views/Profile.vue'),
    },
    {
        path: '/users/',
        name: 'auth.users',
        component: ()=> import('@/views/User/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/User/List.vue'),
                name: 'auth.users.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/User/Add.vue'),
                name: 'auth.users.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/User/Edit.vue'),
                name: 'auth.users.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/roles/',
        name: 'auth.roles',
        component: ()=> import('@/views/Role/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Role/List.vue'),
                name: 'auth.roles.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Role/Form.vue'),
                name: 'auth.roles.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Role/Form.vue'),
                name: 'auth.roles.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/settings/',
        name: 'auth.settings',
        component: ()=> import('@/views/Setting/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Setting/List.vue'),
                name: 'auth.settings.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Setting/Form.vue'),
                name: 'auth.settings.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Setting/Form.vue'),
                name: 'auth.settings.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/merchants/',
        name: 'auth.merchants',
        component: ()=> import('@/views/Merchant/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Merchant/List.vue'),
                name: 'auth.merchants.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Merchant/Form.vue'),
                name: 'auth.merchants.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Merchant/Form.vue'),
                name: 'auth.merchants.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/payments/',
        name: 'auth.payments',
        component: ()=> import('@/views/Payment/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Payment/List.vue'),
                name: 'auth.payments.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Payment/Form.vue'),
                name: 'auth.payments.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Payment/Form.vue'),
                name: 'auth.payments.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/permissions/',
        name: 'auth.permissions',
        component: ()=> import('@/views/Permission/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Permission/List.vue'),
                name: 'auth.permissions.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Permission/Form.vue'),
                name: 'auth.permissions.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Permission/Form.vue'),
                name: 'auth.permissions.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/brands/',
        name: 'auth.brands',
        component: ()=> import('@/views/Brand/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/Brand/List.vue'),
                name: 'auth.brands.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/Brand/Form.vue'),
                name: 'auth.brands.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/Brand/Form.vue'),
                name: 'auth.brands.edit'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/brief-forms/',
        name: 'auth.briefforms',
        component: ()=> import('@/views/BriefForm/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/BriefForm/List.vue'),
                name: 'auth.briefforms.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/BriefForm/Form.vue'),
                name: 'auth.briefforms.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/BriefForm/Form.vue'),
                name: 'auth.briefforms.edit'
            },
            {
                path: 'assign/:id',
                component: ()=> import('@/views/BriefForm/Assign.vue'),
                name: 'auth.briefforms.assign'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/payment-refunds/',
        name: 'auth.paymentrefunds',
        component: ()=> import('@/views/PaymentRefund/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/PaymentRefund/List.vue'),
                name: 'auth.paymentrefunds.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/PaymentRefund/Form.vue'),
                name: 'auth.paymentrefunds.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/PaymentRefund/Form.vue'),
                name: 'auth.paymentrefunds.edit'
            },
        ],
        beforeEnter: admin,
    },
    {
        path: '/marketing-expenses/',
        name: 'auth.marketingexpenses',
        component: ()=> import('@/views/MarketingExpense/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/MarketingExpense/List.vue'),
                name: 'auth.marketingexpenses.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/MarketingExpense/Form.vue'),
                name: 'auth.marketingexpenses.add'
            },
            {
                path: 'edit/:id',
                component: ()=> import('@/views/MarketingExpense/Form.vue'),
                name: 'auth.marketingexpenses.edit'
            },
        ],
        beforeEnter: admin,
    },
    {
        path: '/user-submissions/',
        name: 'auth.usersubmissions',
        component: ()=> import('@/views/UserSubmission/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/UserSubmission/List.vue'),
                name: 'auth.usersubmissions.listing'
            },
            {
                path: 'view/:id',
                component: ()=> import('@/views/UserSubmission/View.vue'),
                name: 'auth.usersubmissions.view'
            }
        ],
        beforeEnter: admin,
    },
    {
        path: '/brand-queries/',
        name: 'auth.brandformsubmissions',
        component: ()=> import('@/views/BrandFormSubmission/Main.vue'),
        children: [
            {
                path: '',
                component: ()=> import('@/views/BrandFormSubmission/List.vue'),
                name: 'auth.brandformsubmissions.listing'
            },
            {
                path: 'add',
                component: ()=> import('@/views/BrandFormSubmission/Form.vue'),
                name: 'auth.brandformsubmissions.add'
            },
        ],
        beforeEnter: admin,
    },
    {
        path: '/user-targets/',
        name: 'auth.usertargets',
        component: ()=> import('@/views/UserTarget/Main.vue'),
        children: [
            {
                path: 'buh',
                component: ()=> import('@/views/UserTarget/BUH.vue'),
                name: 'auth.usertargets.buh'
            },
            {
                path: 'sales',
                component: ()=> import('@/views/UserTarget/SALES.vue'),
                name: 'auth.usertargets.sales'
            }
        ],
        beforeEnter: admin,
    },
];
