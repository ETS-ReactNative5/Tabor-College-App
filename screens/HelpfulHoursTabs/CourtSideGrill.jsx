import * as React from 'react';
import { useEffect, useState } from "react";
import  { View, FlatList, Text, Linking } from 'react-native';
import { List } from 'react-native-paper';

import { db } from "../../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";

import styles from './styles';
import { Card, Title, Subheading, Paragraph } from "react-native-paper";

const CourtSideGrill = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [courtSideGrill, setCourtSideGrill] = useState([]);
  useEffect(() => {
    // Get the cafe menu from firebase version 9
    const docRef = doc(db, "business office", "information");
    getDoc(docRef)
        .then((doc) => {
          setCourtSideGrill(doc.data().sections);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

  return (
    <List.Section>
      <List.Accordion 
        style={{ backgroundColor: 'white', marginBottom: 5 }}
        title="Courtside Grill"
        right={props => <List.Icon {...props} icon="school-outline" />}>
      <View style ={styles.background}>
       {/*unique identifier key for each flatlist */}
        <FlatList
            listKey="1.2"
            data={courtSideGrill}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.title}
            renderItem={({ item: section }) => (
                <Card style={styles.card}>
                <Title style={styles.title}>{section.title}</Title>
                {/* extract days and hours data */}
                <FlatList
                        keyExtractor={(item, index) => item + index}
                          data={section.data}
                          renderItem={({ item }) => (
                            <View style={styles.displayItem}>
                              <Subheading style={styles.subheading} key={item}>{item}</Subheading>
                            </View>
                          )}
                />
                {/* extract names, emails, and phone  */}
                  <Text  style={styles.names}>{section.name}</Text>
                  <Text  style={styles.contacts} onPress={() => Linking.openURL(`mailto:{section.email}`)}>{section.email}</Text>
                  <Text  style={styles.contacts} color= "blue" onPress={() => Linking.openURL(`tel:${section.phone}`)}>{section.phone}</Text>
                </Card>
                
            )}
        />
      </View>
      </List.Accordion>

     
    </List.Section>
  );
};

export default CourtSideGrill;