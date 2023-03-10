import { Button, Link } from '@mui/material'
import IconFSO from '../../assets/FSO.gif'
const Logo: React.FC<any> = ({ style }) => {
  return (
    <Button color='inherit' component={Link} href='/admin' style={style}>
      <img src={IconFSO} alt='' style={{ width: '34px', height: '40px' }} />
      <span style={{ marginLeft: '8px', fontSize: '0.8rem' }}>
        Система Мониторинга
      </span>
    </Button>
  )
}

export default Logo
