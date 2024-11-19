'use client'
import Sidebar from '@/components/Sidebar'

const layout = ({children}) => {
  return (
    <div>
      <Sidebar/>
    <div> 
      
{children}
      </div>
    </div>
  )
}

export default layout
