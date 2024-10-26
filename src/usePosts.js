import { useState, useEffect } from "react";
import { db, storage } from "./firebaseConnection";
import { updateDoc, addDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    buscarPosts();
  }, []);

  async function buscarPosts() {
    setLoading(true);
    const postRef = collection(db, "posts");
    try {
      const snapshot = await getDocs(postRef);
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
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
      await addDoc(collection(db, "posts"), { titulo, autor, mensagem, imagem: imageUrl });
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