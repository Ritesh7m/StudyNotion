import { useEffect } from "react"
import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import { useNavigate } from "react-router-dom"

function Signup() {
  const nav = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")) {
      nav("/home")
    }
  })
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
