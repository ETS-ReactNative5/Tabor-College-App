import React, { useEffect, useState} from 'react';
import { View, FlatList, Text, Linking } from 'react-native';
import { Card, List, Title, Subheading } from 'react-native-paper';

// import Firebase Relative
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// import StyleSheet 
import styles from './styles';

const DiningHall = () => {
    const [diningHall, setDiningHall] = useState([]);
    // useState for List Accordions
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
        // Get Court Side Grill data from firestore
        const docRef = doc(db, "helpful hours" , "dining hours");
        getDoc(docRef)
            .then((doc) => {
                setDiningHall(doc.data().sections);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <View style = {styles.contentContainer}>
            <List.Accordion
                style = {styles.accordion} 
                title = "Dining Hall"
                theme ={{ colors: {primary: "#003082", animation: "scale", font: 'medium'}}} // this changes the Text when press to blue
                expanded = {expanded}
                onPress={handlePress} 
                left={props => <List.Icon {...props} icon="silverware-fork-knife" />}
                >
                <FlatList
                    data={diningHall}
                    listKey={(item, index) => `_key${index.toString()}`}
                    keyExtractor={(item, index) => `_key${index.toString()}`}
                    renderItem={({item: section}) => (
                        <Card style = { styles.card}>
                            <Title style = {styles.header}>{section.title}</Title>
                            <Text style = {styles.location}>({section.location})</Text>
                            <FlatList 
                                keyExtractor={(item) => item}
                                data={section.data}
                                renderItem={({item}) => (
                                    <View style = {styles.item}>
                                        <Subheading key={item}>{item}</Subheading>
                                    </View>
                                )}
                            />
                            <Title style = {styles.header}>Contact Information:</Title>
                            <Subheading 
                                onPress = {() => Linking.openURL(`mailto:${section.email}`)}
                                style = {styles.contact}>Email: {section.email}</Subheading>
                        </Card>
                    )}
                />

               
                
            </List.Accordion>
           
        </View>
    );
};

export default DiningHall;