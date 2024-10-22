import { useState } from "react";
import "./App.css";
import { db } from "./firebaseConnection";
import { setDoc, doc, collection, addDoc, getDoc, getDocs} from "firebase/firestore";
 
function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
 
  async function adicionar() {
    // await setDoc(doc(db, "posts", "129"), {
    //   titulo: titulo,
    //   autor: autor
    // })
    await addDoc(collection(db, "posts"), {
      titulo:titulo,
      autor:autor
    })
    .then(() => {
      console.log("Dados cadastrados");
      setAutor("");
      setTitulo("");
    })
    .catch((error) => {
      console.log("Deu erro: " + error);
    });
  }
  async function buscarPosts(){
    // const postRef = doc(db, "posts", "128")
 
    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch((error) => {
    //   console.log("Deu erro: " + error);
    // });
  const postRef = collection(db, "posts")
  await getDocs(postRef)
 
  .then((snapshot) =>{
    let lista = [];
    snapshot.forEach((doc) => {
      lista.push({
        id:doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor
      })
  });
  setPosts(lista);
  })
  .catch(()=>{
    console.log("Erro")
  })
  }
 
 
  return (
    <div className="Container">
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
 
      <ul>
        {posts.map((post) => {
          return(
            <li key={post.id}>
              <span>titulo: {post.titulo}</span><br/>
              <span>Autor: {post.autor}</span><br></br>
 
            </li>
          )
        })}
      </ul>
    </div>
  );
}
 
export default App;
 