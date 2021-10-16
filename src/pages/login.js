import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableNativeFeedback,  TouchableOpacity, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import { colors, borderRadius } from "../helpers/constant";
import { Feather } from "@expo/vector-icons";
import { StoreContext } from "../config/store";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("screen")

export default function Login({  navigation  }) {
    const { users,user,handlerContext } = useContext(StoreContext)
    const [ credentials, setCreds ] = useState({ numero:"",password:"",hidePassword:true,error:'' });

    const { numero,password,hidePassword,error } = credentials;

    const handlerSubmit = async () => {
        if( numero==="" || password === "" ){
            setCreds({ ...credentials, error:"Uzuza ibyo ubura" })
        }else{
            const exists = users.find( one => one.numero === numero && one.password === password);
            if(exists){
                await new Promise.resolve(handlerContext('user',{ numero,password }))
                navigation.replace('home')
            }else{
                setCreds({ ...credentials, error:`Ntabwo uno umukozi ${'\n'} Abonetse` })
            }
        }
    }

    useEffect(()=>{
        if(user){
            navigation.replace('home')
        }
    },[user])

    return (
        <KeyboardAvoidingView behavior="padding">
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <View>
                    <SafeAreaView></SafeAreaView>
                    <StatusBar style='dark' />
                    <View style={styles.form}>
                        <Text style={styles.injira}>Injira</Text>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <View style={styles.inputField}>
                                <TextInput
                                    value={numero}
                                    style={styles.input}
                                    onChangeText={ (value) => setCreds({ ...credentials, numero:value, error:"" }) }
                                    keyboardType="number-pad"
                                    placeholder="Numero ya telephone"
                                    placeholderTextColor={colors.mutedText}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <TextInput
                                    value={password}
                                    onChangeText={ (value) => setCreds({ ...credentials, password:value, error:"" }) }
                                    style={styles.input}
                                    placeholder="Ijambo ry'ibanga"
                                    secureTextEntry={hidePassword}
                                    placeholderTextColor={colors.mutedText}
                                />
                                <TouchableOpacity onPress={()=> setCreds({ ...credentials, hidePassword: !hidePassword, error:"" })}>
                                    <Feather name={ hidePassword === true ? "eye" : "eye-off" } size={20} color={colors.mutedText} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.wibagiwe}>Wibagiwe ijambo ry'ibanga ?</Text>
                            <Text style={styles.error}>{error}</Text>
                            <TouchableOpacity onPress={handlerSubmit} style={styles.btn}>
                                <Text style={styles.btnText}>Injira</Text>
                            </TouchableOpacity>
                        </View>
                        <View />
                    </View>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
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
    injira: {
        fontFamily: "SemiBold",
        fontSize: 48,
        textAlign: "center",
    },
});
