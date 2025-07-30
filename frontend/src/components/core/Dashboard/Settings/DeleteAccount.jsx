import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-4 sm:p-8">
      {/* Icon */}
      <div className="flex items-center justify-center rounded-full bg-pink-700 p-4 sm:p-0 aspect-square w-14 h-14">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 text-pink-25">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        <div className="text-sm">
          <p>Would you like to delete your account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the content associated with it.
          </p>
        </div>
        <button
          type="button"
          className="mt-2 w-fit cursor-pointer italic text-pink-300 underline underline-offset-4"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
}
