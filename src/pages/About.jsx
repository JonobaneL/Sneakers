import React,{useState,useEffect,useMemo, useRef} from 'react'
import { shoes } from '../data/shoes';

const sizeFilters = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];


const About = () => {
    const [checkedSizes, setCheckedSize] = useState([])
    const [isChecked,setIsChecked] = useState(false)
    const handleChange = (data)=>{
        const trigger = checkedSizes.includes(data);
        if(!trigger){
            setCheckedSize(prev=>[...prev,data])
        }
        else setCheckedSize(prev=>prev.filter(item=>item!=data))
    }
    const useSizeFileters = (list,filt=[])=>{
        const filteredSize = useMemo(()=>{
            if(filt.length>0){
                return list.filter(item=>{
                    if(filt.some(size_item=>item.availableSize.includes(size_item))) return item
                });
            }
            else return list
        },[list,filt])
        console.log(filteredSize)
        return filteredSize
    }
   useEffect(()=>{
    console.log(checkedSizes)
    },[checkedSizes])
    const filteredData = useSizeFileters(shoes,checkedSizes);
    return <div className="About">
        <div className="content" >
            <div className="filters">
                <ul className='checkboxList'>
                    {sizeFilters.map((item,index)=>
                        <li key={index} className={`checkboxList__item ${isChecked?'active':''}`} >
                            <label>
                                <input value={isChecked} type="checkbox" onChange={()=>setIsChecked(prev=>!prev)} onClick={()=>handleChange(item)} />
                                {item}
                            </label>
                        </li>
                    )}
                </ul>
            </div>
            
            <ul className='dList'>
                {filteredData.map(item=>
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