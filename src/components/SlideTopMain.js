import { useEffect, useRef, useState } from "react";
import SlideTopMainItem from "./SlideTopMainItem";
import { getTopSlide } from "../apis/api";
// Swiper npm 사용
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const SlideTopMain = () => {
  // hook 자리
  const whereTag = useRef(null);
  const slideArea = useRef(null);
  // 슬라이드 데이터 관리 (화면 갱신 반영)
  const [list, setList] = useState([]);
  // swipe 로 만든 html 을 제어한다.
  const topSlide = useRef(null);

  const getTopSlideCall = async () => {
    const result = await getTopSlide();
    setList(result);
    // const slideArea = document.querySelector(".topslide");
    slideArea.current.addEventListener("mouseenter", function () {
      topSlide.current.autoplay.stop();
    });
    slideArea.current.addEventListener("mouseleave", function () {
      topSlide.current.autoplay.start();
    });
  };

  useEffect(() => {
    getTopSlideCall();
    return () => {};
  }, []);

  return (
    <div className="main-top-slide br-20">
      <Swiper
        className="topslide"
        ref={slideArea}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onInit={swiper => {
          topSlide.current = swiper;
        }}
      >
        {/* 이유는 아래처럼 자동 코등 되니까.. */}
        <div className="swiper-wrapper"></div>

        {/* 아이템 배치 */}
        {list.map((item, index, arr) => (
          <SlideTopMainItem
            key={index}
            url={item.url}
            pic={item.pic}
            title={item.title}
          ></SlideTopMainItem>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideTopMain;
