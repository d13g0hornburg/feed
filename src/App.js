import { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import "./App.css";
import { usePosts } from "./usePosts";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [idPost, setIdPost] = useState('');
  const [busca, setBusca] = useState('');
  const { posts, adicionarPost, atualizarPost, excluirPost } = usePosts();

  const handleAdicionar = () => {
    adicionarPost(titulo, autor, mensagem);
    setTitulo('');
    setAutor('');
    setMensagem('');
  };

  const handleAtualizar = () => {
    atualizarPost(idPost, titulo, autor, mensagem);
    setIdPost('');
    setTitulo('');
    setAutor('');
    setMensagem('');
  };

  const handleEditar = (post) => {
    setIdPost(post.id);
    setTitulo(post.titulo);
    setAutor(post.autor);
    setMensagem(post.mensagem);
  };

  const postsFiltrados = posts.filter(post => 
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={4}>
          <h1>Adicionar/Editar Post</h1>
          <Form>
            <Form.Group controlId="formIdPost">
              <Form.Label>Id Post:</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID do Post"
                value={idPost}
                onChange={(e) => setIdPost(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
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
              />
            </Form.Group>
            <Form.Group controlId="formAutor">
              <Form.Label>Autor:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Autor do Post"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAdicionar} className="mr-2">Cadastrar</Button>
            <Button variant="secondary" onClick={handleAtualizar}>Atualizar Post</Button>
          </Form>
        </Col>
        <Col xs={12} md={8}>
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
            {postsFiltrados.map((post) => (
              <ListGroup.Item key={post.id}>
                <div><strong>Id Post:</strong> {post.id}</div>
                <div><strong>Título:</strong> {post.titulo}</div>
                <div><strong>Autor:</strong> {post.autor}</div>
                <div><strong>Mensagem:</strong> {post.mensagem}</div>
                <Button variant="warning" onClick={() => handleEditar(post)} className="mr-2">Editar Post</Button>
                <Button variant="danger" onClick={() => excluirPost(post.id)}>Excluir Post</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;