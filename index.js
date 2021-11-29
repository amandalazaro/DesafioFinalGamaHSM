var dados = []

//Apaga registro
function ApagaRegistro(id) {
  let _confirm = confirm('Deseja realmente excluir este registro?')

  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }

    PopulaTabela()
  }
}

//Edita Registro
function EditaRegistro(id) {
  $('modalRegistro').modal('show')

  dados.forEach(function (item) {
    if (item.ID == id) {
      $('#hdID').val(item.ID)
      $('#txtImagem').val(item.Imagem)
      $('#txtCurso').val(item.Curso)
      $('#txtDescricao').val(item.Descricao)
      $('#txtProfessor').val(item.Professor)
      $('#txtAulas').val(item.Aulas)
    }
  })
}

function PopulaTabela() {
  if (Array.isArray(dados)) {
    $('#tblDados tbody').html('')

    localStorage.setItem('__dados__', JSON.stringify(dados))

    dados.forEach(function (item) {
      //Template String
      $('#tblDados tbody').append(`<tr>
        <td>${item.ID}</td>
        <td>${item.Imagem}</td>
        <td>${item.Curso}</td>
        <td>${item.Descricao}</td>
        <td>${item.Professor}</td>
        <td>${item.Aulas}</td>
        <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="fa fa-edit" /></button></td>
        <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class=fa fa-trash" /></button></td>
    </tr>`)
    })
  }
}

$(function () {
  //executa ao carregar a tela
  dados = JSON.parse(localStorage.getItem('__dados__'))

  if (dados) {
    PopulaTabela()
  }

  $('#btnSalvar').click(function () {
    //Evento click do botão salvar
    let _id = $('hdID').val()
    let Imagem = $('#txtImagem').val()
    let Curso = $('#txtCurso').val()
    let Descricao = $('#txtDescricao').val()
    let Professor = $('#txtProfessor').val()
    let Aulas = $('#txtAulas').val()

    //Adiciona e edita registro

    if (!_id || _id == '0') {
      let registro = {}
      registro.Imagem = Imagem
      registro.Curso = Curso
      registro.Descricao = Descricao
      registro.Professor = Professor
      registro.Aulas = Aulas

      registro.ID = dados.length + 1
      dados.push(registro)
    } else {
      dados.forEach(function (item) {
        if (item.ID == _id) {
          item.Imagem = Imagem
          item.Descricao = Descricao
          item.Professor = Professor
          item.Aulas = Aulas
        }
      })
    }

    alert('Registro salvo com sucesso')
    $('#modalRegistro').modal('hide')

    //limpeza dos campos
    $('#hdID').val('0')
    $('#txtImagem').val('')
    $('#txtCurso').val('')
    $('#txtDescricao').val('')
    $('#txtProfessor').val('')
    $('#txtAulas').val('')

    PopulaTabela()
  })
})
