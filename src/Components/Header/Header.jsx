import React, { useContext } from "react";
import styles from "./header.module.css";
// import { CiSe from "./header.module.css";
// import { CiSearch } from "react-icons/ci";
import LowerHeader from "./LowerHeader/LowerHeader";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CiLocationOn } from "react-icons/ci";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IoSearchSharp } from "react-icons/io5";
import { ParentContext } from "../DataProvider/DataProvider";
import usa_Logo from "../../assets/Images/headerImage/usa-logo.png";
import { Link } from "react-router-dom";

import { auth } from "../../Utils/firebase";
function Header() {
  const [{ user, basket }, dispatch] = useContext(ParentContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={styles.Header_warpper_fixed}>
      <section className={styles.Header_container}>
        <div className={styles.header_left}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon-logo"
            />
            {/* <span>.in</span> */}
          </Link>

          <div className={styles.left_header_delivery}>
            <span className={styles.header_loactionIcon}>
              {/* locaion icoan her  */}

              <CiLocationOn size={16} />
            </span>
            <a href="">
              <div className={styles.delivery}>
                <span>Deliver to</span>
                <p>Poland</p>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.header_serach}>
          <div className={styles.header_serach_select}>
            <select name="" id="">
              <option value="">All</option>

              <option value="">Art& Crafts</option>
              <option value="">Automative</option>
            </select>
          </div>
          <input type="text" placeholder="Search here" />

          {/* searchIcon  here*/}
          <div className={styles.header_search_icon}>
            <span className={styles.header_search_icon_wrapper}>
              <IoSearchSharp size={22} />
            </span>
          </div>
        </div>
        <div className={styles.header_right}>
          <a href="" className={styles.language}>
            <div>
              <img src={usa_Logo} alt="USA Logo" />
              <select name="" id="">
                <option value="">EN</option>
                <option value="">FR</option>
                <option value="">Amharic</option>
              </select>
            </div>
          </a>

          <Link to={!user && "/auth"} className={styles.header_signIn}>
            <div>
              <div>
                {user ? (

                  <>
                  <p>Hello, {user?.email?.split("@")[0]}</p>
                  
                  <span onClick={()=>{auth.signOut()}}>Sign Out</span>
                  </>
                ) : (
                  <>
                  <p>Hello,signIn</p>
                  <span>Account & List</span>
                  </>
                  
                  
                  )}
              </div>
            </div>
          </Link>
          <Link to="/orders" className={styles.header_order}>
            <div>
              <span>
                <p>Return</p>
              </span>
              <span>& Orders</span>
            </div>
          </Link>

          <Link to="/cart" className={styles.cart}>
            <ShoppingCartOutlinedIcon />
            <span>
              {/* cartInps */}
              <p>{totalItem}</p>
            </span>
          </Link>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
}

export default Header;
