import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Image, Alert } from "react-bootstrap";
import "./App.css";
import { usePosts } from "./usePosts";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [imagem, setImagem] = useState(null);
  const [idPost, setIdPost] = useState('');
  const [busca, setBusca] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { posts, adicionarPost, atualizarPost, excluirPost } = usePosts();

  const handleAdicionar = () => {
    if (!titulo || !autor || !mensagem) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    adicionarPost(titulo, autor, mensagem, imagem);
    setTitulo('');
    setAutor('');
    setMensagem('');
    setImagem(null);
    setError('');
  };

  const handleAtualizar = () => {
    if (!titulo || !autor || !mensagem) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    atualizarPost(idPost, titulo, autor, mensagem, imagem);
    setIdPost('');
    setTitulo('');
    setAutor('');
    setMensagem('');
    setImagem(null);
    setError('');
  };

  const handleEditar = (post) => {
    setIdPost(post.id);
    setTitulo(post.titulo);
    setAutor(post.autor);
    setMensagem(post.mensagem);
    setImagem(post.imagem || null); // Verifique se a imagem é uma URL ou um arquivo
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const postsFiltrados = posts.filter(post => 
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < postsFiltrados.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} className="text-right">
          <Button variant="secondary" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} className="order-1 order-md-1">
          <h1>Posts</h1>
          <Form.Group controlId="formBusca">
            <Form.Label>Buscar:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar por título"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Form.Group>
          <ListGroup className="mt-4">
            {postsFiltrados.length > 0 && (
              <ListGroup.Item key={postsFiltrados[currentPage].id}>
                {postsFiltrados[currentPage].imagem && <Image src={postsFiltrados[currentPage].imagem} alt={postsFiltrados[currentPage].titulo} fluid />}
                <div><strong>Id Post:</strong> {postsFiltrados[currentPage].numericId}</div>
                <div><strong>Título:</strong> {postsFiltrados[currentPage].titulo}</div>
                <div><strong>Autor:</strong> {postsFiltrados[currentPage].autor}</div>
                <div><strong>Mensagem:</strong> {postsFiltrados[currentPage].mensagem}</div>
                <Button variant="warning" onClick={() => handleEditar(postsFiltrados[currentPage])} className="mr-2">Editar</Button>
                <Button variant="danger" onClick={() => excluirPost(postsFiltrados[currentPage].id)}>Excluir</Button>
              </ListGroup.Item>
            )}
          </ListGroup>
          <div className="pagination-buttons">
            <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</Button>
            <Button variant="primary" onClick={handleNextPage} disabled={currentPage >= postsFiltrados.length - 1}>Próximo</Button>
          </div>
        </Col>
        <Col xs={12} md={4} className="order-2 order-md-2">
          <h1>Adicionar/Editar Post</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formIdPost">
              <Form.Label>Id Post:</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID do Post"
                value={idPost}
                onChange={(e) => setIdPost(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMensagem">
              <Form.Label>Mensagem:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Digite a mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAutor">
              <Form.Label>Autor:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Autor do Post"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImagem">
              <Form.Label>Imagem:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
              {imagem && typeof imagem === 'string' && <Image src={imagem} alt="Capa do Post" fluid />}
            </Form.Group>
            <div className="button-group">
              <Button variant="primary" onClick={handleAdicionar}>Cadastrar</Button>
              <Button variant="secondary" onClick={handleAtualizar}>Atualizar Post</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;