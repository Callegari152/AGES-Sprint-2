import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Filmes from "./Filmes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao Banco de Dados")
    } catch (error){
        console.log("Não foi possivel se conectar ao Banco de Dados", error)
    }
    
};

connectDB();

//CREATE
app.post("/Filme/Criar", async (req, res) => {
    try{
        const novoFilme = await Filmes.create(req.body);
        res.json(novoFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//READ
app.get("/Filme/Pesquisar/:id", async (req, res) => {
    try{
        const FindFilme = await Filmes.findById(req.params.id);
        res.json(FindFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//UPDATE
app.patch("/Filme/Atualizar/:id", async (req, res) => {
    try{
        const FindFilme = await Filmes.findByIdAndUpdate(req.params.id, req.body);
        res.json(FindFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//UPDATE
app.put("/Filme/Atualizar/:id", async (req, res) => {
    try{
        const UpdateFilme = await Filmes.findByIdAndUpdate(req.params.id, req.body);
        res.json(UpdateFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//DELETE
app.delete("/Filme/Excluir/:id", async (req, res) => {
    try{
        const ExcluirFilme = await Filmes.findByIdAndDelete(req.params.id, req.body);
        res.json(ExcluirFilme);
    } catch (error) {
        res.json({error : error});
    }
});


//REVIEWS ========================================================

//READ REVIEW
app.get("/Review/get/:id", async (req, res) => {
    try{
        const FindFilme = await Filmes.findById(req.params.id);
        res.json(FindFilme.Reviews);
    } catch (error) {
        res.json({error : error});
    }
});

//POST REVIEW
app.post("/Review/post/:id", async (req, res) => {
    try{
        const FindReview = await Filmes.findById(req.params.id)
        FindReview.Reviews.push(req.body.Reviews[0]);
        const FindFilme = await Filmes.findByIdAndUpdate(req.params.id, FindReview, { new: true });
        res.json(FindFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//PATCH REVIEW
app.patch("/Review/patch/:id/:index", async (req, res) => {
    try{
        const getFilme = await Filmes.findById(req.params.id);

        const index = Number(req.params.index);
        Object.assign(getFilme.Reviews[index], req.body);

        await getFilme.save();
        
        res.json(getFilme.Reviews[index]);
    } catch (error) {
        res.json({error : error});
    }
});

//DELETE REVIEW
app.delete("/Review/Excluir/:id/:index", async (req, res) => {
    try{
        const Filme = await Filmes.findById(req.params.id);
        Filme.Reviews.splice(Number(req.params.index) , 1);
        
        await Filme.save();

        res.json(Filme.Reviews);
    } catch (error) {
        res.json({error : error});
    }
});

app.listen(PORT, () => console.log("Servidor Aberto"))