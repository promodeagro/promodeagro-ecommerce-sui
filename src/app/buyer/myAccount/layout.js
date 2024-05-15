'use client'
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, Button, Input } from "antd";
import Header from "@/components/buyer/home/Header";
import { useRouter } from "next/navigation";
import {
  ShoppingCartOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;
const { Search } = Input;

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [display, setDisplay] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const onSearch = (value) => console.log(value);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link href={"/buyer/myAccount"}>My Account</Link>, "1", <UserOutlined />),
    getItem(<Link href={"/buyer/myAccount/myOrders"}>My Orders</Link>, "4", <ShoppingCartOutlined />),
  ];
  return (
    <div className="w-[70%]">
      <Header />
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          {display && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{
                overflow: "auto",
                height: "100vh",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                style={{ height: "100%" }}
                items={items}
              />
            </Sider>
          )}
          <Layout className="site-layout flex flex-col">
            <Content className="p-10">
              <div>
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
        
      </Layout>
    </div>
  );
}
