import React, { useEffect } from 'react'
import { TitleSection } from '../../atoms'
import { Table } from '..'
import { convertDateNowToUnix, convertToUnix } from '../../../lib/util/dateRelated'



const index = (props) => {

    
    const { data, title, titleMore, lihatSemua, isActive } = props
    
    const time = convertDateNowToUnix()
    
    return (
        <div>
            <TitleSection title={title} titleMore={titleMore} lihatSemua={lihatSemua} />
            <div className=''>
                <Table isActive={isActive}  time={time} data={data} />
            </div>
        </div>
    )
}

export default index