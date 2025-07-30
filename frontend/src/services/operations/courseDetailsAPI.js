import { toast } from "react-hot-toast"
import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

// Fetch all courses
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) throw new Error("Could not fetch courses")
    result = response?.data?.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Fetch single course details
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading course...")
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId })
    if (!response?.data?.success) throw new Error(response.data.message)
    result = response.data
  } catch (error) {
    result = error?.response?.data || null
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Fetch course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    if (!response?.data?.success) throw new Error("Could not fetch categories")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  return result
}

// Add new course
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Creating course...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not add course")
    toast.success("Course created successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Edit course
export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Updating course...")
  let result = null
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update course")
    toast.success("Course updated successfully")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Section operations
export const createSection = async (data, token) => {
  const toastId = toast.loading("Creating section...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not create section")
    toast.success("Section created")
    result = response.data.updatedCourse
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSection = async (data, token) => {
  const toastId = toast.loading("Updating section...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update section")
    toast.success("Section updated")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Deleting section...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete section")
    toast.success("Section deleted")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Subsection operations
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not add lecture")
    toast.success("Lecture added")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update lecture")
    toast.success("Lecture updated")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete lecture")
    toast.success("Lecture deleted")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Fetch instructor courses
export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading courses...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not fetch instructor courses")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Delete course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Deleting course...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete course")
    toast.success("Course deleted")
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
}

// Get full details of course (authenticated)
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading full course...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Mark lecture as complete
export const markLectureAsComplete = async (data, token, dispatch) => {
  const toastId = toast.loading("Marking as complete...")
  let result = false
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success && !response?.data?.message) {
      throw new Error("Failed to mark lecture complete")
    }
    toast.success("Lecture marked as complete")
    dispatch(updateCompletedLectures(data.subSectionId))
    result = true
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Create rating
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting rating...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Failed to submit rating")
    toast.success("Rating submitted")
    success = true
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return success
}
