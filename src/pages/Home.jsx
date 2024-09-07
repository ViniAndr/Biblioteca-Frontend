import SectionHome from "../components/landing/SectionHome";
import SectionAboutReading from "../components/landing/SectionAboutReading";
import CategoriesSection from "../components/landing/CategoriesSection";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <SectionHome />
      <SectionAboutReading />
      <CategoriesSection />
    </div>
  );
}
