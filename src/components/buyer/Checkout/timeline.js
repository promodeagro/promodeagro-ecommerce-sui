"use client"
import React, { useState } from 'react';
import { Steps } from 'antd';
import { EnvironmentOutlined, TruckOutlined, WalletOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'; // Corrected import path

const { Step } = Steps;

const Timeline = () => {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    const steps = [
        {
            title: 'Delivery Address',
            description: 'Home - jhg134ggv ghc Siddiq Nagar, HITEC City',
            icon: <EnvironmentOutlined />,
            onClick: () => router.push("/buyer/Checkout/DeliveryAddress")
        },
        {
            title: 'Delivery Options',
            description: 'Choose your convenient date and time for delivery',
            icon: <TruckOutlined />,
            onClick: () => router.push("/buyer/Checkout/DeliveryOption")
        },
        {
            title: 'Payment Options',
            description: 'Pay Order amount by selecting any payment mode',
            icon: <WalletOutlined />,
            onClick: () => router.push("/buyer/Checkout/PaymentOption")
        }
    ];

    const onChange = current => {
        console.log('onChange:', current);
        setCurrent(current);
    };

    return (
        <div className='bg-[#71a31b] w-full flex justify-center'>
            <Steps
                className="w-[60%] text-sm"
                direction="horizontal"
                current={current}
                onChange={onChange}
            >
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        title={<span style={{ color: 'white' }}>{step.title}</span>}
                        description={<span style={{ color: 'white' }}>{step.description}</span>}
                        icon={step.icon}
                        onClick={step.onClick}
                    />
                ))}
            </Steps>
        </div>
    );
};

export default Timeline;
