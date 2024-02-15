import { Outlet } from "react-router-dom";
import { Navbar, Footer, CartModal } from "../components";
import { useCartContext } from "../context/ShoppingCartContext";

const MainLayout = () => {
  const { openCartModal, setOpenCartModal } = useCartContext();

  return (
    <main className="h-screen max-w-[1600px] mx-auto mt-20">
      {openCartModal && <CartModal setOpenCartModal={setOpenCartModal} />}
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
