import { useState } from "react";
import "./App.css";
import { db } from "./firebaseConnection";
import { updateDoc, setDoc, doc, collection, addDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');

  async function adicionar() {
    try {
      await addDoc(collection(db, "posts"), {
        titulo: titulo,
        autor: autor
      });
      console.log("Dados cadastrados");
      setAutor("");
      setTitulo("");
    } catch (error) {
      console.log("Deu erro: " + error);
    }
  }

  async function buscarPosts() {
    const postRef = collection(db, "posts");
    try {
      const snapshot = await getDocs(postRef);
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        });
      });
      setPosts(lista);
    } catch (error) {
      console.log("Erro: " + error);
    }
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    try {
      await deleteDoc(docRef);
      console.log("Post excluído");
      buscarPosts(); // Atualiza a lista de posts após a exclusão
    } catch (error) {
      console.log("Deu erro: " + error);
    }
  }

  async function atualizarPost() {
    const docRef = doc(db, "posts", idPost);
    try {
      await updateDoc(docRef, {
        titulo: titulo,
        autor: autor
      });
      console.log("Post atualizado!");
      setIdPost('');
      setTitulo('');
      setAutor('');
      buscarPosts(); // Atualiza a lista de posts após a atualização
    } catch (error) {
      console.log("Deu erro: " + error);
    }
  }

  return (
    <div className="Container">
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
      <button onClick={buscarPosts}>Buscar</button>
      <button onClick={adicionar}>Cadastrar</button>
      <button onClick={atualizarPost}>Atualizar Post</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>Id Post: {post.id}</span><br />
            <span>Título: {post.titulo}</span><br />
            <span>Autor: {post.autor}</span><br />
            <button onClick={() => excluirPost(post.id)}>Excluir Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;