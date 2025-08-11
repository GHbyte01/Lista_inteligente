import { useState, useEffect } from "react";
import "./ListaCompras.css";

const ListaCompras = () => {
  const [produto, setProduto] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("listaCompras");
    if (dadosSalvos) {
      setLista(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listaCompras", JSON.stringify(lista));
  }, [lista]);

  const adicionarProduto = () => {
    if (produto.trim() === "") return;
    const novoProduto = { nome: produto, comprado: false };
    setLista([...lista, novoProduto]);
    setProduto("");
  };

  const removerProduto = (index) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  const alternarCompra = (index) => {
    const novaLista = [...lista];
    novaLista[index].comprado = !novaLista[index].comprado;
    setLista(novaLista);
  };

  const itensRestantes = lista.filter((item) => !item.comprado).length;

  return (
    <div className="container">
      <h2>Lista de Compras Inteligente</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="Digite um produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
        <button onClick={adicionarProduto}>Adicionor</button>
      </div>

      <p className="restante">
        <strong>Itens restantes:</strong> {itensRestantes}
      </p>

      <ul>
        {lista.map((item, index) => (
          <li key={index} className={item.comprado ? "comprado" : ""}>
            {item.nome}
            <div className="botoes">
              <button onClick={() => alternarCompra(index)}>
                {item.comprado ? "❌ Desmarcar" : "✅ Comprar"}
              </button>
              <button className="remover" onClick={() => removerProduto(index)}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCompras;
