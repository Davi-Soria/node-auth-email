import { sequelize } from "./database";
import { User } from "../model/user";

export const syncDatabase = async () =>  {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco com sucesso!!');
        
        await sequelize.sync({alter: true});
        console.log('Tabelas sincronizadas');
    } catch(error) {
        console.error('Erro ao conectar/sincronizar o banco', error);
    }
}