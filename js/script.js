//Classe dos filtros no banco de dados
class Filters {
    
    constructor(taxa, rank) {
        this.taxa = taxa;
        this.rank  = rank;
    }

    buscaDados() {

        //Criar variavel com a coluna que deverá ser buscada
        let coluna;

        switch(this.rank) {

            case 'tribe': coluna = '#tabela tr td:nth-child(1)';
            break;

            case 'subtribe': coluna = '#tabela tr td:nth-child(2)';
            break;

            case 'genus': coluna = '#tabela tr td:nth-child(3)';
            break;

            case 'species': coluna = '#tabela tr td:nth-child(4)'; 
            break;

            default: coluna='no-rank';
        }

        let taxa = this.taxa;

        //Verificar se os dois inputs estão preenchidos
        if(coluna === 'no-rank' || taxa == '') {

        //Configurações do MODAL caso haja campos em branco
        document.getElementById('modal_titulo').innerHTML = 'Empty fields'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'There is one or more fields that are empty.'
        document.getElementById('modal_btn').innerHTML = 'Close'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalSearch').modal('show')

        } else {
            //Mostrar a tabela e o corpo da tabela
            document.getElementById('tabela').style.display = 'table';
            document.getElementById('corpo-tabela').style.display = 'table-row-group';

            let i = 0; //variável para verificar se foi encontrado algum resultado ou não. Se não, disparar o modala avisando.
            //Fazer a busca na tabela
            $("#tabela tbody tr").show();
            $(coluna).each(function(){
                if($(this).text().toUpperCase().indexOf(taxa) < 0){
                    $(this).parent().hide();
                } else {
                    i = 1;
                }
            });

            //Disparando o modal caso nao foi mostrado nenhum resultado para a busca de dados ( i === 0)
            if (i === 0) {
                document.getElementById('modal_titulo').innerHTML = 'No results matched';
                document.getElementById('modal_titulo_div').className = 'modal-header text-primary';
                document.getElementById('modal_conteudo').innerHTML = 'No resultados were matched for your search.';
                document.getElementById('modal_btn').innerHTML = 'Close';
                document.getElementById('modal_btn').className = 'btn btn-primary';
                $('#modalSearch').modal('show');

                //Esconder o cabeçalho da tabela quando nãoo houver resultados:
                document.getElementById('tabela').style.display = 'none';
                document.getElementById('corpo-tabela').style.display = 'none';
            } else {
                i = 0 //retornando i para o valor original
            }

            //Limpar os inputs
            document.getElementById('taxa').value = '';
            document.getElementById('rank').value = 'default';
            }
    }
}

//Função para filtros na tabela de dados citogenéticos
let searchTable = function(){

    //Pegar os valores inputados
    let taxa = document.getElementById('taxa').value.toUpperCase();
    let rank = document.getElementById('rank').value;

    //Criar objeto Filters
    let filters = new Filters(taxa, rank);
    
    //Busca de dados na tabela
    filters.buscaDados();
}

//Função para filtro na tabela de referências
$(function(){
    $("#references-table input").keyup(function(){       

        var index = $(this).parent().index();
        var nth = "#references-table td:nth-child("+(index+1).toString()+")";
        var valor = $(this).val().toUpperCase();

        $("#references-table tbody tr").show();
        $(nth).each(function(){
            if($(this).text().toUpperCase().indexOf(valor) < 0){
                $(this).parent().hide();
            }
        });
    });
 
    $("#references-table input").blur(function(){
        $(this).val("");
    });
});