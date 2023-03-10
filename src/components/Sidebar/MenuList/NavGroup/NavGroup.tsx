// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, List, Typography } from '@mui/material'

// project imports
import NavItem from '../NavItem/NavItem'
import NavCollapse from '../NavCollapse/NavCollapse'

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

export interface IItem {
  id: string | number
  title: string
  type?: string
  url: string
  icon?: any
  breadcrumbs?: boolean
  caption?: string
  children: IItem[]
}

// export interface IItems {
//   id: string
//   title: string
//   type: string
//   children: IItem[]
// }

const NavGroup: React.FC<{ item: IItem }> = ({ item }) => {
  const theme: any = useTheme()

  // menu list collapse & items
  const items = item.children.map(menu => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />
      default:
        return (
          <Typography key={menu.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        )
    }
  })
  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant='caption'
              sx={{ ...theme.typography.menuCaption }}
              display='block'
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant='caption'
                  sx={{ ...theme.typography.subMenuCaption }}
                  display='block'
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  )
}

export default NavGroup
