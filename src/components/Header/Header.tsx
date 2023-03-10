// material-ui
import { useTheme } from '@mui/material/styles'
import { Avatar, Box } from '@mui/material'

// project imports
// import MobileSection from './MobileSection'
// import ProfileSection from './ProfileSection'

// assets
// import { IconMenu2 } from '@tabler/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { openDrawer } from '../../store/slices/menu'
import LogoSection from '../LogoSection/LogoSection'
import { IconMenu2 } from '@tabler/icons-react'

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme: any = useTheme()

  const dispatch = useAppDispatch()
  const { drawerOpen } = useAppSelector(state => state.menu)

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component='span'
          sx={{
            display: { xs: 'none', md: 'block' },
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogoSection />
        </Box>
        <Avatar
          variant='rounded'
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.secondary.dark,
            '&:hover': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.light,
            },
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color='inherit'
        >
          <IconMenu2 stroke={1.5} size='20px' />
        </Avatar>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* live customization & localization */}
      {/*<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LocalizationSection />
      </Box>*/}

      {/* notification & profile */}
      {/*<NotificationSection />*/}
      {/* <ProfileSection /> */}

      {/* mobile header */}
      {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box> */}
    </>
  )
}

export default Header
