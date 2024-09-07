import Cards from "./CardCategory";

// Images
import literatureCover from "/images/literature.png";
import comicsCover from "/images/comics.jpg";
import romanceCover from "/images/romance.png";
import historyCover from "/images/history.png";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Literatura",
      description:
        "Explore obras que desafiam o pensamento e transportam você para novos mundos, capturando a essência da condição humana.",
      image: literatureCover,
    },
    {
      title: "Quadrinhos",
      description:
        "Histórias vibrantes onde arte e narrativa se encontram, oferecendo uma experiência visual única e envolvente.",
      image: comicsCover,
    },
    {
      title: "Romance",
      description:
        "Narrativas emocionantes que exploram o amor em todas as suas formas, aquecendo o coração e inspirando o espírito.",
      image: romanceCover,
    },
    {
      title: "História",
      description: "Uma viagem fascinante através do tempo, explorando os eventos e figuras que moldaram o mundo.",
      image: historyCover,
    },
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 pb-12">As Categorias de Destaques</h2>
      <div className="container m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Cards key={index} title={category.title} description={category.description} image={category.image} />
        ))}
      </div>
    </section>
  );
}
