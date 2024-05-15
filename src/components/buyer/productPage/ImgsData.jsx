import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const ImgsData = () => {
  const imagesData = useMemo(() => [
    "/img.jpeg",
    "/veg1.webp",
    "/veg2.webp",
    "/veg3.webp",
    "/veg4.webp",
  ], []);

  const [selectImg, setSelectImg] = useState(imagesData[0]);

  const handleImgChange = (clickedImg) => {
    if (selectImg !== clickedImg) {
      setSelectImg(clickedImg);
    }
  };

  useEffect(() => {
    console.log("Setting selectedImg:", imagesData[0]);
    setSelectImg(imagesData[0]);
  }, [imagesData]);

  return (
    <div className="sm:h-[100%]  sm:w-[100%] lg:h-[90%] lg:w-[85%]  mb-2 flex gap-3  ">
      <div className="sm:max-w-[15.2%] sm:max-h-[15.5%] hidden md:block md:w-[50%]">
        {imagesData.map((imgs, index) => (
          <Image
            key={index}
            src={imgs}
            onClick={() => handleImgChange(imgs)}
            className="mb-2 border border-gray-400 rounded-md"
            alt=""
          />
        ))}
      </div>

      <div>
        <div className="border border-gray-400 overflow-hidden object-cover rounded-md md:w-[100%] md:h-[97%] h-[80%] aspect-w-4 aspect-h-5 mb-3">
          <Image src={selectImg} alt="" className="object-cover h-full w-full" />
        </div>

        <div className="">
          <div className="flex w-[72%] h-[80%] md:hidden md:w-[50%] sm:gap-2 gap-1">
            {imagesData.map((imgs, index) => (
              <Image
                key={index}
                src={imgs}
                onClick={() => handleImgChange(imgs)}
                className="mb-2 border border-gray-400 rounded-md w-[25%] h-[40%] "
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgsData;
