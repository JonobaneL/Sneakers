import Card from "../components/Card/Card";
import {novelty} from '../data/homeSneakersData'

const About = () => {
    return <div className="About">
        <div className="content" >
            <Card data={novelty[0]}/>
            <Card data={novelty[1]}/>
            <Card data={novelty[2]}/>
            <Card data={novelty[3]}/>
            <Card data={novelty[4]}/>
        </div>
    </div>;
}
 
export default About;