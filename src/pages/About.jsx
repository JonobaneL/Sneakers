import React,{useState,useEffect,useMemo, useRef} from 'react'
import { shoes } from '../data/shoes';
const data = [
    {id:1,color: 'Black', name:"Name1",brand:"Vans",price:100},
    {id:2,color: 'Brown',name:"Name2",brand:"Adidas",price:30},
    {id:3,color: 'Brown',name:"Name3",brand:"Vans",price:80},
    {id:4,color: 'Black', name:"Name4",brand:"Convers",price:90},
    {id:5,color: 'Black', name:"Name5",brand:"Convers",price:50},
    {id:6,color: 'Blue', name:"Name6",brand:"Vans",price:70},
    {id:7,color: 'Black', name:"Name7",brand:"Vans",price:40},
    {id:8,color: 'Blue', name:"Name8",brand:"Adidas",price:80},
    {id:9,color: 'Blue', name:"Name9",brand:"Adidas",price:75},
    {id:10,color: 'Black', name:"Name10",brand:"Vans",price:100},
   
]
const priceFilters = [
    {id:1,name:"Under $30"},
    {id:2,name:"$30 to $50"},
    {id:3,name:"$50 to $75"},
    {id:4,name:"$75+"},
]

const About = () => {
    const [checkedPrice, setCheckedPrice] = useState([])
    const check = useRef()
    const handlerColor =(elme)=>{
        if(!checkedPrice.includes(elme)){
            setCheckedPrice([...checkedPrice,elme])
        }
        else{
            setCheckedPrice(checkedPrice.filter(item=>item!==elme))
        }
    }
    const usePriceShoes =(list,price)=>{
        const response = useMemo(()=>{
            const result = []
            price.forEach(price_item=>{
                switch(price_item){
                    case 'Under $30':
                        result.push(...list.filter(item=>item.price>0 && item.price<30));
                        break;
                    case '$30 to $50':
                        result.push(...list.filter(item=>item.price>=30 && item.price<50));
                        break;
                    case '50 to $75':
                        result.push(...list.filter(item=>item.price>=50 && item.price<75));
                        break;
                    case '$75+':
                        result.push(...list.filter(item=>item.price>=75 && item.price<500000));
                        break;
                }
            })
            if(price.length==0){
                return list
            }
            else return result;
        },[list,price])
        return response
    }
    const newData = usePriceShoes(shoes,checkedPrice)
    console.log(newData)
    // console.log(checkedPrice)
    
    return <div className="About">
        <div className="content" >
            <div className="filters">
                <ul className='checkboxList'>
                    {priceFilters.map(item=>
                        <li key={item.id} className="checkboxList__item" >
                            <label>
                                <input ref={check} type="checkbox" id={item.id} onClick={()=>handlerColor(item.name)} />
                                {item.name}
                            </label>
                        </li>
                    )}
                </ul>
            </div>
            
            <ul className='dList'>
                {newData.map(item=>
                    <li key={item.id} className="dList__item">
                        <p>{item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.color}</p>
                        <p>{item.brand}</p>
                        <p>{item.price}</p>
                    </li>
                )}
            </ul>
          <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime dolorum asperiores illum, nisi temporibus expedita veritatis optio obcaecati autem, deserunt porro repudiandae ratione hic ut molestias, omnis fugit quia voluptatibus.
            Voluptates dignissimos deleniti ipsa aperiam et itaque similique quaerat. Incidunt nulla aliquid rerum enim ea consequuntur repudiandae! Non corporis provident iusto animi ullam. Autem repellendus molestias quod sint animi? Quis!
            Nobis eligendi necessitatibus voluptatum suscipit praesentium excepturi error beatae laborum vero eveniet aliquam alias, quis molestiae in quibusdam delectus minima itaque consectetur laudantium tenetur neque ducimus minus quidem harum. Et.
            Quia exercitationem quo nesciunt eius explicabo, sint hic laboriosam, nostrum iure, iste ea incidunt quaerat. Necessitatibus eaque expedita architecto ipsam natus in, odit dolores ullam laboriosam aut, illum culpa porro?
            Ipsam eaque expedita a quasi? Quam assumenda illum commodi, pariatur maxime nobis iste magnam officia doloremque ex est labore tempora itaque enim ratione ipsa unde. Voluptatem nesciunt praesentium adipisci a.
            Facere, inventore eum alias quae fugit magnam amet natus nulla officiis cupiditate adipisci! Suscipit, illum. Optio eos animi fuga fugiat, ipsa veniam odio hic perspiciatis ut a nemo rem incidunt.
            Et dolore qui, quis cupiditate voluptates dicta unde quidem facilis cum eos quos doloremque ea nobis voluptatem ut at aliquid modi quod culpa sunt incidunt sint veritatis? Cumque, totam officia.
            Earum ex non harum magnam facilis excepturi quae
        
        </div>
    </div>;
}
 
export default About;