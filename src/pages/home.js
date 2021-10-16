import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableNativeFeedback,  TouchableOpacity, Keyboard, Dimensions, KeyboardAvoidingView, Image } from "react-native";
import { colors, borderRadius } from "../helpers/constant";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StoreContext } from "../config/store";

const { width } = Dimensions.get("screen")

export default function Home() {
    const { amamodoka,handlerContext } = useContext(StoreContext)
    const [ credentials, setCreds ] = useState({ plateNumber:"",error:'',success:false });

    const { plateNumber,error,success } = credentials;
    
    const validator = () => {
        let decision = true ;
        const ThirdLetter = plateNumber.charAt(2);
        const lastLetter = plateNumber.charAt(6);
        const Rwanda = plateNumber.slice(0,2);
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;



        // in case platenumber in small or larger RAB097986B or RBA87B
        if(plateNumber.length !== 7) decision = false;

        // in case RA is writte wrong as e.g KA or RB
        if(Rwanda !== 'RA' ) decision = false;

        // in case RAB is writte wrong as e.g RA9 
        if(!isNaN(ThirdLetter)) decision = false;

        // in case RAB is writte wrong as e.g RAB8007 
        if(!isNaN(lastLetter)) decision = false;

        // in case the platenumber has special characters e.g %,$,#,!
        if(format.test(plateNumber)) decision = false;

        return decision
    } 

    const handlerSubmit = () => {
        if( plateNumber === "" ){
            setCreds({ ...credentials, error:"Uzuza ibyo ubura" })
        }else{

            if( validator() ){
                handlerContext('amamodoka',[ ...amamodoka,{ plateNumber } ])
                setCreds({ ...credentials, success:true,plateNumber:"" })
            }else{
                setCreds({ ...credentials, error:`Ntabwo ino purake ${'\n'} Ibaho` })
            }
        }
    }

    useEffect(()=>{
        let id
        if(success){
            id = setTimeout(()=> setCreds({ ...credentials, success:false }),5000)
        }
        return () => clearTimeout(id)
    },[success])

    return (
        <KeyboardAvoidingView behavior="padding">
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <View>
                    <SafeAreaView>
                        <View style={{width,paddingHorizontal:20,alignItems:'flex-end'}}>
                            <Ionicons name="options" size={30} />
                        </View>
                    </SafeAreaView>
                    <View style={styles.form}>
                        <StatusBar style='dark' />
                        <Image source={require('../assets/images/worker.png')} style={styles.icon} />
                        <View>
                            <Text style={styles.injira}>Murakaza Neza</Text>
                            <Text style={styles.injiza}>Injiza imodoka</Text>
                        </View>
                        <View
                            style={{
                                height:'40%',
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <View style={styles.inputField}>
                                <TextInput
                                    value={plateNumber}
                                    style={styles.input}
                                    onChangeText={ (value) => setCreds({ ...credentials, plateNumber:value.toUpperCase(), error:"" }) }
                                    placeholder="Nimero ya purake"
                                    placeholderTextColor={colors.lightText}
                                />
                            </View>
                            <Text style={styles.error}>{error}</Text>
                            
                            {
                                success ?
                                    <View style={{alignItems:"center"}}>
                                        <Feather name="check" size={20} color={colors.lightIcon} />
                                        <Text style={styles.done}>Byakozwe Neza</Text>
                                    </View> :
                                    !error ?
                                    <TouchableOpacity onPress={handlerSubmit} style={styles.btn}>
                                        <Text style={styles.btnText}>Tangira</Text>
                                    </TouchableOpacity> : null
                            }

                        </View>
                        <View />
                    </View>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
    icon:{ 
        width:width*0.8,
        height:'20%',
        resizeMode:'contain' 
    },
    done:{ 
        fontFamily:"SemiBold",
        fontSize:15,
        color:colors.primary
    },
    error:{
        fontFamily:'Medium',
        fontSize:13,
        color:colors.error,
        marginVertical:10,
        textAlign:'center'
    },
    btnText: {
        fontSize: 15,
        fontFamily: "SemiBold",
        color: colors.btnTextColor,
        textAlign:'center'
    },
    btn: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius,
        width: width*0.25,
        marginVertical:20
    },
    wibagiwe: {
        color: colors.lightText,
        fontSize: 15,
        marginVertical:10,
        fontFamily: 'Regular'
    },
    input: {
        fontSize: 15,
        fontFamily: "Regular",
        textAlign: "center",
        flex: 1,
    },
    inputField: {
        borderWidth: 1,
        borderColor: colors.lightIcon,
        borderRadius: borderRadius,
        width: "75%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical:10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    form: {
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%",
    },
    injiza:{
        fontFamily: "SemiBold",
        fontSize: 25,
        textAlign: "center",
        color:colors.mutedText
    },
    injira: {
        fontFamily: "SemiBold",
        fontSize: 30,
        textAlign: "center",
    },
});
