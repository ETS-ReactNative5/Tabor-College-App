// Module Imports
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Relative Imports
import Main from "../components/Main";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import FoodCard from "../components/cafe_menu/FoodCard";
import DaysButtonGroup from "../components/cafe_menu/DaysButtonGroup";
import { Card, Subheading } from "react-native-paper";

function CafeMenu({ route }) {
    const [cafeMenu, setCafeMenu] = useState([]);
    const [activeDay, setActiveDay] = useState();
    const [loadingData, setLoadingData] = useState(true);
    const { name } = route;
    const cafeMenuCover = require("../assets/coverImage/cafeMenu.jpg");
    const noMenuAvailableImg = require("../assets/cafe_menu/noMenuAvailable.png");
    const coverImage = {
        source: cafeMenuCover,
        darkness: "rgba(0, 0, 0, 0.17)",
        blurRadius: 1,
    };

    useEffect(() => {
        // Get the cafe menu from firebase version 9
        if (activeDay) {
            const docRef = doc(db, "cafe menu", activeDay);
            getDoc(docRef)
                .then((doc) => {
                    setCafeMenu(doc.data().sections);
                    setLoadingData(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [activeDay]);

    return (
        <Main name={name} coverImage={coverImage}>
            <DaysButtonGroup
                activeDay={activeDay}
                setActiveDay={setActiveDay}
            />
            {/* Render if there cafe menu is empty even after the data is done loading */}
            {cafeMenu.length === 0 && !loadingData && (
                <View style={{ paddingHorizontal: 18 }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Subheading>
                                No menu available on {activeDay}.
                            </Subheading>
                            <Card.Cover source={noMenuAvailableImg} />
                        </Card.Content>
                    </Card>
                </View>
            )}
            <FlatList
                data={cafeMenu}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.title}
                renderItem={({ item: section }) => (
                    <FoodCard section={section} />
                )}
            />
        </Main>
    );
}

export default CafeMenu;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 18,
        paddingBottom: 5,
    },
    card: {
        marginBottom: 15,
        padding: 10,
        paddingHorizontal: 18,
        alignItems: "center",
    },
});
