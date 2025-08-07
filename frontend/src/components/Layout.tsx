import React from 'react';
import { Layout as AntLayout, Menu, Typography } from 'antd';
import { BulbOutlined, ToolOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/creativity',
      icon: <BulbOutlined />,
      label: '创意生成器',
    },
    {
      key: '/tools',
      icon: <ToolOutlined />,
      label: '工具列表',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntLayout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppstoreOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            AI Tools Platform
          </Title>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none', backgroundColor: 'transparent' }}
        />
      </Header>
      <Content>
        <div className="site-layout">
          {children}
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;