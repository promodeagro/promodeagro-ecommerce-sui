// pages/404.js
'use client'
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="404"
        title={<div style={{ fontSize: '36px' }}>404</div>}
        subTitle={<div style={{ fontSize: '18px' }}>Sorry, the page you visited does not exist.</div>}
        extra={
          <Link href="/">
            <Button
              
              style={{ marginTop: '16px', height: '40px', borderRadius: '20px' }}
              icon={<HomeOutlined />}
            >
              Back Home
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
