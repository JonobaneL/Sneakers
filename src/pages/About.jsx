import React,{useState,useEffect,useMemo} from 'react'
import { useSearchParams } from 'react-router-dom';


const About = () => {
    const [params,setParams] = useSearchParams({color:0,brand:""});
    
    const [filter,setFilter] = useState({color:params.get("color")||0,brand:params.get("color")||''})

    console.log(filter);
    console.log(params.get("color"));

    return <div className="About">
        <div className="content" >
          <br />
            <input type="number" value={filter.color} onChange={e=>{
              setFilter(prev=>{return{...prev,color:e.target.value}})
              setParams(filter)
            }} />
            <input type="text" />
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