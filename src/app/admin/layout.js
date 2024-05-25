"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, Button, Input } from "antd";
import {
  HomeFilled,
  ShoppingCartOutlined,
  TagFilled,
  UserOutlined,
  BellOutlined,
  BarChartOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [display, setDisplay] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/orders/summary") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [pathname]);

  const onSearch = (value) => console.log(value);

  const items = [
    getItem(<Link href={"/admin"}>home</Link>, "1", <HomeFilled />),
    getItem(<Link href={"/admin/orders"}>Orders</Link>, "2", <ShoppingCartOutlined />),
    {
      key: "3",
      icon: <TagFilled />,
      label: <Link href={"/admin/products"}>Products</Link>,
      children: [
        getItem(<Link href={"/admin/products/inventory"}>Inventory</Link>, "3.1", <BarChartOutlined />),
      ],
    },
    getItem(<Link href={"/admin/customers"}>customers</Link>, "4", <UserOutlined />),
    getItem(<Link href={"/admin/analytics"}>analytics</Link>, "5", <BarChartOutlined />),
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {display && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1a1a1a",
          }}
        >
          {isSmallScreen && (
            <Button
              type="text"
              className="md:hidden text-white"
              onClick={toggleSidebar}
              icon={sidebarVisible ? <CloseOutlined /> : <MenuOutlined />}
            />
          )}
          <div className="flex items-center">
            <h2 className="text-white uppercase">Synectiks</h2>
          </div>
          <div className="flex items-center">
            <div className="md:flex  border rounded-md ml-6">
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: 600 }}
              />
            </div>
          </div>
          <div className="flex items-center">
            <BellOutlined className="text-white text-lg" />
            <Button className="text-black ml-2">My Store</Button>
          </div>
        </Header>
      )}

      <Layout>
        {display && (
          <>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 2,
                marginTop:"4rem",
                display: isSmallScreen ? (sidebarVisible ? "block" : "none") : "block",
              }}
              width={200}
            >
              <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                style={{ height: "100%" }}
                items={items}
              />
            </Sider>
            {sidebarVisible && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  
                }}
                onClick={toggleSidebar}
              />
            )}
          </>
        )}
        <Layout className="site-layout" style={{ marginLeft: isSmallScreen ? 0 : collapsed ? 80 : 200 }}>
          <Content style={{ padding: 10 }}>
            <div>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Footer Content
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
