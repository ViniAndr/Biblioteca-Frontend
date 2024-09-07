import { Link } from "react-router-dom";

// images
import BookSection from "/images/bookSection.png";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiPencilCircleFill, PiBookBookmarkFill } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";

export default function SectionHome() {
  // small cards
  const SmallCard = (text, Icon) => {
    return (
      <div className="flex items-center mt-6 gap-2 p-2 rounded bg-zinc-800">
        <Icon className="text-white w-8 h-8" />
        <span className="text-white md:text-sm/4 font sm:text-xs">{text}</span>
      </div>
    );
  };

  return (
    <section className="py-10 px-4">
      <div className="container m-auto flex gap-7 flex-col-reverse md:flex-row md:justify-between items-center">
        {/* Coluna da Esquerda */}
        <div className="2xl:w-3/5 mb-8 md:mb-0 text-center md:text-left ">
          <h1 className="text-5xl md:text-4xl lg:text-7xl font-bold text-gray-800 mb-4 font-serif">
            Explore Nossa Biblioteca
          </h1>
          <p className="text-xl text-gray-600  font-serif">
            Descubra uma vasta coleção de livros e recursos, cuidadosamente selecionados para você. Mergulhe no
            conhecimento, inspire-se e expanda seus horizontes.
          </p>
          <div className="flex flex-col mb-6 md:flex-row gap-1 lg:gap-3">
            {SmallCard("Diversas categorias", BiSolidCategoryAlt)}
            {SmallCard("Editoras conhecidas", PiBookBookmarkFill)}
            {SmallCard("Grandes autores", PiPencilCircleFill)}
          </div>
          <Link
            to="/livros"
            className="w-64 h-12 flex justify-center items-center gap-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
          >
            Ver Todos os Livros
            <FaArrowRightLong />
          </Link>
        </div>

        {/* Coluna da Direita */}
        <div className="2xl:w-1/3 flex md:justify-end justify-cente">
          <img src={BookSection} alt="Ilustração de livros" className="max-w-xs lg:max-w-md xl:max-w-xl" />
        </div>
      </div>
    </section>
  );
}
