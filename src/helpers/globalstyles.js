import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const borderRadius = 15

export const globalStyles = StyleSheet.create({
    backhandler:{
        backgroundColor:colors.baseBg,
        padding:7,
        borderRadius:15,
        borderWidth:2,
        borderColor:'rgba(0,0,0,.6)',
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:10
    },
    header:{
        marginHorizontal:"5%",
        paddingVertical:5
    },
    flexed:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    centerd:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        width:'100%',
        height:'100%'
    },
    btn: {
        padding:20,
        borderRadius:borderRadius+10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth:2,
        borderColor:"rgba(0,0,0,0.2)",
        shadowOffset:{width:0,height:0},
        shadowOpacity:.3,
        shadowRadius:10
    },
    btnText:{
        fontFamily:"SemiBold",
        fontSize:20,
        color:colors.mainText,
    },
    shadow:{
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:10
    },
    textShadow:{
        textShadowColor:"rgba(0,0,0,.5)",
        textShadowOffset:{width:0,height:0},
        textShadowRadius:5,
    },
    inputField:{
      borderWidth:1,
      borderColor:colors.lightIcon,
      marginVertical:10,
      borderRadius:35,
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:15
    },
    input:{
      flex:1,
      paddingVertical:20,
      paddingHorizontal:10,
      color:colors.mainText,
      fontFamily:"Medium",
      fontSize:15
    },
})
