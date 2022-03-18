import { StyleSheet, View, Text } from "react-native";
import Main from "../components/Main";

function Sports({ route }) {
    const { name } = route;
    const sportsCover = require("../assets/coverImage/sports.jpeg");
    const coverImage = {
        source: sportsCover,
        darkness: "rgba(0, 0, 0, 0.07)",
        blurRadius: 1,
    };
    return (
        <Main name={name} coverImage={coverImage}>
            <View style={styles.center}>{/* No Content */}</View>
        </Main>
    );
}

export default Sports;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
