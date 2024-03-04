import React, { useEffect } from 'react'
import { TitleSection } from '../../atoms'
import { Table } from '..'



const index = (props) => {

    
    const { data, title, titleMore, lihatSemua, isActive } = props
    return (
        <div>
            <TitleSection title={title} titleMore={titleMore} lihatSemua={lihatSemua} />
            <div className=''>
                <Table isActive={isActive}  time={Date.now()} data={data} />
            </div>
        </div>
    )
}

export default index