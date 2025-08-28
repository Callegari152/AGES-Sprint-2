import Filme from "../Objetos/Filme.js"

const ListaFilmes = [{id: 1, nome: "Teste" , autor: "Luca" , genero: "comédia" , ano: 2025}];

function buscarIdFIlme(id){
    return ListaFilmes.find(f => f.id == id)
}

function CriarFilme(req , res){
    const { nome, autor, genero, ano, id} = req.body;
    const novoFilme = new Filme(id, nome, autor, genero, ano);
    ListaFilmes.push(novoFilme);
    return res.status(201).send({Message: "Filme adicionado com sucesso!"})
}

function EditarFilme(id , req, res){
    const filmeid = NUmber(id);
    const filme = buscarIdFIlme(filmeid)
    

    if(!filme){
        return res.status(404).send({message: "Filme não encontrado"})
    }
}

function LerFilme( id, res){
    const filmeid = Number(id);
    const filme = buscarIdFIlme(filmeid)

    if(!filme){
        return res.status(404).send({message: "Filme não encontrado"})
    }

    return res.status(200).json({
        id: filme.id,
        nome: filme.nome,
        autor: filme.autor,
        genero: filme.genero,
        ano: filme.ano
    });
    
}

function ExcluirFIlme(){

}


export {LerFilme, ListaFilmes, CriarFilme}