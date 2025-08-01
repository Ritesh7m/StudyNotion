import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-max-content items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <Link
                      to={
                        subLinks[0]
                          ? `/catalog/${subLinks[0].name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          : "/catalog/all"
                      }
                    >
                      <p>{link.title}</p>
                    </Link>
                    <BsChevronDown />
                    <div className="invisible absolute left-1/2 top-1/2 z-1000 flex w-48 lg:w-72 -translate-x-1/2 translate-y-12 flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-8 group-hover:opacity-100">
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 -translate-x-1/3 -translate-y-1/2 rotate-45 rounded-sm bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                              key={i}
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path || "/"}>
                    <p
                      className={`$ {
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 left-0 z-1000 w-full bg-richblack-800 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-y-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path || "/"}
                  className={`$ {
                    matchRoute(link.path)
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {token === null ? (
              <>
                <Link to="/login">
                  <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
