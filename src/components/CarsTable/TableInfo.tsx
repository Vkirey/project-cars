import * as React from 'react'
import styled from "@emotion/styled";
import { useCarsContext } from '../../providers/CarTableProvider';

const TableInfoContainer = styled.div`
margin-bottom: 12px;
`

const PaginationInfoSpan = styled.span`
font-size: 18px;
`

export const TableInfo: React.FC = () => {
    const { total, carsToShow } = useCarsContext()


    return <TableInfoContainer>
        <h2>Available cars</h2>
        <PaginationInfoSpan>Showing {carsToShow.length} of {total} results</PaginationInfoSpan>
    </TableInfoContainer>
}