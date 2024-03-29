import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert, } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode"
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native"
import axios from "axios"


const AddressScreen = () => {

    const [name, setName] = useState("Ankur swami")
    const [mobileNo, setMobileNo] = useState("8690839558")
    const [houseNo, setHouseNo] = useState("07")
    const [street, setStreet] = useState("Ardawate")
    const [landmark, setLandmark] = useState("Ardawata")
    const [postalCode, setPostalCode] = useState("333027")

    const [userIdFromToken, setUserIdFromToken] = useContext(UserType)

    const navigation = useNavigation()

    const handleAddAddress = async () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }
        await axios.post("http://192.168.43.207:8000/addresses", { userIdFromToken, address }).then((response) => {
            Alert.alert("Success", response.data.message)
            setName("")
            setMobileNo("")
            setHouseNo("")
            setStreet("")
            setLandmark("")
            setPostalCode("")

            setTimeout(() => {
                navigation.goBack()
            }, 500);
        }).catch((error) => {
            Alert.alert("Error, Failed to add address", error.response.data.message)
            console.log("Error, failed to add address ", error);
        })


    }

    return (
        <ScrollView style={{ marginTop: 40 }}>
            <View style={{ height: 50, backgroundColor: "#00CED1" }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Add a new Address</Text>

                <TextInput placeholderTextColor={"black"} placeholder="India" style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name (First and last name)</Text>

                    <TextInput value={name} onChangeText={(text) => setName(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="enter your name" />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mobile numebr</Text>

                    <TextInput value={mobileNo} onChangeText={(text) => setMobileNo(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="Mobile No" />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Flat,House No,Building,Company</Text>

                    <TextInput value={houseNo} onChangeText={(text) => setHouseNo(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="" />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Area,Street,sector,village</Text>
                    <TextInput value={street} onChangeText={(text) => setStreet(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="" />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
                    <TextInput value={landmark} onChangeText={(text) => setLandmark(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="Eg near appollo hospital" />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

                    <TextInput value={postalCode} onChangeText={(text) => setPostalCode(text)} placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5, }} placeholder="Enter Pincode" />
                </View>

                <Pressable onPress={() => handleAddAddress()} style={{ backgroundColor: "#FFC72C", padding: 19, borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 20, }}>
                    <Text style={{ fontWeight: "bold" }}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({})