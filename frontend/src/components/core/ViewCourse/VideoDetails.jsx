import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "video-react/dist/video-react.css";
import Hls from "hls.js";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../Common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPlayableUrl = (url) => {
    if (!url) return "";
    if (url.endsWith(".ts")) {
      return url.replace(/\.ts$/, ".m3u8");
    }
    return url;
  };

  useEffect(() => {
    if (!courseSectionData.length) return;
    if (!courseId && !sectionId && !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
    } else {
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId
      );
      const filteredVideoData = filteredData?.[0]?.subSection.filter(
        (data) => data._id === subSectionId
      );
      setVideoData(filteredVideoData ? filteredVideoData[0] : null);
      setPreviewSource(courseEntireData.thumbnail);
      setVideoEnded(false);
      setShowPlayOverlay(true);
    }
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    navigate,
    courseId,
    sectionId,
    subSectionId,
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoData || !videoData.videoUrl) return;

    const playableUrl = getPlayableUrl(videoData.videoUrl);
    video.pause();
    video.removeAttribute("src");
    video.load();

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(playableUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playableUrl;
    }
  }, [videoData]);

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );
    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSection.length;
    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );
    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;
    const currentSubSectionIndx =
      courseSectionData[currentSectionIndx].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else if (currentSectionIndx < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx =
      courseSectionData[currentSectionIndx].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else if (currentSectionIndx > 0) {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
      setVideoEnded(false);  
      setShowPlayOverlay(false); 
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
    setLoading(false);
  };

  const handlePlay = () => {
    videoRef.current.play();
    setShowPlayOverlay(false);
    setVideoEnded(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white relative">
      <div className="relative w-full">
        {!videoData || !videoData.videoUrl ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full rounded-md"
              controls
              onEnded={() => setVideoEnded(true)}
              onPause={() => {
                
                if (!videoEnded) setShowPlayOverlay(true);
              }}
              onPlay={() => setShowPlayOverlay(false)}
              playsInline
            />
            {showPlayOverlay && !videoEnded && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer">
                <button
                  onClick={handlePlay}
                  className="text-white bg-primary rounded-full p-4 text-4xl hover:scale-110 transition"
                  aria-label="Play"
                >
                  ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {videoEnded && (
        <div
          style={{
            backgroundImage:
              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
          }}
          className="absolute inset-0 z-100 grid h-full place-content-center font-inter"
        >
          {!completedLectures.includes(subSectionId) && (
          
            <IconBtn
              disabled={loading}
              onclick={() => handleLectureCompletion()}
              customClasses="text-xl max-w-max px-4 mx-auto"
            >
              {!loading ? "Mark As Completed" : "Loading..."}
</IconBtn>
          )}
          <IconBtn
            disabled={loading}
            onclick={() => {
              if (videoRef?.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setVideoEnded(false);
                setShowPlayOverlay(false);
              }
            }}
            text="Rewatch"
            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
          />
          <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
            {!isFirstVideo() && (
              <button
                disabled={loading}
                onClick={goToPrevVideo}
                className="blackButton"
              >
                Prev
              </button>
            )}
            {!isLastVideo() && (
              <button
                disabled={loading}
                onClick={goToNextVideo}
                className="blackButton"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
