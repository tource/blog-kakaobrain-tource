import { useEffect, useRef, useState } from "react";
import MainBottomCardsItem from "./MainBottomCardsItem";
import { getCards, getNews } from "../apis/api";
// Swiper 활용
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainBottomCards = () => {
  // swiper 를 보관해 두고 화면 사이즈에 따라서 만들고, 지우고
  const cardSlide = useRef(null);
  const [cardList, setCardList] = useState([]);

  const makeCardSlide = () => {
    const wWidth = window.innerWidth;
    if (wWidth > 1024) {
      // swiper 를 제거
      if (cardSlide !== null) {
        // swiper 를 제거하는 코드
        // cardSlide.destroy();
        // useState 는 함수가 종료되어야 화면에 반영된다.
        // setCardSlide(null);
      }
    } else {
      // swiper 를 생성한다.
      // swiper 작동시키기(모바일에서만 작동해야함)
      if (cardSlide === null) {
        // const tempSlide = new Swiper(".cardslide", {
        //   loop: true,
        //   slidesPerView: 4,
        //   spaceBetween: 20,
        // });
        // 즉시 갱신이 안되고 있다. (useEffect 에서 체크하도록 적용)
        // useState 는 함수가 종료되어야 화면에 반영된다.
        // setCardSlide(tempSlide);
      }
    }
  };

  // 화면의 리사이즈에 따른 슬라이드 변경 코드
  // cardSlide 상태가 바뀜을 체크한다.
  useEffect(() => {
    window.addEventListener("resize", makeCardSlide);
    return () => {
      window.removeEventListener("resize", makeCardSlide);
    };
  }, [cardSlide]);

  const getCardsCall = async () => {
    const result = await getCards();
    setCardList(result);
    makeCardSlide();
  };
  useEffect(() => {
    // axiso 호출 조심하자. await 필요
    getCardsCall();

    return () => {};
  }, []);

  return (
    <div className="main-bottom-cards">
      <h2>폴더 📁</h2>
      {/* <!-- 카드 슬라이드 --> */}
      <div className="main-bottom-cards-slide">
        <Swiper
          className="cardslide"
          spaceBetween={20}
          slidesPerView={4}
          onInit={swiper => {
            cardSlide.current = swiper;
          }}
        >
          {cardList.map((item, index) => (
            <MainBottomCardsItem
              key={index}
              link={item.link}
              imgpath={item.imgpath}
              cardname={item.cardname}
              cardno={item.cardno}
            ></MainBottomCardsItem>
          ))}
        </Swiper>
      </div>

      <div className="bt-wrap">
        <a href="#" className="bt-more">
          전체보기
        </a>
      </div>
    </div>
  );
};

export default MainBottomCards;
