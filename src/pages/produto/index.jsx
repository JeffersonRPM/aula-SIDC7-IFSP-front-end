import React, { useState, useEffect } from "react";
import Api from '../../services/api';
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { useToasts } from "react-toast-notifications";
import LoadingOverlay from "react-loading-overlay";
import { Modal, ModalTitle } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";

const Produto = () => {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const [acao, setAcao] = useState();
  const [produto, setProduto] = useState(false);
  const [listaDados, setListaDados] = useState([]);
  const [carregar, setCarregar] = useState(false);
  const [categoriaSelect, setCategoriaSelect] = useState([]);
  const [buscaProduto, setBuscaProduto] = useState();
  const [buscaStatus, setBuscaStatus] = useState();
  const [buscaCod, setBuscaCod] = useState();

  useEffect(() => {
    listar();
    listarCategoria();
  }, []);

  function filtrar() {
    setCarregar(true);
    var data = {
      nome: buscaProduto,
      status: buscaStatus,
      id_categoria: buscaCod
    };

    Api.post('produto/filtrar', data).then((rps) => {
      if (rps.data.status == false) {
        Swal.fire({
          title: "Atenção",
          icon: "info",
          html: rps.data.erro,
          showCloseButton: true,
          showCancelButton: false
        });
        setListaDados({});
      } else {
        setListaDados(rps.data.obj);
      }
      setCarregar(false);
    })
  }

  function listarCategoria() {
    Api.get("categoria/listarcategoria").then((rps) => {
      var cat = rps.data.obj;
      var nCat = []
      nCat[nCat.length] = { value: "", label: "Selecione..." };
      cat.forEach((e) => {
        nCat[nCat.length] = { value: e.id, label: e.nome }
      });
      setCategoriaSelect(nCat);
    })
  }

  const data = listaDados;
  const columns = [
    {
      name: <th>Código</th>,
      selector: 'id',
      sortable: true,
      width: '4%',
      center: true,
    },
    {
      name: <th>Nome</th>,
      selector: 'nome',
      sortable: true,
      width: '9%',
    },
    {
      name: <th>Descrição</th>,
      selector: 'descricao',
      sortable: true,
      width: '20%',
    },
    {
      name: <th>Data Cadastro</th>,
      selector: 'data_cad',
      sortable: true,
      width: '12%',
      center: true,
    },
    {
      name: <th>Data Alteração</th>,
      selector: 'data_alt',
      sortable: true,
      width: '12%',
      center: true,
    },
    {
      name: <th>Cod. Categoria</th>,
      selector: 'id_categoria',
      sortable: true,
      width: '6%',
      center: true,
    },
    {
      name: <th>Valor Compra</th>,
      selector: 'valor_compra',
      sortable: true,
      width: '7%',
      center: true,
    },
    {
      name: <th>Valor Venda</th>,
      selector: 'valor_venda',
      sortable: true,
      width: '7%',
      center: true,
    },
    {
      name: <th>Estoque</th>,
      selector: 'estoque',
      sortable: true,
      width: '5%',
      center: true,
    },
    {
      name: <th>Status</th>,
      selector: 'status',
      sortable: true,
      width: '6%',
      center: true,
      cell: row => {
        if (row.status == "S") { return <span class="label label-success label-inline">Ativo</span> }
        else { return <span class="label label-secondary label-inline">Desativado</span> }
      }
    },
    {
      name: <th>Ações</th>,
      center: true,
      cell: row => {
        return <>
          <button className="btn btn-warning btn-sm"
            onClick={e => { editar(row) }}>Alterar</button>
          <button className="btn btn-danger btn-sm ml-2"
            onClick={e => { excluir(row) }}>Excluir</button>
        </>
      }
    },
  ];

  function adicionar() {
    setModal(true);
    setProduto({});
    setAcao('Adicionar');
  }

  function editar(registro) {
    var cad = JSON.parse(JSON.stringify(registro));
    setProduto(cad);
    setAcao('Editar');
    setModal(true);
  }

  function excluir(registro) {
    var cad = JSON.parse(JSON.stringify(registro));

    setCarregar(true);

    Swal.fire({
      icon: 'question',
      title: 'Confirmação',
      html: 'Deseja excluir o registro?',
      showCancelButton: true,
      confirmButtonText: 'Sim, Confirmar',
      cancelButtonText: 'Não, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Api.post('produto/excluir', cad).then(rps => {
          if (rps.data.status == true) {
            addToast(rps.data.mensagem, {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 3000
            });
            listar();
          }
        })
      }
      setCarregar(false);
    })
  }

  function listar() {
    setCarregar(true);
    Api.get("produto/listar").then(rps => {
      setListaDados(rps.data.obj);
      setCarregar(false);
    })
  }

  function fecharModal() {
    setModal(false);
  }

  function salvar() {
    Api.post('produto/adicionar', produto).then(rps => {
      if (rps.data.status === true) {
        addToast(rps.data.mensagem, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000
        });
        setModal(false);
        listar();
      } else {
        Swal.fire({
          title: "Erro!",
          icon: "error",
          html: rps.data.erros,
          showCloseButton: true,
          showCancelButton: false
        })
      }
    })
  }

  return (
    <>
      <div className="subheader espaco-header-pedidos subheader-transparent" id="kt_subheader">
        <div className="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
          {/*begin::Details*/}
          <div className="d-flex align-items-center flex-wrap mr-2">
            {/*begin::Title*/}
            <h5 className="text-dark font-weight-bold mt-6 mb-2 mr-5">Produto</h5>
            {/*end::Title*/}
            {/*begin::Separator*/}
            <div className="subheader-separator subheader-separator-ver mt-6 mb-2 mr-5 bg-gray-200" />
            {/*end::Separator*/}
          </div>
          {/*end::Details*/}
          {/*begin::Toolbar*/}
          <div className="d-flex align-items-center">
            <button className="btn btn-success mt-5"
              onClick={e => { adicionar() }}>
              <i className="fas fa-plus"></i>Adicionar</button>
          </div>
          {/*end::Toolbar*/}
        </div>
      </div>


      {/*begin::Entry*/}
      <div className="d-flex flex-column-fluid">
        {/*begin::Container*/}
        <div className="container">

          <div className="card card-custom">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Nome</label>
                <input type="text" value={buscaProduto}
                  onChange={e => { setBuscaProduto(e.target.value) }}
                  className="form-control" />
              </div>
              <div className="col-md-2 form-group">
                <label>Cod. Categoria</label>
                <input type="text" value={buscaCod}
                  onChange={e => { setBuscaCod(e.target.value) }}
                  className="form-control" />
              </div>
              <div className="col-md-2 form-group">
                <label>Status</label>
                <select className="form-control" value={buscaStatus}
                  onChange={e => { setBuscaStatus(e.target.value) }}>
                  <option value="" selected>Selecione</option>
                  <option value="S">Ativo</option>
                  <option value="N">Desativado</option>
                </select>
              </div>
              <div className="col-md-2 form-group">
                <label>&nbsp;</label>
                <button className="btn btn-primary btn-block"
                  onClick={e => { filtrar() }}
                  value="Filtrar">Filtrar
                </button>
              </div>
            </div>
          </div>

          {/*begin::Row*/}
          <LoadingOverlay
            active={carregar}
            spinner
            text='Carregando...'
          >
            <div className="row">
              <DataTable
                title="Lista de Produto"
                columns={columns}
                data={data}
                striped="true"
                pagination="true"
              />
            </div>
          </LoadingOverlay>
          {/*end::Row*/}


          {/*end::Dashboard*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Entry*/}

      {/*end::Content*/}
      {/*begin::Footer*/}
      <div className="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
        {/*begin::Container*/}
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          {/*begin::Copyright*/}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-2">2023©</span>
            <a href="#" target="_blank" className="text-dark-75 text-hover-primary">LAC</a>
          </div>
          {/*end::Copyright*/}
          {/*begin::Nav*/}
          <div className="nav nav-dark order-1 order-md-2">
            {/*Aqui Link e informação a direita */}
          </div>
          {/*end::Nav*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Footer*/}
      {/*end::Wrapper*/}
      {/*end::Page*/}
      {/*end::Main*/}

      <Modal size={"xl"} show={modal} onHide={() => fecharModal()}>
        <Modal.Header>
          <Modal.Title>Produto</Modal.Title>
        </Modal.Header>

        <div className="row ml-5 mr-5 mt-5">
          <div className="form-group col-md-10">
            <label>Nome</label>
            <input type="text" className="form-control"
              onChange={e => { setProduto({ ...produto, nome: e.target.value }) }}
              value={produto?.nome} />
          </div>

          <div className="form-group col-md-2">
            <label>Status</label>
            <select className="form-control"
              value={produto?.status}
              onChange={e => { setProduto({ ...produto, status: e.target.value }) }}>
              <option value="" selected>Selecione</option>
              <option value="S">Ativo</option>
              <option value="N">Desativado</option>
            </select>
          </div>
        </div>

        <div className="row ml-5 mr-5 mt-5">
          <div className="form-group col-md-9">
            <label>Descrição</label>
            <input type="text" className="form-control"
              onChange={e => { setProduto({ ...produto, descricao: e.target.value }) }}
              value={produto?.descricao} />
          </div>

          <div className="form-group col-md-3">
            <label>Estoque</label>
            <input type="text" className="form-control"
              onChange={e => { setProduto({ ...produto, estoque: e.target.value }) }}
              value={produto?.estoque} />
          </div>
        </div>

        <div className="row ml-5 mr-5 mt-5">
          <div className="form-group col-md-6">
            <label>Valor da compra</label>
            <input type="text" className="form-control"
              onChange={e => { setProduto({ ...produto, valor_compra: e.target.value }) }}
              value={produto?.valor_compra} />
          </div>

          <div className="form-group col-md-6">
            <label>Valor da venda</label>
            <input type="text" className="form-control"
              onChange={e => { setProduto({ ...produto, valor_venda: e.target.value }) }}
              value={produto?.valor_venda} />
          </div>
        </div>

        <div className="row ml-5 mr-5">
          <div className="form-group col-md-12">
            <label>Categoria</label>
            <Select
              options={categoriaSelect}
              placeholder="Selecione..."
              defaultValue={categoriaSelect.find(
                (x) => x.value === produto?.id_categoria
              )}
              onChange={e => { setProduto({ ...produto, id_categoria: e.value }) }} />
          </div>
        </div>
        <Modal.Footer>
          <button type="button" onClick={e => { fecharModal() }}
            className="btn btn-secondary">Fechar</button>
          <button type="button" onClick={e => { salvar() }}
            className="btn btn-primary">Salvar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default withRouter(Produto);