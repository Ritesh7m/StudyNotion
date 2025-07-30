import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../Common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();

  }, [token]);


  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-14 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
          My Courses
        </h1>
        <div className="self-start sm:self-auto">
          <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <VscAdd />
          </IconBtn>
        </div>
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
