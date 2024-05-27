import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

const SlideTopMainItem = ({ url, pic, title }) => {
  const styleObj = {
    background: `url('./images/${pic}') no-repeat center`,
    backgroundSize: "cover",
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SwiperSlide>
      <a href={url} style={styleObj}>
        <p
          className="slide-title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
      </a>
    </SwiperSlide>
  );
};

export default SlideTopMainItem;
