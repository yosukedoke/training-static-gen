import React from 'react'

import Layout from '../components/layout'
import MetaData from '../components/meta-data'

const NotFound = () => (
  <Layout>
    <MetaData
      pageTitle="ページが見つかりません"
    />
    <h1 style={{ padding: '20vh 0', textAlign: 'center' }}>お探しのページが見つかりませんでした</h1>
  </Layout>
)

export default NotFound