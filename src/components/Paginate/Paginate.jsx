import { Pagination, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'

function Paginate({ currentPage, totalPages, onSetPage }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'rgba(235, 238, 243, 1)',
          colorBgTextActive: '#1890FF',
          colorBgTextHover: '#1890FF',
          colorPrimaryHover: 'white',
          colorPrimary: 'white',
          colorInfoTextHover: 'white',
          colorHover: 'white',
        },
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
          },
        },
      }}
    >
      <Pagination
        align="center"
        onChange={(page) => onSetPage(page)}
        current={currentPage}
        total={totalPages}
        showSizeChanger={false}
      />
    </ConfigProvider>
  )
}

export default Paginate
