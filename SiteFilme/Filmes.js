import mongoose from "mongoose";

const FilmesSchema = new mongoose.Schema({
    Titulo: String,
    Autor: String,
    Ano: Number,
    Genero: String,
    Reviews: [{
        Titulo: String,
        Descrição: String
    }]
});

export default mongoose.model("Filmes", FilmesSchema);