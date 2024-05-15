"use client";
import React, { useState } from "react";
import { Card, Button, Modal, Radio, Steps, Popconfirm } from "antd"; // Added Popconfirm import
import { DeleteOutlined, DashboardFilled } from "@ant-design/icons";
import Image from "next/image";
import pro from "../../../../components/admin/images/product.svg";
import { useRouter } from "next/navigation"; // Fixed import path
import { useSelector,useDispatch } from "react-redux";
import { remove } from "@/redux/slices/CartSlice";

const DeliveryOption = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  function GotoPayment() {
    router.push("/buyer/Checkout/PaymentOption");
  }
  const removeToCart = (data) => {
    dispatch(remove(data));
  };
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemsModalVisible, setItemsModalVisible] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", image: pro },
    { id: 2, name: "Item 2", image: pro },
    { id: 3, name: "Item 3", image: pro },
    // Add more items as needed
  ]);
  const dates = [];
  const currentDate = new Date();
  for (let i = 0; i < 5; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate.toISOString().slice(0, 10));
  }

  const slotTimings = {
    allSlots: "Any Time",
    eveningSlots: "6pm - 8pm",
    morningSlots: "9am - 11am",
    afternoonSlots: "1pm - 3pm",
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseItemsModal = () => {
    setItemsModalVisible(false);
  };

  const handleViewItems = () => {
    setItemsModalVisible(true);
  };

  const AddProductsintocart = useSelector(state => state.cartDetails.cart);

  return (
    <div className="w-[100vw] h-[100vh] flex gap-10 justify-center m-0 bg-slate-100 pt-10">
      <div>
        <Card title="Select a Delivery Option">
          <div className="w-[100%]">
            <div className="flex mb-3 gap-2">
              {AddProductsintocart.map((item) => (
                <div key={item.id} className="w-[10%] h-[45%] border rounded-md">
                  <Image src={item.image} alt={item.name} width={100} height={100}/>
                </div>
              ))}
              <div
                className="w-[10%] h-[55px] border rounded-md text-center cursor-pointer hover:bg-slate-200"
                onClick={handleViewItems}
              >
                View {AddProductsintocart.length} items
              </div>
            </div>

            <Card>
              <div className="grid grid-cols-3">
                <p>Delivery Slot</p>
                <div className="w-[1px] h-full bg-gray-200"></div>
                {/* Modal for selecting date and slot */}
                <Modal
                  title="Select Date and Slot"
                  open={modalVisible}
                  onCancel={handleCloseModal}
                  footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleCloseModal}>
                      Submit
                    </Button>,
                  ]}
                  width={600}
                  headerBg
                >
                  <div className="flex gap-x-8">
                    <DashboardFilled />
                    <p>Select Date:</p>
                    <div className="flex gap-2">
                      {dates.map((date) => (
                        <Button key={date} onClick={() => handleDateSelect(date)}>
                          {date}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="gap-3 ">
                    <p>Select Slot:</p>
                    <Radio.Group value={selectedSlot} onChange={(e) => handleSlotSelect(e.target.value)}>
                      {Object.entries(slotTimings).map(([slot, timing]) => (
                        <Radio key={slot} value={slot}>
                          {timing}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </Modal>
                <div>
                  <p onClick={() => handleDateSelect(selectedDate || dates[0])} className="cursor-pointer">
                    Select Date: {selectedDate || dates[0]}
                  </p>
                  <p>Selected Slot: {selectedSlot && slotTimings[selectedSlot]}</p>
                </div>
              </div>
            </Card>
            <Button type="primary" danger className="float-end mt-3" onClick={GotoPayment}>
              Proceed To pay
            </Button>
          </div>
        </Card>

        {/* Modal for viewing items */}
        <Modal
          title="Items"
          open={itemsModalVisible}
          onCancel={handleCloseItemsModal}
          footer={[
            <Button key="close" onClick={handleCloseItemsModal}>
              Close
            </Button>,
          ]}
        >
          {AddProductsintocart.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Image src={item.image} alt={item.name} height={100} width={100} />
                <span className="ml-2">{item.name}</span>
              </div>
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={() => removeToCart(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
              </Popconfirm>
            </div>
          ))}
        </Modal>
      </div>
    </div>
  );
};

export default DeliveryOption;
