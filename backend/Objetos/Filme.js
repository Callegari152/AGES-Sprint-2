

class Filme{
    constructor(id ,nome, autor, genero, ano){

        this.nome = nome;
        this.id = id;
        this.autor = autor;
        this.genero = genero;
        this.ano = ano;
    
    }

    getId(){
        return this.id;
    }

    getNome(){
        return this.nome;
    }

    getAutor(){
        return this.autor;
    }

    getGenero(){
        return this.genero;
    }

    getAno(){
        return this.ano;
    }


    setNome(nome){
        this.nome = nome;
    }

    setAutor(autor){
        this.autor = autor;
    }

    setGenero(genero){
        this.genero = genero;
    }

    setAno(ano){
        this.ano = ano;
    }

}

export default Filme;
