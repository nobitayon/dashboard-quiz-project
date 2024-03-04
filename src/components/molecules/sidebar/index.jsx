import React from 'react'
import { DASHBOARD_SIDEBAR_LINKS } from '../../../lib/const/navigation';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './component.module.css'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {
  return (
    <div className={styles.sidenav}>
        
        <div className='flex items-center gap-2 px-1 py-3'>
            <span className='text-neutral-100 text-lg'>Dashboard Quiz</span>
        </div>
        
        {/* top part */}
        <div className='flex-1 py-8 flex flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                <div key={item.key}>
                    <SidebarLink key={item.key} item={item}/>
                </div>
            ))}
        </div>

        {/* bottom part */}
        <div>bottom part</div>
    </div>
  )
}

function SidebarLink({item}){
    const {pathname} = useLocation()
    return (
        <Link to={item.path} className={classNames(pathname===item.path ? 'bg-neutral-700 text-white':'text-neutral-400',linkClass)}>
            <span className='text-xl'></span>
            {item.label}
        </Link>
    )
}


export default Sidebar