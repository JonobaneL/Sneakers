export const navVariants = {
    visible:{
        paddingLeft:'18%',
        opacity:1,
        transition:{
            delay:0.4
        }
    },
    hidden:{
        paddingLeft:0,
        opacity:0,
    }
}
export const logoVarints = {
    visible:(screenWidth)=>{
        if(screenWidth <= 768){
            return {
                opacity:1,
                transition:{
                    delay:0.5
                }
            }
        }else return {}
    },
    hidden:(screenWidth)=>{
        if(screenWidth <= 768){
            return {
                opacity:0,
            }
        }else return {}
    }
}
export const headerVariants={
    opened:(screenWidth)=>{
        if(screenWidth > 1024){
            return {
                gridTemplateColumns:'130px 0fr 1fr 0px 130px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
        else if(screenWidth > 768){
            return {
                gridTemplateColumns:'128px 0fr 1fr 0px 128px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
        else{
            return {
                gridTemplateColumns:'0px 0fr 1fr 0px 80px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
    },
    closed:(screenWidth)=>{
        if(screenWidth > 1024){
            return {
                gridTemplateColumns:'130px 4fr 1fr 75px 0px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
        else if(screenWidth > 768){
            return {
                gridTemplateColumns:'128px 3fr 1fr 75px 0px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
        else{
            return {
                gridTemplateColumns:'110px 3fr 0.005fr 75px 0px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
    }
}
export const searchVariants = {
    opened:(screenWidth)=>{
        if(screenWidth <= 768){
            return {
                background:'#e9eaf1',
                paddingRigth:7,
                transition:{
                    duration:0.2,
                }
            }
        }
        else return {}
    },
    closed:(screenWidth)=>{
        if(screenWidth <= 768){
            return {
                background:'#ffffff',
                paddingRigth:0,
                transition:{
                    duration:0.2,
                    delay:0.4 
                }
            }
        }
        else return {}
    }
}
export const searchWrapperVariants = {
    opened:(screenWidth)=>{
        if(screenWidth> 1024 ){
            return {
                paddingInline:'20%',
                transition:{
                    delay:0.4
                }
            }
        }
        else if(screenWidth > 768){
            return {
                paddingInline:'10%',
                transition:{
                    delay:0.4
                }
            }
        }
        else return {
            paddingInline:0,
            transition:{
                delay:0.4
            }
        }
    },
    closed:(screenWidth)=>{
        if(screenWidth > 768){
            return {
                paddingInline:0,
                transition:{
                    delay:0.3
                }
            }
        }
        else return {}
    }
}