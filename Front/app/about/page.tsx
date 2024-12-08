import Image from "next/image";
import { ServiceSectionProps } from "../interfaces/index";

const ServiceSection = ({ title, description, imageSrc, imageAlt }: ServiceSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mb-16 px-6 md:px-12">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-primary">{title}</h3>
        <p className="text-lg text-tertiary mt-4">{description}</p>
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={450}
          height={300}
          className="rounded-lg shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
          priority
        />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-quaternary mt-[10px]">
      <header className="text-center mb-16 p-8">
        <h1 className="text-5xl font-extrabold text-primary leading-tight">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-tertiary mt-4 max-w-2xl mx-auto">
          Bienvenidos a <strong>Peludópolis</strong>, el espacio donde tus hijos
          peludos reciben el cuidado y amor que merecen.
        </p>
      </header>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-primary">Nuestra Misión</h2>
        <p className="text-lg text-tertiary mt-4 max-w-3xl mx-auto">
          En <strong>Peludópolis</strong>, nuestra misión es ofrecer a tus
          mascotas un lugar donde puedan disfrutar del mejor cuidado posible,
          mientras compartimos consejos, historias y experiencias con nuestra
          comunidad de amantes de los peludos.
        </p>
      </section>

      <section className="my-16">
        <h2 className="text-3xl font-semibold text-center text-primary mb-10">
          Servicios
        </h2>

        <ServiceSection
          title="Baño"
          description="Limpieza y frescura con profesionales que tratan a tu mascota con el máximo cuidado. ¡Deja a tu peludo impecable y cómodo!"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReC9YuYW9oKHgBSFsY-mjiBEQl5yBdxuXMlQ&s"
          imageAlt="Perro bañándose"
        />

        <ServiceSection
          title="Peinado"
          description="Un look impecable para que tu peludo siempre esté presentable y cómodo. ¡El peinado perfecto para cualquier ocasión!"
          imageSrc="https://ohmygosweb.com/wp-content/uploads/2022/02/como-peinar-un-perro.webp"
          imageAlt="Perro siendo peinado"
        />

        <ServiceSection
          title="Corte de uñas"
          description="Evita molestias y mantén las patitas de tu mascota en perfecto estado. ¡Corte de uñas profesional para tu peludo!"
          imageSrc="https://cloudfront-us-east-1.images.arcpublishing.com/semana/NT5E6E34NZEFHMW6VJZCW3VKBI.jpg"
          imageAlt="Corte de uñas a un perro"
        />
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          ¡Únete a nuestra comunidad!
        </h2>
        <p className="text-lg text-tertiary mb-8 max-w-2xl mx-auto">
          Comparte tus historias, aprende tips útiles y disfruta de ser parte
          de una familia que ama y cuida a los peludos tanto como tú.
        </p>
        <p className="text-xl font-semibold text-primary">
          Porque en Peludópolis, ¡ellos son los verdaderos protagonistas!
        </p>
      </section>
    </div>
  );
};


export default Page;
