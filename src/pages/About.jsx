import React,{useState,useEffect,useMemo, useRef} from 'react'
import DropDownList from '../components/UI/dropDownList/dropDownList';
import Gallery from '../components/UI/gallery/Gallery';
import { shoes } from '../data/shoes';


const About = () => {
    const productImages = shoes[1].colors[0].images;
    const [selectedSlide,setSelected] = useState(0)
    useEffect(()=>{
        console.log(selectedSlide)
    },[selectedSlide])
    return <div className="About">
        <div className="content" >
            {/* <div className="galery">
                <div className="slides">
                    {productImages.map((item,index)=>
                        <div key={index} className={`slide ${selectedSlide == index?'active':''}`}>
                            <img src={item} alt={`slide${index}`} />
                        </div>
                        )}
                </div>
                <div className="galery-navigation">
                    {productImages.map((item,index)=>
                    <div 
                        key={index} 
                        className="nav__item"
                        onClick={e=>{
                            console.log(e.target.dataset.navid)
                            setSelected(e.target.dataset.navid)}}
                        >
                        <img data-navid={index}  src={item} alt={`slide${index}`} />
                    </div>
                    )}
                </div>
            </div> */}

            <br />
            <Gallery images={productImages} width='520px'/>
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