import React , { Component,createContext } from 'react';

const StoreContext = createContext();

class StoreProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            theme:'light',
            user:null,
            online:{ status:'true',message:'Continue Surfing' },
            users:[
                { numero:'0784824295',password:'rwanda' },
                { numero:'0781704617',password:'rwanda' },
            ],
            amamodoka:[
                { purake:'RAC030B' }
            ]
        }
    }

    handlerContext = (key,value) => {
        this.setState({ [key] : value });
    }

    render(){
        return(
            <StoreContext.Provider 
                    value = {{
                        ...this.state,
                        handlerContext: this.handlerContext,
                    }}
                >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
} 

export { StoreContext,StoreProvider }
