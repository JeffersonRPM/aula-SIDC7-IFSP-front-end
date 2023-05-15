import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import { useToasts } from 'react-toast-notifications';
import { Modal } from "react-bootstrap";

//Socket.io
import io from 'socket.io-client';

import Api from '../../services/api';

export default function Header(params) {

  const { addToast } = useToasts();
  
  useEffect(() => {
    //getQtdeCotacoes();
  }, []);

  function getQtdeVendas(){
    //Api.get("oportunidades/listaquantidade").then(rps => {
      
    //  setQtdeCotacoes(rps.data.obj);
   // })
  }

  
  return (
    <>

      <div id="kt_header" className="header header-fixed">
        {/*begin::Container*/}
        <div className="container d-flex align-items-stretch justify-content-between">
          {/*begin::Left*/}
          <div className="d-flex align-items-center mr-3">
            {/*begin::Aside Toggle*/}
            <button onClick={e => { params.teste() }} className="btn btn-icon aside-toggle ml-n3 mr-10">
              
              <span className="svg-icon svg-icon-xxl svg-icon-dark-75 icon-menu-ajust">
                {/*begin::Svg Icon | path:assets/media/svg/icons/Text/Align-left.svg*/}
                <i className="icon-xl fas fa-align-justify" />
              </span>
            </button>
            {/*end::Aside Toggle*/}
            {/*begin::Logo*/}
            <Link to="/painel" className="menu-link">
              <img alt="Logo" src="img/logo.jpg" className="logo-sticky max-h-60px" />
            </Link>
            {/*end::Logo*/}
          </div>
          {/*end::Left*/}
          {/*begin::Topbar*/}
          <div className="topbar">
            {/*begin::Notifications*/}
            <div className="topbar-item mr-3">
              <Link to="/oportunidades">
                <div className="btn font-weight-bolder btn-sm btn-light-success px-5">
                  0{/*qtdeCotacoes*/}
                </div>
              </Link>
            </div>
            {/*end::Notifications*/}
            
            
            {/*begin::User*/}
            
              <div className="topbar-item mr-4">
                <div className="btn btn-sm btn-clean btn-text-dark-75">
                  <span className="svg-icon svg-icon-lg">
                    {/*begin::Svg Icon | path:assets/media/svg/icons/General/User.svg*/}
                    <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                        <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                      </g>
                    </svg>
                    {/*end::Svg Icon*/}
                    {localStorage.getItem('nome')}
                  </span>
                </div>
              </div>
            
            {/*end::User*/}
          </div>
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
    </>
  )
};