import React,{useState,useEffect,useMemo, useRef} from 'react'
import DropDownList from '../components/UI/dropDownList/dropDownList';
import { shoes } from '../data/shoes';

const filterCategory = [
    {id:1,name:"Category1","sub-category":null},
    {id:2,name:"Category2","sub-category":[
        {id:21, name:"Sub-1-Category2"},
        {id:22, name:"Sub-2-Category2"},
        {id:23, name:"Sub-3-Category2"},
        {id:24, name:"Sub-4-Category2"},
    ]},
    {id:3,name:"Category3","sub-category":[
        {id:31, name:"Sub-1-Category3"},
        {id:32, name:"Sub-2-Category3"},
        {id:33, name:"Sub-3-Category3"},
        {id:34, name:"Sub-4-Category3"},
    ]},
    {id:4, name:"Category4","sub-category":null},
]

const About = () => {
    const [category,setCategory] = useState([])
    const handler = (el)=>{
        setCategory([el])
    }
    useEffect(()=>console.log(category),[category])
    return <div className="About">
        <div className="content" >
            <div className="dl">
                <DropDownList getData={handler} data={filterCategory}/>
            </div>
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