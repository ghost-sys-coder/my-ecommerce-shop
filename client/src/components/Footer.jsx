import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import onDelivery from "../assets/ondelivery.png";
import payByCard from "../assets/paybycard.png";
import airtelMoney from "../assets/airtelmoney.png";
import mtnMoney from "../assets/mtnmoney.png";

const Footer = () => {
  const paymentOptions = [
    { linkUrl: "/payment-options", linkImg: onDelivery },
    { linkUrl: "/payment-options", linkImg: payByCard },
    { linkUrl: "/payment-options", linkImg: airtelMoney },
    { linkUrl: "/payment-options", linkImg: mtnMoney },
  ];
  const socialLinks = [
    {
      id: 1, 
      linkUrl: "https://www.facebook.com/", 
      linkIcon: <FaFacebook className="hover:text-theme-600 text-xl" />
    },
    {
      id: 2,
      linkUrl: "https://www.instagram.com/",
      linkIcon: <FaInstagram className="hover:text-theme-600 text-xl" />
    },
    {
      id: 3,
      linkUrl: "https://www.tiktok.com/",
      linkIcon: <FaTiktok className="hover:text-theme-600 text-xl" />
    }
  ]
  return (
    <footer>
      <div id="links" className="container">
        <h1>About HomeMart</h1>
        <Link to={"/about"}>About us</Link>
        <Link to={"/terms"}>Terms and Conditions</Link>
        <Link to={"/returns"}>Returns and Refund Policy</Link>
        <Link to={"/payments"}>Payment Options</Link>
      </div>
      <div id="useful-links" className="container">
        <h1>Useful Links</h1>
        <Link to={"/phones"}>Mobile Phones</Link>
        <Link to={"/sneakers"}>Sneakers</Link>
        <Link to={"/clothing"}>Clothing</Link>
      </div>
      <div id="payment-methods" className="container">
        <h1>Payment Methods</h1>
        <div className="flex items-center justify-start gap-6">
          {paymentOptions.map((link, index) => (
            <Link className="" to={index} key={index}>
              <img
                className="h-5 w-5 rounded-full object-cover"
                src={link.linkImg}
                alt="payment option"
              />
            </Link>
          ))}
        </div>
      </div>
      <div id="social-links" className="container">
        <h1>Follow us</h1>
        <div className="flex items-center justify-start gap-10">
          {socialLinks.map((link) => (
            <Link to={link.linkUrl} key={link.id}>
              {link.linkIcon}
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
