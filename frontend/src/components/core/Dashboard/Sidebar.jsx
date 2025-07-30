// Sidebar.jsx

import { useState } from "react";
import { VscSignOut, VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-14 z-[1000] h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                onClick={() => setIsSidebarOpen(false)} // ✅ closes on mobile after click
              />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            onClick={() => setIsSidebarOpen(false)} // ✅ closes on mobile after click
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <button
        className="fixed bottom-6 left-6 z-[2000] rounded-full bg-richblack-700 p-3 text-white shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <VscChevronLeft className="text-2xl" />
        ) : (
          <VscChevronRight className="text-2xl" />
        )}
      </button>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
