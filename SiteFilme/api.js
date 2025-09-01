import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Filmes from "./Filmes.js";

MONGO_URI="mongodb+srv://lucacallegari71:Magmor40023072@cluster0.bfbil0s.mongodb.net/FilmesDB?retryWrites=true&w=majority&appName=Cluster0";

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

//POST REVIEW
app.post("/Filme/Review/:id", async (req, res) => {
    try{
        const FindReview = await Filmes.findById(req.params.id)
        FindReview.Reviews.push(req.body.Reviews[0]);
        const FindFilme = await Filmes.findByIdAndUpdate(req.params.id, FindReview, { new: true });
        res.json(FindFilme);
    } catch (error) {
        res.json({error : error});
    }
});

//DELETE REVIEW
app.delete("/Filme/Review/Excluir/:id/:index", async (req, res) => {
    try{
        const getFilme = await Filmes.findById(req.params.id);
        const ReviewExcluida = getFilme.Reviews.filter(item => item !== getFilme.Reviews[req.params.index])
        const Reviews = await Filmes.findByIdAndUpdate(req.params.id, ReviewExcluida, { new: true });
        res.json(Reviews);
    } catch (error) {
        res.json({error : error});
    }
});

app.listen(PORT, () => console.log("Servidor Aberto"))