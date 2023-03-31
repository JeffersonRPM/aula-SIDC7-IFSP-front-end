import React from 'react';
import Api from '../services/api';

import Header from './Header';
//import Sidebar from "react-sidebar";
import { Link } from 'react-router-dom';

const mql = window.matchMedia(`(min-width:  800px)`);

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      classe: '',
      menus: {},
      detalhesLoja: {},
      sidebarDocked: mql.matches,
      sidebarOpen: false
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  toggleCollapsed = () => {
    var classe = "";
    if(this.state.collapsed===true){
      classe =  "";
    } else {
      classe =  "aside-on";
    }

    this.setState({
      collapsed: !this.state.collapsed,
      classe: classe
    });
  };

  alternaMenu(item){
    var m = {};
    if(this.state.menus[item]===undefined || this.state.menus[item]===""){
      m[item] = "menu-item-open";
    } else {
      m[item] = "";
    }
    this.setState({
      ...this.state,
      menus: m,
    });
  }

  doLogout(){
    localStorage.clear();
  }
  
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <div className="d-flex flex-column flex-root">
          <div className="d-flex flex-row flex-column-fluid page">
         
            {/** INICIO DO ASIDE */}
            {this.state.classe==='aside-on' && 
            <div class="aside-overlay" onClick={e=> {this.toggleCollapsed()}}></div>
            }
            <div
              className={"aside aside-left d-flex flex-column flex-row-auto " + this.state.classe}
              id="kt_aside"
            >
              <div
                className="aside-menu-wrapper flex-column-fluid"
                id="kt_aside_menu_wrapper"
              >

                {/*begin::Menu Container*/}
                <div id="kt_aside_menu" className="aside-menu" data-menu-vertical={1} data-menu-scroll={1} data-menu-dropdown-timeout={500}>
                  {/*begin::Menu Nav*/}
                  <ul className="menu-nav">
                    <li className="menu-item" aria-haspopup="true">
                      <Link to="/painel" className="menu-link" onClick={e=>{this.toggleCollapsed()}}>
                        <span className="svg-icon menu-icon">
                          {/*begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg*/}
                          <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                              <rect x={0} y={0} width={24} height={24} />
                              <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill="#000000"/>
                            </g>
                          </svg>
                          {/*end::Svg Icon*/}
                        </span>
                        <span className="menu-text">Painel de Controle</span>
                      </Link>
                    </li>
                    <li className="menu-section">
                      <h4 className="menu-text">Gerenciamento Interno</h4>
                      <i className="menu-icon ki ki-bold-more-hor icon-md" />
                    </li>
                  
                    <li className="menu-item" aria-haspopup="true">
                      <Link to="/sistema/cadastro" className="menu-link" onClick={e=>{this.toggleCollapsed()}}>
                      <span className="svg-icon menu-icon">{/*begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo5\dist/../src/media/svg/icons\General\Star.svg*/}<svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24" />
                          <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                          <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fillRule="nonzero" />                        </g>
                        </svg>{/*end::Svg Icon*/}
                      </span>
                        <span className="menu-text">Cadastro</span>
                      </Link>
                    </li>
                    
                    <li className="menu-item" aria-haspopup="true">
                      <span className="menu-text text-align-center py-5 px-9 text-muted">Versão: 1.0.0</span>
                    </li>
                  </ul>
                  {/*end::Menu Nav*/}
                </div>
                {/*end::Menu Container*/}



              </div>
            </div>
            {/** FIM DO ASIDE */}
            <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper" >
              
              {/** INICIO HEADER */}
              <Header teste={this.toggleCollapsed} storeDetails={this.getDetalhesLoja}/>
              {/** FIM HEADER */}
              
              {/** Conteudo */}
              {children}
              {/** FIM Conteudo */}

              
            </div>
          </div>
        </div>

    

      </>
    )
  }
};
export default index;