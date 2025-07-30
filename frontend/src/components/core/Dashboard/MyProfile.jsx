import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../Common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold text-richblack-5 sm:text-3xl">
        My Profile
      </h1>

      {/* Profile Picture & Name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-20 rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-base font-semibold text-richblack-5 sm:text-lg">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 w-fit">
          <IconBtn
            text="Edit"
            size="sm"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className="my-6 sm:my-10 flex flex-col gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-base font-semibold text-richblack-5 sm:text-lg">
            About
          </p>
          <div className="mt-2 sm:mt-0 w-fit">
            <IconBtn
              text="Edit"
              size="sm"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-6 sm:my-10 flex flex-col gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-base font-semibold text-richblack-5 sm:text-lg">
            Personal Details
          </p>
          <div className="mt-2 sm:mt-0 w-fit">
            <IconBtn
              text="Edit"
              size="sm"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-xs text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-xs text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
