import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";


const Footer = () => {

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
      <div id="about" className="container">
        <h1>About Us</h1>
        <p>Welcome to ShopLocker!</p>
        <p>At ShopLocker, we are passionate about providing you with a delightful shopping experience. Founded with a commitment to quality and customer satisfaction. Our mission is to bring you a curated selection of high quality products that combines style, functionality and affordability!</p>
      </div>
      <div id="links" className="container">
        <h1>About shopLocker</h1>
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
