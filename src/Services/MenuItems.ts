export function getMenuItems(t:any) {
   return [
       {
           title: t('module.dashboard'),
           url: '/dashboard',
           icon: 'chart-area'
       },
       {
           title: t('module.user'),
           url: '/user',
           icon: 'users'
       },
       {
           title: t('module.report'),
           url: '/report',
           icon: 'file-contract'
       },
       {
           title: t('module.export'),
           url: '/export',
           icon: 'file-export'
       },
       {
           title: 'Logout',
           url: '/logout',
           icon: 'right-from-bracket'
       },
   ];
}
