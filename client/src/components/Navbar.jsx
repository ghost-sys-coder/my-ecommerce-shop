import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  // FaHeart,
  FaRegWindowRestore,
  // FaEnvelope,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/ShoppingCartContext";
import SearchNav from "./SearchNav";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const {
    userProfile,
    isUserAuthenticated,
    isUserLoading,
    setIsUserAuthenticated,
    fetchUserProfile,
    setUserProfile,
    isDropdownOpen,
    setIsDropdownOpen
  } = useAuthContext();

  const { setCart, cartCount, setCartCount, openCartModal, setOpenCartModal, setTotalPrice, isRateLoading, exchangeRate } =
    useCartContext();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  /** fetch user cart profile */

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  const authLinks = !isUserAuthenticated
    ? [
      //   {
      //     id: 1,
      //     linkUrl: "/profile",
      //     linkText: "My Account",
      //     linkIcon: <FaUser />,
      //   },
      //   {
      //     id: 2,
      //     linkUrl: "/saved",
      //     linkText: "Saved Items",
      //     linkIcon: <FaHeart />,
      // },
      {
        id: 3,
        linkUrl: `/checkout/orders`,
        linkText: "My Orders",
        linkIcon: <FaRegWindowRestore />,
      },
      ]
    : [
        {
          id: 1,
          linkUrl: "/",
          linkText: userProfile?.name,
          linkIcon: <FaUser />,
        },
        {
          id: 2,
          linkUrl: `/checkout/orders`,
          linkText: "My Orders",
          linkIcon: <FaRegWindowRestore />,
        },
        // {
        //   id: 3,
        //   linkUrl: "/inbox",
        //   linkText: "Inbox",
        //   linkIcon: <FaEnvelope />,
        // },
        // {
        //   id: 4,
        //   linkUrl: "/saved",
        //   linkText: "Saved Items",
        //   linkIcon: <FaHeart />,
        // },
      ];

  /** logout user */
  const handleLogOut = async (event) => {
    event.preventDefault();
    setIsLoggingOut(true);
    try {
      await axios.post("/auth/logout");
      setUserProfile(undefined);
      setIsUserAuthenticated(false);
      setCartCount(undefined);
      setCart(undefined);
      setTotalPrice(undefined)
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="nav-container">
      <Link className="logo" to={"/"}>
        shopLocker
      </Link>
      <SearchNav
        isRateLoading={isRateLoading}
        exchangeRate={exchangeRate}
      />
      <div className="flex items-center justify-between gap-3 md:gap-10">
        <button
          onClick={() => setOpenCartModal(!openCartModal)}
          type="button"
          className="cart"
        >
          <div className="cart-counter">
            <MdOutlineShoppingCart size={30} />
            {userProfile ? <span>{cartCount === undefined ? 0 : cartCount}</span> : <span>0</span>}
          </div>
          <p>Cart</p>
        </button>
        <div className="dropdown-menu" ref={dropdownRef}>
          <FaUser onClick={handleDropdownToggle} />
          {isDropdownOpen && (
            <div className="auth-links">
              {isUserLoading ? (
                <div className="flex gap-2 items-center justify-center">
                  <Loader2 className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  {!isUserAuthenticated && (
                    <>
                      <Link className="login" to={"/login"}>
                        Login
                      </Link>
                      <hr className="w-full h-[1px] bg-gray-500 my-2" />
                    </>
                  )}
                  {authLinks.map((linkItem) => (
                    <Link
                      className="auth-link"
                      key={linkItem.id}
                      to={linkItem.linkUrl}
                    >
                      {linkItem.linkIcon}
                      <span>{linkItem.linkText}</span>
                    </Link>
                  ))}
                  {isUserAuthenticated && (
                    <>
                      <hr className="w-full h-[1px] bg-gray-500 my-2" />
                      <button
                        onClick={handleLogOut}
                        type="button"
                        className="logout-btn"
                      >
                        {isLoggingOut ? (
                          <>
                            <Loader2 className="animate-spin" />
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <span>LOGOUT</span>
                        )}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
