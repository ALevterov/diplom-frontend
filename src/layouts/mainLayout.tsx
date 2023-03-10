import React, { useMemo } from 'react'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import {
  Container,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material'

// import Header from './Header';
// import Customization from '../Customization';

// import useConfig from 'hooks/useConfig'
// import { drawerWidth } from 'store/constant';
// import { openDrawer } from 'store/slices/menu';
// assets
// import { IconChevronRight } from '@tabler/icons'
import Sidebar from '../components/Sidebar/Sidebar'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import navigation from '../menu-items/menu-items'
import { openDrawer } from '../store/slices/menu'
import { drawerWidth } from '../store/constant'
import Header from '../components/Header/Header'
import { IconChevronRight } from '@tabler/icons-react'

// styles
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
      },
    }),
  })
)

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const theme: any = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

  const dispatch = useAppDispatch()
  const { drawerOpen } = useAppSelector(state => state.menu)
  const container = false

  React.useEffect(() => {
    dispatch(openDrawer(!matchDownMd))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd])

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position='fixed'
        color='inherit'
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerOpen ? theme.transitions.create('width') : 'none',
        }}
      >
        {header}
      </AppBar>

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Main theme={theme} open={drawerOpen}>
        {/* breadcrumb */}
        {container && (
          <Container maxWidth='lg'>
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            {children}
          </Container>
        )}
        {!container && (
          <>
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            {children}
          </>
        )}
      </Main>
      {/*<Customization />*/}
    </Box>
  )
}

export default MainLayout
