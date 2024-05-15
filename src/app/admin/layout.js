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
} from "@ant-design/icons";

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
  const handleSearch = (query) => {
    // Filter products based on search query
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };
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
            justifyContent: "space-between" ,
            alignItems: "center",
            alignContent: "center",
            backgroundColor: "#1a1a1a",
          }}
        >
          <div className="md:flex">
            <h2 className="text-white uppercase">Synectiks</h2>
          </div>
          <div className="flex">
            <div className="flex bg-white border rounded-md ml-6">
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{width:600}}
      
              />
            </div>
          </div>
          <div className="">
            <BellOutlined className="text-white text-lg" />
            <Button className="text-black ml-2">My Store</Button>
          </div>
        </Header>
      )}

      <Layout>
        {display && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              marginTop: "10vh",
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
          <Content style={{ paddingLeft: 10 }}>
            <div className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}>{children}</div>
            <Footer style={{ marginLeft: 200 }}></Footer>
          </Content>
        </Layout>
      </Layout>
      </Layout>
  );
}