import client from '../database/connection'; // Importa a conexão com o banco

// Função para adicionar um usuário
const addUser = async (name: string, email: string) => {
  try {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    
    const res = await client.query(query, values);
    console.log('Usuário adicionado:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao adicionar usuário:', err);
  }
};

// Função para listar todos os usuários
const getUsers = async () => {
  try {
    const res = await client.query('SELECT * FROM users');
    console.log('Usuários encontrados:', res.rows);
    return res.rows;
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
  }
};

export { addUser, getUsers };
