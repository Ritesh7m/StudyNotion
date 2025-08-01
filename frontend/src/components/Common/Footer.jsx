import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const FooterLink2 = [
  {
    title: "Subjects",
    links: [
      { title: "AI", link: "/al" },
      { title: "Data Science", link: "/data-science" },
      { title: "Cybersecurity", link: "/cybersecurity" },
      { title: "Web Development", link: "/web-development" },
    ],
  },
  {
    title: "Languages",
    links: [
      { title: "Java", link: "/java" },
      { title: "JavaScript", link: "/javascript" },
      { title: "Python", link: "/python" },
      { title: "SQL", link: "/sql" },
    ],
  },
];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = ["Articles", "Videos", "Projects"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-max-content text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Left Side */}
          <div className="lg:w-1/2 flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            {/* Company */}
            <div className="w-[48%] mb-7">
              <img src={Logo} alt="Logo" className="object-contain mb-3" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2 mt-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div
                    key={i}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 text-lg mt-4">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Resources */}
            <div className="w-[48%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={`/${ele.toLowerCase().replace(/ /g, "-")}`}>{ele}</Link>
                  </div>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-6">Support</h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] mb-7">
                <h1 className="text-richblack-50 font-semibold text-[16px]">{ele.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-max-content text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3`}
              >
                <Link to={`/${ele.toLowerCase().replace(/ /g, "-")}`}>{ele}</Link>
              </div>
            ))}
          </div>
          <div className="text-center">Made with ❤️ Ritesh © 2025 Studynotion</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
