import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollViewComponent, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function MessageScreen({ navigation }: RootTabScreenProps<"Message">) {
    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
                    <TouchableOpacity key={index} style={{display: "flex", flexDirection: "row", alignItems: "center", padding: 20, 
                    borderBottomWidth: 0.5, borderBottomColor: Colors.light.blurBorder}}
                        // onPress={() => navigation.navigate("Chat")}
                    >
                        <Image style={{width: 40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}/>
                        <View style={{display: "flex", flexDirection: "column", marginLeft: 10, width: "60%"}}>
                            <Text style={{fontWeight: "bold"}}>Nguyễn Văn A</Text>
                            <Text style={{}} numberOfLines={1}>Bánh ngon ngon</Text>
                        </View>
                        <View style={{marginLeft: "auto"}}>
                            <Entypo name="dots-three-vertical" size={20} color={Colors.light.textHighlight} />
                        </View>
                    </TouchableOpacity>
                ))}
                            
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

