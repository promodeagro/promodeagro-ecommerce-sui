'use client'
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
  const isWidth300 = useMediaQuery({ maxWidth: 300 });
  const isWidth400 = useMediaQuery({ maxWidth: 400 });
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
            padding:"0"
          }}
        >
          {isSmallScreen && (
          
          <Button
          type="text"
          className="text-white m-2"
          onClick={toggleSidebar}
          icon={sidebarVisible ? <CloseOutlined /> : <MenuOutlined />}
        />
        
          
          )}
          <div className="flex items-center "
                    style={{ margin: isSmallScreen ? "5px" : "30px" }}
                    >
            <h2 className="text-white uppercase">Synectiks</h2>
          </div>
          <div className="flex items-center m-2">
           
          <Search
    placeholder="input search text"
    onSearch={onSearch}
    style={{
        width: isSmallScreen
            ? "40vw" // For small screens
            : isWidth300
                ? "30vw" // For width less than 300
                : isWidth400
                    ? "35vw" // For width less than 400
                    : "50vw" // Default width
    }}
/>
            
          </div>
          <div className="flex items-center"
                              style={{ margin: isSmallScreen ? "5px" : "30px" }}>
            <BellOutlined className="text-white m-1 text-lg" />
            <Button className="text-black m-2" style={{ display: isSmallScreen ? "" : "block", 
            padding:isWidth300? "0px": "5px 10px"
            
            }}>{isSmallScreen ? "MS" : "My Store"}</Button>

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
                height: "100%",
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
          <Footer style={{ marginLeft: 200 }}></Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
