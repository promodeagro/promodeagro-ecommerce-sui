// pages/loading.js
'use client'
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const LoadingPage = () => {
  return (
    <div className="container">
   <span className="loading loading-spinner loading-xs"></span>
<span className="loading loading-spinner loading-sm"></span>
<span className="loading loading-spinner loading-md"></span>
<span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingPage;
