import React from 'react';
import './App.css';
import {GoogleMap, withGoogleMap, Marker} from 'react-google-maps';
import {geolocated} from 'react-geolocated';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
// Counter
function Digit({d}) {
  if (d === 0) {
    return (
      <div className="digit">{ d }</div>
    )
  }
  return (
    <div className="digit">{ d }</div>
  )
}
function Counter({digits}) {
  return (
    <div>
      { digits.map((n, i) => <Digit key={i} d={n}/>) }
    </div>
  )
}
// Article
function Article({data}) {
  return <div>
    <Switch>
      <Route exact path={'/article/' + data.id} render={() => <LongArticle data={data}/>}/>
      <Route exact path={'/articles_list/'} render={() => <ShortArticle data={data}/>}/>
    </Switch>
  </div>
}
function ShortArticle({data}) {
  return <Link to={'/article/' + data.id}>
    <div className="articlesview">
      <h1>{data.title}</h1>
      <img src={data.picture} className="minipic" alt={data.title}/>
      <p>{data.body.substr(0, 200).replace(/\s\S*$/)} ... Read More</p>
    </div>
  </Link>
}
function LongArticle({data}) {
  return <div className="articleview">
    <h1>{data.title}</h1>
    <img src={data.picture} alt={data.title} className="article-photo"/>
    {data.body.split("\n").map((p, i) => <p key={i}>{p}</p>)}
    <Link to={'/articles_list/'}>Back?</Link>
  </div>
}
function Form() {
  return <p> form goes here</p>

}
// Track App & Map
const MyMap = withGoogleMap((props) => {
  console.log(props.lat);
  console.log(props.lng);
  return <GoogleMap
    defaultZoom={16}
    defaultCenter={{lat: props.lat, lng: props.lng}}

  />;
});
class Demo extends React.Component {
  render() {
    return this.props.coords ?
      (<MyMap lat={this.props.coords.latitude} lng={this.props.coords.longitude}
              containerElement={ <div className="map"/> }
              mapElement={ <div className="map"/>}
      />)
      : <div>fetching coords ...</div>;
  }
}
const RealDemo = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000
})(Demo);
// NavBar
function MenuComponent({activeMenuItem, changer}) {

  const items = ["Home", "About", "Login", "MyApp"];
  const f = (x, i) => (<li key={i} onClick={() => changer(x)}
                           className={(x === activeMenuItem) ? "active-menu-item" : "" }><Link to={'/' + {x}}> {x}</Link></li>);
  return (
    <ul className="MenuContainer">

      { items.map(f) }
    </ul>
  )
}
function MyReactProject() {
  return <h5>map here</h5>
}
function About() {
  return <div><h1>about</h1></div>
}
function NotFound() {
  return (<div><p>404 Page Not Found</p></div>)
}
function ProjectDivs() {
  return <div className="projects">
    <Link to={'/articles_list/'}>
      <div className="project-selector"> Articles</div>
    </Link>
    <Link to={'/tvshows/'}>
      <div className="project-selectors"> Tv-Shows by us</div>
    </Link>
    <Link to={'/polls/'}>
      <div className="project-selectors"> Polls</div>
    </Link>
    <Link to={'/api_search/'}>
      <div className="project-selectors"> Browes BBC shows</div>
    </Link>
    <Link to={'/'}>
      <div className="project-selector"><MyReactProject/></div>
    </Link>
    <Link to={'/MyApp/'}>
      <div className="project-selectors"> Track</div>
    </Link>
    <div className="project-selectors"> App</div>
  </div>

}
function Home({counterNumber}) {
  return (<div>
    <div className="App-header">
      <div className="container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>

      <h2>Welcome</h2>
      <div className="App-intro">
        <Counter digits={counterNumber.toString().split('') }/>
      </div>
      <p className="intro">This page 🌐 has my mini projects 🔬, which I worked on through my educational 🎓 journey
        with <a href="www.joincoded.com">COD<b>ED</b></a></p>
    </div>
    <Route exact path={'/'} render={() => <ProjectDivs/>}/>
  </div>)
}


function App({articles, activeMenuItem, changeActiveMenuItem, counterNumber}) {
  return <Router history="">

    <div className="App">

      <MenuComponent activeMenuItem={activeMenuItem} changer={changeActiveMenuItem}/>

      <div className="body">
        {(activeMenuItem === 'Home')
          ? <Home counterNumber={counterNumber}/>
          : (activeMenuItem === 'About')
            ? <About/>
            : (activeMenuItem === 'MyApp')
              ? <NotFound/>
              : <NotFound/>
        }
      </div>
      <div>
        { articles.map(article => <Article key={article.id} data={article}/>)}
      </div>

      <Link to='/article/new'> Add an article bro </Link>
      <Route exact path='/article/new' render={Form}/>
      <RealDemo/>
    </div>
  </Router>
}

function Site({paragraph, counterNumber, search, album, activeMenuItem, changeActiveMenuItem}) {
  return (<Router history=''>
    <div>
      <div>
        <Link to="/" className="navbtn">Home</Link>
        <Link to="/About" className="navbtn">About</Link>
        <Link to="/MyApp" className="navbtn">MyApp</Link>
      </div>
      <div>
        <Route exact path="/" render={Home}/>
        <Route exact path="/about" render={About}/>
        <Route exact path="/myapp"
               render={() => <App paragraph={paragraph} counterNumber={counterNumber} search={search} album={album}
                                  activeMenuItem={activeMenuItem} changeActiveMenuItem={changeActiveMenuItem}/>}/>
      </div>
    </div>
  </Router>)
}

export default App;