import { useNavigate } from "react-router-dom";


function LogOut(){
  // Navigate module
  let navigate = useNavigate();
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userDetails");
  navigate("/sign-in");
  return(
    <div>Logging out</div>
  )
}


export default LogOut;
