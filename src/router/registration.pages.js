export const registrationPages = [
  {
    path: '/registration',
    component: () => import('@/pages/registration/RegistrationPage'),
    name: "registration",
  },
  {
    path: '/registration/done',
    component: () => import('@/pages/registration/RegistrationDonePage'),
    name: "registration-done",
  },
  {
    path: '/registration/activated',
    component: () => import('@/pages/registration/RegistrationActivatedPage'),
    name: "registration-activated",
  }
]