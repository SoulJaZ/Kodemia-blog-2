import imagenBlogEntry from "../../info-1.svg";

const ElementoContenidoCentral = (props) => {
  console.log(props);
  // crear propiedades en el componente que los va a renderizar
  const { informacionEntrada } = props
  const {tituloEntrada, contenido, imagen} = informacionEntrada
  
  return (
    <div className="entrada-blog">
      <img src={imagen} />
      <h2>{tituloEntrada}</h2>
      <p>
        {contenido.length > 10
          ? `${contenido.slice(0, 70)}...`
          : contenido}
      </p>
      <button type="">Ver más!</button>
    </div>
  );
};

export default ElementoContenidoCentral;
