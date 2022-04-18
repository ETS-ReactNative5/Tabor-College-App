import { StyleSheet, View } from "react-native";
import { Chip, Title, Card } from "react-native-paper";

function BuildingsOnCampus({ locations, setActiveLocation, regionRef }) {
    const handleMarkerPress = (location) => {
        setActiveLocation(location);
        // Set the region to the active location
        regionRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0011,
        });
    };

    return (
        <Card style={styles.buildingsOnCampus}>
            <Title style={styles.locationsTitle}>Buildings on Campus</Title>
            <View style={styles.locationsContainer}>
                {/* Map out clickable chips with location data  */}
                {locations.map((location) => (
                    <View key={location.name} style={styles.location}>
                        <Chip
                            onPress={() => handleMarkerPress(location)}
                            style={styles.chip}
                            mode="outlined"
                            textStyle={styles.chipText}
                        >
                            {location.name}
                        </Chip>
                    </View>
                ))}
            </View>
        </Card>
    );
}

export default BuildingsOnCampus;

const styles = StyleSheet.create({
    buildingsOnCampus: {
        flex: 1,
        padding: 15,
        margin: 15,
    },
    locationsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 15,
    },
    locationsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    location: {
        marginBottom: 9,
        marginRight: 10,
    },
    chip: {
        backgroundColor: "rgb(226, 237, 248)",
        borderColor: "rgb(0, 127, 255)",
    },
    chipText: {
        color: "rgb(0, 106, 213)",
    },
});
