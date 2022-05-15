import * as React from 'react'
import styled from "@emotion/styled";

const PageLayoutContainer = styled.div`
    padding: 10px;
    min-height: calc(100vh - 160px)
`

export const PageLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <PageLayoutContainer>
        {children}
    </PageLayoutContainer>
}