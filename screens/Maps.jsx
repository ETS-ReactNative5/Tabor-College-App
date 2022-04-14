// Module Imports
import { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

// Relative Imports
import Main from "../components/Main";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Chip, Title } from "react-native-paper";

function Maps({ route }) {
    const [locations, setLocations] = useState([]);
    const [activeLocation, setActiveLocation] = useState();
    const markerRef = useRef(null);
    const { name } = route;
    const mapsCover = require("../assets/coverImage/maps.jpg");
    const coverImage = {
        source: mapsCover,
        darkness: "rgba(0, 0, 0, 0.12)",
        blurRadius: 0,
    };

    useEffect(() => {
        // Get maps Locations from Firestore
        const docRef = doc(db, "maps", "Buildings on Campus");
        getDoc(docRef).then((doc) => {
            setLocations(doc.data().locations);
            setActiveLocation(doc.data().locations[0]);
        });
    }, []);

    return (
        <Main name={name} coverImage={coverImage} imageSize="small">
            <MapView
                onRegionChangeComplete={() => {
                    if (markerRef.current) {
                        markerRef.current.showCallout();
                    }
                }}
                style={styles.map}
                initialRegion={{
                    latitude: 38.34851,
                    longitude: -97.20017,
                    latitudeDelta: 0.0012,
                    longitudeDelta: 0.0011,
                }}
                provider="google"
                showsCompass
            >
                <Marker
                    coordinate={{
                        latitude: 38.34851,
                        longitude: -97.20017,
                    }}
                    ref={markerRef}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: 38.34882,
                        longitude: -97.201,
                    }}
                >
                    <Callout>
                        <Text>Tabor College Library</Text>
                    </Callout>
                </Marker>
            </MapView>
            <ScrollView style={styles.center}>
                <View style={styles.buildingsOnCampus}>
                    <Title style={styles.locationsTitle}>
                        Buildings on Campus
                    </Title>
                    <View style={styles.locationsContainer}>
                        {locations.map((location) => (
                            <View key={location} style={styles.location}>
                                <Chip
                                    onPress={() => console.log(location)}
                                    style={styles.chip}
                                    mode="outlined"
                                    textStyle={styles.chipText}
                                >
                                    {location}
                                </Chip>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Main>
    );
}

export default Maps;

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
    map: {
        height: 280,
        width: "100%",
    },
    buildingsOnCampus: {
        padding: 15,
    },
    locationsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    locationsTitle: {
        marginBottom: 12,
    },
    location: {
        marginBottom: 8,
        marginRight: 10,
    },
    // chip: {
    //     backgroundColor: "rgb(226, 237, 248)",
    //     borderColor: "rgb(0, 127, 255)",
    // },
    chip: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderColor: "black",
    },
    chipText: {
        // color: "#0057B2",
        // color: "rgb(0, 127, 255)",
    },
    chipText: {
        color: "black",
    },
});
