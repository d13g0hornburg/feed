import { useState } from "react";
import "./App.css";
import { usePosts } from "./usePosts";

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [busca, setBusca] = useState('');
  const { posts, adicionarPost, atualizarPost, excluirPost } = usePosts();

  const handleAdicionar = () => {
    adicionarPost(titulo, autor);
    setTitulo('');
    setAutor('');
  };

  const handleAtualizar = () => {
    atualizarPost(idPost, titulo, autor);
    setIdPost('');
    setTitulo('');
    setAutor('');
  };

  const handleEditar = (post) => {
    setIdPost(post.id);
    setTitulo(post.titulo);
    setAutor(post.autor);
  };

  const postsFiltrados = posts.filter(post => 
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="Container">
      <h1>Rede Social de Tecnologia</h1>
      <label>Buscar:</label>
      <input
        type="text"
        placeholder="Buscar por título"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <label>Id Post:</label>
      <input
        type="text"
        placeholder="ID do Post"
        value={idPost}
        onChange={(e) => setIdPost(e.target.value)}
      />
      <label>Título: </label>
      <textarea
        type="text"
        placeholder="Digite o título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <label>Autor:</label>
      <input
        type="text"
        placeholder="Autor do Post"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <button onClick={handleAdicionar}>Cadastrar</button>
      <button onClick={handleAtualizar}>Atualizar Post</button>

      <ul>
        {postsFiltrados.map((post) => (
          <li key={post.id}>
            <span>Id Post: {post.id}</span><br />
            <span>Título: {post.titulo}</span><br />
            <span>Autor: {post.autor}</span><br />
            <button onClick={() => handleEditar(post)}>Editar Post</button>
            <button onClick={() => excluirPost(post.id)}>Excluir Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;