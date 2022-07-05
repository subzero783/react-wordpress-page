

const {useState, useEffect} = wp.element;

import './App.css';

const App = () => {

  const [ data, setData ] = useState([])
  const [ acf, setAcf ] = useState(null)
  const [ sidebar, setSidebar ] = useState([])
  const [ discountsTitle, setDiscountsTitle ] = useState(null)

  const hostName = window.location.hostname;
  let res = null

  useEffect(()=>{
    async function getPageContent(id){

        if(hostName === 'ascentfunding.local'){
          res = await fetch( `https://ascentfunding.local/wp-json/wp/v2/pages/${id}`);
        }else{
          res = await fetch( `https://www.ascentfunding.com/wp-json/wp/v2/pages/${id}` );
        }

        if(!res.ok){
            return
        }

        let theData = await res.json()
        console.log(theData)
        setData(theData)
        setAcf(theData.acf)
        setDiscountsTitle(theData.acf.discounts_title)
    }
    getPageContent('307588')
  }, [])

  useEffect(()=>{
    async function get_sidebar_lorp(){

      if(hostName === 'ascentfunding.local'){
        res = await fetch( `https://ascentfunding.local/wp-json/ascent/v1/sidebar-lorp/` );
      }else{
        res = await fetch( `https://www.ascentfunding.com/wp-json/ascent/v1/sidebar-lorp/` );
      }

      if(!res.ok){
        return
      }

      let sidebarContent = await res.json()
      console.log(sidebarContent)

      setSidebar(sidebarContent)
    }
    get_sidebar_lorp()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" dangerouslySetInnerHTML={{__html: sidebar.data}} />
        <div className="col col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
          <section className="discounts">
            {discountsTitle}
          </section>
        </div>
      </div>
      
    </div>
  );
};
export default App;