import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express()

const port = 3333

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`[*] Server is running at port: ${port}`)
    console.log(`[*] Site is running at: http://localhost:${port}`)
})
/**
 * req/request = REQUISIÇÃO
 * res/response = RESPOSTA
 * 
 * ------------------------------------------------------------------
 * 
 * Métodos HTTP:
 * 
 * get(pegar, receber)
 * post(criar,salvar)
 * put(editar)
 * delete(deletar)
 * 
 * ------------------------------------------------------------------
 * 
 * Tipos de parâmetros:
 * 
 * Query Params: request.query (Filtros, ordenação, paginação, ...)
 * Rout Params: request.params (Identificar um recurso na alteração ou remoção)
 * Body: request.body (Dados para criação ou alteração de um registro)
 * 
 * ------------------------------------------------------------------
 * 
 * index (mostrar LISTA de registros)
 * show (exibir registro UNICO)
 * store (CRIAR registro)
 * update (ALTERAR registro)
 * destroy (DELETAR registro)
 * 
 * */