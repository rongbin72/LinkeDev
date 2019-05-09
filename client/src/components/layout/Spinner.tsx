import React from 'react'
import { HashLoader } from 'react-spinners'
import { css, SerializedStyles } from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`
export const Spinner: React.FC = () => (
  <>
    <HashLoader
      css={override as (SerializedStyles & string)}
      sizeUnit={'px'}
      size={100}
      color={'#17a2b8'}
    />
  </>
)

export default Spinner
