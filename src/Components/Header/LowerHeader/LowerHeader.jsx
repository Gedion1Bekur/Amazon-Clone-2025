
import styels from '../header.module.css'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
function LowerHeader() {
  return (
    <div className={styels.container_grid}>
     <ul>
      <li>

        <MenuOutlinedIcon/>
        <p>All</p>


      </li>
      <li>Todys's Deals</li>
      <li>Customer Service</li>
      <li>Registry</li>
      <li>Gift Cards</li>
      <li>Sell</li>
     </ul>
    </div>
  )
}

export default LowerHeader
