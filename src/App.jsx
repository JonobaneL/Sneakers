import ShortCardList from "./components/ShortCardLIst/ShortCardList"
import Header from "./components/UI/header/Header"
import Tabs from "./components/UI/tabs/Tabs"

function App() {
  return (
    <div className="App">
      <Header/>
      <Tabs/>
     
     <ShortCardList 
        title='Best Sellers'
        params={[
          {id:'01',name:`Kids' Court Borough 2 High Top Sneaker Big Kid`, price:'$74.99',image:'https://www.famousfootwear.com/blob/product-images/20000/38/42/1/38421_right_feed1000.jpg'},
          {id:'02',name:`Women's Essentials Arizona Footbed Sandal`, price:'$49.99',image:'https://www.famousfootwear.com/blob/product-images/20000/95/13/3/95133_right_feed1000.jpg'},
          {id:'03',name:`Kids' Court Borough 2 High Top Sneaker Big Kid`, price:'$74.99',image:'https://www.famousfootwear.com/blob/product-images/20000/55/27/3/55273_right_feed1000.jpg'},
          {id:'04',name:`Men's Chuck Taylor All Star Malden High Top Sneaker`, price:'$49.99',image:'https://www.famousfootwear.com/blob/product-images/20000/93/68/0/93680_right_feed1000.jpg'},
        ]}
     />
      <ShortCardList 
        title='New Arrivals'
        params={[
          {id:'01',name:`Kids' Court Borough 2 High Top Sneaker Big Kid`, price:'$74.99',image:'https://www.famousfootwear.com/blob/product-images/20000/38/42/1/38421_right_feed1000.jpg'},
          {id:'02',name:`Women's Essentials Arizona Footbed Sandal`, price:'$49.99',image:'https://www.famousfootwear.com/blob/product-images/20000/95/13/3/95133_right_feed1000.jpg'},
          {id:'03',name:`Kids' Court Borough 2 High Top Sneaker Big Kid`, price:'$74.99',image:'https://www.famousfootwear.com/blob/product-images/20000/55/27/3/55273_right_feed1000.jpg'},
          {id:'04',name:`Men's Chuck Taylor All Star Malden High Top Sneaker`, price:'$49.99',image:'https://www.famousfootwear.com/blob/product-images/20000/93/68/0/93680_right_feed1000.jpg'},
        ]}
     />
    </div>
  )
}

export default App
