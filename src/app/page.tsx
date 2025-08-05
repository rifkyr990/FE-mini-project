import Image from "next/image";
import SignUpForm from "./auth/signup/page";
import HomePage from "./home/page";
import Navbar from "../components/navbar";
import Footer from "../components/footer";  

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
