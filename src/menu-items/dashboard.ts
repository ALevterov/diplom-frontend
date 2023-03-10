// assets
// import DashboardIcon from '@mui/icons-material/Dashboard'
// import AnalyticsIcon from '@mui/icons-material/Analytics'
import { IconClipboardData, IconDeviceAnalytics } from '@tabler/icons-react'
// constant
const icons = {
  IconClipboardData,
  IconDeviceAnalytics,
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Панель управления',
  type: 'group',
  children: [
    {
      id: 'incidents',
      title: 'Инциденты',
      type: 'item',
      url: '/incidents',
      icon: icons.IconClipboardData,
      breadcrumbs: true,
    },
    {
      id: 'staff',
      title: 'Админ',
      type: 'item',
      url: '/admin',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: true,
    },
  ],
}

export default dashboard
