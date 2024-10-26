import { useState, useEffect } from "react";
import { db, storage } from "./firebaseConnection";
import { updateDoc, addDoc, doc, collection, getDocs, deleteDoc, query, limit } from "firebase/firestore"; // Removido startAfter
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 10; // Ajuste conforme necessário

  useEffect(() => {
    buscarPosts();
  }, []);

  async function buscarPosts() {
    setLoading(true);
    const postRef = collection(db, "posts");
    const q = query(postRef, limit(postsPerPage));
    try {
      const snapshot = await getDocs(q);
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          numericId: doc.data().numericId || parseInt(doc.id, 16), // Converte ID hexadecimal para numérico se não existir numericId
          titulo: doc.data().titulo,
          autor: doc.data().autor,
          mensagem: doc.data().mensagem,
          imagem: doc.data().imagem
        });
      });
      setPosts(lista);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(file) {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async function adicionarPost(titulo, autor, mensagem, imagem) {
    try {
      let imageUrl = '';
      if (imagem) {
        imageUrl = await uploadImage(imagem);
      }
      const numericId = Date.now(); // Gera um ID numérico baseado no timestamp atual
      await addDoc(collection(db, "posts"), { numericId, titulo, autor, mensagem, imagem: imageUrl });
      buscarPosts();
    } catch (error) {
      setError(error);
    }
  }

  async function atualizarPost(id, titulo, autor, mensagem, imagem) {
    const docRef = doc(db, "posts", id);
    try {
      let imageUrl = imagem;
      if (imagem instanceof File) {
        imageUrl = await uploadImage(imagem);
      }
      await updateDoc(docRef, { titulo, autor, mensagem, imagem: imageUrl });
      buscarPosts();
    } catch (error) {
      setError(error);
    }
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    try {
      await deleteDoc(docRef);
      buscarPosts();
    } catch (error) {
      setError(error);
    }
  }

  return { posts, loading, error, adicionarPost, atualizarPost, excluirPost };
}