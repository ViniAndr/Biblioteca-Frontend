//components
import PrimaryButton from "../PrimaryButton";
import CardItem from "./CardItem";

//icons
import { FaBrain, FaRocket, FaPuzzlePiece } from "react-icons/fa"; // Importa o ícone FaBrain

export default function SectionAboutReading() {
  const informations = [
    {
      title: "Expansão do Conhecimento",
      description:
        "Cada livro é uma porta para novos conhecimentos e perspectivas, permitindo que você explore o mundo sem sair de casa.",
      icon: FaBrain,
    },
    {
      title: "Aprimoramento da Linguagem",
      description: "A leitura constante enriquece seu vocabulário e melhora suas habilidades de comunicação.",
      icon: FaRocket,
    },
    {
      title: "Estimule a criatividade",
      description: "A leitura é uma fonte inesgotável de inspiração, estimulando a criatividade e a imaginação.",
      icon: FaPuzzlePiece,
    },
  ];

  return (
    <section className="py-16 px-8 bg-green-100">
      <h2 className="text-4xl font-bold text-center mb-4">O Poder da Leitura</h2>
      <p className="text-center text-xl text-gray-700">
        A leitura não é apenas uma atividade de lazer, mas uma ferramenta poderosa de crescimento pessoal, venha
        descobri como os livros podem transformar sua vida.
      </p>

      <div className="container my-12 m-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {informations.map((info, index) => (
          <CardItem key={index} title={info.title} description={info.description} icon={info.icon} />
        ))}
      </div>

      <div className="text-center">
        <PrimaryButton text="Comece sua jornada literária hoje!" to="/livros" />
      </div>
    </section>
  );
}
