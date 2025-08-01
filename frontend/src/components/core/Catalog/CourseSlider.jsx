
import { Swiper, SwiperSlide } from "swiper/react"


import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FreeMode, Pagination } from "swiper/modules";

import CourseCard from "./CourseCard"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-120"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
